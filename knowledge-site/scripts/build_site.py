from __future__ import annotations

import json
import re
import shutil
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent.parent
CONFIG = json.loads((ROOT / "site.config.json").read_text(encoding="utf-8"))
CONTENT_DIR = Path(CONFIG["contentDir"]).expanduser()
if not CONTENT_DIR.is_absolute():
    CONTENT_DIR = ROOT / CONTENT_DIR
OUTPUT_DIR = ROOT / CONFIG["outputDir"]
SRC_DIR = ROOT / "src"
IGNORED_DIRS = {".obsidian", ".git", ".github"}


WIKILINK_PATTERN = re.compile(r"(!)?\[\[([^\]]+)\]\]")
TAG_PATTERN = re.compile(r"(?<![\w/])#([A-Za-z][\w/-]*)")
MARKDOWN_LINK_PATTERN = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
FRONT_MATTER_PATTERN = re.compile(r"^---\n(.*?)\n---\n?", re.DOTALL)


@dataclass
class Note:
    id: str
    slug: str
    title: str
    rel_path: str
    folder_segments: list[str]
    body: str
    excerpt: str
    tags: list[str]
    wikilinks: list[str]
    outbound_html: list[str]
    plain_text: str
    metadata: dict[str, Any]
    backlinks: list[str]
    resolved_links: list[str]


def normalize_key(value: str) -> str:
    stack: list[str] = []
    for segment in value.replace("\\", "/").strip().split("/"):
        if not segment or segment == ".":
            continue
        if segment == "..":
            if stack:
                stack.pop()
            continue
        stack.append(segment)
    return re.sub(r"[\s_]+", " ", "/".join(stack).strip().lower())


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return value or "note"


def split_front_matter(text: str) -> tuple[dict[str, Any], str]:
    match = FRONT_MATTER_PATTERN.match(text)
    if not match:
        return {}, text

    block = match.group(1)
    body = text[match.end() :]
    metadata: dict[str, Any] = {}
    current_key: str | None = None

    for raw_line in block.splitlines():
        line = raw_line.rstrip()
        if not line:
            continue
        if line.startswith("- ") and current_key:
            metadata.setdefault(current_key, [])
            metadata[current_key].append(line[2:].strip())
            continue
        if ":" not in line:
            continue
        key, raw_value = line.split(":", 1)
        current_key = key.strip()
        value = raw_value.strip()
        if value.startswith("[") and value.endswith("]"):
            items = [item.strip().strip("'\"") for item in value[1:-1].split(",") if item.strip()]
            metadata[current_key] = items
        elif value:
            metadata[current_key] = value.strip("'\"")
        else:
            metadata[current_key] = []

    return metadata, body


def strip_markdown(text: str) -> str:
    text = re.sub(r"```.*?```", " ", text, flags=re.DOTALL)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"(!)?\[\[([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[*_~]+", "", text)
    text = re.sub(r"^-{3,}$", " ", text, flags=re.MULTILINE)
    text = re.sub(r"^[#>*\-+\d.\s]+", "", text, flags=re.MULTILINE)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_tags(text: str, metadata: dict[str, Any]) -> list[str]:
    tags = set(match.group(1).lower() for match in TAG_PATTERN.finditer(text))
    metadata_tags = metadata.get("tags", [])
    if isinstance(metadata_tags, str):
        tags.add(metadata_tags.lower())
    else:
        tags.update(tag.lower().lstrip("#") for tag in metadata_tags)
    return sorted(tags)


def extract_wikilinks(text: str) -> list[str]:
    return [match.group(2).strip() for match in WIKILINK_PATTERN.finditer(text)]


def extract_html_links(text: str) -> list[str]:
    html_targets: set[str] = set()
    for link in MARKDOWN_LINK_PATTERN.findall(text):
        if link.lower().endswith(".html"):
            html_targets.add(link)
    for match in WIKILINK_PATTERN.finditer(text):
        raw_target = match.group(2).split("|", 1)[0].strip()
        if raw_target.lower().endswith(".html"):
            html_targets.add(raw_target)
    return sorted(html_targets)


def make_excerpt(text: str) -> str:
    plain = strip_markdown(text)
    if len(plain) <= 180:
        return plain
    return plain[:180].rsplit(" ", 1)[0] + "..."


def is_ignored_path(path: Path) -> bool:
    try:
        relative_parts = path.relative_to(CONTENT_DIR).parts
    except ValueError:
        return False
    return any(part in IGNORED_DIRS for part in relative_parts)


def discover_notes() -> list[Note]:
    notes: list[Note] = []
    for md_file in sorted(CONTENT_DIR.rglob("*.md")):
        if is_ignored_path(md_file):
            continue
        raw_text = md_file.read_text(encoding="utf-8")
        metadata, body = split_front_matter(raw_text)
        rel_path = md_file.relative_to(CONTENT_DIR).as_posix()
        folder_segments = list(md_file.relative_to(CONTENT_DIR).parts[:-1])
        title = str(metadata.get("title") or md_file.stem)
        slug = slugify(md_file.relative_to(CONTENT_DIR).with_suffix("").as_posix())
        notes.append(
            Note(
                id=f"note:{slug}",
                slug=slug,
                title=title,
                rel_path=rel_path,
                folder_segments=folder_segments,
                body=body,
                excerpt=make_excerpt(body),
                tags=extract_tags(body, metadata),
                wikilinks=extract_wikilinks(body),
                outbound_html=extract_html_links(body),
                plain_text=strip_markdown(body),
                metadata=metadata,
                backlinks=[],
                resolved_links=[],
            )
        )
    return notes


def build_alias_map(notes: list[Note]) -> dict[str, str]:
    alias_map: dict[str, str] = {}
    for note in notes:
        candidates = {
            normalize_key(note.title),
            normalize_key(note.rel_path),
            normalize_key(Path(note.rel_path).with_suffix("").as_posix()),
            normalize_key(Path(note.rel_path).stem),
        }
        aliases = note.metadata.get("aliases", [])
        if isinstance(aliases, str):
            candidates.add(normalize_key(aliases))
        else:
            candidates.update(normalize_key(alias) for alias in aliases)

        note_stem = Path(note.rel_path).stem.lower()
        if note_stem == "index":
            parent = Path(note.rel_path).parent.as_posix()
            if parent and parent != ".":
                candidates.add(normalize_key(parent))
                candidates.add(normalize_key(Path(parent).name))
        for candidate in candidates:
            alias_map.setdefault(candidate, note.id)
    return alias_map


def resolve_wikilinks(notes: list[Note], alias_map: dict[str, str]) -> None:
    note_map = {note.id: note for note in notes}
    for note in notes:
        resolved: list[str] = []
        for raw in note.wikilinks:
            target = raw.split("|", 1)[0].split("#", 1)[0].strip()
            if target.lower().endswith(".html"):
                continue
            note_id = alias_map.get(normalize_key(target))
            if note_id and note_id != note.id:
                resolved.append(note_id)
                note_map[note_id].backlinks.append(note.id)
        note.resolved_links = sorted(set(resolved))
        note.backlinks = sorted(set(note.backlinks))


def copy_static_files() -> None:
    for path in [
        OUTPUT_DIR / "index.html",
        OUTPUT_DIR / "404.html",
        OUTPUT_DIR / ".nojekyll",
        OUTPUT_DIR / "assets" / "styles",
        OUTPUT_DIR / "assets" / "scripts",
        OUTPUT_DIR / "assets" / "data",
        OUTPUT_DIR / "assets" / "content",
        OUTPUT_DIR / "components",
    ]:
        if path.exists():
            if path.is_dir():
                shutil.rmtree(path)
            else:
                path.unlink()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "assets" / "styles").mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "assets" / "scripts").mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "assets" / "data").mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "assets" / "content").mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "components").mkdir(parents=True, exist_ok=True)

    for page in (SRC_DIR / "pages").glob("*.html"):
        shutil.copy2(page, OUTPUT_DIR / page.name)

    for component in (SRC_DIR / "components").glob("*.html"):
        shutil.copy2(component, OUTPUT_DIR / "components" / component.name)

    for stylesheet in (SRC_DIR / "styles").glob("*.css"):
        shutil.copy2(stylesheet, OUTPUT_DIR / "assets" / "styles" / stylesheet.name)

    for script in (SRC_DIR / "scripts").glob("*.js"):
        shutil.copy2(script, OUTPUT_DIR / "assets" / "scripts" / script.name)

    for file_path in CONTENT_DIR.rglob("*"):
        if is_ignored_path(file_path):
            continue
        if not file_path.is_file() or file_path.suffix.lower() == ".md":
            continue
        destination = OUTPUT_DIR / "assets" / "content" / file_path.relative_to(CONTENT_DIR)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file_path, destination)

    (OUTPUT_DIR / ".nojekyll").write_text("", encoding="utf-8")


def build_sidebar_tree(notes: list[Note]) -> dict[str, Any]:
    root: dict[str, Any] = {"name": "Knowledge", "folders": [], "notes": []}

    def find_or_create_folder(node: dict[str, Any], folder_name: str, path_key: str) -> dict[str, Any]:
        for folder in node["folders"]:
            if folder["pathKey"] == path_key:
                return folder
        folder = {"name": folder_name, "pathKey": path_key, "folders": [], "notes": []}
        node["folders"].append(folder)
        node["folders"].sort(key=lambda item: item["name"].lower())
        return folder

    for note in notes:
        cursor = root
        accumulated: list[str] = []
        for segment in note.folder_segments:
            accumulated.append(segment)
            cursor = find_or_create_folder(cursor, segment, "/".join(accumulated))
        cursor["notes"].append({"id": note.id, "slug": note.slug, "title": note.title})
        cursor["notes"].sort(key=lambda item: item["title"].lower())

    return root


def build_topics(notes: list[Note]) -> list[dict[str, Any]]:
    topic_counts: defaultdict[str, int] = defaultdict(int)
    for note in notes:
        topic_key = note.folder_segments[0] if note.folder_segments else "Vault"
        topic_counts[topic_key] += 1
    return [{"id": slugify(topic), "name": topic, "count": count} for topic, count in sorted(topic_counts.items())]


def build_payload(notes: list[Note]) -> dict[str, Any]:
    topics = build_topics(notes)
    topic_lookup = {topic["name"]: topic["id"] for topic in topics}
    note_map = {note.id: note for note in notes}
    asset_map: dict[str, str] = {}
    default_note = next(
        (
            note
            for note in notes
            if Path(note.rel_path).stem.lower() == "index" or normalize_key(note.title) in {"home", "index", "knowledge index"}
        ),
        notes[0] if notes else None,
    )

    for asset in (OUTPUT_DIR / "assets" / "content").rglob("*"):
        if asset.is_file():
            rel = asset.relative_to(OUTPUT_DIR / "assets" / "content").as_posix()
            asset_url = f"./assets/content/{rel}"
            asset_map.setdefault(normalize_key(rel), asset_url)
            asset_map.setdefault(normalize_key(Path(rel).name), asset_url)

    payload_notes: list[dict[str, Any]] = []
    graph_nodes: list[dict[str, Any]] = []
    graph_edges: list[dict[str, Any]] = []

    for note in notes:
        topic_name = note.folder_segments[0] if note.folder_segments else "Vault"
        topic_id = topic_lookup[topic_name]
        payload_notes.append(
            {
                "id": note.id,
                "slug": note.slug,
                "title": note.title,
                "relPath": note.rel_path,
                "folderSegments": note.folder_segments,
                "body": note.body,
                "excerpt": note.excerpt,
                "plainText": note.plain_text,
                "tags": note.tags,
                "links": note.resolved_links,
                "backlinks": note.backlinks,
                "htmlLinks": note.outbound_html,
                "topicId": topic_id,
                "topicName": topic_name,
                "metadata": note.metadata,
            }
        )
        graph_nodes.append(
            {
                "id": note.id,
                "slug": note.slug,
                "label": note.title,
                "topicId": topic_id,
                "topicName": topic_name,
                "tags": note.tags,
                "degree": len(note.resolved_links) + len(note.backlinks),
            }
        )
        for target in note.resolved_links:
            graph_edges.append({"id": f"{note.id}->{target}", "source": note.id, "target": target, "kind": "wikilink"})

    return {
        "site": {
            "name": CONFIG["siteName"],
            "tagline": CONFIG["tagline"],
            "defaultNote": default_note.slug if default_note else None,
            "basePath": CONFIG["basePath"],
        },
        "sidebar": build_sidebar_tree(notes),
        "topics": topics,
        "assets": asset_map,
        "notes": payload_notes,
        "graph": {"topics": topics, "nodes": graph_nodes, "edges": graph_edges},
        "references": {
            note.id: {
                "title": note.title,
                "slug": note.slug,
                "backlinks": [{"id": backlink_id, "title": note_map[backlink_id].title, "slug": note_map[backlink_id].slug} for backlink_id in note.backlinks],
            }
            for note in notes
        },
    }


def main() -> None:
    notes = discover_notes()
    alias_map = build_alias_map(notes)
    resolve_wikilinks(notes, alias_map)
    copy_static_files()
    payload = build_payload(notes)
    output_file = OUTPUT_DIR / "assets" / "data" / "site-data.json"
    output_file.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Built {len(notes)} notes into {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

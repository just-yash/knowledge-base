import {
  escapeHtml,
  isEmbeddableAsset,
  isMarkdownAsset,
  parseObsidianReference,
  postProcessRenderedContent,
  renderAssetReference,
  renderCallout,
  renderEmbed,
  renderImageEmbed,
  renderWikilink,
  slugifyHeading
} from "./renderer.js";
import { resolveAsset, resolveNoteReference } from "./data-loader.js";

let markdownDepsPromise;
let mathRendererPromise;
let markedConfigured = false;
let activeRenderContext = null;

function extractLeadingFrontmatter(markdown) {
  const match = /^---\s*\r?\n([\s\S]*?)\r?\n---(?=\r?\n|$)/.exec(markdown);
  if (!match) {
    return { body: markdown, hadFrontmatter: false };
  }

  let body = markdown.slice(match[0].length);
  body = body.replace(/^\r?\n/, "");
  return { body, hadFrontmatter: true };
}

function extractLeadingManualFrontmatter(markdown) {
  const lines = markdown.split(/\r?\n/);
  let cursor = 0;

  while (cursor < lines.length && !lines[cursor].trim()) {
    cursor += 1;
  }

  const items = [];
  while (cursor < lines.length) {
    const line = lines[cursor];
    if (!line.trim()) {
      cursor += 1;
      break;
    }

    const metaMatch = /^(date|tags?|topic|aliases?|status|created|updated)\s*:\s*(.*)$/i.exec(line);
    if (metaMatch) {
      items.push({
        type: "meta",
        key: metaMatch[1],
        rawValue: metaMatch[2] || ""
      });
      cursor += 1;
      continue;
    }

    const authorMatch = /^~\s*(\*\*\*[\s\S]+?\*\*\*)\s*~\s*$/i.exec(line);
    if (authorMatch) {
      items.push({
        type: "author",
        rawValue: authorMatch[1]
      });
      cursor += 1;
      continue;
    }

    break;
  }

  if (!items.length) {
    return { body: markdown, items: [] };
  }

  return {
    body: lines.slice(cursor).join("\n"),
    items
  };
}

function buildFrontmatterEntries(currentNote, hadFrontmatter) {
  if (!hadFrontmatter || !currentNote?.metadata) {
    return [];
  }

  const metadata = currentNote.metadata;
  const preferredOrder = ["date", "created", "updated", "theme", "topic", "status", "aliases", "tags"];
  const metadataKeys = Object.keys(metadata);
  const orderedKeys = [
    ...preferredOrder.filter((key) => metadataKeys.includes(key)),
    ...metadataKeys.filter((key) => !preferredOrder.includes(key))
  ];

  return orderedKeys
    .map((key) => {
      let value = metadata[key];
      if (key === "tags" && (!Array.isArray(value) || !value.length) && Array.isArray(currentNote.tags) && currentNote.tags.length) {
        value = currentNote.tags;
      }
      return { key, value };
    })
    .filter(({ key, value }) => {
      if (key === "title") {
        return false;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value != null && String(value).trim() !== "";
    });
}

async function loadMarkdownDeps() {
  if (!markdownDepsPromise) {
    markdownDepsPromise = Promise.all([
      import("https://esm.sh/marked@4.3.0"),
      import("https://esm.sh/dompurify@3.1.6")
    ]);
  }

  return markdownDepsPromise;
}

async function loadMathRenderer() {
  if (!mathRendererPromise) {
    mathRendererPromise = import("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.mjs");
  }
  return mathRendererPromise;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function humanizeCalloutType(value) {
  return String(value || "")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function humanizeFrontmatterKey(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) {
    return "";
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function createHeadingId(raw) {
  const ids = activeRenderContext?.headingIds;
  const base = slugifyHeading(raw);
  if (!ids) {
    return base;
  }

  const count = ids.get(base) || 0;
  ids.set(base, count + 1);
  return count ? `${base}-${count}` : base;
}

function tokenizeCalloutBlock(src, lexer) {
  if (!src.startsWith("> [!")) {
    return undefined;
  }

  const lines = src.split(/\r?\n/);
  const firstLine = lines[0];
  const match = /^> *\[!([^\]\r\n]+)\]([+-])?(?:\s+(.*))?\s*$/.exec(firstLine);
  if (!match) {
    return undefined;
  }

  const collected = [firstLine];
  let index = 1;

  while (index < lines.length) {
    const line = lines[index];
    if (/^> ?/.test(line)) {
      collected.push(line);
      index += 1;
      continue;
    }
    break;
  }

  const raw = collected.join("\n");
  const bodyMarkdown = collected
    .slice(1)
    .map((line) => line.replace(/^> ?/, ""))
    .join("\n");

  return {
    type: "obsidianCallout",
    raw,
    calloutType: match[1].trim(),
    foldState: match[2] || "",
    titleTokens: lexer.inlineTokens((match[3] || humanizeCalloutType(match[1])).trim()),
    tokens: lexer.blockTokens(bodyMarkdown)
  };
}

function configureMarked(marked) {
  if (markedConfigured) {
    return;
  }

  marked.use({
    extensions: [
      {
        name: "obsidianCallout",
        level: "block",
        start(src) {
          const index = src.indexOf("> [!");
          return index >= 0 ? index : undefined;
        },
        tokenizer(src) {
          return tokenizeCalloutBlock(src, this.lexer);
        },
        renderer(token) {
          return renderCallout(
            token.calloutType,
            this.parser.parseInline(token.titleTokens),
            this.parser.parse(token.tokens),
            token.foldState
          );
        }
      },
      {
        name: "obsidianEmbed",
        level: "inline",
        start(src) {
          const index = src.indexOf("![[");
          return index >= 0 ? index : undefined;
        },
        tokenizer(src) {
          const match = /^!\[\[([\s\S]+?)\]\]/.exec(src);
          if (!match) {
            return undefined;
          }

          return {
            type: "obsidianEmbed",
            raw: match[0],
            text: match[1]
          };
        },
        renderer(token) {
          return renderEmbed(token.text, activeRenderContext.data, activeRenderContext.currentNote);
        }
      },
      {
        name: "obsidianWikilink",
        level: "inline",
        start(src) {
          const index = src.indexOf("[[");
          return index >= 0 ? index : undefined;
        },
        tokenizer(src) {
          const match = /^\[\[([\s\S]+?)\]\]/.exec(src);
          if (!match) {
            return undefined;
          }

          return {
            type: "obsidianWikilink",
            raw: match[0],
            text: match[1]
          };
        },
        renderer(token) {
          return renderWikilink(token.text, activeRenderContext.data, activeRenderContext.currentNote);
        }
      },
      {
        name: "obsidianMark",
        level: "inline",
        start(src) {
          const index = src.indexOf("==");
          return index >= 0 ? index : undefined;
        },
        tokenizer(src) {
          const match = /^==(?=\S)([\s\S]*?\S)==/.exec(src);
          if (!match) {
            return undefined;
          }

          return {
            type: "obsidianMark",
            raw: match[0],
            tokens: this.lexer.inlineTokens(match[1])
          };
        },
        renderer(token) {
          return `<mark>${this.parser.parseInline(token.tokens)}</mark>`;
        }
      }
    ]
  });

  markedConfigured = true;
}

function normalizeNoteMarkdown(markdown, currentNote) {
  let normalized = markdown;

  if (currentNote?.title) {
    const duplicateHeadingPattern = new RegExp(`(^|\\n)#\\s+${escapeRegExp(currentNote.title)}\\s*(?=\\n|$)`, "i");
    normalized = normalized.replace(duplicateHeadingPattern, "$1").replace(/^\s+/, "");
  }

  normalized = normalized.replace(
    /^~\s*\*\*\*(.+?)\*\*\*\s*~\s*$/gm,
    '<p class="author-signature"><span class="author-signature-mark">~</span><strong><em>$1</em></strong><span class="author-signature-mark">~</span></p>'
  );

  return normalized;
}

function buildRenderer(marked, data, currentNote) {
  const renderer = new marked.Renderer();

  renderer.heading = (text, level, raw) => {
    const id = createHeadingId(raw || text);
    return `<h${level} id="${escapeHtml(id)}">${text}</h${level}>`;
  };

  renderer.link = (href, title, text) => {
    const renderedText = text || href || "";
    if (!href) {
      return renderedText;
    }

    if (href.startsWith("#")) {
      const targetId = slugifyHeading(href.slice(1));
      return `<a href="#${escapeHtml(targetId)}" data-local-anchor="${escapeHtml(targetId)}">${renderedText}</a>`;
    }

    if (isMarkdownAsset(href)) {
      const parsed = parseObsidianReference(href);
      const note = resolveNoteReference(data, parsed.reference, currentNote?.relPath || "");
      if (!note) {
        return `<span class="broken-link">${renderedText}</span>`;
      }

      const anchorId = parsed.anchor ? slugifyHeading(parsed.anchor) : "";
      return `<a href="?note=${encodeURIComponent(note.slug)}${anchorId ? `#${encodeURIComponent(anchorId)}` : ""}" data-note-link="${escapeHtml(note.slug)}"${anchorId ? ` data-note-hash="${escapeHtml(anchorId)}"` : ""}>${renderedText}</a>`;
    }

    if (isEmbeddableAsset(href)) {
      return renderAssetReference(href, data, currentNote, { label: renderedText, embed: false });
    }

    const linkedNote = resolveNoteReference(data, href, currentNote?.relPath || "");
    if (linkedNote) {
      return `<a href="?note=${encodeURIComponent(linkedNote.slug)}" data-note-link="${escapeHtml(linkedNote.slug)}">${renderedText}</a>`;
    }

    const assetUrl = resolveAsset(data, href, currentNote?.relPath || "");
    if (assetUrl && assetUrl !== href) {
      return `<a href="${escapeHtml(assetUrl)}" target="_blank" rel="noreferrer noopener"${title ? ` title="${escapeHtml(title)}"` : ""}>${renderedText}</a>`;
    }

    const isExternal = /^(https?:|mailto:|tel:)/i.test(href);
    if (isExternal) {
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer noopener"${title ? ` title="${escapeHtml(title)}"` : ""}>${renderedText}</a>`;
    }

    return `<a href="${escapeHtml(href)}"${title ? ` title="${escapeHtml(title)}"` : ""}>${renderedText}</a>`;
  };

  renderer.image = (href, title, text) => {
    const assetUrl = resolveAsset(data, href, currentNote?.relPath || "");
    if (!assetUrl) {
      return `<span class="broken-link">${escapeHtml(text || href || "Missing image")}</span>`;
    }

    return renderImageEmbed(assetUrl, text || title || "Embedded image");
  };

  return renderer;
}

function renderManualFrontmatterHtml(marked, renderer, items) {
  if (!items.length) {
    return "";
  }

  const renderInline = (source) =>
    marked.parseInline(source || "", {
      renderer,
      gfm: true,
      breaks: true,
      headerIds: false,
      mangle: false
    });

  const markup = items
    .map((item) => {
      if (item.type === "author") {
        return `
          <p class="author-signature">
            <span class="author-signature-mark">~</span>
            <span class="frontmatter-value">${renderInline(item.rawValue)}</span>
            <span class="author-signature-mark">~</span>
          </p>
        `;
      }

      return `
        <p>
          <span class="frontmatter-key">${escapeHtml(humanizeFrontmatterKey(item.key))} :</span>
          <span class="frontmatter-value">${renderInline(item.rawValue)}</span>
        </p>
      `;
    })
    .join("");

  return `<section class="note-frontmatter manual-frontmatter">${markup}</section>`;
}

export async function renderMarkdown(markdown, data, currentNote) {
  const [{ marked }, { default: createDOMPurify }] = await loadMarkdownDeps();
  configureMarked(marked);

  const purify = createDOMPurify(window);
  const { body: markdownBody, hadFrontmatter } = extractLeadingFrontmatter(markdown);
  const { body: markdownWithoutManualFrontmatter, items: manualFrontmatterItems } = extractLeadingManualFrontmatter(markdownBody);
  const normalized = normalizeNoteMarkdown(markdownWithoutManualFrontmatter, currentNote);
  const frontmatterEntries = buildFrontmatterEntries(currentNote, hadFrontmatter);
  activeRenderContext = {
    data,
    currentNote,
    headingIds: new Map()
  };

  let rawHtml = "";
  let manualFrontmatterHtml = "";
  try {
    const renderer = buildRenderer(marked, data, currentNote);
    rawHtml = marked.parse(normalized, {
      renderer,
      gfm: true,
      breaks: true,
      headerIds: false,
      mangle: false
    });
    manualFrontmatterHtml = renderManualFrontmatterHtml(marked, renderer, manualFrontmatterItems);
  } finally {
    activeRenderContext = null;
  }

  rawHtml = `${manualFrontmatterHtml}${rawHtml}`;

  const sanitized = purify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe", "details", "summary", "figure", "figcaption", "video", "audio", "style", "aside", "input"],
    ADD_ATTR: [
      "class",
      "style",
      "id",
      "type",
      "checked",
      "disabled",
      "target",
      "rel",
      "loading",
      "sandbox",
      "referrerpolicy",
      "allow",
      "allowfullscreen",
      "data-note-link",
      "data-note-hash",
      "data-local-anchor",
      "aria-label",
      "controls",
      "preload",
      "poster",
      "open"
    ]
  });

  const temp = document.createElement("div");
  temp.innerHTML = sanitized;
  postProcessRenderedContent(temp, frontmatterEntries);

  try {
    const { default: renderMathInElement } = await loadMathRenderer();
    renderMathInElement(temp, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false,
      strict: "ignore"
    });
  } catch (error) {
    console.warn("Math rendering failed", error);
  }

  return temp.innerHTML;
}

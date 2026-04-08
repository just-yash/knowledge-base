import { DATA_PATH } from "./config.js";

let cachedData;

function normalizeKey(value) {
  const segments = [];
  for (const rawSegment of value.replaceAll("\\", "/").trim().split("/")) {
    const segment = rawSegment.trim();
    if (!segment || segment === ".") {
      continue;
    }
    if (segment === "..") {
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  return segments.join("/").toLowerCase().replaceAll("_", " ");
}

function dirname(relPath) {
  const normalized = relPath.replaceAll("\\", "/");
  const lastSlash = normalized.lastIndexOf("/");
  return lastSlash >= 0 ? normalized.slice(0, lastSlash) : "";
}

function joinVaultPath(baseRelPath, targetPath) {
  const baseDir = dirname(baseRelPath);
  return normalizeKey(baseDir ? `${baseDir}/${targetPath}` : targetPath);
}

function indexFolders(sidebarTree) {
  const folderByPath = new Map();

  function visitFolder(folder, parentPath = "", segments = []) {
    const folderSegments = [...segments, folder.name];
    const indexedFolder = {
      ...folder,
      parentPath,
      folderSegments
    };
    folderByPath.set(folder.pathKey, indexedFolder);

    for (const child of folder.folders || []) {
      visitFolder(child, folder.pathKey, folderSegments);
    }
  }

  for (const folder of sidebarTree.folders || []) {
    visitFolder(folder);
  }

  return folderByPath;
}

export async function loadSiteData() {
  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(DATA_PATH);
  const data = await response.json();
  const noteById = new Map();
  const noteBySlug = new Map();
  const noteByReference = new Map();
  const tags = new Map();
  const folderByPath = indexFolders(data.sidebar);

  for (const note of data.notes) {
    noteById.set(note.id, note);
    noteBySlug.set(note.slug, note);

    const candidates = [
      note.title,
      note.relPath,
      note.relPath.replace(/\.md$/i, ""),
      note.title.toLowerCase()
    ];
    if (note.metadata?.aliases) {
      const aliases = Array.isArray(note.metadata.aliases) ? note.metadata.aliases : [note.metadata.aliases];
      candidates.push(...aliases);
    }
    if (/\/index\.md$/i.test(note.relPath) || /^index\.md$/i.test(note.relPath)) {
      const parentPath = dirname(note.relPath);
      if (parentPath) {
        const folderName = parentPath.split("/").pop();
        candidates.push(parentPath, folderName);
      }
    }

    for (const candidate of candidates) {
      noteByReference.set(normalizeKey(candidate), note);
    }

    for (const tag of note.tags) {
      if (!tags.has(tag)) {
        tags.set(tag, []);
      }
      tags.get(tag).push(note);
    }
  }

  cachedData = {
    ...data,
    lookups: {
      noteById,
      noteBySlug,
      noteByReference,
      tags,
      folderByPath
    }
  };

  return cachedData;
}

export function resolveNoteReference(data, rawReference, currentRelPath = "") {
  const cleaned = rawReference.split("|", 1)[0].split("#", 1)[0].trim();
  const candidates = [normalizeKey(cleaned)];
  if (/\.md$/i.test(cleaned)) {
    candidates.push(normalizeKey(cleaned.replace(/\.md$/i, "")));
  }
  if (currentRelPath && (cleaned.includes("/") || cleaned.startsWith("."))) {
    candidates.push(joinVaultPath(currentRelPath, cleaned));
    if (/\.md$/i.test(cleaned)) {
      candidates.push(joinVaultPath(currentRelPath, cleaned.replace(/\.md$/i, "")));
    }
  }

  for (const candidate of candidates) {
    const note = data.lookups.noteByReference.get(candidate);
    if (note) {
      return note;
    }
  }
  return undefined;
}

export function resolveAsset(data, rawPath, currentRelPath = "") {
  if (/^(https?:|mailto:|tel:|data:)/i.test(rawPath)) {
    return rawPath;
  }

  const candidates = [normalizeKey(rawPath)];
  if (currentRelPath && (rawPath.includes("/") || rawPath.startsWith("."))) {
    candidates.push(joinVaultPath(currentRelPath, rawPath));
  }
  const basename = rawPath.replaceAll("\\", "/").split("/").pop();
  if (basename) {
    candidates.push(normalizeKey(basename));
  }

  for (const candidate of candidates) {
    if (data.assets[candidate]) {
      return data.assets[candidate];
    }
  }
  return undefined;
}

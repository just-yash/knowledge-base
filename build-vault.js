// build-vault.js — converts real Obsidian .md files → vault-data.js
// Run: node build-vault.js

const fs   = require('fs');
const path = require('path');

const VAULT_ROOT = 'C:\\Users\\YASH\\OneDrive\\obsidian\\Yash-Zattelkasten';
const OUTPUT     = path.join(__dirname, 'vault-data.js');

const SKIP_DIRS  = new Set(['Private', '.obsidian', 'Projects', '.trash']);

const FOLDER_META = {
  '01 - MOCs':       { id: 'mocs',        icon: 'network',         group: 'moc',        expanded: true  },
  '02 - Raw Notes':  { id: 'raw-notes',   icon: 'file-text',       group: 'raw',        expanded: false },
  '03 - Notes':      { id: 'notes',       icon: 'book-open',       group: 'notes',      expanded: true  },
  '04 - Research':   { id: 'research',    icon: 'flask',           group: 'research',   expanded: true  },
  '05 - Creativity': { id: 'creativity',  icon: 'sparkle',         group: 'creativity', expanded: false },
  '06 - Archive':    { id: 'archive',     icon: 'archive',         group: null,         expanded: false },
  '07 - Annexure':   { id: 'annexure',    icon: 'paperclip',       group: null,         expanded: false },
  '08 - Tags':       { id: 'tags-folder', icon: 'hash',            group: null,         expanded: false },
  '09 - Templates':  { id: 'templates',   icon: 'layout-template', group: null,         expanded: false },
};

// ── helpers ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeId(relPath) {
  // e.g. "03 - Notes/AVL Tree.md" → "avl-tree"
  // use just filename; prepend folder slug if needed for uniqueness
  const parts = relPath.replace(/\.md$/, '').split(/[\\/]/);
  return slugify(parts[parts.length - 1]);
}

function parseHeader(rawContent) {
  const lines = rawContent.split('\n');
  const headerLines = [];
  let bodyStart = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') { bodyStart = i + 1; break; }
    headerLines.push(lines[i]);
    bodyStart = i + 1;
  }

  const header = {};
  for (const line of headerLines) {
    const m = line.match(/^(\w+)\s*:\s*(.+)/);
    if (m) header[m[1].toLowerCase()] = m[2].trim();
  }

  return { header, body: lines.slice(bodyStart).join('\n').trim() };
}

function extractTags(header) {
  const tags = new Set();
  if (header.tags) {
    for (const m of header.tags.matchAll(/\[\[([^\]]+)\]\]/g))
      tags.add(slugify(m[1]));
    for (const m of header.tags.matchAll(/#(\w+)/g))
      tags.add(m[1].toLowerCase());
  }
  if (header.type) {
    for (const m of header.type.matchAll(/#(\w+)/g))
      tags.add(m[1].toLowerCase());
  }
  return [...tags];
}

function extractDate(header, stats) {
  if (header.date) {
    const m = header.date.match(/(\d{4}-\d{2}-\d{2})/);
    if (m) return m[1];
  }
  return stats.mtime.toISOString().slice(0, 10);
}

function extractWikiLinks(content) {
  return [...content.matchAll(/\[\[([^\]|#\n]+?)(?:\|[^\]]+)?\]\]/g)]
    .map(m => m[1].trim());
}

function extractOutline(content) {
  const out = [];
  for (const m of content.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const text = m[2].replace(/\*\*?|`/g, '').trim();
    const id   = slugify(text);
    out.push({ level: m[1].length, text, id });
    if (out.length >= 12) break;
  }
  return out;
}

function escapeTemplateLiteral(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

// ── walk ─────────────────────────────────────────────────────────────────────

function walkDir(dir, relPath) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath  = path.join(dir, entry.name);
    const entryRel  = relPath ? `${relPath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      result.push(...walkDir(fullPath, entryRel));
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.endsWith('.excalidraw.md')) {
      result.push({ fullPath, relPath: entryRel });
    }
  }
  return result;
}

// ── main ─────────────────────────────────────────────────────────────────────

const allFiles = walkDir(VAULT_ROOT, '');

// First pass: build title→id map (for link resolution)
const titleToId = {};
const idCounts  = {};

for (const { relPath } of allFiles) {
  const parts    = relPath.replace(/\.md$/, '').split(/[\\/]/);
  const filename = parts[parts.length - 1];
  let   id       = slugify(filename);

  // collision? prefix with parent folder slug
  if (idCounts[id]) {
    id = slugify(parts[parts.length - 2]) + '-' + id;
  }
  idCounts[id] = (idCounts[id] || 0) + 1;

  titleToId[filename.toLowerCase()] = id;
}

// Re-build clean map after collision resolution
const fileInfos = [];
const usedIds   = {};

for (const { fullPath, relPath } of allFiles) {
  const parts      = relPath.replace(/\.md$/, '').split(/[\\/]/);
  const filename   = parts[parts.length - 1];
  const topFolder  = parts[0];
  const subFolders = parts.slice(1, -1);   // intermediate dirs
  let   id         = slugify(filename);

  if (usedIds[id]) id = slugify(parts[parts.length - 2]) + '-' + id;
  usedIds[id] = true;

  fileInfos.push({ fullPath, relPath, filename, topFolder, subFolders, id });
}

// Rebuild titleToId with final IDs
const finalTitleToId = {};
for (const { filename, id } of fileInfos) {
  finalTitleToId[filename.toLowerCase()] = id;
}

// Second pass: parse each file
const notes = {};
for (const { fullPath, relPath, filename, topFolder, subFolders, id } of fileInfos) {
  const raw    = fs.readFileSync(fullPath, 'utf8');
  const stats  = fs.statSync(fullPath);
  const { header, body } = parseHeader(raw);

  const tags    = extractTags(header);
  const date    = extractDate(header, stats);
  const outline = extractOutline(body);
  const wLinks  = extractWikiLinks(body);

  // Resolve wiki links to IDs
  const links = [...new Set(
    wLinks
      .map(t => finalTitleToId[t.toLowerCase()])
      .filter(Boolean)
      .filter(lid => lid !== id)
  )];

  const folderMeta = FOLDER_META[topFolder] || { id: slugify(topFolder), group: null };
  const folderName = topFolder;
  const fullPathArr = [folderName, ...subFolders, filename];

  notes[id] = {
    id, title: filename,
    folder: folderName,
    path: fullPathArr,
    tags, date, outline, links,
    backlinks: [],        // filled in third pass
    wordCount: body.split(/\s+/).filter(Boolean).length,
    content: body,
    _topFolder: topFolder,
    _subFolders: subFolders,
    _group: folderMeta.group,
  };
}

// Third pass: backlinks
for (const note of Object.values(notes)) {
  for (const targetId of note.links) {
    if (notes[targetId] && !notes[targetId].backlinks.includes(note.id)) {
      notes[targetId].backlinks.push(note.id);
    }
  }
}

// ── Build VAULT_FOLDERS ───────────────────────────────────────────────────────

function buildFolderTree(topFolderName) {
  const meta     = FOLDER_META[topFolderName] || { id: slugify(topFolderName), icon: 'folder', expanded: false };
  const children = {};   // subfolder-path → { id, name, children: [] }
  const direct   = [];   // notes directly in this top folder

  for (const note of Object.values(notes)) {
    if (note._topFolder !== topFolderName) continue;
    if (note._subFolders.length === 0) {
      direct.push({ id: note.id, name: note.title, type: 'note' });
    } else {
      // nest under subfolder(s)
      const key = note._subFolders.join('/');
      if (!children[key]) {
        const subId   = meta.id + '-' + slugify(note._subFolders[0]);
        const subName = note._subFolders[0];
        children[key] = { id: subId, name: subName, type: 'folder', children: [] };
      }
      children[key].children.push({ id: note.id, name: note.title, type: 'note' });
    }
  }

  const allChildren = [
    ...Object.values(children),
    ...direct,
  ];

  return {
    id: meta.id,
    name: topFolderName,
    icon: meta.icon || 'folder',
    expanded: meta.expanded ?? false,
    children: allChildren,
  };
}

const topFolders = [...new Set(fileInfos.map(f => f.topFolder))];
const VAULT_FOLDERS = topFolders.map(buildFolderTree);

// ── Build GRAPH_NODES / EDGES ─────────────────────────────────────────────────

const graphGroups = new Set(['moc', 'raw', 'notes', 'research', 'creativity']);
const GRAPH_NODES = Object.values(notes)
  .filter(n => n._group && graphGroups.has(n._group))
  .map(n => ({ id: n.id, label: n.title.slice(0, 30), group: n._group }));

const graphNodeIds = new Set(GRAPH_NODES.map(n => n.id));
const edgeSet      = new Set();
const GRAPH_EDGES  = [];

for (const note of Object.values(notes)) {
  if (!graphNodeIds.has(note.id)) continue;
  for (const targetId of note.links) {
    if (!graphNodeIds.has(targetId)) continue;
    const key = [note.id, targetId].sort().join('→');
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      GRAPH_EDGES.push({ source: note.id, target: targetId });
    }
  }
}

// ── Serialize ─────────────────────────────────────────────────────────────────

function serializeNote(n) {
  const content = escapeTemplateLiteral(n.content);
  return `  '${n.id}': {
    id: '${n.id}',
    title: ${JSON.stringify(n.title)},
    folder: ${JSON.stringify(n.folder)},
    path: ${JSON.stringify(n.path)},
    tags: ${JSON.stringify(n.tags)},
    created: ${JSON.stringify(n.date)},
    modified: ${JSON.stringify(n.date)},
    wordCount: ${n.wordCount},
    backlinks: ${JSON.stringify(n.backlinks)},
    links: ${JSON.stringify(n.links)},
    outline: ${JSON.stringify(n.outline)},
    content: \`${content}\`
  }`;
}

const out = `// vault-data.js — auto-generated by build-vault.js on ${new Date().toISOString().slice(0,10)}

const VAULT_NOTES = {
${Object.values(notes).map(serializeNote).join(',\n\n')}
};

const VAULT_FOLDERS = ${JSON.stringify(VAULT_FOLDERS, null, 2)};

const GRAPH_NODES = ${JSON.stringify(GRAPH_NODES, null, 2)};

const GRAPH_EDGES = ${JSON.stringify(GRAPH_EDGES, null, 2)};
`;

fs.writeFileSync(OUTPUT, out, 'utf8');

console.log(`✓ vault-data.js written`);
console.log(`  Notes:  ${Object.keys(notes).length}`);
console.log(`  Folders: ${VAULT_FOLDERS.length}`);
console.log(`  Graph nodes: ${GRAPH_NODES.length}, edges: ${GRAPH_EDGES.length}`);

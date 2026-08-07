// build-vault.js — converts real Obsidian .md files → vault-data.js
// Run: node build-vault.js

const fs   = require('fs');
const path = require('path');

const VAULT_ROOT = path.join(__dirname, 'notes');
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
  const header = {};

  // Case A: Standard YAML Frontmatter starting with ---
  if (lines[0].trim() === '---') {
    const headerLines = [];
    let bodyStart = 1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        bodyStart = i + 1;
        break;
      }
      headerLines.push(lines[i]);
    }
    for (const line of headerLines) {
      const m = line.match(/^([\w-]+)\s*:\s*(.+)/);
      if (m) header[m[1].toLowerCase()] = m[2].trim();
    }
    return { header, body: lines.slice(bodyStart).join('\n').trim() };
  }

  // Case B: Inline Top Metadata block (Type :, Date :, Tags :, Status :, ~ Signature ~)
  let metaEndIndex = -1;
  let hasTopMeta = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Divider or Heading ends the metadata header block
    if (line === '---' || line.startsWith('#')) {
      metaEndIndex = (line === '---') ? i + 1 : i;
      break;
    }

    const isKv = /^([\w-]+)\s*:\s*(.+)/.test(line);
    const isSignature = /^~\s*\*?.*\*?\s*~$/.test(line) || line.startsWith('~');

    if (isKv || isSignature) {
      hasTopMeta = true;
      if (isKv) {
        const m = line.match(/^([\w-]+)\s*:\s*(.+)/);
        if (m) header[m[1].toLowerCase()] = m[2].trim();
      }
    } else {
      break;
    }
  }

  if (hasTopMeta && metaEndIndex > 0) {
    return { header, body: lines.slice(metaEndIndex).join('\n').trim() };
  }

  return { header: {}, body: rawContent.trim() };
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
  for (const m of content.matchAll(/^(#{2,6})\s+(.+)$/gm)) {
    const text = m[2].replace(/\*\*?|`|\[|\]/g, '').trim();
    const id   = slugify(text);
    out.push({ level: m[1].length, text, id });
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
    } else if (entry.isFile()) {
      const name         = entry.name;
      const isExcalidraw = name.endsWith('.excalidraw.md') || name.endsWith('.excalidraw');
      const isPdf        = name.endsWith('.pdf');
      const isHtml       = name.endsWith('.html');
      const isImage      = /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(name);
      if (name === '.gitkeep') continue;
      if (name.endsWith('.md') && !isExcalidraw) {
        result.push({ fullPath, relPath: entryRel, stub: false });
      } else if (isPdf || isHtml) {
        result.push({ fullPath, relPath: entryRel, stub: 'asset', ext: isPdf ? 'pdf' : 'html' });
      } else if (isImage) {
        result.push({ fullPath, relPath: entryRel, stub: 'image', ext: name.split('.').pop().toLowerCase() });
      } else if (isExcalidraw) {
        result.push({ fullPath, relPath: entryRel, stub: 'excalidraw' });
      }
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
  const parts    = relPath.replace(/\.(md|pdf|html|excalidraw|png|jpg|jpeg|gif|svg|webp)$/i, '').split(/[\\/]/);
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

for (const { fullPath, relPath, stub, ext } of allFiles) {
  const parts      = relPath.replace(/\.(md|pdf|html|excalidraw|png|jpg|jpeg|gif|svg|webp)$/i, '').split(/[\\/]/);
  const filename   = parts[parts.length - 1];
  const topFolder  = parts[0];
  const subFolders = parts.slice(1, -1);   // intermediate dirs
  let   id         = slugify(filename);

  if (usedIds[id]) id = slugify(parts[parts.length - 2]) + '-' + id;
  usedIds[id] = true;

  fileInfos.push({ fullPath, relPath, filename, topFolder, subFolders, id, stub: stub || false, ext: ext || null });
}

// Rebuild titleToId with final IDs
const finalTitleToId = {};
for (const { filename, id } of fileInfos) {
  finalTitleToId[filename.toLowerCase()] = id;
}

// Second pass: parse each file
const notes = {};
for (const { fullPath, relPath, filename, topFolder, subFolders, id, stub, ext } of fileInfos) {
  const stats      = fs.statSync(fullPath);
  const folderMeta = FOLDER_META[topFolder] || { id: slugify(topFolder), group: null };
  const folderName = topFolder;
  const fullPathArr = [folderName, ...subFolders, filename];

  if (stub) {
    // Build web-accessible URL (relative to repo root)
    const webPath = 'notes/' + relPath.split(/[\\/]/).map(s => encodeURIComponent(s)).join('/');
    const rawPath = 'notes/' + relPath.replace(/\\/g, '/');

    let content = '';
    let sidebarType = 'stub';

    if (stub === 'asset' && ext === 'pdf') {
      sidebarType = 'asset';
      content = `# ${filename}\n\n<div style="width:100%;height:82vh">\n<iframe src="${rawPath}" style="width:100%;height:100%;border:none;border-radius:6px" title="${filename}"></iframe>\n</div>\n\n[Open in new tab ↗](${rawPath})`;
    } else if (stub === 'asset' && ext === 'html') {
      sidebarType = 'asset';
      content = `# ${filename}\n\n<div style="width:100%;height:82vh">\n<iframe src="${rawPath}" style="width:100%;height:100%;border:none;border-radius:6px" title="${filename}"></iframe>\n</div>\n\n[Open in new tab ↗](${rawPath})`;
    } else if (stub === 'image') {
      sidebarType = 'asset';
      content = `# ${filename}\n\n<div style="text-align:center">\n<img src="${rawPath}" alt="${filename}" style="max-width:100%;border-radius:6px;box-shadow:0 4px 20px rgba(0,0,0,0.3)" />\n</div>`;
    } else {
      // Excalidraw — truly not viewable
      content = `# ${filename}\n\n*Excalidraw drawing — open in Obsidian to view.*`;
    }

    notes[id] = {
      id, title: filename,
      folder: folderName, path: fullPathArr,
      tags: [stub], date: stats.mtime.toISOString().slice(0,10),
      outline: [], links: [], backlinks: [], wordCount: 0,
      content,
      _topFolder: topFolder, _subFolders: subFolders, _group: null,
      _stub: sidebarType,
      _webPath: rawPath,
    };
    continue;
  }

  const raw    = fs.readFileSync(fullPath, 'utf8');
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

// Third pass: backlinks & tag note link compilation
for (const note of Object.values(notes)) {
  for (const targetId of note.links) {
    if (notes[targetId] && !notes[targetId].backlinks.includes(note.id)) {
      notes[targetId].backlinks.push(note.id);
    }
  }
}

// Tag notes pass: populate outgoing links for notes in '08 - Tags'
const allNoteList = Object.values(notes);
for (const note of allNoteList) {
  if (note.folder === '08 - Tags' || (note.path && note.path.join('/').includes('08 - Tags'))) {
    const tagTitle = note.title.replace(/\.md$/i, '').trim().toLowerCase();
    const slugT = tagTitle.replace(/\s+/g, '-');

    for (const other of allNoteList) {
      if (other.id === note.id) continue;
      const isMatch = (other.links && other.links.includes(note.id)) ||
                      (other.tags && other.tags.some(tg => tg.toLowerCase() === tagTitle || tg.toLowerCase() === slugT)) ||
                      (other.content && (other.content.toLowerCase().includes(`[[${tagTitle}]]`) || other.content.toLowerCase().includes(`#${tagTitle}`) || other.content.toLowerCase().includes(`#${slugT}`)));
      if (isMatch) {
        if (!note.links.includes(other.id)) note.links.push(other.id);
        if (!other.backlinks.includes(note.id)) other.backlinks.push(other.id);
      }
    }
  }
}

// ── Build VAULT_FOLDERS ───────────────────────────────────────────────────────

function buildFolderTree(topFolderName) {
  const meta       = FOLDER_META[topFolderName] || { id: slugify(topFolderName), icon: 'folder', expanded: false };
  const notesHere  = Object.values(notes).filter(n => n._topFolder === topFolderName);

  // Recursively build children for a given subfolder-path prefix.
  // idPrefix  — the id string built so far (e.g. "raw-notes-classes")
  // pathPrefix — the _subFolders segments matched so far (e.g. ["Classes"])
  function buildChildren(idPrefix, pathPrefix) {
    const directNotes  = [];
    const subFolderSet = new Set();

    for (const note of notesHere) {
      const sf = note._subFolders;

      // Skip notes that don't live under pathPrefix
      if (sf.length < pathPrefix.length) continue;
      if (!pathPrefix.every((p, i) => sf[i] === p)) continue;

      if (sf.length === pathPrefix.length) {
        // This note lives directly at the current level
        directNotes.push({ id: note.id, name: note.title, type: note._stub || 'note' });
      } else {
        // This note lives one level deeper — record the next folder segment
        subFolderSet.add(sf[pathPrefix.length]);
      }
    }

    // Build an entry for each immediate sub-folder, then recurse
    const folderEntries = [...subFolderSet].map(folderName => {
      const childIdPrefix   = idPrefix + '-' + slugify(folderName);
      const childPathPrefix = [...pathPrefix, folderName];
      return {
        id:       childIdPrefix,
        name:     folderName,
        type:     'folder',
        children: buildChildren(childIdPrefix, childPathPrefix),
      };
    });

    return [...folderEntries, ...directNotes];
  }

  return {
    id:       meta.id,
    name:     topFolderName,
    icon:     meta.icon || 'folder',
    expanded: meta.expanded ?? false,
    children: buildChildren(meta.id, []),
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

// ── Build VAULT_ASSETS (filename → web path for image embeds) ────────────────
const VAULT_ASSETS = {};
for (const note of Object.values(notes)) {
  if (note._stub === 'asset' || note._stub === 'image') {
    // map bare filename to web path
    const parts    = note._webPath.split('/');
    const filename = decodeURIComponent(parts[parts.length - 1]);
    VAULT_ASSETS[filename] = note._webPath;
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

const VAULT_ASSETS = ${JSON.stringify(VAULT_ASSETS, null, 2)};

// Expose to window so JSX components can access via window.*
window.VAULT_NOTES   = VAULT_NOTES;
window.VAULT_FOLDERS = VAULT_FOLDERS;
window.GRAPH_NODES   = GRAPH_NODES;
window.GRAPH_EDGES   = GRAPH_EDGES;
window.VAULT_ASSETS  = VAULT_ASSETS;
`;

fs.writeFileSync(OUTPUT, out, 'utf8');

console.log(`✓ vault-data.js written`);
console.log(`  Notes:  ${Object.keys(notes).length}`);
console.log(`  Folders: ${VAULT_FOLDERS.length}`);
console.log(`  Graph nodes: ${GRAPH_NODES.length}, edges: ${GRAPH_EDGES.length}`);

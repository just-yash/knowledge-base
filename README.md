# Yash's Zettelkasten

A personal knowledge graph published as a static site — no framework, no bundler, no build pipeline beyond a single Node script.

**Live:** [just-yash.github.io/knowledge-base](https://just-yash.github.io/knowledge-base/)

---

## What it is

Notes written in Obsidian, rendered as an interactive web vault. The site parses every Markdown file, resolves `[[wikilinks]]`, and exposes the full graph of connections through a force-directed canvas visualization.

---

## Features

| | |
|---|---|
| **Sidebar** | Collapsible file tree with folder icons, full-text search via command palette |
| **Editor** | Multi-tab reading view with breadcrumb, reading time, word count, tag chips |
| **Right panel** | Document outline, backlinks, outgoing links — live-computed from wikilinks |
| **Knowledge graph** | Force-directed canvas graph (223 nodes, 420 edges), pan/zoom, node hover, click-to-navigate |
| **Graph settings** | Adjustable node size, link force, repulsion, link distance, labels, arrows |
| **Themes** | Dark (default) and light, persisted to `localStorage` |
| **Mobile** | Sidebars as slide-in overlays, touch pan/pinch-zoom on the graph canvas |

---

## Tech stack

- **React 18** via Babel standalone — JSX in `<script type="text/babel">`, zero build step
- **Canvas 2D** — force-directed graph with a hand-rolled Verlet physics simulation
- **GitHub Pages** — `obsidian` branch is the published branch; no CI/CD needed
- **No npm dependencies at runtime** — Lucide icons inlined as SVG, KaTeX loaded from CDN

---

## Repository layout

```
knowledge-base/
├── notes/                  # All Obsidian Markdown notes (source of truth)
│   ├── 00 - Home/
│   ├── 01 - MOCs/          # Maps of Content
│   ├── 02 - Raw Notes/     # Books, classes, videos, podcasts, conversations
│   ├── 03 - Notes/         # Processed, evergreen notes
│   ├── 04 - Research/
│   ├── 05 - Creativity/
│   ├── 06 - Archive/
│   ├── 07 - Annexure/      # Attachments, Excalidraw, HTML exports
│   ├── 08 - Tags/
│   └── 09 - Templates/
│
├── build-vault.js          # Reads notes/ → writes vault-data.js
├── watch-vault.js          # File-watcher wrapper around build-vault.js
├── vault-data.js           # Generated: VAULT_NOTES, VAULT_FOLDERS, GRAPH_NODES, GRAPH_EDGES
│
├── index.html              # Shell — loads React, Babel, KaTeX, all JSX files
├── vault-app.jsx           # Root layout, routing, mobile responsiveness
├── vault-sidebar.jsx       # File tree, mini graph, folder icons
├── vault-editor.jsx        # Tab bar, note renderer, Markdown → HTML pipeline
├── vault-rightpanel.jsx    # Outline, backlinks, outgoing links
├── vault-graph.jsx         # Mini graph + full-screen force-directed graph modal
└── vault-icons.jsx         # Lucide-style SVG icon library
```

---

## Running locally

```bash
# 1. Rebuild the data file after editing notes
node build-vault.js

# 2. Serve (any static server works)
npx serve .
# or: python -m http.server 4321
```

Open `http://localhost:3000` (or whatever port the server reports).

**Auto-rebuild on save:**

```bash
node watch-vault.js
```

---

## Updating the vault

1. Edit `.md` files inside `notes/` using Obsidian or any editor
2. Run `node build-vault.js` to regenerate `vault-data.js`
3. Commit and push to the `obsidian` branch — GitHub Pages serves it automatically

---

## Note on private content

Folders listed in `SKIP_DIRS` inside `build-vault.js` (`Private`, `Projects`, `.obsidian`, `.trash`) are excluded from the build entirely and never reach `vault-data.js`.

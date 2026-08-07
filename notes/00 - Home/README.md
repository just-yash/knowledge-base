# 🧠 Yash's Knowledge Base & Interactive Vault

A personal digital notebook and knowledge graph published as a static website. It takes a raw Obsidian vault folder full of Markdown files and turns it into an interactive web viewer with a visual connection graph, dynamic Dataview query support, mathematical formulas, and instant search.

**Live site:** [just-yash.github.io/knowledge-base](https://just-yash.github.io/knowledge-base/)

---

## 🧭 Overview

This repository hosts my personal notes, structured around the **Zettelkasten** methodology and **Maps of Content (MOCs)**.

Instead of using a heavy framework like Next.js, Astro, or Hugo that requires complex build setups and node modules at runtime, I wanted something simple, transparent, and lightweight:
- A single Node script (`build-vault.js`) walks through the `notes/` folder and compiles all Markdown files, tags, wikilinks, and graph connections into a single structured file (`vault-data.js`).
- The frontend runs directly in the browser using React 18 and Babel Standalone. There are no bundle files or Webpack configs.
- The visual knowledge graph is drawn on an HTML5 Canvas using a lightweight physics simulation.

---

## ⚙ How it works under the hood

### 🕸️ 1. Interactive Knowledge Graph (`vault-graph.jsx`)
- **Physics Simulation**: Uses a 2D physics loop that calculates electrostatic node repulsion, link spring tension, center gravity, and velocity dampening so nodes naturally spread out without overlapping.
- **Theme Native**: The node colors, connection lines, background grid, and modal dialogs match the site's active light or dark theme automatically.
- **Settings Control**:
  - Adjust text fade threshold, node size, and link thickness.
  - Tweak physics variables like center pull, repulsion strength, and link distance.
  - Toggle directional link arrows or re-trigger the physics animation.
  - The control box stays pinned on the left side with internal scrolling, so it never gets cut off on smaller screens.
- **Two Views**:
  - A mini graph pinned in the left sidebar showing neighborhood connections for the open note.
  - A full-screen canvas modal with zoom, pan, hover highlights, and node navigation.

---

### 📊 2. Client-side Dataview Engine (`vault-editor.jsx`)
Obsidian's Dataview plugin is essential for MOCs and index pages. Since static web pages don't have Obsidian's plugin runtime, I wrote a custom parser inside the frontend renderer:
- Parses `LIST` and `TABLE` queries inside ```dataview code blocks.
- Filters by folder path (`WHERE contains(file.folder, "03 - Notes")`), tags, or linked topics (`FROM [[Topic]]` / `FROM #tag`).
- Supports exclusions (`-([[Topic]])`) and sorting (`SORT file.mtime DESC`).
- **Tag Pages**: When you open any Tag note from `08 - Tags/` (like `AI.md`, `ML.md`, `food.md`, `C.md`, `College.md`), the site automatically generates an index listing every note in the vault that shares that tag.
- Output renders as clean bullet lists and tables with clickable wikilinks.

---

### 📝 3. Markdown Parser & Reader (`vault-editor.jsx`)
- **Multi-Tab Interface**: Open multiple notes simultaneously, switch between tabs, close tabs, and share direct note links via URL hashes (`#note-title`).
- **Note Header Info**: Shows the folder path breadcrumb, modified date, estimated reading time, word count, and clickable tag chips.
- **Wikilinks**: Resolves `[[Note Title]]`, `[[Note Title|Custom Alias]]`, and `[[Note#Heading]]` anchors across subfolders.
- **Math Equations**: Formats inline math (`$...$`) and block equations (`$$...$$`) using KaTeX.
- **Callouts**: Styled callout boxes (`[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!IMPORTANT]`, `[!INFO]`, `[!CAUTION]`) with custom borders.
- **Embedded Media**: Resolves image paths (`![[photo.png]]`), PDF embeds, and Excalidraw drawing placeholders.

---

### 🔍 4. Search & File Tree (`vault-sidebar.jsx`, `vault-app.jsx`)
- **Folder Tree**: A collapsible folder tree mirroring the Obsidian vault layout.
- **Auto-Reveal**: Opening any note automatically expands its parent folders in the sidebar and scrolls to highlight the active file.
- **Quick Search**: Press `Cmd+K` or `Ctrl+K` to open the search modal. Type `#tag` to filter notes by tag, or type keywords to search note titles and paths.

---

### 📑 5. Document Context Panel (`vault-rightpanel.jsx`)
- **Outline**: Live table of contents generated from document headings with scroll tracking.
- **Backlinks & Outgoing Links**: Lists all incoming links and outgoing wikilinks.
- **Related Notes**: Recommends related notes based on shared tag overlap.

---

## 📂 Vault Structure

```
knowledge-base/
├── notes/                  # Markdown files (Obsidian Vault)
│   ├── 00 - Home/          # Vault entry point
│   ├── 01 - MOCs/          # Maps of Content (Hub pages for main topics)
│   ├── 02 - Raw Notes/     # Raw notes from books, courses, videos & podcasts
│   ├── 03 - Notes/         # Refined evergreen notes
│   ├── 04 - Research/      # Papers and technical research
│   ├── 05 - Creativity/    # Creative ideas and project notes
│   ├── 06 - Archive/       # Archived notes and old materials
│   ├── 07 - Annexure/      # Images, attachments, Excalidraw files
│   ├── 08 - Tags/          # Tag index notes
│   └── 09 - Templates/     # Templates used in Obsidian
│
├── build-vault.js          # Scans notes/ and compiles vault-data.js
├── watch-vault.js          # Live file-watcher for rebuilding while editing
├── deploy.bat              # Batch script for pushing updates to GitHub
├── vault-data.js           # Compiled note data & graph JSON
│
├── index.html              # Shell HTML and theme styling
├── vault-app.jsx           # Main React layout and application state
├── vault-sidebar.jsx       # Left sidebar, folder tree, and mini graph
├── vault-editor.jsx        # Markdown renderer, tabs, and Dataview parser
├── vault-rightpanel.jsx    # Right inspector panel (backlinks, outline, related)
├── vault-graph.jsx         # Force-directed canvas graph and settings panel
└── vault-icons.jsx         # Icon library and tag badges
```

---

## 🛠 Local Setup & Workflow

### Prerequisites
Make sure you have **Node.js** (v16+) installed.

### 1. Build Vault Data
To scan the `notes/` directory and update `vault-data.js`:
```bash
node build-vault.js
```

### 2. Live Rebuilding While Writing in Obsidian
Keep this running in a terminal while editing notes in Obsidian. It watches for file changes and updates `vault-data.js` automatically:
```bash
node watch-vault.js
```

### 3. Local Preview
Serve the repository using any simple static web server:
```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

---

## 🚀 Publishing to GitHub Pages

### Quick Push (Windows)
Run the batch script from the repository folder:
```cmd
deploy.bat
```

### Manual Push
```bash
node build-vault.js
git add vault-data.js index.html vault-editor.jsx vault-graph.jsx README.md
git commit -m "update notes and app"
git pull origin obsidian --rebase
git push origin obsidian
```

---

## 🔒 Ignored & Private Folders

Any folders specified in `SKIP_DIRS` inside `build-vault.js` are ignored during the build step and will not be published:
```javascript
const SKIP_DIRS = new Set([
  'Private',
  'Projects',
  '.obsidian',
  '.trash',
  '.claude',
  '.git',
]);
```

---

## 📄 License & Credits

Created by **Yash Agrawall** ([@just-yash](https://github.com/just-yash)).  
Built with React, Babel Standalone, Marked.js, KaTeX, and Highlight.js.
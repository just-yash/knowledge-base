# 🧠 Yash's Zettelkasten & Interactive Knowledge Graph

A high-performance, personal knowledge management (PKM) platform and digital garden published as a static web application. Built to render an entire Obsidian vault with zero runtime bundle overhead, featuring an interactive 2D Canvas force-directed knowledge graph, an embedded client-side **Obsidian Dataview** query processor, KaTeX mathematical typesetting, and WikiLink network resolution.

🌐 **Live Vault:** [just-yash.github.io/knowledge-base](https://just-yash.github.io/knowledge-base/)

---

## 🌟 Overview & Architecture Philosophy

This project serves as the public web interface for an active **Zettelkasten** and **Maps of Content (MOC)** note system written in native Obsidian Markdown. 

Unlike traditional static site generators (Next.js, Astro, Gatsby) that require heavy build steps and JavaScript bundlers, this platform operates on a **zero-runtime-dependency pipeline**:
- **Single Build Step**: A lightweight Node.js script (`build-vault.js`) parses the Markdown vault directory into a unified, structured JSON data file (`vault-data.js`).
- **No Bundler**: React 18 and Babel Standalone run client-side in the browser (`<script type="text/babel">`), transforming JSX on the fly.
- **Zero Heavy Runtime NPM Modules**: Lucide icons are inlined as lightweight SVGs, KaTeX is loaded via CDN, and graph rendering runs on a custom HTML5 Canvas 2D physics engine.

---

## ✨ Core Features & Technical Deep Dive

### 🕸️ 1. Custom Force-Directed Knowledge Graph Engine (`vault-graph.jsx`)
- **Verlet Physics Simulation**: Hand-rolled 2D physics engine simulating electrostatic node repulsion, spring link distance/tension, center attraction, and velocity damping.
- **Dynamic Theme Synchronization**: Graph node colors, edge connectors, canvas background (`var(--bg-graph)`), and modal overlays dynamically adjust to active Light & Dark themes.
- **Glassmorphic Settings Panel**:
  - **Display Controls**: Directional link arrows toggle, text label fade threshold, node scaling (0.5x – 3x), link line thickness (0.5x – 3x).
  - **Forces Tuning**: Center force strength, repel force constant, link tension, link distance.
  - **Animation Trigger**: One-click graph physics re-simulation button.
  - **Non-Cropping UX**: Pinned sticky header with max-height bounds (`maxHeight: 'calc(100% - 24px)'`) and smooth scrolling to prevent top/bottom cropping on all viewports.
- **Dual Rendering Modes**:
  - *Mini Graph*: Pinned in the left sidebar showing neighborhood connections of the currently open note.
  - *Full Modal*: Full-screen interactive canvas view with node hover tooltips, drag-to-pan, pinch-to-zoom, and click-to-navigate.

---

### 📊 2. Built-in Obsidian Dataview Query Processor (`vault-editor.jsx`)
Client-side query evaluator supporting native Obsidian Dataview codeblocks (```dataview):
- **Query Types**: `LIST` and `TABLE [field AS "Header"]`.
- **Filtering Logic**: 
  - `FROM [[Topic]]` / `FROM #tag` matching notes via backlinks, forward links, tags, and content tags.
  - `WHERE contains(file.folder, "Folder")` path and folder scoping.
  - `-([[ExcludeTopic]] or #tag)` negation filtering.
- **Sorting**: `SORT file.mtime DESC / ASC` or title sorting.
- **Automatic Tag Index Generation**: Opening any note in `08 - Tags/` (e.g. `AI.md`, `ML.md`, `College.md`, `food.md`) automatically generates a dynamic Dataview list indexing all notes matching that tag across the vault.
- **Native Obsidian UI Output**: Dataview results render as clean bulleted lists and tables of interactive, clickable WikiLink anchors (`[[Note Title]]`).

---

### 📝 3. Markdown Engine & Reading Interface (`vault-editor.jsx`)
- **Multi-Tab Workspace**: Multi-tab document viewing with tab switching, closing, active indicator, and URL hash routing (`#note-slug`).
- **Header Metadata Suite**:
  - Breadcrumb navigation path.
  - Last modified date stamp.
  - Estimated reading time calculator (`WPM = 200`).
  - Total word count counter.
  - Interactive, clickable Tag chips (`#tag`).
- **WikiLink Resolution**: Parses `[[Note Title]]`, `[[Note Title|Alias]]`, `[[Note#Heading]]`, and block references (`[[Note#^blockId]]`). Resolves filename slug collisions across subfolders.
- **Callouts & Alerts**: GitHub/Obsidian style callout blocks (`[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!INFO]`, `[!IMPORTANT]`, `[!CAUTION]`, `[!ABSTRACT]`, `[!QUOTE]`) with custom left borders and background hues.
- **KaTeX Mathematical Typesetting**: Supports inline math (`$...$`, `\(...\)`) and display math (`$$...$$`, `\[...\]`).
- **Task Lists**: Interactive GFM checkbox items (`[ ]` / `[x]`).
- **Asset Embeds**: Automated resolution of image attachments (`![[image.png]]`), PDF document viewframes, and Excalidraw drawing placeholders.

---

### 🔍 4. Command Palette & Navigation (`vault-sidebar.jsx`, `vault-app.jsx`)
- **File Explorer Sidebar**: Recursive folder tree navigation with custom icons for top-level folders (*Home, MOCs, Raw Notes, Processed Notes, Research, Tags, Templates*).
- **Smart Auto-Reveal**: Automatically expands nested folder branches and scrolls the sidebar into view to match the active open note.
- **Quick Search Command Palette**: Triggered via `Cmd+K` / `Ctrl+K` or search icon. Pre-filters notes by title, folder path, or tags (`#tag`).
- **Keyboard Navigation**: Native hotkeys (`Escape`, `ArrowUp`, `ArrowDown`, `Enter`).

---

### 📑 5. Document Context & Inspector Panel (`vault-rightpanel.jsx`)
- **Document Outline**: Live table of contents generated from document headings (`h1`–`h6`) with smooth scroll-spy navigation.
- **Two-Way Link Graph Inspector**:
  - *Backlinks*: Notes linking to the current document.
  - *Outgoing Links*: Links originating from the current document.
- **Smart Tag Explorer**: Interactive tag chips with one-click navigation to Tag index notes or search filter.
- **Related Notes Discovery**: Recommendation algorithm suggesting contextually relevant notes based on shared tag co-occurrence.

---

### 🎨 6. Design System & Theme Engine (`index.html`)
- **Tailored Palettes**: Dark (default slate/charcoal) and Light (creme/paper) color themes defined using HSL CSS custom properties.
- **State Persistence**: Theme preference saved in `localStorage`.
- **Responsive Layout**: Mobile-optimized drawers, slide-in overlay menus, and touch gestures for graph canvas pan & zoom.

---

## 📁 Vault Directory Structure

```
knowledge-base/
├── notes/                  # Source of truth (Obsidian Vault Markdown files)
│   ├── 00 - Home/          # Index & homepage entry points
│   ├── 01 - MOCs/          # Maps of Content (Curated topic entry hubs)
│   ├── 02 - Raw Notes/     # Literature, books, podcasts, videos, class notes
│   ├── 03 - Notes/         # Processed evergreen Zettelkasten notes
│   ├── 04 - Research/      # Academic papers & deep-dive research topics
│   ├── 05 - Creativity/    # Creative ideas, writing, & projects
│   ├── 06 - Archive/       # Completed or archived material
│   ├── 07 - Annexure/      # Images, attachments, Excalidraw, HTML exports
│   ├── 08 - Tags/          # Tag index notes
│   └── 09 - Templates/     # Note templates
│
├── build-vault.js          # Node.js build engine: scans notes/ → generates vault-data.js
├── watch-vault.js          # File-watcher script for live rebuilding during writing
├── deploy.bat              # One-click Windows deployment script
├── vault-data.js           # Generated data graph: VAULT_NOTES, VAULT_FOLDERS, GRAPH_NODES, GRAPH_EDGES
│
├── index.html              # Core HTML shell & theme CSS design system
├── vault-app.jsx           # Master React layout, state management, router, hotkeys
├── vault-sidebar.jsx       # Explorer file tree, auto-reveal, mini graph
├── vault-editor.jsx        # Tab manager, Dataview processor, Markdown parser
├── vault-rightpanel.jsx    # Outline, backlinks, outgoing links, related notes
├── vault-graph.jsx         # 2D Canvas force-directed graph & floating settings panel
├── vault-icons.jsx         # Lucide SVG icon library & TagBadge component
└── tweaks-panel.jsx        # Customization & display settings controls
```

---

## 🛠️ Local Development & Workflow

### Prerequisites
- **Node.js**: v16 or higher installed on your system.

### 1. Build the Vault Data
To build `vault-data.js` from the `notes/` directory:
```bash
node build-vault.js
```

### 2. Live Watching While Writing
If you are writing notes inside Obsidian and want `vault-data.js` to automatically rebuild on every file save:
```bash
node watch-vault.js
```

### 3. Local Web Server
Serve the project directory using any static web server:
```bash
# Using npx serve:
npx serve .

# Or using Python:
python -m http.server 4321
```
Then open `http://localhost:3000` (or `http://localhost:4321`) in your browser.

---

## 🚀 Deployment to GitHub Pages

The repository uses the `obsidian` branch for GitHub Pages hosting.

### One-Click Deploy (Windows)
Run the included Windows batch script:
```cmd
deploy.bat
```

### Manual Deploy (Command Line)
```bash
# 1. Rebuild vault data
node build-vault.js

# 2. Stage and commit
git add vault-data.js index.html vault-editor.jsx vault-graph.jsx README.md
git commit -m "chore: rebuild vault and update documentation"

# 3. Pull remote & push
git pull --rebase origin obsidian
git push origin obsidian
```
GitHub Pages will automatically build and publish the live site within 1–2 minutes.

---

## 🔒 Privacy & Excluded Folders

Folders listed in the `SKIP_DIRS` array inside `build-vault.js` are completely excluded from the parsing pipeline. Content inside these folders is never written to `vault-data.js` and remains private on your local filesystem:
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

- **Author**: Yash Agrawall ([@just-yash](https://github.com/just-yash))
- **Icons**: [Lucide Icons](https://lucide.dev/) (Inlined SVG)
- **Math Engine**: [KaTeX](https://katex.org/)
- **Syntax Highlighting**: [Highlight.js](https://highlightjs.org/)
- **Markdown Engine**: [Marked.js](https://marked.js.org/)

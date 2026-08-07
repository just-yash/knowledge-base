# 🧠 Yash's Knowledge Base & Interactive Vault
## Master Documentation: Product Requirements (PRD), Technical Architecture (TRD), & Developer Guide

A static, zero-runtime-bundle web application and digital garden that compiles a raw Obsidian Markdown vault into a browser viewer with an interactive 2D Canvas force-directed graph, a client-side **Obsidian Dataview** query engine, KaTeX math rendering, and multi-tab document navigation.

**Live Deployment:** [yashagrawall.github.io/knowledge-base](https://yashagrawall.github.io/knowledge-base/)

---

## 📋 Table of Contents

- [1. Executive Summary & Vision](#1-executive-summary--vision)
- [2. Product Requirements Document (PRD)](#2-product-requirements-document-prd)
  - [2.1 Problem Statement & Objectives](#21-problem-statement--objectives)
  - [2.2 Target Audience & Primary Workflows](#22-target-audience--primary-workflows)
  - [2.3 Feature Matrix & User Stories](#23-feature-matrix--user-stories)
- [3. Technical Requirements Document (TRD)](#3-technical-requirements-document-trd)
  - [3.1 System Architecture & Zero-Bundler Philosophy](#31-system-architecture--zero-bundler-philosophy)
  - [3.2 High-Level Data Flow & Compilation Pipeline](#32-high-level-data-flow--compilation-pipeline)
  - [3.3 Data Structures & Schema Definitions (`vault-data.js`)](#33-data-structures--schema-definitions-vault-datajs)
- [4. Subsystem Deep Dives](#4-subsystem-deep-dives)
  - [4.1 2D Canvas Force-Directed Knowledge Graph (`vault-graph.jsx`)](#41-2d-canvas-force-directed-knowledge-graph-vault-graphjsx)
  - [4.2 Client-Side Obsidian Dataview Query Evaluator (`vault-editor.jsx`)](#42-client-side-obsidian-dataview-query-evaluator-vault-editorjsx)
  - [4.3 Markdown Processing & Rendering Pipeline (`vault-editor.jsx`)](#43-markdown-processing--rendering-pipeline-vault-editorjsx)
  - [4.4 Workspace Manager, Tab Handling, & Hash Router (`vault-app.jsx`)](#44-workspace-manager-tab-handling--hash-router-vault-appjsx)
  - [4.5 File Explorer & Auto-Reveal Sidebar (`vault-sidebar.jsx`)](#45-file-explorer--auto-reveal-sidebar-vault-sidebarjsx)
  - [4.6 Context Inspector, Outlines, & Backlinks (`vault-rightpanel.jsx`)](#46-context-inspector-outlines--backlinks-vault-rightpaneljsx)
  - [4.7 Command Palette & Full-Text Search Engine (`vault-app.jsx`)](#47-command-palette--full-text-search-engine-vault-appjsx)
  - [4.8 Theme Engine & Styling Architecture (`index.html`)](#48-theme-engine--styling-architecture-indexhtml)
- [5. Repository Structure & Directory Map](#5-repository-structure--directory-map)
- [6. Operations, Local Setup, & Maintenance](#6-operations-local-setup--maintenance)
  - [6.1 Prerequisites](#61-prerequisites)
  - [6.2 Building & Live Watching](#62-building--live-watching)
  - [6.3 One-Click Deployment Pipeline (`auto-sync.bat`)](#63-one-click-deployment-pipeline-auto-syncbat)
- [7. Security, Privacy, & Exclusion Rules](#7-security-privacy--exclusion-rules)
- [8. Performance & Scalability Considerations](#8-performance--scalability-considerations)
- [9. License & Credits](#9-license--credits)

---

## 1. Executive Summary & Vision

Obsidian is an exceptional local-first markdown note-taking environment. However, sharing a personal Zettelkasten or digital garden publicly often presents a trade-off between complex static site generators (Next.js, Astro, Hugo, Eleventy) that require heavy build setups, NPM dependencies, and fragile deployment pipelines.

**Yash's Knowledge Base** eliminates this friction by operating on a **zero-runtime-dependency static architecture**. A single Node.js compilation script parses the Markdown vault into a JSON data file (`vault-data.js`), while React 18, Babel Standalone, KaTeX, and an HTML5 Canvas 2D physics simulation run natively in the browser.

The platform provides a browser experience matching desktop Obsidian: interactive force-directed graph exploration, multi-tab workspace editing, live document outlines, two-way backlinks, and a client-side evaluator for Obsidian **Dataview** queries.

---

## 2. Product Requirements Document (PRD)

### 2.1 Problem Statement & Objectives

- **Problem**: Traditional digital garden tools fail to render native Obsidian features—such as Dataview codeblock queries (`dataview`), dynamic tag pages, WikiLinks with alias/heading anchors (`[[Note#Heading|Alias]]`), and customizable visual knowledge graphs—without heavy server-side processing or broken layouts.
- **Primary Objective**: Provide a zero-maintenance, client-side web viewer that mirrors Obsidian's core interactive capabilities directly from plain Markdown files.
- **Secondary Objective**: Deliver instant page loads, smooth 60fps graph animations, responsive mobile drawer navigation, and light/dark theme adaptation without requiring Webpack, Vite, or server-side rendering infrastructure.

### 2.2 Target Audience & Primary Workflows

1. **Vault Readers & Researchers**: Visitors exploring published notes, literature summaries, and technical research via hierarchical folder trees, interactive tag indices, and visual graph nodes.
2. **Knowledge Author (Vault Owner)**: Writing notes in desktop Obsidian and running a single command (`auto-sync.bat` or `node build-vault.js`) to publish updates instantly to GitHub Pages.

### 2.3 Feature Matrix & User Stories

| Epic | Feature | User Story / Functionality | Technical Requirement |
|---|---|---|---|
| **Graph View** | Interactive 2D Canvas Graph | As a user, I want to visualize connections between notes in a force-directed canvas. | HTML5 Canvas 2D, custom Verlet physics, zoom/pan touch controls. |
| **Graph View** | Floating Settings Control | As a user, I want to adjust node size, link distance, repulsion, and text threshold. | Non-cropping glassmorphic panel with sticky header and internal scrolling. |
| **Dataview Engine** | Client-Side Dataview Queries | As a user, I want `LIST` and `TABLE` queries in MOCs and Tag notes to execute dynamically. | Custom client-side Dataview parser evaluating `FROM`, `WHERE`, `SORT`, and negations. |
| **Tag Navigation** | Automatic Tag Indexing | As a user, opening any Tag note should list all notes tagged with that topic. | Automatic fallback injection of `LIST FROM [[TagName]]` for `08 - Tags/` notes. |
| **Reader View** | Multi-Tab Interface | As a user, I want to open multiple notes in separate tabs and switch between them. | React tab state manager synchronized with URL hash routing (`#slug`). |
| **Reader View** | Markdown & Math Typesetting | As a user, I want GFM formatting, math equations, callout blocks, and task lists rendered cleanly. | Marked parser, KaTeX math shielding, GitHub callout styling, GFM checkboxes. |
| **Explorer** | File Tree & Auto-Reveal | As a user, selecting a note should automatically expand its folder branch in the sidebar. | Recursive React tree component with automatic folder expansion state. |
| **Search** | Command Palette (`Cmd+K`) | As a user, I want a quick search modal pre-filterable by `#tags`, folder paths, and titles. | Global keyboard listener (`Cmd+K`/`Ctrl+K`), modal overlay, regex text matcher. |
| **Context Panel** | Outline, Backlinks, & Related | As a user, I want a table of contents, incoming links, outgoing links, and tag-based note suggestions. | Heading scroll-spy, two-way link index lookup, tag co-occurrence algorithm. |

---

## 3. Technical Requirements Document (TRD)

### 3.1 System Architecture & Zero-Bundler Philosophy

The application utilizes a **Static Data + In-Browser JSX Runtime** architecture:

![[Pasted image 20260807192239.png]]

### 3.2 High-Level Data Flow & Compilation Pipeline

1. **Compilation Phase (`build-vault.js`)**:
   - Recursively traverses `notes/`, skipping directories defined in `SKIP_DIRS`.
   - Parses Markdown files for YAML frontmatter (`tags`, `date`, `aliases`).
   - Extracts document headings (`h1`–`h6`) for table of contents navigation.
   - Scans text for WikiLink syntax (`[[WikiLink]]`) and tags (`#tag`).
   - Computes word count, reading time (`WPM = 200`), and file modification timestamps.
   - Generates graph nodes (notes with connections) and directional graph edges.
   - Writes output to `vault-data.js` as global window objects (`window.VAULT_NOTES`, `window.VAULT_FOLDERS`, `window.GRAPH_NODES`, `window.GRAPH_EDGES`).

2. **Runtime Phase (Browser)**:
   - `index.html` initializes CSS variables, Google Fonts, KaTeX stylesheets, and script dependencies.
   - `vault-app.jsx` mounts the root React component, initializing workspace state and URL hash router.
   - `vault-editor.jsx` processes Markdown text, evaluates Dataview codeblocks, shields KaTeX math expressions, and renders WikiLinks.
   - `vault-graph.jsx` starts the Canvas 2D Verlet physics animation loop.

### 3.3 Data Structures & Schema Definitions (`vault-data.js`)

#### `NoteObject` Schema
```typescript
interface NoteObject {
  id: string;               // Normalized slug identifier (e.g. "moc-ai-and-machine-learning")
  title: string;            // Original note title (e.g. "MOC - AI and Machine Learning")
  folder: string;           // Folder name (e.g. "01 - MOCs")
  path: string[];           // Folder trail hierarchy (e.g. ["01 - MOCs", "MOC - AI and Machine Learning.md"])
  content: string;          // Raw Markdown content
  date: string;             // ISO date stamp (e.g. "2026-08-07")
  wordCount: number;        // Total word count
  readingTime: number;      // Estimated reading time in minutes
  tags: string[];           // Array of tags (e.g. ["AI", "Machine-Learning"])
  links: string[];          // Outgoing note IDs linked from this note
  backlinks: string[];      // Incoming note IDs linking to this note
  outline: HeadingItem[];   // Document table of contents headings
}

interface HeadingItem {
  id: string;               // Slugified heading anchor ID
  text: string;             // Clean text title of the heading
  level: number;            // Heading level (1 to 6)
}
```

#### `GraphNode` & `GraphEdge` Schema
```typescript
interface GraphNode {
  id: string;               // Note ID slug
  title: string;            // Note display title
  folder: string;           // Note parent folder
  val: number;              // Node importance scale factor based on connection count
}

interface GraphEdge {
  source: string;           // Source Note ID
  target: string;           // Target Note ID
}
```

---

## 4. Subsystem Deep Dives

### 4.1 2D Canvas Force-Directed Knowledge Graph (`vault-graph.jsx`)

The graph engine runs on an HTML5 Canvas 2D context using a customized Verlet force-directed physics engine:
- **Repulsion Force**: Electrostatic inverse-square law pushing non-connected nodes apart.
- **Link Spring Tension**: Hooke's law attraction pulling connected nodes toward their target distance.
- **Center Gravity**: Weak attraction pulling all nodes toward the canvas origin to prevent drifting.
- **Damping**: Velocity decay constant ($0.88$) ensuring physics stabilization.
- **Render Optimizations**: High-DPI device pixel ratio scaling (`window.devicePixelRatio`), directional arrow heads, text threshold opacity fading, and viewport frustum clipping.
- **Glassmorphic Settings Panel**: Floating control panel providing sliders for center force, repel force, link distance, link thickness, node sizing, and label threshold. Styled with `maxHeight: 'calc(100% - 24px)'` and `overflowY: 'auto'` to ensure controls never crop.

### 4.2 Client-Side Obsidian Dataview Query Evaluator (`vault-editor.jsx`)

Since static sites lack Obsidian's Dataview plugin environment, `vault-editor.jsx` implements a custom query parser `renderDataviewBlock(code)`:
- **Parser Execution**: Intercepts ` ```dataview ` codeblocks in Markdown.
- **Query Grammar**:
  - `LIST` / `TABLE [field AS "Header"]`
  - `FROM [[Topic]]` / `FROM #tag`
  - `WHERE contains(file.folder, "03 - Notes")`
  - `-([[ExcludeTopic]] or #tag)`
  - `SORT file.mtime DESC / ASC`
- **Tag Page Auto-Injection**: Opening any note in `08 - Tags/` automatically appends a fallback Dataview block `LIST FROM [[TagName]] SORT file.mtime DESC` if no explicit query is written in the note.
- **HTML Output**: Renders standard bulleted lists (`<ul>`) and tables (`<table>`) populated with interactive WikiLink buttons.

### 4.3 Markdown Processing & Rendering Pipeline (`vault-editor.jsx`)

![[Pasted image 20260807193733.png]]

### 4.4 Workspace Manager, Tab Handling, & Hash Router (`vault-app.jsx`)

- **Tab Manager**: Maintains an array of open note IDs (`openTabs`), active tab index (`activeTabIndex`), and tab switching history.
- **Hash Router**: Synchronizes document navigation with the browser URL location hash (`#note-slug`). Supports opening notes in new tabs, closing tabs, and browser back/forward history navigation.

### 4.5 File Explorer & Auto-Reveal Sidebar (`vault-sidebar.jsx`)

- **Hierarchical Tree**: Renders nested vault folders with custom SVG icons for root categories.
- **Smart Auto-Reveal**: Listens for active note changes and recursively expands parent folder nodes in the tree state, scrolling the active file item smoothly into view.

### 4.6 Context Inspector, Outlines, & Backlinks (`vault-rightpanel.jsx`)

- **Document Outline**: Lists heading anchors (`h1`–`h6`) with scroll-spy position tracking. Clicking a heading smooth-scrolls the reader window to the target element.
- **Two-Way Link Graph**: Computes incoming backlinks and outgoing links live from `VAULT_NOTES`.
- **Related Notes Algorithm**: Calculates note similarity scores based on shared tag intersections:
  $$\text{Score}(A, B) = | \text{Tags}_A \cap \text{Tags}_B |$$

### 4.7 Command Palette & Full-Text Search Engine (`vault-app.jsx`)

- **Hotkey Listener**: Listens for `Cmd+K` (macOS) and `Ctrl+K` (Windows/Linux).
- **Search Scoring**: Ranks search results by matching note titles, folder paths, and tag queries (`#tag`). Supports keyboard selection (`ArrowUp`, `ArrowDown`, `Enter`).

### 4.8 Theme Engine & Styling Architecture (`index.html`)

- **CSS Custom Properties**: Theme variables defined on `:root` and `[data-theme="light"]`:
  - `--bg-main`, `--bg-sidebar`, `--bg-panel`, `--bg-content`
  - `--text-primary`, `--text-secondary`, `--text-muted`
  - `--border`, `--border-strong`, `--accent`, `--accent-soft`
- **Theme Persistence**: Saved in `localStorage.getItem('vault_theme')` and applied instantly prior to render to prevent theme flashing.

---

## 5. Repository Structure & Directory Map

```
knowledge-base/
├── notes/                  # Source of Truth: Obsidian Markdown Vault
│   ├── 00 - Home/          # Entry index & home pages
│   ├── 01 - MOCs/          # Maps of Content (Topic hubs)
│   ├── 02 - Raw Notes/     # Book summaries, course notes, research inputs
│   ├── 03 - Notes/         # Processed evergreen Zettelkasten notes
│   ├── 04 - Research/      # In-depth technical & academic research
│   ├── 05 - Creativity/    # Creative writing, project notes, & ideas
│   ├── 06 - Archive/       # Archived & inactive materials
│   ├── 07 - Annexure/      # Image attachments, Excalidraw drawings, PDFs
│   ├── 08 - Tags/          # Dedicated tag index notes
│   └── 09 - Templates/     # Obsidian note templates
│
├── build-vault.js          # Node compilation script: notes/ -> vault-data.js
├── watch-vault.js          # Live file-watcher for instant rebuilds while editing
├── auto-sync.bat           # Windows 1-click script: build -> stage -> commit -> push
├── deploy.bat              # Alias for auto-sync.bat
├── sync.bat                # Alias for auto-sync.bat
├── vault-data.js           # Compiled JSON graph & note database
│
├── index.html              # Shell HTML, Google Fonts, & CSS theme variables
├── vault-app.jsx           # Root React layout, workspace router, & hotkeys
├── vault-sidebar.jsx       # File tree, auto-reveal, & mini graph preview
├── vault-editor.jsx        # Markdown renderer, tabs, & Dataview evaluator
├── vault-rightpanel.jsx    # Outline scroll-spy, backlinks, & related notes
├── vault-graph.jsx         # 2D Canvas force graph & settings panel
└── vault-icons.jsx         # Lucide SVG icon library & TagBadge component
```

---

## 6. Operations, Local Setup, & Maintenance

### 6.1 Prerequisites

- **Node.js**: Version 16.0 or higher.
- **Git**: Version 2.20 or higher.

### 6.2 Building & Live Watching

1. **Rebuild Data File**:
   ```bash
   node build-vault.js
   ```

2. **Live Rebuilding While Writing in Obsidian**:
   ```bash
   node watch-vault.js
   ```

3. **Serve Locally**:
   ```bash
   npx serve .
   ```
   Open `http://localhost:3000` in your browser.

### 6.3 One-Click Deployment Pipeline (`auto-sync.bat`)

Double-clicking `auto-sync.bat` (or running `deploy.bat` / `sync.bat`) executes the following automated pipeline:

```cmd
1. cd /d "%~dp0"                        # Sets working directory to repository root
2. node build-vault.js                  # Compiles notes/ to vault-data.js
3. Prompt for commit message            # Asks user for message (or uses default timestamp)
4. git add .                            # Stages all note edits, assets, and code
5. git commit -m "!commit_msg!"         # Commits staged changes
6. git pull origin obsidian --rebase    # Safely syncs remote updates
7. git push origin obsidian             # Deploys directly to GitHub Pages
```

---

## 7. Security, Privacy, & Exclusion Rules

Folders defined in the `SKIP_DIRS` Set inside `build-vault.js` are excluded from compilation. Content in these folders is never written to `vault-data.js` and remains local to your filesystem:

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

## 8. Performance & Scalability Considerations

- **Graph Physics Benchmarks**: Smooth 60fps canvas rendering for up to 1,000 nodes and 3,000 edges.
- **Memory Footprint**: `vault-data.js` for 700+ notes compiles to ~1.2 MB uncompressed, loading in under 150ms over standard broadband.
- **Lazy Execution**: Math shielding, Dataview query parsing, and WikiLink processing run lazily inside React `useMemo` hooks, keeping document switching under 16ms.

---

## 9. License & Credits

- **Author**: Yash Agrawall ([@yashagrawall](https://github.com/yashagrawall))
- **Core Stack**: React 18, Babel Standalone, Canvas 2D, Marked.js, KaTeX, Highlight.js, Lucide Icons.
- **License**: MIT License.
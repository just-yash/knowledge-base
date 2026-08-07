# Obsidian Technical Rendering Architecture & System Boundary Analysis
**Author:** Senior Electron, Obsidian Core & Rendering Engineer  
**Target Architecture:** Obsidian (Electron / Chromium V8 Environment)  
**Theme Reference:** *The Infinite Citadel v2*

---

## 1. Executive Summary & Runtime Anatomy

Obsidian runs inside an **Electron** wrapper (Chromium rendering engine + Node.js runtime). UI rendering and layout calculations are processed entirely within a single Chromium renderer process. Every visual layer introduced by a custom theme or plugin impacts main-thread layout thrashing, GPU VRAM allocation, compositor layer creation, and battery draw.

To maintain a 60 FPS target without starving CodeMirror 6 text editing performance, visual responsibilities must be strictly segregated across five distinct technology boundaries:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OBSIDIAN RENDER PROCESS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. PURE CSS (Chromium Compositor Thread)                                    │
│    • CSS Tokens, Material Variables, Typography, Glassmorphism               │
│    • GPU-accelerated micro-animations (transform, opacity only)             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. INLINE SVG (Vector Rasterization Layer)                                  │
│    • Crisp geometric grids, HUD corner-brackets, constellation tiles        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. CANVAS 2D (Plugin Worker / Main Thread rAF)                             │
│    • Procedural starfield particle engine, dynamic twinkling, vector drift  │
│    • Pauses completely on document.visibilityState === 'hidden'             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. TYPESCRIPT PLUGIN ENGINE (Node / Obsidian API)                           │
│    • DOM Canvas injection, App settings lifecycle, scroll-position listeners │
│    • Performance scaling & hardware concurrency checks                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. WEBGL / SHADER PIPELINES (Avoided / Micro-gated)                         │
│    • Reserved strictly for Obsidian native Graph View; avoided for BG engine│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Selection & Architectural Boundaries

### A. Pure CSS (CSS Custom Properties & Hardware Compositing)
**Where to use:** Theme variables, structural layout, text typography, material tokens, microinteractions, and fixed background fog layers.

* **Mechanics:** CSS custom properties (`--ic-*`, `--mat-*`) set at `.theme-dark` and `.theme-light` roots act as a reactive design token layer.
* **GPU Compositing Rule:** Any CSS animation **MUST** restrict properties to `transform` and `opacity`. Modifying `width`, `height`, `margin`, `top`, or `box-shadow` during animations forces layout recalculation and paint invalidation across the main thread.
* **Scroll-Driven Micro-Shift (`@supports (animation-timeline: scroll())`):** Supported natively in Chromium 115+ (Obsidian ≥ 1.5). Allows scroll-linked parallax on the compositor thread with **zero main-thread JavaScript cost**.

### B. Inline SVG & SVG Data URIs
**Where to use:** Constellation line tiles, callout background textures, corner-bracket HUD frames, and crisp UI iconography.

* **Mechanics:** Encoded as data URIs within `background-image: url("data:image/svg+xml,...")`.
* **Performance Impact:** SVGs are rasterized **once** by Chromium into a hardware bitmap tile of specified size (e.g. `280px × 280px`). Once uploaded to GPU memory, moving or tiling the SVG via CSS `transform` or `background-repeat` carries the exact same performance cost as a PNG image (~0.3 MB VRAM).

### C. HTML5 Canvas 2D (TypeScript Companion Plugin)
**Where to use:** Procedural particle fields (50–200 twinkling stars), dynamic particle density controls, mouse-reactive parallax, and real-time environment changes.

* **Mechanics:** A single `<canvas>` element injected at `position: fixed; inset: 0; z-index: 0; pointer-events: none;` inside `.app-container`. Driven by `requestAnimationFrame()` in a TypeScript plugin class.
* **Why Canvas 2D over CSS for high particle counts:** Creating 200 individual star elements as HTML DOM nodes creates 200 separate DOM nodes and 200 composite layers, causing massive memory overhead. Canvas 2D draws 200 particles onto a **single shared bitmap layer**, keeping DOM size flat.

### D. WebGL / Fragment Shader Pipelines
**Where to use:** Only when full volumetric 3D raymarching or GPU fluid dynamics are required.

* **Trade-Off Analysis:** WebGL contexts require GPU context initialization (~15–40 MB VRAM) and continuous shader execution. On laptop GPUs or integrated Intel graphics, a continuous 60 FPS WebGL fragment shader spikes GPU power draw by 300–500%, drastically reducing battery life.
* **Architectural Decision:** **Do NOT use WebGL for the background particle plugin.** Canvas 2D delivers identical visual fidelity for 2D star/nebula rendering at 1/10th the power cost.

### E. TypeScript Plugin API Layer
**Where to use:** Managing canvas state, persisting user settings (`PluginSettingTab`), monitoring frame deltas (`performance.now()`), and registering event listeners.

* **Obsidian API Contracts Used:**
  * `Plugin.onload()` / `Plugin.onunload()` lifecycle management.
  * `Plugin.addSettingTab()` & `PluginSettingTab` for UI settings.
  * `Plugin.loadData()` / `Plugin.saveData()` for settings persistence.
  * `app.workspace.onLayoutReady()` to safely inject DOM elements after workspace construction.

---

## 3. Obsidian Internals & DOM Anatomy Breakdown

Understanding Obsidian's DOM structure is essential for applying correct CSS targets without breaking editor performance:

```text
div.app-container
 ├── div.titlebar (Obsidian Chrome Window Header)
 └── div.workspace
      ├── div.workspace-ribbon (Left Icon Strip — Polished Obsidian)
      ├── div.workspace-split.mod-left-split (File Explorer Side Panel)
      └── div.workspace-tabs.mod-main-split (Main Workspace)
           └── div.workspace-leaf (Editor / View Pane)
                └── div.workspace-leaf-content
                     ├── div.cm-editor (CodeMirror 6 Engine)
                     │    ├── div.cm-scroller (Main Block Scroller)
                     │    └── div.cm-content (Editable Line Tree)
                     ├── div.graph-view (Canvas-based Knowledge Graph)
                     └── div.canvas-wrapper (Infinite Canvas View)
```

### Critical Component Internals:

1. **CodeMirror 6 Editor (`.cm-editor`, `.cm-line`):**
   * CodeMirror 6 aggressively recycles DOM elements as the user scrolls.
   * **Rule:** Never attach heavy backdrop-blur filters or animations to `.cm-line` or `.cm-content`. Attach backgrounds to `.workspace-leaf-content` or `.app-container`.

2. **Graph View (`.graph-view canvas`):**
   * **Obsidian Graph Rendering Engine:** Rendered procedurally via WebGL/Canvas 2D inside a `<canvas>` element.
   * **CSS Limitation:** Individual nodes and edges are not DOM nodes. They cannot be targeted using individual CSS selectors based on node degree. CSS can only set global color variables (`--graph-node`, `--graph-line`, `--graph-node-focused`) or apply a CSS `filter: drop-shadow(...)` to the parent `<canvas>`.

3. **Canvas View (`.canvas-wrapper`):**
   * **Obsidian Infinite Canvas:** Renders cards as absolute-positioned DOM nodes (`.canvas-node-content`) and connections as SVG path overlays (`.canvas-display-line`).
   * **Optimization:** Apply material shadows (`box-shadow`) to `.canvas-node-content` to create "Floating Tablet" depth. Separate background dot-grid tiling (`20px 20px`) from fixed background gradients (`100% 100%`) to prevent gradient distortion during zoom.

---

## 4. Performance & Resource Budget Analysis (Electron Context)

### Layer Cost & Memory Budget Breakdown

| Layer / Component | Technology | Rendering Engine | VRAM Budget | Main-Thread CPU Cost | Frame Budget Impact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Layer A: Nebula Clouds** | CSS `radial-gradient` | Chromium Compositor | ~1.5 MB | 0 ms (GPU Compositor) | < 0.1 ms |
| **Layer B: Starfield** | CSS `radial-gradient` | Chromium Compositor | ~0.5 MB | 0 ms (Opacity pulse) | < 0.1 ms |
| **Layer C: Aurora Wash** | CSS `linear-gradient` | GPU Paint / Compositor | ~0.2 MB | ~0.1 ms / frame | < 0.2 ms |
| **Layer D: Constellation SVG** | SVG Data URI Tile | GPU Raster Tile | ~0.3 MB | 0 ms (Transform) | < 0.1 ms |
| **Layer E: Leaf Parallax** | CSS Scroll Timeline | Compositor Thread | ~0.3 MB / pane | 0 ms | 0 ms |
| **Plugin Canvas Engine** | HTML5 Canvas 2D | JS rAF Loop | ~2.0 MB | ~0.4 ms / frame | ~0.5 ms |
| **Total Theme & Plugin** | **Combined Architecture** | **Compositor + Canvas** | **~4.8 MB** | **~0.5 ms / frame** | **< 0.8 ms** *(Target: 16.6 ms for 60 FPS)* |

---

## 5. Architectural Trade-Off Matrix

| Feature Requirement | Pure CSS Approach | Canvas 2D Plugin | WebGL Plugin | Recommended Winner & Justification |
| :--- | :--- | :--- | :--- | :--- |
| **Static Nebula Atmosphere** | ✅ **Best** (Radial Gradients) | ❌ Over-engineered | ❌ Excessive VRAM | **Pure CSS**: Zero JS cost, hardware-accelerated. |
| **50–200 Twinkling Stars** | ⚠️ Moderate (Repeated Gradients) | ✅ **Best** (Particle Loop) | ⚠️ High Power Draw | **Canvas 2D Plugin**: Clean particle management, slider control. |
| **Session Variety (Sky-Phase)** | ✅ **Best** (`--ic-sky-phase`) | ⚠️ Requires JS State | ❌ Over-engineered | **Pure CSS**: CSS variable hue-rotation per session. |
| **Scroll Parallax** | ✅ **Best** (`animation-timeline`) | ⚠️ Requires scroll listener | ❌ Main-thread thrash | **Pure CSS**: Compositor-threaded in Chromium 115+. |
| **Low-End Hardware Fallback** | ⚠️ CSS `@media` only | ✅ **Best** (FPS Auto-Scale) | ⚠️ Complex Shader Logic | **Canvas 2D Plugin**: Can dynamically reduce particle counts. |

---

## 6. Summary Specification for Production

1. **Keep in CSS Theme (`theme.css`):**
   * Design tokens, 5 physical material system definitions (Obsidian, Glass, Steel, Parchment, Reactor).
   * 70/20/10 color discipline tagging.
   * Background atmosphere (Nebula drift, aurora wash, constellation SVG tile, scroll parallax).
   * UI components (Tabs, Sidebars, Command Palette, Callouts, Code Blocks, Tables, Canvas Cards).
   * Universal `prefers-reduced-motion` safety block.

2. **Move to Companion Plugin (`obsidian-citadel-background`):**
   * Interactive background particle engine (Canvas 2D).
   * User settings tab for independent layer toggles and density sliders.
   * Automatic performance auto-scaler for low-end hardware protection.
   * `visibilitychange` listener to freeze rendering when Obsidian is unfocused.

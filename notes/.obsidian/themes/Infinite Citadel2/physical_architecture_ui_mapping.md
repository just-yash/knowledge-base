# PHYSICAL ARCHITECTURAL BLUEPRINT & OBSIDIAN UI MAPPING
**The Architectural Visualization Master Blueprint**

> *"Architecture is frozen thought. UI is fluid architecture. Here, they are one and the same."*

---

## 1. PHYSICAL STRUCTURE DESIGN & UI MAPPING MATRIX

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHYSICAL ARCHITECTURE ──> OBSIDIAN UI COMPONENT MATRIX                      │
├───────────────────────┬──────────────────────────┬──────────────────────────┤
│ PHYSICAL STRUCTURE    │ MATERIAL SPECIFICATION   │ OBSIDIAN UI TARGET       │
├───────────────────────┼──────────────────────────┼──────────────────────────┤
│ 1. Entrances          │ Frosted Crystal & Steel  │ Command Palette (.prompt)│
│ 2. Hallways           │ Obsidian Stone Corridors │ Sidebar & File Explorer  │
│ 3. Towers             │ Arc-Reactor Steel Spires │ Status Bar & Ribbons     │
│ 4. Libraries          │ Dragon Vellum Galleries  │ Active Markdown Workspace│
│ 5. Observatories      │ Spherical Crystal Dome   │ Graph View Galaxy        │
│ 6. Vaults             │ Subterranean Runic Crypts│ Callout Artifact Cards   │
│ 7. Laboratories       │ Quantum Cybernetic Chambers│ Holographic Code Blocks│
│ 8. Dragon Halls       │ Sovereign Vaulted Assembly│ Display Typography H1-H6 │
│ 9. Celestial Gardens  │ Atmospheric Open Terraces│ Living Background Engine │
│ 10. Archives          │ Floating Tablet Grid     │ Canvas View Workspace    │
└───────────────────────┴──────────────────────────┴──────────────────────────┘
```

---

## 2. DETAILED ARCHITECTURAL BLUEPRINTS & UI EQUIVALENTS

### 1. Entrances: The Arch of Ignition & Oracle Portals
* **Physical Architectural Design**: Massive double-leaved Valyrian steel gates framed by floating arches of translucent frosted crystal. When a scholar approaches, liquid cyan energy flows through runic grooves in the arch, projecting a glowing index of all available knowledge in mid-air.
* **Obsidian UI Equivalent**: **The Command Palette (`.prompt`) & Modals**.
* **Material Alignment**: `FROSTED GLASS (DENSE)` (`--mat-glass-bg-dense`). 24px backdrop blur, 0.28s kinetic entrance scale-up, and 0.7s diagonal shimmer sweep (`ic-shimmer-sweep`).

---

### 2. Hallways: The Gallery of Steel & Shadows
* **Physical Architectural Design**: Monolithic ribbed corridors forged from dark volcanic obsidian stone. The walls are lined with Valyrian steel brackets holding flickering candles and glowing starlight crystals, guiding scribes through the vast fortress.
* **Obsidian UI Equivalent**: **The Left/Right Sidebars & File Explorer (`.side-dock-ribbon`, `.nav-file-title`)**.
* **Material Alignment**: `POLISHED OBSIDIAN` (`--mat-obsidian-bg-surface`). Golden radial light-spreads expand on hover; active file paths glow with a mystical purple wash.

---

### 3. Towers: The Spires of Arc-Power
* **Physical Architectural Design**: Vertical monoliths rising 3,000 feet into the celestial nebulae. At the core of each spire sits a liquid cyan arc-reactor that hums at 40 Hz, delivering telemetry, energy status, and structural stability to the entire citadel.
* **Obsidian UI Equivalent**: **The Status Bar (`.status-bar`) & Action Ribbons**.
* **Material Alignment**: `ARC-REACTOR METAL` (`--mat-reactor-bg`). Features a top border 8s animated reactor pulse (`ic-reactor-pulse`) and status item cyan light-spread hovers.

---

### 4. Libraries: The Sanctuary of Living Scrolls
* **Physical Architectural Design**: Multi-tiered galleries carved from granite and dark cedar. Here, scrolls of dragon vellum do not sit on shelves; they float gently in mid-air. Scribes interact with text using diamond-tipped quills, while ink reacts dynamically to human intent.
* **Obsidian UI Equivalent**: **The Active Markdown Workspace (`.markdown-preview-view`, `.cm-editor`)**.
* **Material Alignment**: `INTER` Body Text + `CORMORANT GARAMOND` Italics. Warm parchment highlights (`--mat-parchment-bg`) and starlight white text (`#f4f1ea`).

---

### 5. Observatories: The Celestial Star Dome
* **Physical Architectural Design**: A massive spherical observatory dome made of dark polished crystal. Scribes stand at the center looking out into the void, where thoughts and notes are projected as celestial star-nodes linked by glowing energy filaments.
* **Obsidian UI Equivalent**: **The Interactive Graph View (`.graph-view.view-content`)**.
* **Material Alignment**: WebGL Star Nodes + Dual Drop-Shadow Bloom Filter. Cyan, gold, purple, and emerald node star mappings set against a deep space nebula.

---

### 6. Vaults: The Subterranean Runic Crypts
* **Physical Architectural Design**: Heavy subterranean stone crypts sealed with ancient dragon-fire runes and gold-leaf banners. Within these vaults lie sacred decrees, warnings, schematic blueprints, and ancient manuscript artifacts.
* **Obsidian UI Equivalent**: **Callout Artifact Cards (`.callout`)**.
* **Material Alignment**: 10 Lore Artifact Identities (Magic Scroll, Arc Schematic, Cosmic Wire, Royal Decree, Dragon Archive, Wildfire Seal, Oracle Mirror, Fallen Ward, Runestone, Lost Manuscript).

---

### 7. Laboratories: The Stark Quantum Synthesizers
* **Physical Architectural Design**: Cybernetic diagnostic workchambers equipped with glowing cyan HUD screens, horizontal scanlines, and corner-bracket diagnostic frames where scribes analyze raw code and technical blueprints.
* **Obsidian UI Equivalent**: **Holographic Code Blocks (`pre.language-`, `.cm-inline-code`)**.
* **Material Alignment**: `ARC-REACTOR METAL` shell, horizontal scanline textures, top-edge status shimmer line, 4 corner HUD bracket marks (`::after`), and syntax text-shadow auras.

---

### 8. Dragon Halls: The Sovereign Vaulted Assembly
* **Physical Architectural Design**: The grandest hall in the Citadel, paved in mirror-polished obsidian glass. Its soaring ceiling is held up by colossal Valyrian steel pillars, while gold-engraved sovereign decrees line the walls in giant carved letters.
* **Obsidian UI Equivalent**: **Display Typography H1–H6 (`h1`, `h2`)**.
* **Material Alignment**: `CINZEL` & `CINZEL DECORATIVE`. H1 dark mode features a gold-to-cyan gradient fill with an 18px golden glow drop-shadow.

---

### 9. Celestial Gardens: The Atmospheric Open Terraces
* **Physical Architectural Design**: Open-air terraced gardens overlooking the infinite deep-space void. Here, purple aurora waves flow across the sky, star particles twinkle in the quiet air, and geometric constellation lines drift silently over the horizon.
* **Obsidian UI Equivalent**: **The Living Background Engine (`.app-container::before`, `.app-container::after`)**.
* **Material Alignment**: 5-Plane GPU Composited Atmosphere (Nebula Clouds, Starfield, Aurora Wash, Constellation Vector Tile, Scroll Parallax).

---

### 10. Archives: The Floating Tablet Workspace
* **Physical Architectural Design**: An infinite open grid where heavy glass tablets hover over a tiling dot-matrix floor. Scholars can rearrange tablets, link them with cyan energy ropes, and group them into sovereign research clusters.
* **Obsidian UI Equivalent**: **The Infinite Canvas Workspace (`.canvas-wrapper`)**.
* **Material Alignment**: Dense Frosted Glass cards (`.canvas-node-content`) with multi-layered drop shadows (`0 14px 32px -8px`), hover Y-axis lift, cyan energy connection paths, and a 20px tiling dot grid.

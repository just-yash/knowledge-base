# OBSIDIAN COMPONENT REDESIGN MASTERPIECE
**The Complete 13-Component Family Blueprint**

> *"Not a simple recolor. Every UI element is an ancient artifact infused with cybernetic power."*

---

## COMPONENT FAMILY 1: THE WORKSPACE BASE & ATMOSPHERE

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Multi-plane floating deep-space nebulae and starfield particles (`#05060b`).
  * **Stark Tech**: Volumetric GPU lighting layers.
  * **Harry Potter**: Airborne gold dust particles.
  * **Game of Thrones**: Polished Obsidian stone slab floor.

### 2. Interaction Rationale
* Serves as the non-interactive grounding substrate for all elevated UI panes.

### 3. Material Selection
* `POLISHED OBSIDIAN` (`--mat-obsidian-bg`) + 5 GPU Composited Background Planes.

### 4. Motion
* 140s multi-gradient nebula drift (`ic-nebula-drift`) and 300s constellation tile drift (`ic-constellation-drift`).

### 5. Accessibility
* Freezes all animations when `prefers-reduced-motion: reduce` is active.

### 6. Implementation Notes
* Composited on GPU thread via `position: fixed` pseudo-elements.

### 7. CSS Architecture
* `src/styles/03-background.css`.

### 8. Plugin Integration Points
* Injects fixed 2D canvas layer (`.citadel-bg-canvas`) via `obsidian-citadel-background` plugin.

---

## COMPONENT FAMILY 2: THE SIDEBAR & FILE EXPLORER ("The Citadel's Stone Archive")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Deep obsidian void backdrop.
  * **Stark Tech**: Cyan indicator glow on hover.
  * **Harry Potter**: Gold pill tag badges (`.nav-file-tag`).
  * **Game of Thrones**: Monolithic volcanic stone surface with gold Cinzel vault titles.

### 2. Interaction Rationale
* Hovering file items expands a golden radial light-spread (`.ic-hover-light-spread`); active files reveal a mystical purple wash with starlight text.

### 3. Material Selection
* `POLISHED OBSIDIAN SURFACE` (`var(--mat-obsidian-bg-surface)`).

### 4. Motion
* 250ms golden light-spread expansion + `+3px` X-axis slide.

### 5. Accessibility
* WCAG AAA contrast for active file titles (`#f4f1ea`).

### 6. Implementation Notes
* Uses `:is(.nav-folder-title, .nav-file-title)::before` pseudo-element for GPU light-spread.

### 7. CSS Architecture
* `src/styles/04-navigation-tabs.css`.

### 8. Plugin Integration Points
* Hooks into file-tree drag-and-drop events and custom folder icon plugins.

---

## COMPONENT FAMILY 3: WORKSPACE TABS ("Valyrian Steel Tab Rail")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Void depth between tab items.
  * **Stark Tech**: Arc-cyan underline with 14px energy glow shadow.
  * **Harry Potter**: Active tab displays an arcane golden vellum bookmark ribbon.
  * **Game of Thrones**: Rippled Valyrian Steel alloy rail with top bevel highlight.

### 2. Interaction Rationale
* Hovering tabs expands a cool-white light-spread rising from the rail bottom; active tabs elevate with an arc-cyan energy line.

### 3. Material Selection
* `VALYRIAN STEEL` (`var(--mat-steel-bg)`).

### 4. Motion
* 200ms tab elevation + bottom-up ambient spread.

### 5. Accessibility
* 2px Arc-Cyan visible focus indicator on `:focus-visible`.

### 6. Implementation Notes
* Active tabs carry `inset 0 -2px 0 var(--ic-arc-cyan)`.

### 7. CSS Architecture
* `src/styles/04-navigation-tabs.css`.

### 8. Plugin Integration Points
* Supports tab icon plugins and stacked tab layouts.

---

## COMPONENT FAMILY 4: SEARCH & COMMAND PALETTE ("The Oracle Terminal")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Deep space background blur refraction.
  * **Stark Tech**: 24px dense frosted glass, 0.7s diagonal shimmer sweep (`ic-shimmer-sweep`), and laser scanline input traces.
  * **Harry Potter**: Concentric rotating spell circles (`::before`) behind the prompt.
  * **Game of Thrones**: Heavy brass border frame with golden instructions text.

### 2. Interaction Rationale
* Kinetic appearance scale-up + laser scanline sweep on input focus; suggestions highlight with purple light-spreads and cyan left borders.

### 3. Material Selection
* `FROSTED GLASS (DENSE)` (`var(--mat-glass-bg-dense)`).

### 4. Motion
* 280ms kinetic entrance + 0.7s shimmer sweep + 1.2s laser trace.

### 5. Accessibility
* 100% keyboard navigable via Arrow keys & Enter.

### 6. Implementation Notes
* Uses `@keyframes ic-shimmer-sweep` and `@keyframes ic-energy-trace`.

### 7. CSS Architecture
* `src/styles/05-controls-inputs.css`.

### 8. Plugin Integration Points
* Integrates with Quick Switcher, Omnisearch, and Command Palette plugins.

---

## COMPONENT FAMILY 5: THE STATUS BAR ("Arc-Reactor Energy Strip")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Suspended at the bottom edge over cosmic void.
  * **Stark Tech**: Dark metal core with continuous 8s linear `translateX` reactor pulse across the 1px top border.
  * **Harry Potter**: Monospace telemetry font glowing softly in starlight white.
  * **Game of Thrones**: Heavy forged metal strip casing.

### 2. Interaction Rationale
* Hovering status items expands a wide-ellipse cyan light-spread with `-1px` Y-axis lift.

### 3. Material Selection
* `ARC-REACTOR METAL` (`var(--mat-reactor-bg)`).

### 4. Motion
* 8s continuous linear border energy pulse (`ic-reactor-pulse`).

### 5. Accessibility
* High-contrast monospace telemetry (`JetBrains Mono`).

### 6. Implementation Notes
* `@keyframes ic-reactor-pulse { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`.

### 7. CSS Architecture
* `src/styles/05-controls-inputs.css`.

### 8. Plugin Integration Points
* Integrates with Dataview word-count, sync status, and language plugins.

---

## COMPONENT FAMILY 6: THE ACTIVE EDITOR ("Sanctuary of Living Scrolls")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Atmospheric background visible through translucent margins.
  * **Stark Tech**: Sliding cyan link underlines and active line indicators.
  * **Harry Potter**: Dragon vellum parchment sheet with ruled lines, *Cormorant Garamond* italics, and gold display titles.
  * **Game of Thrones**: Gold-leaf H1 sublines and double gold blockquote borders.

### 2. Interaction Rationale
* Text typing flows liquid ink onto the page; internal links animate underline width from 0% to 100% on hover.

### 3. Material Selection
* `DRAGON PARCHMENT` (`var(--mat-parchment-bg)`).

### 4. Motion
* 350ms link underline expansion + 400ms quote callout micro-breathe.

### 5. Accessibility
* WCAG AAA contrast on starlight white body text (`#f4f1ea`).

### 6. Implementation Notes
* Implemented on `.markdown-preview-view`, `.cm-editor`.

### 7. CSS Architecture
* `src/styles/02-base-typography.css`.

### 8. Plugin Integration Points
* Supports CodeMirror 6 extensions, Outliner, and Dataview inline queries.

---

## COMPONENT FAMILY 7: CALLOUT ARTIFACTS (10 Lore Identities)

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Volumetric glass backdrops.
  * **Stark Tech**: Dashed cyan technical blueprint grid (Tip callout).
  * **Harry Potter**: Magic Scroll ruled vellum lines (Note callout), Lost Manuscript parchment (Quote callout).
  * **Game of Thrones**: Royal Decree banner border (Warning callout), Dragon Archive crimson border (Danger callout).

### 2. Interaction Rationale
* Hovering callout titles brightens runic icons and casts colored text-shadow glowing auras.

### 3. Material Selection
* 10 Lore Artifact Identities (Obsidian, Glass, Parchment, Brass, Iron hybrids).

### 4. Motion
* 300ms icon aura drop-shadow filter transition.

### 5. Accessibility
* High-contrast callout titles with non-color structural border indicators.

### 6. Implementation Notes
* Target selectors: `.callout[data-callout="note"]`, `[data-callout="tip"]`, etc.

### 7. CSS Architecture
* `src/styles/06-callouts-code-content.css`.

### 8. Plugin Integration Points
* Fully compatible with Obsidian core callouts and custom callout plugins.

---

## COMPONENT FAMILY 8: HOLOGRAPHIC CODE BLOCKS ("Terminal × Spellbook")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Deep void code chamber.
  * **Stark Tech**: Horizontal scanlines, 4 corner HUD brackets (`::after`), and top status shimmer line.
  * **Harry Potter**: Syntax tokens emit glowing text-shadow auras (purple keywords, emerald strings, gold functions).
  * **Game of Thrones**: Forged iron border shell casing.

### 2. Interaction Rationale
* Copy button lifts `-1px` on hover with an arc-cyan glow.

### 3. Material Selection
* `ARC-REACTOR METAL` shell + Void depth.

### 4. Motion
* 10s animated status shimmer line.

### 5. Accessibility
* Monospace font contract (*JetBrains Mono*) with distinct token colors.

### 6. Implementation Notes
* Four corner HUD brackets rendered via `::after` gradients.

### 7. CSS Architecture
* `src/styles/06-callouts-code-content.css`.

### 8. Plugin Integration Points
* Integrates with PrismJS, CodeMirror 6 syntax highlighters, and Execute Code plugins.

---

## COMPONENT FAMILY 9: LEDGER TABLES ("Valyrian Steel Ledger")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Glass body rows floating over space void.
  * **Stark Tech**: Subtle cyan row highlight on hover.
  * **Harry Potter**: Gold Cinzel header typography.
  * **Game of Thrones**: Valyrian Steel header background with top bevel highlight.

### 2. Interaction Rationale
* Row hover transitions background to `rgba(85,230,236,0.05)` over 200ms.

### 3. Material Selection
* `VALYRIAN STEEL` header (`var(--mat-steel-bg)`) + Frosted glass body (`var(--ic-glass)`).

### 4. Motion
* 200ms row background highlight.

### 5. Accessibility
* Distinct 1px border dividers between table cells.

### 6. Implementation Notes
* `thead tr` features `box-shadow: var(--mat-steel-highlight)`.

### 7. CSS Architecture
* `src/styles/06-callouts-code-content.css`.

### 8. Plugin Integration Points
* Integrates with Dataview tables, Advanced Tables plugin, and CSV renderers.

---

## COMPONENT FAMILY 10: TAGS & BADGES ("Gemstone Pills")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Suspended pill capsules.
  * **Stark Tech**: Monospace telemetry text (*JetBrains Mono*).
  * **Harry Potter**: Gemstone purple gradient fill with 16px hover purple glow (`--ic-glow-purple`).
  * **Game of Thrones**: Antiqued brass border rim.

### 2. Interaction Rationale
* Hovering tags lifts `-1px` on Y-axis, brightens text to starlight white, and casts a purple glow.

### 3. Material Selection
* `GEMSTONE GRADIENT` (`linear-gradient(135deg, rgba(155,107,242,0.18), rgba(85,230,236,0.10))`).

### 4. Motion
* 250ms lift + purple glow expansion.

### 5. Accessibility
* High-contrast purple text on dark pill background.

### 6. Implementation Notes
* Target selector: `.tag`, `a.tag`.

### 7. CSS Architecture
* `src/styles/06-callouts-code-content.css`.

### 8. Plugin Integration Points
* Supports Tag Wrangler, TagFolder, and Dataview tag links.

---

## COMPONENT FAMILY 11: PROPERTIES PANEL ("Crystal Frontmatter")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Glass frontmatter card floating above editor.
  * **Stark Tech**: Arc-cyan property icons and small-caps telemetry keys.
  * **Harry Potter**: Purple and gold property values.
  * **Game of Thrones**: Carved marble background frame.

### 2. Interaction Rationale
* Property rows highlight with subtle cyan tint on hover (`rgba(85,230,236,0.04)`).

### 3. Material Selection
* `FROSTED GLASS` (`var(--mat-glass-bg)`).

### 4. Motion
* 200ms row hover transition.

### 5. Accessibility
* Non-color property key icons for clear property type differentiation.

### 6. Implementation Notes
* Target selector: `.metadata-container`.

### 7. CSS Architecture
* `src/styles/06-callouts-code-content.css`.

### 8. Plugin Integration Points
* Fully compatible with Obsidian Core Properties and MetaEdit plugins.

---

## COMPONENT FAMILY 12: GRAPH VIEW ("Knowledge Galaxy")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Interactive star-node galaxy set against deep space nebulae.
  * **Stark Tech**: Dual WebGL canvas drop-shadow bloom filters.
  * **Harry Potter**: Celestial nodes burn as golden supernovas or purple tag moons.
  * **Game of Thrones**: Frosted glass controls drawer with gold Cinzel headings.

### 2. Interaction Rationale
* Node hover expands connection filaments into bright gold energy links (`--graph-line-highlight`).

### 3. Material Selection
* `WEBGL STAR-NODE GALAXY` + Frosted glass controls.

### 4. Motion
* Smooth 3D WebGL rotation & inertial pan/zoom.

### 5. Accessibility
* High-contrast node color mapping for unresolved vs resolved nodes.

### 6. Implementation Notes
* WebGL canvas drop-shadow bloom: `filter: drop-shadow(0 0 7px rgba(85,230,236,0.35)) drop-shadow(0 0 16px rgba(155,107,242,0.18))`.

### 7. CSS Architecture
* `src/styles/07-graph-canvas-views.css`.

### 8. Plugin Integration Points
* Supports Graph Analysis, Juggl, and Obsidian Core Graph.

---

## COMPONENT FAMILY 13: CANVAS WORKSPACE ("Floating Space Archive")

### 1. Visual Rationale
* **Four-Pillar Expression**:
  * **Space**: Infinite deep-space void with tiling 20px dot grid.
  * **Stark Tech**: Arc-cyan energy link paths and arrowheads (`.canvas-display-line`).
  * **Harry Potter**: Glowing card color variants (red, orange, yellow, green, cyan, purple).
  * **Game of Thrones**: Floating tablet cards with multi-layered drop shadows (`0 14px 32px -8px`).

### 2. Interaction Rationale
* Card hover lifts `-2px` on Y-axis with expanded shadow; selection triggers an arc-cyan halo.

### 3. Material Selection
* `DENSE FROSTED GLASS CARDS` (`.canvas-node-content`).

### 4. Motion
* 250ms card elevation lift + halo expansion.

### 5. Accessibility
* High-contrast card border highlights for selected nodes.

### 6. Implementation Notes
* Tiling `20px 20px` dot grid is decoupled from viewport scale to prevent zoom stutter.

### 7. CSS Architecture
* `src/styles/07-graph-canvas-views.css`.

### 8. Plugin Integration Points
* Supports Obsidian Canvas, Canvas Candy, and Excalidraw integration.

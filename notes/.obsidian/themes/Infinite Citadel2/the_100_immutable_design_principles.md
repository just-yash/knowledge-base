# THE 100 IMMUTABLE DESIGN PRINCIPLES OF INFINITE CITADEL
**The Constitutional Code of the Realm**

> *"Every component created within the Citadel must obey these 100 laws without exception, variation, or compromise."*

---

## CATEGORY 1: COLOR MASS & THE 70 / 20 / 10 DISCIPLINE (Principles 1–10)

1. **Law of Neutral Mass**: Exactly 70% of any viewable screen area must consist of T1 Neutral Mass (`#05060b` Deep Void or `#090c16` Void-2).
2. **Law of Structural Support**: Exactly 20% of any viewable area must consist of T2 Supporting Mass (Valyrian Steel `#c7d4e3` or Parchment Gold `#d9a857`).
3. **Law of Searing Accents**: Accents (T3) must never exceed 10% of total surface area; they exist to draw focus, not to decorate.
4. **No Raw Spectrum Colors**: Plain `#ff0000`, `#00ff00`, or `#0000ff` are strictly illegal. All colors must be curated HSL Hues.
5. **Light Mode Mirroring**: `.theme-light` must mirror the dark theme's gravitas on sunlit stone (`#f0ede6`), never plain white.
6. **Starlight Emphasis**: Maximum text brightness is reserved for `#f4f1ea` (Starlight) to enforce WCAG AAA contrast.
7. **Body Text Restraint**: Normal body text must never be pure white; it must use `#cdd3e0` to prevent eye strain.
8. **Muted Hierarchy**: Secondary metadata must use `#8b93ab`; tertiary/disabled items must use `#565f78`.
9. **Single Accent Rule per Component**: A single UI component may possess at most one primary accent highlight color.
10. **Atmospheric Dark Guarantee**: No container background may be lighter than 88% darkness in dark mode.

---

## CATEGORY 2: PHYSICAL MATERIALS & SURFACE INTEGRITY (Principles 11–20)

11. **Material Exclusivity**: Every UI surface must explicitly implement one of the 5 canonical materials (Obsidian, Glass, Steel, Parchment, Reactor).
12. **The Four Material Tokens**: Every custom material must declare background, border, shadow, and highlight tokens.
13. **Obsidian Depth**: Polished Obsidian must always include a 160° directional surface gradient and a subtle 1px top highlight bevel.
14. **Glass Blur Minimum**: Frosted Glass must implement `backdrop-filter: blur(16px)` in normal mode and `blur(24px)` in dense mode.
15. **Steel Edge Sharpness**: Valyrian Steel must always possess a 1px solid border (`rgba(199,212,227,0.14)`) and a top bevel edge.
16. **Parchment Vellum Warmth**: Dragon Parchment must always retain a warm gold ambient glow (`rgba(217,168,87,0.07)`).
17. **Arc-Reactor Energy Rim**: Arc-Reactor Metal must carry a 1px solid cyan energy border (`rgba(85,230,236,0.24)`).
18. **No Flat Fill Containers**: Flat, single-color container fills are forbidden; surfaces must use subtle physical gradients.
19. **Material Boundary Continuity**: Adjacent panels of the same material must be separated by a structural Valyrian steel divider.
20. **Physical Elevation Hierarchy**: Floating panels must carry multi-layered drop shadows (`0 8px 32px rgba(0,0,0,0.60)`).

---

## CATEGORY 3: THE FOUR-PILLAR DOMAIN SEPARATION (Principles 21–30)

21. **Space Domain Scope**: Space elements (nebulae, starfields) are restricted to macro backgrounds and WebGL viewports.
22. **No Space on Inputs**: Space nebulae or star particles may never be rendered inside buttons, callout cards, or text inputs.
23. **Stark Tech Domain Scope**: Stark Tech elements (cyan energy, HUD brackets) are restricted to interactive controls, status bar, and code blocks.
24. **No Stark Tech Serifs**: Stark Tech HUD components may never use serif fonts or gold parchment borders.
25. **Harry Potter Domain Scope**: Harry Potter elements (vellum, magic purple) are restricted to content manuscripts, tags, and syntax magic.
26. **No Potter Metal**: Harry Potter manuscript cards may never use heavy metallic steel borders or cybernetic cyan glow rings.
27. **Game of Thrones Domain Scope**: Game of Thrones elements (obsidian stone, Valyrian steel, gold headings) govern primary architecture and tables.
28. **No Thrones Glass**: Game of Thrones structural monoliths may never rely on translucent glass blur.
29. **Strict Pillar Isolation**: No single component may blend traits from more than two pillars simultaneously.
30. **Visual Pillar Dominance**: Every component must have one single dominant pillar that dictates 80% of its visual identity.

---

## CATEGORY 4: MOTION & KINEMATICS (Principles 31–40)

31. **No Linear Easing**: `transition: linear` or `transition: ease` are illegal for UI component state shifts.
32. **Citadel Kinetic Standard**: All interactive state transitions must use `--ic-ease-kinetic` (`cubic-bezier(0.16, 1, 0.3, 1)`).
33. **Instant Click Feedback**: Active button clicks must respond within `--ic-dur-instant` (`150ms`).
34. **Fast Hover Duration**: Hover states must complete within `--ic-dur-fast` (`250ms`).
35. **Normal Panel Duration**: Modals and command palettes must appear within `--ic-dur-normal` (`350ms`).
36. **Slow Drawer Duration**: Heavy drawer expansions must complete within `--ic-dur-slow` (`550ms`).
37. **Ambient Pulse Budget**: Background ambient loops (reactors, shimmer) must take between 8s and 300s.
38. **Transform & Opacity Only**: CSS transitions must animate ONLY `transform`, `opacity`, `filter`, or `background-position`.
39. **No Layout Thrashing**: Animating `width`, `height`, `margin`, `padding`, `top`, or `left` is strictly illegal.
40. **Overshoot Pop Limit**: Over-shooting bounce ease (`--ic-ease-pop`) is reserved exclusively for micro-badge pops.

---

## CATEGORY 5: TYPOGRAPHY & LEGIBILITY CONTRACTS (Principles 41–50)

41. **Display Font Exclusivity**: Heading titles (H1–H3) must use *Cinzel* or *Cinzel Decorative*.
42. **Body Font Legibility**: All paragraph text, list items, and inputs must use *Inter* for maximum legibility.
43. **Monospace Code Contract**: Code blocks, tags, status items, and technical data must use *JetBrains Mono*.
44. **Manuscript Emphasis**: Emphasis text (`<em>`) must use *Cormorant Garamond* in italic magic purple (`#9b6bf2`).
45. **H1 Gold Gradient**: Dark mode H1 titles must feature the gold-to-cyan linear text gradient.
46. **H2 Steel Subline**: H2 titles must feature a subline border (`1px solid rgba(217,168,87,0.14)`).
47. **H3 Tech Highlight**: H3 titles must be rendered in Arc-Cyan (`#55e6ec`).
48. **H4 Structural Steel**: H4 titles must be rendered in Valyrian Steel (`#c7d4e3`).
49. **H5–H6 Small Caps**: H5 and H6 headings must be uppercase, muted, with `letter-spacing: 1.2px`.
50. **Animated Internal Links**: Internal links must animate a 1px underline expanding from `0%` to `100%` width on hover.

---

## CATEGORY 6: MICROINTERACTIONS & TACTILE FEEDBACK (Principles 51–60)

51. **Radial Light-Spread Hover**: Clickable UI items must project a radial light-spread (`::before`) expanding from scale 0 to 1 on hover.
52. **Y-Axis Hover Lift**: Interactive cards and buttons must lift by `-1px` or `-2px` on hover via `transform`.
53. **Tactile Click Compression**: Buttons and clickable nodes must scale down to `0.98` on `:active` mouse press.
54. **Focus Energy Trace**: Text inputs and prompt containers must trigger a sliding cyan energy beam (`ic-energy-trace`) on focus.
55. **Shimmer Sweep Entrance**: Modals and command palettes must play a 0.7s diagonal shimmer sweep across their glass face on open.
56. **Status Bar Pulse Line**: The status bar top border must feature a continuous 8s linear energy pulse.
57. **Syntax Glow Auras**: Syntax tokens in code blocks must cast subtle colored text-shadow glowing auras.
58. **Pill Glow Hover**: Tags and gemstone pills must project a 16px purple glow (`--ic-glow-purple`) on hover.
59. **Backlink Slide Shift**: Hovering backlink matches must slide `+3px` on the X-axis.
60. **Tab Rail Rising Spread**: Workspace tab headers must expand a bottom-up light-spread rising from the tab rail bottom edge.

---

## CATEGORY 7: ATMOSPHERIC BACKGROUND ENGINE (Principles 61–70)

61. **5-Layer Architecture**: The Living Background must maintain 5 distinct z-planes (Nebula, Stars, Aurora, Constellations, Parallax).
62. **Independent Custom Properties**: Every layer must expose an independent `--ic-*-opacity` or `--ic-*-speed` variable.
63. **Session Phase Variation**: Atmospheric colors must shift smoothly when `--ic-sky-phase` (0 to 1) is modified.
64. **No Mouse-Follow Overhead**: Background layers must never attach JS `mousemove` listeners.
65. **SVG Vector Tile Drift**: Constellation vector tiles must be rasterized once as a 280px SVG tile and drifted via GPU `transform`.
66. **Compositor Scroll Timeline**: Leaf scroll parallax must use native CSS `animation-timeline: scroll()`.
67. **Fixed Atmosphere Positioning**: Background atmosphere layers must use `position: fixed` to prevent document scroll repaints.
68. **Particulate Density Limit**: CSS starfields must use multi-point radial gradients with a maximum footprint of 10 star points.
69. **Z-Index Layer Zero**: Background atmosphere elements must always sit at `z-index: 0` behind all workspace panes.
70. **Non-Interactive Backgrounds**: All background atmosphere elements must set `pointer-events: none`.

---

## CATEGORY 8: HARDWARE PERFORMANCE & GPU BUDGETS (Principles 71–80)

71. **60 FPS Hardware Guarantee**: All UI interactions must maintain 60 FPS on mid-tier hardware.
72. **VRAM Footprint Ceiling**: Total background CSS VRAM allocation across all 5 layers must not exceed 3.5 MB.
73. **Main-Thread CPU Budget**: CSS animations must consume < 0.1 ms of main-thread CPU time per frame.
74. **GPU Layer Promotion**: Animated layers must explicitly set `will-change: transform` or `will-change: opacity`.
75. **Automatic Low-Perf Fallback**: When low FPS (< 45) is detected, `data-citadel-perf="low"` must strip blur filters.
76. **Zero Battery Draw when Hidden**: `requestAnimationFrame` loops in plugins must freeze on `document.visibilityState === "hidden"`.
77. **Decoupled Canvas Grids**: Tiling Canvas dot-grids (`20px 20px`) must be decoupled from viewport scale.
78. **No WebGL Main-Thread Blocking**: Graph canvas rendering must never block the main event loop for more than 4 ms per frame.
79. **Hardware Tier Scaling**: Low-end devices must strip backdrop blurs, glow shadows, and half canvas particles.
80. **Memory Leak Prevention**: All event listeners created by background components must be unbound on component destroy.

---

## CATEGORY 9: ACCESSIBILITY & KEYBOARD NAVIGATION (Principles 81–90)

81. **Global Focus Ring**: Every interactive element must display a visible 2px Arc-Cyan ring on `:focus-visible`.
82. **Focus Ring Glow**: Focus rings must emit a 10px cyan ambient glow (`rgba(85,230,236,0.40)`).
83. **Focus Ring Offset**: Focus rings must set `outline-offset: 2px` to prevent overlapping element borders.
84. **WCAG AAA Normal Contrast**: Normal text colors (`#f2f0ea`, `#cdd3e0`) against dark backgrounds must meet WCAG AAA contrast (>= 7:1).
85. **WCAG AA Muted Contrast**: Muted secondary text (`#8b93ab`) must meet WCAG AA contrast (>= 4.5:1).
86. **Reduced Motion Complete Halt**: When `prefers-reduced-motion: reduce` is active, all transitions and animations must freeze.
87. **Keyboard Accessible Modals**: All modal dialogs and command prompt suggestions must be 100% navigable via Arrow keys & Enter.
88. **Screen Reader Semantic HTML**: Heading hierarchies (H1 to H6) must follow logical structural nesting without skipping levels.
89. **Non-Color State Indicators**: Interactive states (active tabs, selected files) must use borders or scale shifts in addition to color.
90. **High-Contrast Light Theme**: `.theme-light` text colors must maintain WCAG AAA compliance on warm off-white stone (`#f0ede6`).

---

## CATEGORY 10: KNOWLEDGE ARCHITECTURE, GRAPH & CANVAS RULES (Principles 91–100)

91. **Graph Galaxy Aesthetic**: Graph View must render notes as glowing star-nodes set against a cosmic space void.
92. **Graph Node Color Mapping**: Unresolved nodes must map to Valyrian Steel; focused nodes must burn in bright gold.
93. **Graph Connection Filaments**: Connection edges must render as cyan filaments (`rgba(85,230,236,0.22)`), shifting to gold on focus.
94. **Graph WebGL Bloom Filter**: The WebGL canvas must carry a dual drop-shadow bloom filter for node glowing auras.
95. **Floating Tablet Elevation**: Canvas cards must feature multi-layered directional drop shadows (`0 14px 32px -8px rgba(5,6,11,0.80)`).
96. **Canvas Glass Bevel**: Canvas cards must retain a top glass bevel highlight (`inset 0 1px 0 rgba(200,220,255,0.07)`).
97. **Canvas Color Palette Alignment**: Canvas node color overrides (1–6) must map strictly to Citadel's 6 accent colors.
98. **Canvas Energy Edge Glow**: Canvas edge paths (`.canvas-display-line`) must feature drop-shadow cyan edge glows.
99. **Group Container Dashed Steel**: Canvas group containers must be styled with dashed Valyrian steel borders and gold labels.
100. **Absolute Aesthetic Fidelity**: No future update, patch, or component may bypass these 100 immutable laws.

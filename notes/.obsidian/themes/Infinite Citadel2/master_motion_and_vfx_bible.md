# MASTER MOTION, ANIMATION & VFX CHOREOGRAPHY BIBLE
**HI Motion System + Pixar Animation Physics + Marvel VFX Directives**

> *"Motion in the Citadel is non-decorative. It communicates physical mass, magical intent, and cybernetic state shifts with 0 ms main-thread CPU overhead."*

---

## 1. THE 14 ANIMATION & VFX CHOREOGRAPHY DOMAINS

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 14 MASTER MOTION DOMAINS                                                    │
├───────────────────────┬──────────────────────────┬──────────────────────────┤
│ ANIMATION DOMAIN      │ EASING & TIMING BUDGET   │ TECHNICAL RENDER DRIVER  │
├───────────────────────┼──────────────────────────┼──────────────────────────┤
│ 1. Entrance           │ 280ms --ic-ease-kinetic  │ transform: scale/opacity │
│ 2. Hover              │ 250ms --ic-ease-kinetic  │ Radial Light-Spread GPU  │
│ 3. Focus              │ 1200ms --ic-ease-smooth  │ Energy Trace Slide Line  │
│ 4. Selection          │ 200ms --ic-ease-kinetic  │ Inset Bar & Gradient Wash│
│ 5. Opening            │ 280ms Kinetic + 700ms VFX│ Shimmer Sweep & Blur In  │
│ 6. Closing            │ 200ms --ic-ease-kinetic  │ Scale Down & Opacity Out │
│ 7. Loading            │ 60s / 8s Ambient Loop    │ Concentric Spell Rotate  │
│ 8. Scrolling          │ Scroll Timeline (Native) │ GPU Leaf Parallax Shift  │
│ 9. Camera Movement    │ 350ms Inertial Curve     │ WebGL / Canvas Pan-Zoom  │
│ 10. Environmental     │ 140s / 300s GPU Drift    │ Multi-plane Nebula Drift │
│ 11. Breathing         │ 400ms Micro-Breathe      │ Scale(1.005) Vellum Lift │
│ 12. Ambient           │ 7s Twinkle / 55s Aurora  │ Starfield Opacity Cycle  │
│ 13. Magical           │ 350ms Ink Flow           │ Liquid Ink Underline     │
│ 14. Technological     │ 1200ms Laser Scanline    │ Code Corner Brackets & HUD│
└───────────────────────┴──────────────────────────┴──────────────────────────┘
```

---

## 2. DETAILED ANIMATION BLUEPRINTS & CHOREOGRAPHY

### 1. Entrance Choreography (Apple HIG Precision)
* **Animation Physics**: Elastic kinetic expansion (`cubic-bezier(0.16, 1, 0.3, 1)`).
* **Execution**: Component initializes at `scale(0.98)` and `opacity: 0`, rapidly expanding to `scale(1.0)` and `opacity: 1` over **280ms**.
* **Target UI**: Modals, prompt containers, popovers, context menus.

---

### 2. Hover Micro-Interactions (Pixar Tactile Mass)
* **Animation Physics**: Center-expanding radial light-spread with Y-axis lift (`-1px`).
* **Execution**: Hovering over an item expands a pseudo-element (`::before`) radial light glow from scale 0 to 1 over **250ms** on the GPU thread.
* **Target UI**: `.ic-hover-light-spread`, nav file titles, tab headers, buttons.

---

### 3. Focus State Animations (Marvel Stark Telemetry)
* **Animation Physics**: Sliding horizontal energy beam with acceleration curve (`cubic-bezier(0.7, 0, 0.84, 0)`).
* **Execution**: Input focus triggers a 1px cyan light trace sliding across the bottom border (`translateX(-100%)` → `translateX(100%)`) over **1200ms**.
* **Target UI**: `.prompt-input-container`, `input[type="text"]:focus`, `.ic-focus-energy-trace`.

---

### 4. Selection State Shifts (Sovereign Authority)
* **Animation Physics**: Instantaneous weight shift with smooth gradient wash.
* **Execution**: Active file items reveal an inset purple indicator bar (`inset 2px 0 0 var(--ic-purple)`), a 90° gradient wash, and starlight text within **200ms**.
* **Target UI**: `.nav-file-title.is-active`, `.workspace-tab-header.is-active`.

---

### 5. Opening Sequences (Cinematic Reveal)
* **Animation Physics**: Dual-phase entrance: physical glass expansion + optical shimmer sweep.
* **Execution**: Command Palette opens via a 280ms kinetic scale-up, followed immediately by a 0.7s diagonal light-band shimmer sweep across the glass face (`ic-shimmer-sweep`).
* **Target UI**: `.prompt`, `.modal`.

---

### 6. Closing Sequences (Elastic Recoil)
* **Animation Physics**: Rapid elastic contraction without bounce.
* **Execution**: Component scales down from `scale(1.0)` to `scale(0.97)` while fading opacity to 0 over **200ms**.
* **Target UI**: Closing modals, dismissed tooltips.

---

### 7. Loading Telemetry Spinners (Arc-Reactor Physics)
* **Animation Physics**: Continuous 360° rotation and top-edge pulse lines.
* **Execution**: Concentric vector spell circles rotate at 360° over **60s**, while status bar top borders run an 8s continuous `translateX` pulse (`ic-reactor-pulse`).
* **Target UI**: Status bar top border, background loading indicators.

---

### 8. Scroll Dynamics (Chromium Compositor Timeline)
* **Animation Physics**: Inertial leaf parallax bound directly to viewport scroll.
* **Execution**: Native Chromium `animation-timeline: scroll(nearest block)` shifts leaf background radial gradients on the Y-axis (`translate3d(0, 3%, 0)` → `translate3d(0, -3%, 0)`).
* **Target UI**: `.workspace-leaf-content::after`.

---

### 9. Camera Movement & Viewport Transitions (Pixar Spatial Inertia)
* **Animation Physics**: Smooth 3D inertial panning and zoom dampening.
* **Execution**: Graph View panning and Canvas zoom operations follow a smooth cubic-bezier inertia curve (`cubic-bezier(0.25, 1, 0.5, 1)`), preventing abrupt viewport stops.
* **Target UI**: `.graph-view.view-content`, `.canvas-wrapper`.

---

### 10. Environmental Motion (Cosmic Atmosphere Drift)
* **Animation Physics**: Multi-plane floating drift at varying z-depth speeds.
* **Execution**: Layer A (Nebula) scales and drifts over **140s** (`ic-nebula-drift`); Layer D (Constellations) drifts linearly over **300s** (`ic-constellation-drift`).
* **Target UI**: Living Background Planes A through E.

---

### 11. Breathing Animations (Living Paper Physics)
* **Animation Physics**: Organic micro-scale respiratory pulse.
* **Execution**: Hovering quote callouts or manuscript cards executes a 400ms micro-breathe expansion to `scale(1.005)`, settling back to `scale(1.0)` on mouse leave.
* **Target UI**: `.callout[data-callout="quote"]`, `.callout[data-callout="note"]`.

---

### 12. Ambient Animations (Starlight Twinkle & Aurora Waves)
* **Animation Physics**: Sinusoidal opacity cycle & linear gradient position flow.
* **Execution**: Star particles cycle opacity between 50% and 90% over **7s** (`ic-star-twinkle`); aurora waves shift gradient position over **55s** (`ic-aurora-flow`).
* **Target UI**: Background Layer B (Stars) & Layer C (Aurora).

---

### 13. Magical Animations (Liquid Ink & Syntax Auras)
* **Animation Physics**: Viscous fluid dynamics.
* **Execution**: Hyperlink underlines expand liquid ink from `0%` to `100%` width over **350ms**; syntax tokens cast colored text-shadow glowing auras.
* **Target UI**: `a.internal-link`, `.token.keyword`, `.token.string`.

---

### 14. Technological Animations (Cybernetic Diagnostic HUDs)
* **Animation Physics**: High-frequency electronic telemetry scan.
* **Execution**: Code blocks project 4 corner HUD brackets (`::after`), horizontal scanlines (`repeating-linear-gradient`), and top-edge status shimmer lines over **10s**.
* **Target UI**: `pre.language-`, `.cm-s-obsidian .HyperMD-codeblock`.

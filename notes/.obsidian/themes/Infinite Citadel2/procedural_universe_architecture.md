# PROCEDURAL UNIVERSE ARCHITECTURE — INFINITE CITADEL
**Master Cosmic Environment & Engine Specification**

> *"The Citadel does not sit in empty space. It floats within a living, procedural cosmos."*

---

## 1. THE 12 COSMIC ENVIRONMENTAL PHENOMENA

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 12 PROCEDURAL COSMIC PHENOMENA                                              │
├────────────────────────┬──────────────────────────┬─────────────────────────┤
│ COSMIC PHENOMENON     │ PRIMARY RENDER ENGINE    │ RECOVERY & PERFORMANCE  │
├────────────────────────┼──────────────────────────┼─────────────────────────┤
│ 1. Deep Nebulae        │ CSS Multi-Radial Field   │ 0 ms CPU (Composited)   │
│ 2. Spiral Galaxies     │ Canvas 2D Spiral Matrix  │ 0.1 ms / frame          │
│ 3. Black Holes         │ SVG Lensing Filter + CSS │ Hardware Accelerated    │
│ 4. Relativistic Quasars│ Canvas 2D Jet Stream     │ Particle Budget: 20     │
│ 5. Aurora Waves        │ CSS Linear 115° Flow     │ 0 ms CPU (Composited)   │
│ 6. Airborne Dust       │ GPU Transformed Sprites  │ 0 ms CPU (Composited)   │
│ 7. Star Clusters       │ Multi-point Dot Matrix   │ 0 ms CPU (Opacity Only) │
│ 8. Meteor Showers      │ TypeScript Particle Loop │ Auto-Throttled at 45 FPS│
│ 9. Gravitational Lens  │ SVG feDisplacementMap    │ GPU Filter               │
│ 10. Celestial Storms   │ CSS calc() Hue Rotation  │ Session Phase Driven    │
│ 11. Orbital Bodies     │ SVG Planetary Rings      │ Composited Rotation     │
│ 12. Distant Cultures   │ SVG Constellation Tiles  │ 280px Rasterized Tile   │
└────────────────────────┴──────────────────────────┴─────────────────────────┘
```

---

## 2. TECHNICAL IMPLEMENTATION NOTES (CSS, Canvas 2D, SVG & TypeScript)

### 1. Deep Nebulae Clouds
* **CSS Implementation**: `.app-container::before` multi-point radial gradients with hue rotation.
* **Canvas 2D**: `ctx.createRadialGradient(x, y, r1, x, y, r2)` blending purple (`#9b6bf2`) and cyan (`#55e6ec`) colors.
* **SVG**: `feTurbulence` + `feColorMatrix` for volumetric gaseous density map.
* **TypeScript Driver**: Controls `--ic-nebula-opacity` and `--ic-sky-phase` based on time of day.

---

### 2. Spiral Galaxies
* **CSS Implementation**: Radial gradient core with 2D rotation keyframe (`ic-galaxy-spin`).
* **Canvas 2D**: Rendered using Archimedean spiral formula:  
  `x = (a + b * theta) * Math.cos(theta)`  
  `y = (a + b * theta) * Math.sin(theta)`
* **SVG**: Concentric elliptical paths with stroke dasharray opacity decay.
* **TypeScript Driver**: `StarfieldLayer` generates 50 particle dots along spiral arms.

---

### 3. Black Holes & Accretion Disks
* **CSS Implementation**: Deep void center (`#05060b`) surrounded by a searing gold-cyan accretion ring (`border-radius: 50%`, `box-shadow: 0 0 40px var(--ic-gold)`).
* **Canvas 2D**: Arc stroke with inner shadow and radial gravitational light suction.
* **SVG**: `<circle>` with radial gradient fill fading to complete blackness.
* **TypeScript Driver**: Positioned at fixed cosmic coordinates `(x: 0.85 * width, y: 0.15 * height)`.

---

### 4. Relativistic Quasars
* **CSS Implementation**: Searing linear gradient beam projecting vertically across the viewport (`linear-gradient(0deg, transparent, var(--ic-arc-cyan), transparent)`).
* **Canvas 2D**: High-velocity directional particle jet stream with alpha decay.
* **SVG**: Beam path with Gaussian blur filter (`stdDeviation="4"`).
* **TypeScript Driver**: Triggers an energy pulse once every 120 seconds.

---

### 5. Aurora Energy Waves
* **CSS Implementation**: `.workspace::before` linear gradient (115°) with 220% background size drifting via `background-position` (`ic-aurora-flow`).
* **Canvas 2D**: Sine wave path rendering: `y = A * Math.sin(w * x + phase)`.
* **SVG**: Animated `<path>` with gradient stroke fill.
* **TypeScript Driver**: Bound to `--ic-aurora-flow-speed` (55s loop).

---

### 6. Airborne Cosmic Dust
* **CSS Implementation**: Airborne gold dust particles drifting via GPU `transform: translate3d()`.
* **Canvas 2D**: Small filled arcs (`r = 0.8px`) rendered with low opacity (`0.1`–`0.3`).
* **SVG**: Scattered `<circle>` elements with CSS drift animation.
* **TypeScript Driver**: Updated in main canvas render loop; auto-halved by `PerformanceMonitor` if FPS drops below 45.

---

### 7. Dense Star Clusters
* **CSS Implementation**: `.app-container::after` multi-point dot matrix with opacity pulse (`ic-star-twinkle`).
* **Canvas 2D**: Batch rendering of 100 twinkling arc stars.
* **SVG**: `<g>` element containing clustered stars with variable opacities.
* **TypeScript Driver**: `StarfieldLayer.render(ctx, throttled)` in `src/canvas/layers/starfield.ts`.

---

### 8. High-Velocity Meteor Showers
* **CSS Implementation**: Linear streak lines with 45° translation animations.
* **Canvas 2D**: Fast line drawing with trail fade: `ctx.lineTo(x - dx, y - dy)`.
* **SVG**: Animated `<line>` elements with gradient stroke.
* **TypeScript Driver**: Spawns random shooting star vectors at interval ticks.

---

### 9. Gravitational Lensing
* **CSS Implementation**: Backdrop filter radial distortion (`backdrop-filter: blur(4px) contrast(120%)`).
* **Canvas 2D**: Pixel manipulation using radial coordinate displacement.
* **SVG**: `feDisplacementMap` distorting background graphics around black hole coordinates.
* **TypeScript Driver**: Adjusts distortion scale based on distance from black hole center.

---

### 10. Celestial Storms
* **CSS Implementation**: Dynamic hue shifting: `filter: hue-rotate(calc(var(--ic-sky-phase) * 15deg))`.
* **Canvas 2D**: Perlin noise color map modulating background canvas RGB values.
* **SVG**: Turbulent color matrix filter modulating background elements.
* **TypeScript Driver**: Advances sky phase from 0 to 1 over long session periods.

---

### 11. Orbital Bodies (Moons & Planets)
* **CSS Implementation**: Circular spheres with inner shadow bevels executing 360° container rotations.
* **Canvas 2D**: Arc rendering with 3D spherical radial shading.
* **SVG**: `<circle>` with radial gradient offset to mimic 3D spherical lighting.
* **TypeScript Driver**: Updates orbital angle: `angle += orbitalSpeed`.

---

### 12. Distant Civilizations (Constellation Tiles)
* **Physical Representation**: Geometric vector lines connecting ancient distant relay beacons across space.
* **CSS Implementation**: `.workspace::after` SVG data-URI tile drifting over 300s (`ic-constellation-drift`).
* **Canvas 2D**: Vector line connections drawn between major star nodes.
* **SVG**: `<path stroke="rgba(199,212,227,0.14)" stroke-width="0.5" fill="none">`.
* **TypeScript Driver**: Bound to `--ic-constellations-opacity` (default: 0.35).

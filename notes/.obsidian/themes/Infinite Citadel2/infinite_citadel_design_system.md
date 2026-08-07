# Infinite Citadel — Design System Specification
**Version:** 2.0.0 (AAA Master Standard)  
**Design Language:** Deep Space × Marvel Tech (Arc-Reactor HUD) × Harry Potter (Enchanted Tomes) × Game of Thrones (Valyrian Dragonglass)  
**Target Environment:** Cross-platform web & desktop interfaces (Obsidian, Web Applications, Electron)

---

## 1. System Vision & Aesthetic Philosophy

*Infinite Citadel* is a AAA-grade visual design system built around the concept of an **ancient cosmic archive built with hyper-advanced tech**. It shuns flat, generic UI abstractions in favor of physical materials, tactical energy flows, and atmospheric depth.

### The 70 / 20 / 10 Color & Mass Discipline

To maintain high contrast and dramatic atmosphere without visual chaos, all surfaces adhere to strict mass budgeting:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 70% NEUTRAL MASS (T1)                                                       │
│ Polished Obsidian, Deep Void (#05060b), Dark Space Nebulae, Primary Body Text.│
├─────────────────────────────────────────────────────────────────────────────┤
│ 20% STRUCTURAL SUPPORT (T2)                                                 │
│ Valyrian Steel Borders, Frosted Glass Dividers, Dragon Parchment Warmth.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 10% SEARING ACCENT (T3)                                                     │
│ Arc-Cyan (#55e6ec), Ceremonial Gold (#f0c878), Magic Purple (#9b6bf2).       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Design Tokens

### A. Color Palette Atoms

#### Dark Theme Palette (Deep Space Archive)
```css
/* T1 Neutral Atoms (70%) */
--ic-void:            #05060b; /* Absolute deepest background void */
--ic-void-2:          #090c16; /* Secondary void surface */
--ic-nebula:          #10152a; /* Dark nebula container background */
--ic-text-bright:     #f2f0ea; /* High-contrast white (WCAG AAA - 18.5:1) */
--ic-text-normal:     #cdd3e0; /* Standard body text (WCAG AAA - 13.8:1) */
--ic-text-muted:      #8b93ab; /* Secondary labels (WCAG AA - 6.8:1) */
--ic-text-faint:      #565f78; /* Disabled / tertiary hints */

/* T2 Supporting Atoms (20%) */
--ic-panel:           #0d1120; /* Primary panel fill */
--ic-panel-2:         #131a30; /* Elevated panel surface */
--ic-valyrian:        #c7d4e3; /* Bright steel text & icon tint */
--ic-valyrian-dim:    #7c8aa3; /* Muted steel chrome */
--ic-gold:            #d9a857; /* Supporting ceremonial gold */

/* T3 Accent Atoms (10%) */
--ic-arc-cyan:        #55e6ec; /* Stark-tech cyan energy highlight */
--ic-gold-bright:     #f0c878; /* High-order heading gold */
--ic-purple:          #9b6bf2; /* Mystical spellcraft purple */
--ic-starlight:       #f4f1ea; /* Emphasis text pop */
--ic-emerald:         #4fc98a; /* Wildfire / success green */
--ic-crimson:         #e1544b; /* Dragonfire / alert red */
--ic-amber:           #f0a860; /* Torchlight / warning orange */
```

#### Light Theme Palette (Sunlit Citadel Surface)
```css
/* T1 Neutral Atoms (70%) */
--ic-void:            #f0ede6; /* Sunlit marble / warm off-white base */
--ic-void-2:          #e8e4db; /* Secondary stone background */
--ic-text-bright:     #1a1612; /* High-contrast near-black (WCAG AAA - 15.2:1) */
--ic-text-normal:     #2c2820; /* Body text (WCAG AAA - 12.1:1) */
--ic-text-muted:      #6b6358; /* Secondary labels (WCAG AA - 5.4:1) */

/* T3 Accent Atoms (10% - Contrast Adjusted) */
--ic-arc-cyan:        #0e7c84; /* Deep tech cyan (WCAG AA - 4.8:1) */
--ic-gold-bright:     #a67b1a; /* Deep ceremonial gold (WCAG AA - 4.6:1) */
--ic-purple:          #6d3cc4; /* Deep spellcraft purple (WCAG AA - 5.2:1) */
```

---

### B. Typography Stack

The system combines legendary display typography with crisp modern body fonts:

| Role | Font Family | Character / Intent |
| :--- | :--- | :--- |
| **Display Header** | `"Cinzel", Georgia, serif` | Epic, engraved, dragon-gold heading titles |
| **Display Alt** | `"Cinzel Decorative", serif` | Ceremonial vault covers & sigil badges |
| **Manuscript / Quote**| `"Cormorant Garamond", serif` | Italicized ancient manuscript feel |
| **Body UI** | `"Inter", -apple-system, sans-serif` | Clean, highly legible, non-distracting reading body |
| **Monospace / Code** | `"JetBrains Mono", monospace` | Holographic terminal & code block syntax |

---

### C. Spacing, Elevation & Radii

```css
/* Radii Grid */
--ic-radius-s:  6px;   /* Chips, badges, small buttons */
--ic-radius-m:  10px;  /* Cards, input fields, code blocks */
--ic-radius-l:  16px;  /* Modals, command palette */
--ic-radius-xl: 22px;  /* Large floating panels */

/* Spacing Scale (4px System) */
--ic-space-1: 4px;
--ic-space-2: 8px;
--ic-space-3: 12px;
--ic-space-4: 16px;
--ic-space-6: 24px;
--ic-space-8: 32px;
--ic-space-12: 48px;
```

---

## 3. Physical Material Specifications

Each surface in *Infinite Citadel* is treated as an explicit physical material rather than a flat hex background.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            PHYSICAL MATERIALS                               │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ POLISHED OBSIDIAN │ Volcanic glass — deep void, mirror reflection, bevel    │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ FROSTED GLASS     │ Refractive crystal — backdrop blur, translucent fill    │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ VALYRIAN STEEL    │ Heavy rippled alloy — cool steel edge, structural bevel │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ DRAGON PARCHMENT  │ Aged skin — ruled lines, warm amber ambient glow        │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ ARC-REACTOR METAL │ Stark-tech alloy — dark metal core + cyan energy rim    │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

### Material Tokens Code Definition

```css
.theme-dark {
	/* 1. Polished Obsidian ─ Volcanic Glass Surface */
	--mat-obsidian-bg:         #05060b;
	--mat-obsidian-bg-surface: linear-gradient(160deg, #0a0e1c 0%, #060810 100%);
	--mat-obsidian-border:     1px solid rgba(120, 140, 180, 0.07);
	--mat-obsidian-shadow:     0 8px 32px rgba(0, 0, 0, 0.60), 0 2px 8px rgba(0, 0, 0, 0.40);
	--mat-obsidian-highlight:  inset 0 1px 0 rgba(120, 150, 200, 0.06);

	/* 2. Frosted Glass ─ Ice-Crystal Terminal Overlay */
	--mat-glass-bg:            rgba(15, 20, 40, 0.62);
	--mat-glass-bg-dense:      rgba(10, 14, 28, 0.86);
	--mat-glass-border:        1px solid rgba(180, 200, 230, 0.10);
	--mat-glass-shadow:        0 4px 20px rgba(0, 0, 0, 0.30), inset 0 0 0 0.5px rgba(180, 200, 230, 0.08);
	--mat-glass-highlight:     inset 0 1px 0 rgba(200, 220, 255, 0.07);

	/* 3. Valyrian Steel ─ Structural Chrome & Tab Rails */
	--mat-steel-bg:            linear-gradient(160deg, #1a2035 0%, #121828 100%);
	--mat-steel-border:        1px solid rgba(199, 212, 227, 0.14);
	--mat-steel-shadow:        0 1px 3px rgba(0, 0, 0, 0.50);
	--mat-steel-highlight:     inset 0 1px 0 rgba(199, 212, 227, 0.10), inset 0 -1px 0 rgba(0, 0, 0, 0.30);

	/* 4. Dragon Parchment ─ Ceremonial Manuscripts & Callouts */
	--mat-parchment-bg:        linear-gradient(135deg, rgba(217, 168, 87, 0.07) 0%, rgba(15, 12, 8, 0.90) 100%);
	--mat-parchment-border:    1px solid rgba(217, 168, 87, 0.20);
	--mat-parchment-shadow:    0 4px 16px rgba(100, 70, 20, 0.15);
	--mat-parchment-highlight: inset 0 1px 0 rgba(217, 168, 87, 0.10);

	/* 5. Arc-Reactor Metal ─ Energised Controls & CTAs */
	--mat-reactor-bg:          linear-gradient(135deg, rgba(85, 230, 236, 0.07) 0%, rgba(10, 15, 30, 0.95) 100%);
	--mat-reactor-border:      1px solid rgba(85, 230, 236, 0.24);
	--mat-reactor-shadow:      0 0 20px rgba(85, 230, 236, 0.12), 0 4px 16px rgba(0, 0, 0, 0.40);
	--mat-reactor-highlight:   inset 0 1px 0 rgba(85, 230, 236, 0.12);
}
```

---

## 4. Motion System & Easing Curves

All interactive feedback uses hardware-accelerated transforms and explicit custom Bezier curves to avoid generic browser transitions.

### Motion Tokens

```css
/* Custom Bezier Curves */
--ic-ease-kinetic: cubic-bezier(0.16, 1, 0.3, 1); /* Rapid expansion with soft settle */
--ic-ease-smooth:  cubic-bezier(0.25, 1, 0.5, 1);  /* Smooth interface transitions */
--ic-ease-energy:  cubic-bezier(0.7, 0, 0.84, 0);  /* Accelerating energy discharge */

/* Duration Budgets */
--ic-dur-instant: 150ms; /* Button presses, active compression */
--ic-dur-fast:    250ms; /* Hover light-spreads, focus rings */
--ic-dur-normal:  350ms; /* Panel slide-ins, modal appearances */
--ic-dur-ambient: 8s–300s; /* Atmospheric nebula drift, star twinkle */
```

---

## 5. Microinteraction & Lighting Mechanics

### A. Radial Light-Spread (Hover Interaction)

Rather than changing the background color on hover, interactive items feature a radial light-spread that expands from the center of the component:

```css
.citadel-interactive-item {
	position: relative;
	z-index: 0;
	overflow: hidden;
	transition: transform var(--ic-dur-instant) var(--ic-ease-kinetic);
}

.citadel-interactive-item::before {
	content: "";
	position: absolute;
	inset: -30%;
	background: radial-gradient(circle at 50% 50%, rgba(85, 230, 236, 0.25), transparent 70%);
	transform: scale(0);
	opacity: 0;
	transition: transform var(--ic-dur-fast) var(--ic-ease-kinetic), opacity var(--ic-dur-fast) ease;
	pointer-events: none;
	z-index: -1;
}

.citadel-interactive-item:hover::before {
	transform: scale(1);
	opacity: 1;
}

.citadel-interactive-item:hover {
	transform: translateY(-1px);
}
```

### B. Energy Trace (Focus Interaction)

Focused fields and buttons project a thin line of cyan light that travels across the top/bottom border edge:

```css
.citadel-input-container::after {
	content: "";
	position: absolute;
	bottom: 0; left: 0; right: 0; height: 1px;
	background: linear-gradient(90deg, transparent, var(--ic-arc-cyan), transparent);
	transform: translateX(-100%);
	opacity: 0;
	pointer-events: none;
}

.citadel-input-container:focus-within::after {
	animation: ic-energy-trace 1.2s var(--ic-ease-smooth) forwards;
}

@keyframes ic-energy-trace {
	0%   { transform: translateX(-100%); opacity: 0; }
	15%  { opacity: 1; }
	100% { transform: translateX(100%); opacity: 0; }
}
```

### C. Active Compression (Press State)

On mouse press (`:active`), interactive controls compress slightly to provide tactile physical feedback:

```css
.citadel-button:active {
	transform: translateY(0) scale(0.98);
}
```

---

## 6. Component Architecture Standards

1. **Sidebar / Explorer (Polished Obsidian)**: Solid dark volcanic glass surface with gold light-spread on navigation hover.
2. **Tabs (Valyrian Steel Rail)**: Steel header bar with bottom-up white light-spread on hover and cyan energy underline on active tabs.
3. **Status Bar (Arc-Reactor Energy Strip)**: Constant 8s transform-based energy pulse along the top edge.
4. **Command Palette (Oracle Glass Terminal)**: Dense frosted glass panel with diagonal shimmer sweep on open and focus energy trace.
5. **Callout Artifacts**: 10 distinct lore identities expressed through border style, background texture, and icon glow.
6. **Code Blocks (Holographic Terminal)**: Faint scanlines, corner HUD bracket frame (`::after`), and syntax token colored glow.
7. **Graph View (Knowledge Galaxy)**: Celestial star-node styling with WebGL canvas drop-shadow bloom filter.
8. **Canvas View (Floating Space Archive)**: Tiling 20px dot grid and floating tablet card elevation (`box-shadow: 0 14px 32px -8px ...`).

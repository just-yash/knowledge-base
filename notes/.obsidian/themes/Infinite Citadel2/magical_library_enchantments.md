# THE MAGICAL LIBRARY OF INFINITE CITADEL
**Master Enchantment & Artifact Specification**

> *"Magic here is not theatrical trickery. It is the physical manifestation of deep wisdom."*

---

## 1. THE 11 MAGICAL LIBRARY ENCHANTMENTS

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 11 MAGICAL LIBRARY ARTIFACTS                                                │
├────────────────────────┬───────────────────────────┬────────────────────────┤
│ MAGICAL ARTIFACT       │ PHYSICAL SPECIFICATION    │ OBSIDIAN UI TARGET     │
├────────────────────────┼───────────────────────────┼────────────────────────┤
│ 1. Magical Manuscripts │ Dragon vellum & gold foil │ Active Markdown Editor │
│ 2. Enchanted Books     │ Steel-ribbed book spines  │ Workspace Tabs & Nav   │
│ 3. Spell Circles       │ Concentric rotating rings │ Command Palette & Prompt│
│ 4. Ancient Runes       │ Chiseled glowing glyphs   │ Callout Header Icons   │
│ 5. Floating Candles    │ Warm flickering flames    │ Atmospheric Background │
│ 6. Magical Particles   │ Airborne golden dust      │ Volumetric Light Beams │
│ 7. Animated Ink        │ Liquid cyan & gold flow   │ Links & Energy Traces  │
│ 8. Glowing Glyphs      │ Syntax text-shadow auras  │ Code Blocks & Tokens   │
│ 9. Arcane Bookmarks    │ Gold vellum ribbon drape  │ Active Note Indicator  │
│ 10. Living Paper       │ Breathe effect on hover   │ Manuscript Callouts    │
│ 11. Enchanted Artwork  │ Brass-framed image embeds │ Image & Media Rendered │
└────────────────────────┴───────────────────────────┴────────────────────────┘
```

---

## 2. DETAILED ENCHANTMENT BLUEPRINTS & IMPLEMENTATIONS

### 1. Magical Manuscripts
* **Visual Enchantment**: The main reading pane reads like an ancient dragon-vellum manuscript. Ruled parchment lines (`repeating-linear-gradient(180deg, transparent 0px, transparent 26px, rgba(217, 168, 87, 0.04) 26px, rgba(217, 168, 87, 0.04) 28px)`) run under the text, while gold-leaf margin lines border the page.
* **UI Target**: `.markdown-preview-view`, `.cm-editor`.

---

### 2. Enchanted Books
* **Visual Enchantment**: Workspace tabs and file explorer entries are styled as steel-bound, leather-backed codices. Hovering a file header reveals golden foil titling that brightens under reader scrutiny.
* **UI Target**: `.workspace-tab-header`, `.nav-file-title`.

---

### 3. Spell Circles
* **Visual Enchantment**: When the Command Palette or Oracle Modal opens, a concentric vector spell ring (`data-image/svg+xml`) renders behind the modal, slowly rotating in mid-air (`transform: rotate(360deg)` over 60s) to synthesize intent.
* **UI Target**: `.prompt::before`, `.modal::before`.

---

### 4. Ancient Runes
* **Visual Enchantment**: Callout header icons and divider lines (`hr`) are treated as chiseled ancient runic marks. When hovered, the rune absorbs ambient light and emits a 6px golden aura (`filter: drop-shadow(0 0 6px var(--ic-gold))`).
* **UI Target**: `.callout-icon`, `hr`.

---

### 5. Floating Candles
* **Visual Enchantment**: Warm flickering candle flame points floating in the background atmosphere (`.app-container::after`), pulsing smoothly between 50% and 90% opacity over a 7s cycle (`ic-star-twinkle`).
* **UI Target**: Background Layer B.

---

### 6. Magical Particles
* **Visual Enchantment**: Airborne specks of golden star-dust drifting through volumetric light beams. As the reader scrolls through a document, particles drift gently across the z-plane without lagging the main thread.
* **UI Target**: `.workspace::before`.

---

### 7. Animated Ink
* **Visual Enchantment**: Hyperlinks and focus underlines act as liquid cyan and gold ink. Hovering a link flows liquid ink across the text line (`background-size: 0% 1px` → `100% 1px` in 0.35s), while active typing draws ink directly onto the vellum.
* **UI Target**: `a.internal-link`, `a.external-link`, `.prompt-input-container:focus-within::after`.

---

### 8. Glowing Glyphs
* **Visual Enchantment**: Code blocks and inline code render syntax tokens as glowing arcane runes. Keywords emit purple text-shadows, strings emit emerald text-shadows, and functions emit golden text-shadows.
* **UI Target**: `.token.keyword`, `.token.string`, `.token.function`, `.cm-inline-code`.

---

### 9. Arcane Bookmarks
* **Visual Enchantment**: The active file tab drapes a golden dragon-vellum bookmark ribbon (`::before`) over the top corner of the pane, featuring a 2px inset purple border and starlight title text.
* **UI Target**: `.workspace-tab-header.is-active`, `.nav-file-title.is-active`.

---

### 10. Living Paper
* **Visual Enchantment**: Quote callouts and note manuscript cards act as "Living Paper". When hovered, the card executes a subtle 0.4s micro-breathe expansion (`scale(1.005)`) as if absorbing the reader's presence.
* **UI Target**: `.callout[data-callout="quote"]`, `.callout[data-callout="note"]`.

---

### 11. Enchanted Artwork & Media
* **Visual Enchantment**: Embedded images and media diagrams (`.markdown-rendered img`) are framed in antiqued brass borders (`1px solid rgba(217, 168, 87, 0.28)`) with a soft 20px ambient aura drop-shadow (`box-shadow: 0 8px 32px rgba(0, 0, 0, 0.60)`).
* **UI Target**: `.markdown-rendered img`, `.canvas-node-content img`.

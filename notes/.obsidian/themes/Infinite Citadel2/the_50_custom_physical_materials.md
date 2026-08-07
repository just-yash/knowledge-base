# THE 50 CUSTOM PHYSICAL MATERIALS OF INFINITE CITADEL
**Master Physical Material Catalog & CSS Engineering Specification**

---

## CLASS 1: COSMIC & VOLCANIC GLASS SURFACES (Materials 1–10)

### 1. Void Obsidian
* **Origin**: Rapidly cooled volcanic lava at the core of a collapsed star.
* **Appearance**: Deep pitch-black mirror glass with chiseled bevel edges (`#05060b`).
* **Reflectivity**: High (0.85). Reflects ambient UI lights like dark water.
* **Roughness**: Ultra-smooth (0.05).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Absorbs direct glare; casts crisp specular highlights along 1px bevel borders.
* **Interaction with Magic**: Channels dark void energy, dampening background noise.
* **Interaction with Technology**: Provides zero-interference grounding for high-frequency telemetry.
* **CSS Strategy**: `background: linear-gradient(160deg, #0a0e1c 0%, #060810 100%); border: 1px solid rgba(120,140,180,0.07);`.
* **Motion Behavior**: Static structural mass with slow hue shift via `--ic-sky-phase`.
* **UI Usage**: Primary workspace base, main sidebar background, dock containers.

### 2. Nebula Crystal
* **Origin**: Grown inside high-pressure cosmic gas clouds over millions of cycles.
* **Appearance**: Translucent deep indigo-violet crystal with floating particulate inclusions.
* **Reflectivity**: Medium (0.50).
* **Roughness**: Smooth (0.15).
* **Transparency**: Semi-translucent (0.65).
* **Interaction with Light**: Refracts light into subtle purple and cyan caustics.
* **Interaction with Magic**: Glows brightly when spell-runes pass beneath it.
* **Interaction with Technology**: Functions as a optical wave-guide for laser search scanners.
* **CSS Strategy**: `background: rgba(15, 20, 40, 0.62); backdrop-filter: blur(16px) saturate(150%);`.
* **Motion Behavior**: Breathes opacity (`0.55` to `0.70`) during prompt entry.
* **UI Usage**: Search popups, quick switcher background, suggestion item cards.

### 3. Starlight Quartz
* **Origin**: Mineralized starlight dust crystallized in vacuum chambers.
* **Appearance**: Luminescent off-white quartz with micro-sparkle grain (`#f4f1ea`).
* **Reflectivity**: High specular (0.90).
* **Roughness**: Polished (0.08).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Emits a soft 10px white aura under direct focus.
* **Interaction with Magic**: Retains magical charge, making text written upon it glow.
* **Interaction with Technology**: Converts ambient light into digital signals.
* **CSS Strategy**: `color: #f4f1ea; text-shadow: 0 0 10px rgba(244,241,234,0.40);`.
* **Motion Behavior**: Twinkles smoothly via `opacity` transitions.
* **UI Usage**: H1 titles, active button text, emphasis highlights.

### 4. Singularity Glass
* **Origin**: Formed at the event horizon of a supermassive black hole.
* **Appearance**: Absolute black glass with zero edge reflections (`#000000`).
* **Reflectivity**: Zero (0.0).
* **Roughness**: Perfect (0.0).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Bends adjacent light rays inwards toward its center.
* **Interaction with Magic**: Absorbs unwanted spell feedback.
* **Interaction with Technology**: Shields sensitive data structures from memory corruption.
* **CSS Strategy**: `background: #000000; box-shadow: inset 0 0 20px rgba(0,0,0,0.95);`.
* **Motion Behavior**: Completely immobile.
* **UI Usage**: Dark mode code block background, modal backdrop covers.

### 5. Eclipse Silica
* **Origin**: Fused lunar sand collected during total solar eclipses.
* **Appearance**: Smoked grey glass with amber-gold rim lighting.
* **Reflectivity**: Low (0.25).
* **Roughness**: Satin (0.20).
* **Transparency**: Translucent (0.75).
* **Interaction with Light**: Filters bright light into warm amber hues.
* **Interaction with Magic**: Enhances warning runes.
* **Interaction with Technology**: Dips brightness automatically on low-battery states.
* **CSS Strategy**: `background: rgba(20, 16, 10, 0.85); border: 1px solid rgba(240,168,96,0.30);`.
* **Motion Behavior**: Fades in over 0.25s.
* **UI Usage**: Warning callouts, alert banners, toast notifications.

### 6. Comet Prism
* **Origin**: Ice-crystal core harvested from fast-moving interstellar comets.
* **Appearance**: Highly refractive prismatic glass casting rainbow spectral streaks.
* **Reflectivity**: Ultra-high (0.95).
* **Roughness**: Smooth (0.02).
* **Transparency**: High (0.80).
* **Interaction with Light**: Splits white light into cyan, gold, and purple bands.
* **Interaction with Magic**: Amplifies spell circle rotations.
* **Interaction with Technology**: Acts as a multi-band data splitter.
* **CSS Strategy**: `background: linear-gradient(105deg, transparent, rgba(85,230,236,0.15), rgba(155,107,242,0.15));`.
* **Motion Behavior**: Shimmer sweep across the glass face (`ic-shimmer-sweep`).
* **UI Usage**: Command palette shimmer overlay, modal glass edges.

### 7. Aurora Fluorite
* **Origin**: Deposited along Northern geomagnetic fault lines over millennia.
* **Appearance**: Iridescent green-cyan mineral glass with internal wave banding.
* **Reflectivity**: Medium (0.40).
* **Roughness**: Polished (0.10).
* **Transparency**: Translucent (0.50).
* **Interaction with Light**: Shimmers with green energy under ultraviolet light.
* **Interaction with Magic**: Resonates with wildfire energy.
* **Interaction with Technology**: Signals successful system operations.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(79,201,138,0.15), rgba(19,24,45,0.60));`.
* **Motion Behavior**: Continuous wave flow animation.
* **UI Usage**: Success callouts, completed task checkboxes.

### 8. Celestial Amber
* **Origin**: Fossilized sap from ancient cosmic trees at the dawn of creation.
* **Appearance**: Warm honey-gold translucent resin with embedded starlight specks.
* **Reflectivity**: Soft (0.35).
* **Roughness**: Waxy (0.25).
* **Transparency**: Translucent (0.60).
* **Interaction with Light**: Emits a warm torchlight glow (`#d9a857`).
* **Interaction with Magic**: Preserves historical notes in stasis.
* **Interaction with Technology**: Stores configuration settings safely.
* **CSS Strategy**: `background: rgba(217,168,87,0.12); border: 1px solid rgba(217,168,87,0.25);`.
* **Motion Behavior**: Pulses warmth on hover.
* **UI Usage**: Note tags, gold ledger headers, bookmark ribbons.

### 9. Event-Horizon Mirror
* **Origin**: Electro-plated cosmic glass positioned at a black hole ergosphere.
* **Appearance**: Infinite-depth mirror surface projecting inverted reflections.
* **Reflectivity**: Absolute (1.0).
* **Roughness**: Perfect (0.0).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Doubles ambient lighting intensity.
* **Interaction with Magic**: Creates reflective oracle mirrors.
* **Interaction with Technology**: Displays real-time system mirrors.
* **CSS Strategy**: `background: linear-gradient(155deg, rgba(199,212,227,0.08), transparent);`.
* **Motion Behavior**: Mirror distortion on cursor hover.
* **UI Usage**: Oracle Mirror question callout, context menus.

### 10. Dark Matte Opal
* **Origin**: Unpolished volcanic opal found in deep mantle trenches.
* **Appearance**: Charcoal-black surface with hidden subterranean color flashes.
* **Reflectivity**: Matte (0.05).
* **Roughness**: Micro-rough (0.40).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Diffuses light evenly without glare.
* **Interaction with Magic**: Dampens spell feedback.
* **Interaction with Technology**: Absorbs touch reflections.
* **CSS Strategy**: `background: #090c16; border: 1px solid rgba(199,212,227,0.06);`.
* **Motion Behavior**: Static mass.
* **UI Usage**: Secondary panel surfaces, file explorer background.

---

## CLASS 2: SOVEREIGN METALLIC ALLOYS (Materials 11–20)

### 11. Valyrian Steel
* **Origin**: Ancient dragon-forged alloy folded thousands of times.
* **Appearance**: Cool grey-blue rippled metal with a sharp metallic sheen (`#c7d4e3`).
* **Reflectivity**: Metallic High (0.75).
* **Roughness**: Precision-Ground (0.08).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Produces razor-sharp specular bevel highlights.
* **Interaction with Magic**: Never rusts or loses its edge under spellfire.
* **Interaction with Technology**: High structural strength for layout splitters.
* **CSS Strategy**: `background: linear-gradient(160deg, #1a2035 0%, #121828 100%); border: 1px solid rgba(199,212,227,0.14);`.
* **Motion Behavior**: Slides smoothly (`transform 250ms`).
* **UI Usage**: Workspace tab rails, ledger headers, structural dividers.

### 12. Arc-Forged Metal
* **Origin**: Stark cybernetic alloy infused with liquid cyan arc-energy.
* **Appearance**: Dark charcoal metal core with glowing cyan energy border rim (`#55e6ec`).
* **Reflectivity**: Metallic Medium (0.60).
* **Roughness**: Machined (0.12).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Emits an active 14px cyan energy glow aura.
* **Interaction with Magic**: Channels high-voltage arc magic.
* **Interaction with Technology**: Primary conductor for reactor telemetry.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(85,230,236,0.07), rgba(10,15,30,0.95)); border: 1px solid rgba(85,230,236,0.24);`.
* **Motion Behavior**: Continuous 8s linear border energy pulse.
* **UI Usage**: Primary CTA buttons, status bar energy strip.

### 13. Antiqued Brass
* **Origin**: Hand-cast copper-zinc alloy weathered over centuries.
* **Appearance**: Tarnished golden metal with green verdigris in low relief crevices.
* **Reflectivity**: Warm Metallic (0.45).
* **Roughness**: Cast Grain (0.30).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Warm amber reflections on high points.
* **Interaction with Magic**: Engraved with protective ward rings.
* **Interaction with Technology**: Durable dial controls.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(217,168,87,0.12), rgba(20,16,10,0.92)); border: 1px solid rgba(217,168,87,0.28);`.
* **Motion Behavior**: Micro-press scale (`0.98`) on click.
* **UI Usage**: Royal decree callouts, check seals, image frames.

### 14. Hammered Iron
* **Origin**: Subterranean charcoal iron quench-hardened in oil.
* **Appearance**: Pitted dark charcoal metal with heavy steel rivets.
* **Reflectivity**: Low Metallic (0.20).
* **Roughness**: Hammer-Pitted (0.50).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Heavy dark occlusion shadows.
* **Interaction with Magic**: Suppresses unauthorized spell intrusion.
* **Interaction with Technology**: Heavy structural enclosure for raw code.
* **CSS Strategy**: `background: linear-gradient(150deg, #141722 0%, #0d0f17 100%); border: 1px solid rgba(100,115,140,0.22);`.
* **Motion Behavior**: Heavy, zero-elastic movement.
* **UI Usage**: Holographic code block shells, prompt input frames.

### 15. Solar Gold
* **Origin**: Refined from gold veins struck by solar flare radiation.
* **Appearance**: Brilliant ceremonial gold with incandescent yellow luster (`#f0c878`).
* **Reflectivity**: High Specular (0.90).
* **Roughness**: Polished (0.05).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Emits a 16px golden aura drop-shadow.
* **Interaction with Magic**: Represents supreme royal authority.
* **Interaction with Technology**: High-conductivity interconnects.
* **CSS Strategy**: `color: #f0c878; text-shadow: 0 0 16px rgba(240,200,120,0.35);`.
* **Motion Behavior**: Glows intensely on focus.
* **UI Usage**: H1 display titles, gold-leaf badges, primary headers.

### 16. Cyber-Titanium
* **Origin**: Aerospace-grade titanium forged in vacuum orbital foundries.
* **Appearance**: Matte gunmetal grey with precision-milled chamfers.
* **Reflectivity**: Satin Metal (0.40).
* **Roughness**: Machined (0.15).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Clean linear specular highlights.
* **Interaction with Magic**: Insulates delicate cyber-spell circuitry.
* **Interaction with Technology**: Light-weight panel chassis.
* **CSS Strategy**: `background: #171f3d; border: 1px solid rgba(199,212,227,0.18);`.
* **Motion Behavior**: Rapid kinetic translation (`150ms`).
* **UI Usage**: Secondary buttons, window control buttons.

### 17. Chrono-Copper
* **Origin**: Time-stabilized copper mined from temporal rift sites.
* **Appearance**: Deep reddish-brown copper with glowing temporal vein lines.
* **Reflectivity**: Warm Metal (0.50).
* **Roughness**: Fine Grain (0.22).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Shifts hue slightly based on session duration.
* **Interaction with Magic**: Measures time-dilation spells.
* **Interaction with Technology**: Drives system clock telemetry.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(240,168,96,0.12), #140e0a); border: 1px solid rgba(240,168,96,0.30);`.
* **Motion Behavior**: Pulses on clock ticks.
* **UI Usage**: Time stamps, calendar view active days, history log.

### 18. Void-Plated Silver
* **Origin**: Sterling silver alloy electro-plated in vacuum zero-G.
* **Appearance**: Bright cool silver with pitch-black shadow crevices.
* **Reflectivity**: Specular Mirror (0.92).
* **Roughness**: Smooth (0.04).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Sharp metallic reflections.
* **Interaction with Magic**: Reflects harmful spell energy.
* **Interaction with Technology**: High-frequency signal reflector.
* **CSS Strategy**: `background: linear-gradient(160deg, #2c354a, #121828); border: 1px solid rgba(244,241,234,0.30);`.
* **Motion Behavior**: Brightens on cursor hover.
* **UI Usage**: Unresolved link indicators, active slider thumbs.

### 19. Meteorite Electrum
* **Origin**: Naturally occurring gold-silver alloy harvested from fallen meteors.
* **Appearance**: Pale golden-silver metal with crystalline Wiedmanstätten patterns.
* **Reflectivity**: High (0.80).
* **Roughness**: Crystalline (0.18).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Scatters light along crystalline facet lines.
* **Interaction with Magic**: Channels meteor magic.
* **Interaction with Technology**: Cosmic ray sensor substrate.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(240,200,120,0.15), rgba(199,212,227,0.15));`.
* **Motion Behavior**: Shimmers on hover.
* **UI Usage**: Special achievement badges, vault profile title.

### 20. Plasma Platinum
* **Origin**: Platinum foil treated with high-energy plasma discharge.
* **Appearance**: Silvery-white metal with a subtle electric violet sheen (`#9b6bf2`).
* **Reflectivity**: High (0.85).
* **Roughness**: Ultra-smooth (0.06).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Emits a 16px purple glow.
* **Interaction with Magic**: Channels high-level arcane spells.
* **Interaction with Technology**: Superconducting data bus.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(155,107,242,0.18), #131a30); border: 1px solid rgba(155,107,242,0.35);`.
* **Motion Behavior**: Expand purple aura on focus.
* **UI Usage**: Info callouts, magic purple active items.

---

## CLASS 3: ENCHANTED ORGANIC MANUSCRIPTS (Materials 21–30)

### 21. Dragon Vellum
* **Origin**: Heat-treated dragon skin cured in aromatic cedar oil.
* **Appearance**: Aged warm amber skin with fine ruled lines (`#f0c878`).
* **Reflectivity**: Low Organic (0.15).
* **Roughness**: Fine Vellum (0.35).
* **Transparency**: Translucent Edge (0.10).
* **Interaction with Light**: Absorbs light warmly; text written upon it glows.
* **Interaction with Magic**: Absorbs ink magically; rewrites itself on intent.
* **Interaction with Technology**: Displays responsive digital manuscript text.
* **CSS Strategy**: `background: repeating-linear-gradient(180deg, transparent 0px, transparent 26px, rgba(217,168,87,0.04) 26px, rgba(217,168,87,0.04) 28px);`.
* **Motion Behavior**: Breathes micro-scale (`1.005`) on hover.
* **UI Usage**: Main Markdown reading workspace, note callouts.

### 22. Spell-Inscribed Parchment
* **Origin**: Heavy vellum parchment hand-stamped with protective golden ward circles.
* **Appearance**: Golden parchment sheet with glowing gold-leaf margin borders.
* **Reflectivity**: Low (0.18).
* **Roughness**: Parchment Grain (0.30).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Margin lines emit a 10px gold light aura.
* **Interaction with Magic**: Holds complex multi-line spell incantations.
* **Interaction with Technology**: Formats structured note blockquotes.
* **CSS Strategy**: `background: var(--mat-parchment-bg); border-left: 3px double #d9a857;`.
* **Motion Behavior**: Static manuscript elevation.
* **UI Usage**: Magic Scroll note callouts, blockquotes.

### 23. Runed Birch-Bark
* **Origin**: Harvested from ancient enchanted silver birch trees in frozen vaults.
* **Appearance**: Pale silver-white bark with dark horizontal lenticel dashes.
* **Reflectivity**: Low (0.10).
* **Roughness**: Bark Texture (0.45).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Soft diffuse white light scatter.
* **Interaction with Magic**: Channels elemental ice and nature runes.
* **Interaction with Technology**: Light-weight text card substrate.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(199,212,227,0.10), #0d1120); border-left: 2px dashed #c7d4e3;`.
* **Motion Behavior**: Static.
* **UI Usage**: Tip callouts, hint cards.

### 24. Sun-Cured Silk
* **Origin**: Woven from celestial silkworm threads dried in solar radiation towers.
* **Appearance**: Luminous golden-yellow fabric with a rich satin sheen.
* **Reflectivity**: Sheen (0.50).
* **Roughness**: Silky Smooth (0.10).
* **Transparency**: Semi-translucent (0.30).
* **Interaction with Light**: Shimmers gold when light passes across its weave.
* **Interaction with Magic**: Holds high-level ceremonial decrees.
* **Interaction with Technology**: High-density flexible display layer.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(240,200,120,0.20), rgba(20,16,10,0.90));`.
* **Motion Behavior**: Wave shimmer on focus.
* **UI Usage**: Important notices, golden decree callouts.

### 25. Phoenix Papyrus
* **Origin**: Pressed from reeds growing in volcanic magma pools.
* **Appearance**: Fiery crimson-amber papyrus sheet with charred dark edges.
* **Reflectivity**: Low (0.12).
* **Roughness**: Coarse Papyrus (0.50).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Emits a faint red ember glow along borders (`#e1544b`).
* **Interaction with Magic**: Resonates with dragonfire and danger spells.
* **Interaction with Technology**: Red-alert status diagnostic card.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(225,84,75,0.10), rgba(19,24,45,0.50)); border-left: 4px solid #e1544b;`.
* **Motion Behavior**: Smouldering edge glow pulse.
* **UI Usage**: Danger callouts, error messages, bug alerts.

### 26. Lunar Membrane
* **Origin**: Harvested from deep-space bioluminescent organisms.
* **Appearance**: Pale blue translucent skin with soft glowing vein networks.
* **Reflectivity**: Diffuse Glow (0.30).
* **Roughness**: Smooth (0.15).
* **Transparency**: Translucent (0.70).
* **Interaction with Light**: Glows softly in total darkness (`#55e6ec`).
* **Interaction with Magic**: Displays oracle mirror visions.
* **Interaction with Technology**: Organic touch-input surface.
* **CSS Strategy**: `background: rgba(85,230,236,0.08); border: 1px solid rgba(85,230,236,0.20);`.
* **Motion Behavior**: Pulse glow on touch.
* **UI Usage**: Question callouts, help popups, FAQ cards.

### 27. Shadow-Weave Cloth
* **Origin**: Woven from void threads in lightless subterranean looms.
* **Appearance**: Deep charcoal-black fabric that absorbs 99% of incoming light.
* **Reflectivity**: Zero (0.0).
* **Roughness**: Soft Matte (0.40).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Creates absolute shadow boundaries.
* **Interaction with Magic**: Conceals hidden information until invoked.
* **Interaction with Technology**: Dark-mode privacy shield.
* **CSS Strategy**: `background: rgba(5,6,11,0.95); border: 1px solid rgba(100,115,140,0.15);`.
* **Motion Behavior**: Static.
* **UI Usage**: Fallen Ward failure callouts, hidden text blocks.

### 28. Alchemical Folio
* **Origin**: Treated with mercury and sulfur salts in alchemical laboratories.
* **Appearance**: Silver-tinted parchment sheet with metallic chemical stains.
* **Reflectivity**: Metallic Sheen (0.35).
* **Roughness**: Medium (0.25).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Metallic reflections along reagent stains.
* **Interaction with Magic**: Records experimental formulas.
* **Interaction with Technology**: Formats technical calculations.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(124,138,163,0.08), rgba(19,24,45,0.50)); border-left: 2px solid #7c8aa3;`.
* **Motion Behavior**: Static.
* **UI Usage**: Example callouts, lab notes.

### 29. Celestial Leaf
* **Origin**: Pressed from leaves of the Great World Tree at the universe core.
* **Appearance**: Deep emerald-green leaf membrane with glowing golden veins.
* **Reflectivity**: Satin (0.25).
* **Roughness**: Leaf Texture (0.20).
* **Transparency**: Semi-translucent (0.40).
* **Interaction with Light**: Filters light into vibrant emerald caustics (`#4fc98a`).
* **Interaction with Magic**: Channels growth and wildfire life magic.
* **Interaction with Technology**: Displays successful compilation status.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(79,201,138,0.09), rgba(19,24,45,0.50)); border-left: 3px solid #4fc98a;`.
* **Motion Behavior**: Glows emerald on success.
* **UI Usage**: Success callouts, completed task items.

### 30. Eon Leather
* **Origin**: Cured hide of ancient leviathans preserved in deep ice vaults.
* **Appearance**: Dark brown-black textured leather with heavy brass corner studs.
* **Reflectivity**: Low (0.10).
* **Roughness**: Heavy Grain (0.60).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Warm diffuse reflections on raised grain.
* **Interaction with Magic**: Binds thousands of manuscript pages together.
* **Interaction with Technology**: Heavy outer protective casing.
* **CSS Strategy**: `background: linear-gradient(160deg, #140e0a, #080604); border: 1px solid rgba(217,168,87,0.20);`.
* **Motion Behavior**: Heavy, rock-solid feel.
* **UI Usage**: Workspace drawer headers, main vault covers.

---

## CLASS 4: ARCHITECTURAL MASONRY & STONE (Materials 31–40)

### 31. Soot Basalt (Dragonstone)
* **Origin**: Coarse volcanic basalt carved directly from subterranean fault lines.
* **Appearance**: Soot-dark porous basaltic stone with micro-fractures (`#0f121a`).
* **Reflectivity**: Matte (0.08).
* **Roughness**: Coarse Porous (0.65).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Absorbs ambient light; casts deep ground shadows.
* **Interaction with Magic**: Resistant to dragonfire and high-heat spells.
* **Interaction with Technology**: Heavy structural foundation blocks.
* **CSS Strategy**: `background: linear-gradient(145deg, #0f121a 0%, #080a10 100%); border: 1px solid rgba(80,95,120,0.18);`.
* **Motion Behavior**: Immobile mass.
* **UI Usage**: Structural split dividers, modal backdrop covers.

### 32. Veined Ivory Marble
* **Origin**: Quarried from mountain peaks; smoothed with pumice and beeswax.
* **Appearance**: Deep veined ivory-granite stone with grey-gold vein patterns (`#1f2538`).
* **Reflectivity**: Polished Specular (0.70).
* **Roughness**: Smooth (0.08).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Warm ambient light bounce.
* **Interaction with Magic**: Engraved with sovereign Latinate runes.
* **Interaction with Technology**: Polished reading desk substrate.
* **CSS Strategy**: `background: linear-gradient(135deg, #1f2538 0%, #141928 100%); border: 1px solid rgba(220,210,190,0.18);`.
* **Motion Behavior**: Static.
* **UI Usage**: Reading desks, primary note containers, metadata panels.

### 33. Runic Granite
* **Origin**: Igneous granite quartz carved with chiseled runic channels.
* **Appearance**: Speckled grey-black granite with gold-leaf filled runic grooves.
* **Reflectivity**: Low Specular (0.25).
* **Roughness**: Chiseled (0.40).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Runic grooves glow gold when illuminated.
* **Interaction with Magic**: Directs spell energy along runic channels.
* **Interaction with Technology**: Structural bus conduit for power lines.
* **CSS Strategy**: `background: #10152a; border-bottom: 1px solid rgba(217,168,87,0.25);`.
* **Motion Behavior**: Static.
* **UI Usage**: Heading sublines, table header rows.

### 34. Astral Lapis
* **Origin**: Deep blue metamorphic rock laced with golden pyrite flecks.
* **Appearance**: Royal blue stone resembling a midnight sky filled with stars.
* **Reflectivity**: Medium (0.35).
* **Roughness**: Polished (0.12).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Pyrite flecks sparkle brightly under point lights.
* **Interaction with Magic**: Resonates with high cosmic magic.
* **Interaction with Technology**: Quantum optical storage substrate.
* **CSS Strategy**: `background: linear-gradient(135deg, #101830, #090d1a); border: 1px solid rgba(155,107,242,0.30);`.
* **Motion Behavior**: Sparkles on hover.
* **UI Usage**: Graph controls drawer, special plugin panels.

### 35. Subterranean Slate
* **Origin**: Foliated metamorphic rock split into smooth flat sheets.
* **Appearance**: Dark charcoal-grey stone with layered horizontal grain.
* **Reflectivity**: Low Matte (0.12).
* **Roughness**: Layered Grain (0.30).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Soft flat diffuse reflection.
* **Interaction with Magic**: Used for scribing temporary chalk runes.
* **Interaction with Technology**: Scratchpad display surface.
* **CSS Strategy**: `background: #0d1120; border: 1px solid rgba(124,138,163,0.15);`.
* **Motion Behavior**: Static.
* **UI Usage**: Slate note panels, scratchpads, secondary sidebars.

### 36. Chiseled Sandstone
* **Origin**: Sedimented quartz sand hardened under prehistoric seas.
* **Appearance**: Warm ochre-tan stone with coarse chiseled tool marks.
* **Reflectivity**: Low (0.05).
* **Roughness**: Coarse Sand (0.70).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Diffuses light with warm golden tones.
* **Interaction with Magic**: Holds ancient desert wards.
* **Interaction with Technology**: Thermal insulator block.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(217,168,87,0.15), #140e0a);`.
* **Motion Behavior**: Immobile.
* **UI Usage**: Light theme stone surfaces, warmth accents.

### 37. Pyrite-Laced Ore
* **Origin**: Subterranean iron ore embedded with metallic fool's gold crystals.
* **Appearance**: Dark metallic grey stone with glittering brass-gold crystal clusters.
* **Reflectivity**: Metallic Sparkle (0.60).
* **Roughness**: Crystalline Rough (0.50).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Glittering specular flashes under moving lights.
* **Interaction with Magic**: Channels ground energy.
* **Interaction with Technology**: Electrical ground bus.
* **CSS Strategy**: `background: linear-gradient(135deg, #1a2035, #0a0e1c); border: 1px solid rgba(217,168,87,0.20);`.
* **Motion Behavior**: Sparkles on cursor movement.
* **UI Usage**: Table borders, card highlights.

### 38. Nether Shackle-Stone
* **Origin**: Dense black stone forged in high-gravity subterranean penal vaults.
* **Appearance**: Ultra-dense pitch-black stone with iron shackle ring anchors.
* **Reflectivity**: Zero (0.02).
* **Roughness**: Heavy (0.60).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Heavy dark shadows; zero light bounce.
* **Interaction with Magic**: Binds dangerous spells in stasis.
* **Interaction with Technology**: High-security encryption vault container.
* **CSS Strategy**: `background: #05060b; border: 2px solid rgba(100,115,140,0.30);`.
* **Motion Behavior**: Immobile.
* **UI Usage**: Locked note containers, encryption modals.

### 39. Crypt Lime-Mortar
* **Origin**: Ancient calcified lime mortar binding granite blocks for ten millennia.
* **Appearance**: Pale grey-white weathered mortar joints between dark stones.
* **Reflectivity**: Low (0.05).
* **Roughness**: Chalky (0.55).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Diffuses light flatly.
* **Interaction with Magic**: Seals gaps between spell wards.
* **Interaction with Technology**: Fills seams between UI containers.
* **CSS Strategy**: `border-color: rgba(199,212,227,0.10);`.
* **Motion Behavior**: Static.
* **UI Usage**: Container seam dividers, pane grid lines.

### 40. Star-Felled Monolith
* **Origin**: Single colossal block of meteor stone carved into a central obelisk.
* **Appearance**: Deep black-blue stone with glowing cyan vein channels (`#55e6ec`).
* **Reflectivity**: High (0.75).
* **Roughness**: Precision Carved (0.05).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Cyan veins glow intensely under point lights.
* **Interaction with Magic**: Main magical conduit for the entire Citadel.
* **Interaction with Technology**: Primary mainframe server rack.
* **CSS Strategy**: `background: linear-gradient(180deg, #0a0e1c, #05060b); border-left: 3px solid #55e6ec;`.
* **Motion Behavior**: Cyan veins pulse continuously.
* **UI Usage**: Vault profile header, main application container.

---

## CLASS 5: HIGH-ENERGY CYBERNETIC SYNTHETIC SURFACES (Materials 41–50)

### 41. Stark Arc Polymer
* **Origin**: Synthetic high-density polymer engineered in Stark Tower laboratories.
* **Appearance**: Sleek semi-translucent dark cyan polymer with high impact resistance.
* **Reflectivity**: High Gloss (0.80).
* **Roughness**: Smooth (0.02).
* **Transparency**: Translucent (0.50).
* **Interaction with Light**: Directs internal cyan light along outer edges.
* **Interaction with Magic**: Insulates digital systems from spell interference.
* **Interaction with Technology**: Primary material for interactive UI buttons.
* **CSS Strategy**: `background: linear-gradient(135deg, rgba(85,230,236,0.20), rgba(155,107,242,0.10));`.
* **Motion Behavior**: Scales to `0.98` on click.
* **UI Usage**: Active button surfaces, CTA controls.

### 42. Quantum Hologram Matrix
* **Origin**: Projected 3D light-field generated by quantum interference arrays.
* **Appearance**: Volumetric cyan-purple light matrix floating in mid-air (`#55e6ec`).
* **Reflectivity**: Zero (0.0).
* **Roughness**: Non-physical (0.0).
* **Transparency**: High (0.85).
* **Interaction with Light**: Emits native light without absorbing external glare.
* **Interaction with Magic**: Synthesizes spell circle projections.
* **Interaction with Technology**: Renders 3D node graphs and canvas cards.
* **CSS Strategy**: `filter: drop-shadow(0 0 7px rgba(85,230,236,0.35)) drop-shadow(0 0 16px rgba(155,107,242,0.18));`.
* **Motion Behavior**: Rotates smoothly in 3D space.
* **UI Usage**: Graph View nodes, Canvas floating tablets.

### 43. Laser-Scanned Acrylic
* **Origin**: Precision optical acrylic etched with high-power UV lasers.
* **Appearance**: Crystal clear pane with illuminated white-cyan etched lines.
* **Reflectivity**: High (0.85).
* **Roughness**: Ultra-smooth (0.01).
* **Transparency**: High (0.90).
* **Interaction with Light**: Etched lines glow brightly when edge-lit.
* **Interaction with Magic**: Displays runic diagnostics.
* **Interaction with Technology**: Laser scanner target surface.
* **CSS Strategy**: `background: rgba(9,12,22,0.70); border: 1px solid rgba(85,230,236,0.30);`.
* **Motion Behavior**: Laser scanline sweeps across the surface.
* **UI Usage**: Search input fields, diagnostic prompt boxes.

### 44. Telemetry Carbon-Fiber
* **Origin**: Woven carbon-nanotube threads embedded with optical fiber telemetry strands.
* **Appearance**: Black woven cross-hatch pattern with twinkling cyan telemetry dots.
* **Reflectivity**: Low Woven (0.20).
* **Roughness**: Textured Weave (0.35).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Cross-hatch weave glints under moving lights.
* **Interaction with Magic**: Shields data from electromagnetic spells.
* **Interaction with Technology**: High-speed telemetry bus casing.
* **CSS Strategy**: `background: repeating-linear-gradient(45deg, #0a0e1c 0, #0a0e1c 2px, #05060b 2px, #05060b 4px);`.
* **Motion Behavior**: Static weave with pulsing telemetry dots.
* **UI Usage**: Status bar background, telemetry panels.

### 45. Plasma-Ion Shield
* **Origin**: High-voltage ion field contained by magnetic confinement rings.
* **Appearance**: Translucent blue-purple energy membrane pulsing at 60 Hz.
* **Reflectivity**: Energy Reflection (0.50).
* **Roughness**: Non-physical (0.0).
* **Transparency**: High (0.75).
* **Interaction with Light**: Absorbs incoming light and converts it to cyan energy.
* **Interaction with Magic**: Deflects hostile magic spells.
* **Interaction with Technology**: Protective fire-wall barrier.
* **CSS Strategy**: `box-shadow: 0 0 40px -10px rgba(85,230,236,0.25), inset 0 0 15px rgba(85,230,236,0.20);`.
* **Motion Behavior**: Continuous energy pulse.
* **UI Usage**: Modal dialog outer aura, focus rings.

### 46. Relativistic Fiber-Optic
* **Origin**: Bundled glass fibers carrying light at near-light speeds.
* **Appearance**: Flexible black cables emitting bright cyan-gold light at their tips.
* **Reflectivity**: Low Cable (0.15).
* **Roughness**: Smooth Cable (0.10).
* **Transparency**: Opaque cable, transparent core.
* **Interaction with Light**: Transmits light internally with zero signal loss.
* **Interaction with Magic**: Connects spell nodes together.
* **Interaction with Technology**: High-speed data interconnects.
* **CSS Strategy**: `stroke: #55e6ec; filter: drop-shadow(0 0 3px rgba(85,230,236,0.40));`.
* **Motion Behavior**: Light pulses travel along cable path.
* **UI Usage**: Canvas edge paths, graph connection lines.

### 47. Kinetic Nanotube Weave
* **Origin**: Flexible carbon nanotube fabric that hardens instantaneously on impact.
* **Appearance**: Dark grey metallic fabric with reactive hexagonal weave geometry.
* **Reflectivity**: Satin Metal (0.30).
* **Roughness**: Hexagonal Weave (0.25).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Hexagons brighten under direct cursor focus.
* **Interaction with Magic**: Absorbs physical spell impacts.
* **Interaction with Technology**: Tactile haptic feedback layer.
* **CSS Strategy**: `background: radial-gradient(circle at 50% 50%, rgba(85,230,236,0.20), transparent 65%);`.
* **Motion Behavior**: Expands scale 0 to 1 on hover (`.ic-hover-light-spread`).
* **UI Usage**: Interactive button hovers, nav title hovers.

### 48. Zero-Point Aerogel
* **Origin**: Ultra-light synthetic aerogel composed of 99.8% air and zero-point energy.
* **Appearance**: Ghostly translucent blue foam hovering with zero mass.
* **Reflectivity**: Ultra-low (0.05).
* **Roughness**: Velvet Smooth (0.02).
* **Transparency**: High (0.90).
* **Interaction with Light**: Scatters light with Rayleigh scattering (sky blue glow).
* **Interaction with Magic**: Suspends heavy objects in levitation.
* **Interaction with Technology**: Thermal barrier for quantum cores.
* **CSS Strategy**: `background: rgba(85,230,236,0.04); backdrop-filter: blur(20px);`.
* **Motion Behavior**: Floats smoothly on scroll parallax.
* **UI Usage**: Floating leaf parallax layer, tooltips.

### 49. Positron Grid Mesh
* **Origin**: Woven antimatter grid suspended in magnetic vacuum tubes.
* **Appearance**: Dark mesh grid laced with flickering bright purple positron dots (`#9b6bf2`).
* **Reflectivity**: Low (0.10).
* **Roughness**: Mesh (0.40).
* **Transparency**: Semi-translucent (0.40).
* **Interaction with Light**: Positron dots emit intense purple light spikes.
* **Interaction with Magic**: Channels high-energy containment magic.
* **Interaction with Technology**: Antimatter reactor containment grid.
* **CSS Strategy**: `background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(155,107,242,0.03) 3px, rgba(155,107,242,0.03) 4px);`.
* **Motion Behavior**: Scanline grid pulse.
* **UI Usage**: Code block scanlines, tag container backgrounds.

### 50. Graviton Lattice Alloy
* **Origin**: Super-dense alloy engineered to manipulate localized gravity fields.
* **Appearance**: Heavy dark steel lattice with glowing gold gravitational tension joints.
* **Reflectivity**: High Specular (0.75).
* **Roughness**: Engineered (0.08).
* **Transparency**: Opaque (0.0).
* **Interaction with Light**: Bends light around its tension joints.
* **Interaction with Magic**: Binds the entire Citadel structure together against collapse.
* **Interaction with Technology**: Structural framework for the entire UI layout.
* **CSS Strategy**: `background: var(--mat-steel-bg); box-shadow: 0 14px 32px -8px rgba(5,6,11,0.80), var(--ic-glow-cyan);`.
* **Motion Behavior**: Impervious to external movement.
* **UI Usage**: Outer application window frame, main workspace splitters.

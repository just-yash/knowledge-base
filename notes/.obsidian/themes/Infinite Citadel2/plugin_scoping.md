# Infinite Citadel Background Plugin — Technical Scoping & Architecture

A lightweight, high-performance companion Obsidian plugin written in TypeScript to render procedural background effects (starfields, nebulae, auroras) on an HTML5 2D Canvas behind the Obsidian workspace.

---

## 1. Minimal File & Module Structure

```text
obsidian-citadel-background/
├── manifest.json                  # Obsidian plugin manifest (id, name, version, minAppVersion)
├── package.json                   # Build scripts & Obsidian API dependency
├── tsconfig.json                  # Strict TypeScript configuration
├── esbuild.config.mjs             # Fast bundling script compiling src/main.ts -> main.js
└── src/
    ├── main.ts                    # Plugin lifecycle (onload, onunload, canvas DOM injection)
    ├── settings.ts                # CitadelSettings interface, DEFAULT_SETTINGS, & PluginSettingTab
    ├── canvas/
    │   ├── background.ts          # Main Canvas Manager (rAF loop, resize listener, visibility pause)
    │   └── layers/
    │       └── starfield.ts       # Star particle layer (Milestone 1 base renderer)
    └── utils/
        └── perf.ts                # Simple hardware detection & FPS monitor for auto-scaling
```

---

## 2. Obsidian Plugin API Integration

### A. Settings Data Contract (`src/settings.ts`)

```typescript
import { App, PluginSettingTab, Setting } from "obsidian";
import type CitadelBackgroundPlugin from "./main";

export interface CitadelSettings {
	enableStars: boolean;
	enableNebula: boolean;
	enableAurora: boolean;
	starDensity: number;       // 10 to 200 stars
	enableAutoPerf: boolean;   // Auto-scale particle count under frame drops
}

export const DEFAULT_SETTINGS: CitadelSettings = {
	enableStars: true,
	enableNebula: true,
	enableAurora: false,
	starDensity: 50,
	enableAutoPerf: true,
};

export class CitadelSettingTab extends PluginSettingTab {
	plugin: CitadelBackgroundPlugin;

	constructor(app: App, plugin: CitadelBackgroundPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "Infinite Citadel Background Settings" });

		new Setting(containerEl)
			.setName("Enable Starfield")
			.setDesc("Render procedural twinkling star particles.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableStars)
					.onChange(async (value) => {
						this.plugin.settings.enableStars = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Star Density")
			.setDesc("Number of star particles rendered in the background.")
			.addSlider((slider) =>
				slider
					.setLimits(10, 200, 10)
					.setValue(this.plugin.settings.starDensity)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.starDensity = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Auto Performance Guard")
			.setDesc("Automatically reduce density if frame rate drops below 45 FPS.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableAutoPerf)
					.onChange(async (value) => {
						this.plugin.settings.enableAutoPerf = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
```

### B. Plugin Entry Point & Lifecycle (`src/main.ts`)

```typescript
import { Plugin } from "obsidian";
import { CitadelSettings, DEFAULT_SETTINGS, CitadelSettingTab } from "./settings";
import { CanvasManager } from "./canvas/background";

export default class CitadelBackgroundPlugin extends Plugin {
	settings: CitadelSettings;
	canvasManager: CanvasManager | null = null;

	async onload() {
		await this.loadSettings();

		// Register setting tab
		this.addSettingTab(new CitadelSettingTab(this.app, this));

		// Wait for Obsidian layout ready to inject canvas into app container
		this.app.workspace.onLayoutReady(() => {
			this.initCanvas();
		});
	}

	initCanvas() {
		// Target the main container element
		const container = document.body.querySelector(".app-container") || document.body;
		this.canvasManager = new CanvasManager(container as HTMLElement, this.settings);
		this.canvasManager.start();
	}

	onunload() {
		// Clean up canvas element and cancel animation frames
		if (this.canvasManager) {
			this.canvasManager.destroy();
			this.canvasManager = null;
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
```

### C. Canvas Renderer & Frame Loop (`src/canvas/background.ts`)

```typescript
import { CitadelSettings } from "../settings";
import { StarfieldLayer } from "./layers/starfield";

export class CanvasManager {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private parentEl: HTMLElement;
	private settings: CitadelSettings;
	private animFrameId: number | null = null;
	private starfield: StarfieldLayer;
	private isVisible: boolean = true;

	constructor(parentEl: HTMLElement, settings: CitadelSettings) {
		this.parentEl = parentEl;
		this.settings = settings;

		// Create background canvas
		this.canvas = document.createElement("canvas");
		this.canvas.className = "citadel-bg-canvas";
		Object.assign(this.canvas.style, {
			position: "fixed",
			top: "0",
			left: "0",
			width: "100vw",
			height: "100vh",
			pointerEvents: "none",
			zIndex: "0", // Placed behind app UI workspace
		});

		const context = this.canvas.getContext("2d");
		if (!context) throw new Error("Could not get 2D canvas context");
		this.ctx = context;

		this.starfield = new StarfieldLayer(this.settings.starDensity);

		this.handleResize = this.handleResize.bind(this);
		this.handleVisibility = this.handleVisibility.bind(this);
	}

	public start() {
		this.parentEl.appendChild(this.canvas);
		window.addEventListener("resize", this.handleResize);
		document.addEventListener("visibilitychange", this.handleVisibility);
		this.handleResize();
		this.loop();
	}

	public updateSettings(newSettings: CitadelSettings) {
		this.settings = newSettings;
		this.starfield.setCount(this.settings.starDensity);
	}

	private handleResize() {
		const dpr = window.devicePixelRatio || 1;
		this.canvas.width = window.innerWidth * dpr;
		this.canvas.height = window.innerHeight * dpr;
		this.ctx.scale(dpr, dpr);
		this.starfield.resize(window.innerWidth, window.innerHeight);
	}

	private handleVisibility() {
		this.isVisible = document.visibilityState === "visible";
		if (this.isVisible && !this.animFrameId) {
			this.loop();
		}
	}

	private loop = () => {
		if (!this.isVisible) return;

		// Clear frame
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		// Render active layers
		if (this.settings.enableStars) {
			this.starfield.render(this.ctx);
		}

		this.animFrameId = requestAnimationFrame(this.loop);
	};

	public destroy() {
		if (this.animFrameId) {
			cancelAnimationFrame(this.animFrameId);
		}
		window.removeEventListener("resize", this.handleResize);
		document.removeEventListener("visibilitychange", this.handleVisibility);
		this.canvas.remove();
	}
}
```

---

## 3. Performance Auto-Scaling Strategy

1. **Canvas 2D Context Efficiency**:
   - WebGL is avoided for this scope; 2D Canvas is fast enough for <500 particle operations per frame.
   - Use `requestAnimationFrame` for vsync alignment.
   - Automatically pause the rendering loop when `document.visibilityState === "hidden"` to consume 0% CPU/GPU when Obsidian is minimized or in the background.

2. **FPS & Hardware Budget Guard (`src/utils/perf.ts`)**:
   - Detect low hardware concurrency (`navigator.hardwareConcurrency <= 4`).
   - Monitor average frame time across a sliding 60-frame window. If FPS drops below 45 FPS consistently for > 2 seconds, auto-clamp `starDensity` by 50% and disable heavy visual passes (e.g. shadow blur).

---

## 4. Phased Milestone Roadmap

| Milestone | Scope & Deliverable | Complexity | Status |
| :--- | :--- | :--- | :--- |
| **Milestone 1** <br>*(MVP)* | **Single Canvas Layer (50 Twinkling Stars)**<br>• Create `main.ts` plugin class with `onload()` and `onunload()`.<br>• Inject fixed canvas behind `.app-container`.<br>• Implement `StarfieldLayer` with 50 stars pulsing opacity via sine wave.<br>• Clean canvas destruction on plugin disable.<br>• **Zero extra features or complex abstractions.** | **Low** | **Ready for Dev** |
| **Milestone 2** | **Settings & Density Control**<br>• Add `PluginSettingTab` with toggle switch & density slider (10–200).<br>• Persist settings via `saveData()` / `loadData()`.<br>• Dynamic particle re-allocation on slider change without resetting position. | **Low-Medium** | Planned |
| **Milestone 3** | **Multi-Layer Atmosphere**<br>• Add procedural nebula cloud pass (`radial-gradient` drift).<br>• Add subtle aurora wave layer.<br>• Independent layer toggles in Settings Tab. | **Medium** | Planned |
| **Milestone 4** | **Auto Performance Guard**<br>• Frame-time accumulator loop.<br>• Automatic fallback to low-density mode on framerate dips.<br>• Hardware concurrency check on startup. | **Medium** | Planned |

---

### Milestone 1 Implementation Spec (`src/canvas/layers/starfield.ts`)

```typescript
interface Star {
	x: number;
	y: number;
	size: number;
	alpha: number;
	speed: number;
	phase: number;
}

export class StarfieldLayer {
	private stars: Star[] = [];
	private width: number = 0;
	private height: number = 0;

	constructor(count: number) {
		this.setCount(count);
	}

	public resize(w: number, h: number) {
		this.width = w;
		this.height = h;
		this.initStars(this.stars.length);
	}

	public setCount(count: number) {
		this.initStars(count);
	}

	private initStars(count: number) {
		this.stars = [];
		for (let i = 0; i < count; i++) {
			this.stars.push({
				x: Math.random() * (this.width || 1920),
				y: Math.random() * (this.height || 1080),
				size: Math.random() * 1.5 + 0.5,
				alpha: Math.random(),
				speed: Math.random() * 0.02 + 0.005,
				phase: Math.random() * Math.PI * 2,
			});
		}
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.fillStyle = "#f4f1ea";

		for (const star of this.stars) {
			// Twinkle opacity calculation using sine wave
			star.phase += star.speed;
			const opacity = (Math.sin(star.phase) + 1) / 2 * 0.7 + 0.2;

			ctx.globalAlpha = opacity;
			ctx.beginPath();
			ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}
}
```

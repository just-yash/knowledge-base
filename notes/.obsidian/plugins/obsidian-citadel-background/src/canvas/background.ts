import { CitadelSettings } from "../settings";
import { ILayer } from "./layers/layer";
import { StarfieldLayer } from "./layers/starfield";
import { DistantGalaxiesLayer } from "./layers/distantGalaxies";
import { NebulaLayer } from "./layers/nebula";
import { VolumetricFogLayer } from "./layers/volumetricFog";
import { DustLayer } from "./layers/dust";
import { PerformanceMonitor } from "../utils/perf";

export class CanvasManager {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private parentEl: HTMLElement;
	private settings: CitadelSettings;
	private animFrameId: number | null = null;
	private perfMonitor: PerformanceMonitor;
	private isVisible: boolean = true;
	private time: number = 0;

	// Layers
	private starfield: StarfieldLayer;
	private galaxies: DistantGalaxiesLayer;
	private nebula: NebulaLayer;
	private fog: VolumetricFogLayer;
	private dust: DustLayer;

	constructor(parentEl: HTMLElement, settings: CitadelSettings) {
		this.parentEl = parentEl;
		this.settings = settings;

		this.canvas = document.createElement("canvas");
		this.canvas.className = "citadel-bg-canvas";
		Object.assign(this.canvas.style, {
			position: "fixed",
			top: "0",
			left: "0",
			width: "100vw",
			height: "100vh",
			pointerEvents: "none",
			zIndex: "0",
		});

		const context = this.canvas.getContext("2d");
		if (!context) throw new Error("Could not get 2D canvas context");
		this.ctx = context;

		this.perfMonitor = new PerformanceMonitor();

		// Initialize layers
		this.starfield = new StarfieldLayer(this.settings.starDensity);
		this.galaxies = new DistantGalaxiesLayer();
		this.nebula = new NebulaLayer();
		this.fog = new VolumetricFogLayer();
		this.dust = new DustLayer();

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
		// Force re-init if enabled toggles change state
		this.handleResize();
	}

	private handleResize() {
		const dpr = window.devicePixelRatio || 1;
		const w = window.innerWidth;
		const h = window.innerHeight;
		
		this.canvas.width = w * dpr;
		this.canvas.height = h * dpr;
		this.ctx.scale(dpr, dpr);

		this.starfield.resize(w, h);
		this.galaxies.resize(w, h);
		this.nebula.resize(w, h);
		this.fog.resize(w, h);
		this.dust.resize(w, h);
	}

	private handleVisibility() {
		this.isVisible = document.visibilityState === "visible";
		if (this.isVisible && !this.animFrameId) {
			this.loop();
		}
	}

	private loop = () => {
		if (!this.isVisible) return;

		const isThrottled = this.settings.enableAutoPerf ? this.perfMonitor.tick() : false;
		this.time++;

		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		// Layer Compositing Order (Back to Front)
		if (this.settings.enableGalaxies) this.galaxies.render(this.ctx, isThrottled, this.time);
		if (this.settings.enableNebula) this.nebula.render(this.ctx, isThrottled, this.time);
		if (this.settings.enableStars) this.starfield.render(this.ctx, isThrottled, this.time);
		if (this.settings.enableFog) this.fog.render(this.ctx, isThrottled, this.time);
		if (this.settings.enableDust) this.dust.render(this.ctx, isThrottled, this.time);

		this.animFrameId = requestAnimationFrame(this.loop);
	};

	public destroy() {
		if (this.animFrameId) {
			cancelAnimationFrame(this.animFrameId);
		}
		window.removeEventListener("resize", this.handleResize);
		document.removeEventListener("visibilitychange", this.handleVisibility);
		
		this.starfield.destroy();
		this.galaxies.destroy();
		this.nebula.destroy();
		this.fog.destroy();
		this.dust.destroy();

		this.canvas.remove();
	}
}

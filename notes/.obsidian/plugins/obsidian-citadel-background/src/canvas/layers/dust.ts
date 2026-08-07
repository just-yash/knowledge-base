import { ILayer } from "./layer";

interface DustMote {
	x: number;
	y: number;
	size: number;
	alpha: number;
	parallaxX: number;
	parallaxY: number;
	phase: number;
}

export class DustLayer implements ILayer {
	private motes: DustMote[] = [];
	private width: number = 0;
	private height: number = 0;

	constructor() {}

	public resize(w: number, h: number) {
		this.width = w;
		this.height = h;
		this.initMotes();
	}

	private initMotes() {
		this.motes = [];
		const count = 30; // Not too many to avoid clutter
		for (let i = 0; i < count; i++) {
			this.motes.push({
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				size: Math.random() * 4 + 2, // Larger than stars
				alpha: Math.random() * 0.15 + 0.05, // Quite faint
				// Fast parallax to simulate extreme foreground
				parallaxX: (Math.random() - 0.5) * 0.1, 
				parallaxY: Math.random() * -0.05 - 0.02, // Drifting upwards slightly
				phase: Math.random() * Math.PI * 2
			});
		}
	}

	public render(ctx: CanvasRenderingContext2D, isThrottled: boolean, time: number) {
		if (isThrottled) return;

		ctx.save();
		ctx.fillStyle = "#d9a857"; // Gold tinted dust
		ctx.filter = "blur(2px)"; // Out of focus foreground

		for (const mote of this.motes) {
			let x = mote.x + (time * mote.parallaxX);
			let y = mote.y + (time * mote.parallaxY);
			
			// Wrap around
			x = ((x % this.width) + this.width) % this.width;
			y = ((y % this.height) + this.height) % this.height;

			// Shimmer
			mote.phase += 0.01;
			const opacity = ((Math.sin(mote.phase) + 1) / 2) * mote.alpha;

			ctx.globalAlpha = opacity;
			ctx.beginPath();
			ctx.arc(x, y, mote.size, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}

	public destroy() {
		this.motes = [];
	}
}

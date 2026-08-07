import { ILayer } from "./layer";

interface Star {
	x: number;
	y: number;
	size: number;
	alpha: number;
	speed: number;
	phase: number;
	parallax: number;
}

export class StarfieldLayer implements ILayer {
	private stars: Star[] = [];
	private width: number = 0;
	private height: number = 0;
	private count: number;

	constructor(count: number) {
		this.count = count;
	}

	public resize(w: number, h: number) {
		this.width = w;
		this.height = h;
		this.initStars(this.count);
	}

	public setCount(count: number) {
		this.count = count;
		this.initStars(count);
	}

	private initStars(count: number) {
		this.stars = [];
		for (let i = 0; i < count; i++) {
			// Foreground stars are larger and move faster, background stars are small and slow
			const isForeground = Math.random() > 0.8; 
			this.stars.push({
				x: Math.random() * (this.width || window.innerWidth || 1920),
				y: Math.random() * (this.height || window.innerHeight || 1080),
				size: isForeground ? Math.random() * 1.5 + 1.0 : Math.random() * 0.8 + 0.2,
				alpha: Math.random(),
				speed: Math.random() * 0.02 + 0.005,
				phase: Math.random() * Math.PI * 2,
				parallax: isForeground ? 0.05 : 0.01
			});
		}
	}

	public render(ctx: CanvasRenderingContext2D, isThrottled: boolean, time: number) {
		ctx.save();
		ctx.fillStyle = "#ffffff";

		const drawCount = isThrottled ? Math.floor(this.stars.length / 2) : this.stars.length;

		for (let i = 0; i < drawCount; i++) {
			const star = this.stars[i];
			star.phase += star.speed;
			
			// Parallax drift based on time
			let x = star.x - (time * star.parallax);
			// Wrap around screen
			x = ((x % this.width) + this.width) % this.width;

			const opacity = ((Math.sin(star.phase) + 1) / 2) * 0.7 + 0.1;

			ctx.globalAlpha = opacity;
			ctx.beginPath();
			ctx.arc(x, star.y, star.size, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}

	public destroy() {
		this.stars = [];
	}
}

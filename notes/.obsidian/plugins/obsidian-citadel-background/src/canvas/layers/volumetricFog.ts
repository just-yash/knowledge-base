import { ILayer } from "./layer";

interface FogCloud {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	opacity: number;
}

export class VolumetricFogLayer implements ILayer {
	private clouds: FogCloud[] = [];
	private width: number = 0;
	private height: number = 0;

	constructor() {}

	public resize(w: number, h: number) {
		this.width = w;
		this.height = h;
		this.initClouds();
	}

	private initClouds() {
		this.clouds = [];
		const count = 5;
		for (let i = 0; i < count; i++) {
			this.clouds.push({
				x: Math.random() * this.width,
				y: this.height - (Math.random() * this.height * 0.4), // Keep mostly lower half
				width: Math.random() * 800 + 400,
				height: Math.random() * 300 + 150,
				speed: Math.random() * 0.2 + 0.05,
				opacity: Math.random() * 0.03 + 0.01 // Very faint
			});
		}
	}

	public render(ctx: CanvasRenderingContext2D, isThrottled: boolean, time: number) {
		if (isThrottled) return;

		ctx.save();
		ctx.globalCompositeOperation = "screen";

		for (const cloud of this.clouds) {
			let x = cloud.x + (time * cloud.speed);
			x = ((x % (this.width + cloud.width)) + (this.width + cloud.width)) % (this.width + cloud.width) - cloud.width;

			const gradient = ctx.createRadialGradient(x, cloud.y, 0, x, cloud.y, cloud.width / 2);
			// Volumetric fog is usually a mix of deep blues/cyans
			gradient.addColorStop(0, `rgba(43, 143, 150, ${cloud.opacity})`);
			gradient.addColorStop(1, `rgba(43, 143, 150, 0)`);

			ctx.fillStyle = gradient;
			ctx.beginPath();
			// Draw an ellipse
			ctx.ellipse(x, cloud.y, cloud.width / 2, cloud.height / 2, 0, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}

	public destroy() {
		this.clouds = [];
	}
}

import { ILayer } from "./layer";

interface NebulaCloud {
	x: number;
	y: number;
	radius: number;
	color: string;
	parallax: number;
	pulseSpeed: number;
	phase: number;
}

export class NebulaLayer implements ILayer {
	private clouds: NebulaCloud[] = [];
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
		// Colors mapping to Infinite Citadel themes (Cyan=Tech, Purple=Magic, Deep Blue=Void)
		const colors = [
			"rgba(85, 230, 236, ", // Cyan
			"rgba(155, 107, 242, ", // Purple
			"rgba(43, 143, 150, " // Deep Cyan
		];

		const count = 4;
		for (let i = 0; i < count; i++) {
			this.clouds.push({
				x: Math.random() * (this.width + 1000) - 500,
				y: Math.random() * this.height,
				radius: Math.random() * 600 + 400, // Very large clouds
				color: colors[i % colors.length],
				parallax: Math.random() * 0.01 + 0.005,
				pulseSpeed: Math.random() * 0.005 + 0.001,
				phase: Math.random() * Math.PI * 2
			});
		}
	}

	public render(ctx: CanvasRenderingContext2D, isThrottled: boolean, time: number) {
		if (isThrottled) return;

		ctx.save();
		ctx.globalCompositeOperation = "screen";

		for (const cloud of this.clouds) {
			let x = cloud.x - (time * cloud.parallax);
			x = ((x % (this.width + 2000)) + (this.width + 2000)) % (this.width + 2000) - 1000;

			cloud.phase += cloud.pulseSpeed;
			// Slowly pulse opacity between 0.02 and 0.06
			const opacity = ((Math.sin(cloud.phase) + 1) / 2) * 0.04 + 0.02;

			const gradient = ctx.createRadialGradient(x, cloud.y, 0, x, cloud.y, cloud.radius);
			gradient.addColorStop(0, `${cloud.color}${opacity})`);
			gradient.addColorStop(0.5, `${cloud.color}${opacity * 0.5})`);
			gradient.addColorStop(1, `${cloud.color}0)`);

			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(x, cloud.y, cloud.radius, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}

	public destroy() {
		this.clouds = [];
	}
}

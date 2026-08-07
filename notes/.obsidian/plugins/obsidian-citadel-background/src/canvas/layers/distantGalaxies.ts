import { ILayer } from "./layer";

interface Galaxy {
	x: number;
	y: number;
	radius: number;
	color: string;
	particles: { dx: number; dy: number; size: number; alpha: number }[];
	parallax: number;
}

export class DistantGalaxiesLayer implements ILayer {
	private galaxies: Galaxy[] = [];
	private width: number = 0;
	private height: number = 0;

	constructor() {}

	public resize(w: number, h: number) {
		this.width = w;
		this.height = h;
		this.initGalaxies();
	}

	private initGalaxies() {
		this.galaxies = [];
		const count = 3; // Render 3 distant galaxies
		const colors = ["rgba(155, 107, 242, ", "rgba(85, 230, 236, ", "rgba(217, 168, 87, "]; // Purple, Cyan, Gold

		for (let i = 0; i < count; i++) {
			const numParticles = 80;
			const particles = [];
			for (let p = 0; p < numParticles; p++) {
				// Create an elliptical cluster
				const angle = Math.random() * Math.PI * 2;
				const dist = Math.random() * Math.random() * 300; // Concentrate in center
				particles.push({
					dx: Math.cos(angle) * dist * 1.5,
					dy: Math.sin(angle) * dist * 0.5,
					size: Math.random() * 1.5 + 0.5,
					alpha: Math.random() * 0.3 + 0.1
				});
			}

			this.galaxies.push({
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				radius: 300,
				color: colors[i % colors.length],
				particles,
				parallax: Math.random() * 0.005 + 0.002 // Extremely slow moving
			});
		}
	}

	public render(ctx: CanvasRenderingContext2D, isThrottled: boolean, time: number) {
		if (isThrottled) return; // Distant galaxies are visually heavy, skip if throttled

		ctx.save();
		
		for (const galaxy of this.galaxies) {
			// Deep space parallax
			let x = galaxy.x - (time * galaxy.parallax);
			x = ((x % (this.width + 1000)) + (this.width + 1000)) % (this.width + 1000) - 500;

			// Optional rotation or pulse can go here if needed, but keeping it static for performance
			for (const p of galaxy.particles) {
				ctx.fillStyle = `${galaxy.color}${p.alpha})`;
				ctx.beginPath();
				ctx.arc(x + p.dx, galaxy.y + p.dy, p.size, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		ctx.restore();
	}

	public destroy() {
		this.galaxies = [];
	}
}

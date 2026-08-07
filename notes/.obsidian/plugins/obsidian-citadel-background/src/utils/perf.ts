export class PerformanceMonitor {
	private frameTimes: number[] = [];
	private maxBuffer: number = 60;
	private lastTime: number = performance.now();
	private isThrottled: boolean = false;

	public tick(): boolean {
		const now = performance.now();
		const delta = now - this.lastTime;
		this.lastTime = now;

		this.frameTimes.push(delta);
		if (this.frameTimes.length > this.maxBuffer) {
			this.frameTimes.shift();
		}

		const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
		const fps = 1000 / avgFrameTime;

		const shouldThrottle = fps < 45 && this.frameTimes.length >= 30;

		if (shouldThrottle !== this.isThrottled) {
			this.isThrottled = shouldThrottle;
			if (this.isThrottled) {
				document.body.setAttribute("data-citadel-perf", "low");
			} else {
				document.body.removeAttribute("data-citadel-perf");
			}
		}

		return this.isThrottled;
	}

	public getThrottled(): boolean {
		return this.isThrottled;
	}
}

export interface ILayer {
	resize(width: number, height: number): void;
	render(ctx: CanvasRenderingContext2D, isThrottled: boolean, time: number): void;
	destroy(): void;
}

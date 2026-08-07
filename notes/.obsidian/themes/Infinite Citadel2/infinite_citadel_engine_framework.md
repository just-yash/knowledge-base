# INFINITE CITADEL ENGINE — FRAMEWORK ARCHITECTURE
**Master Graphic Framework Blueprint & TypeScript SDK Specification**

> *"An enterprise-grade 2D/WebGL hybrid rendering engine designed to power complex atmospheric user interfaces and knowledge archives."*

---

## 1. FRAMEWORK ARCHITECTURE OVERVIEW

The **Infinite Citadel Engine (`@citadel/engine`)** is a decoupled, multi-context rendering framework built for high-performance UI composition, procedural backgrounds, and spatial knowledge graphs.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ INFINITE CITADEL ENGINE FRAMEWORK STACK                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 15. Testing Suite     │ Headless WebGL Benchmarks & Visual Regression       │
│ 14. Adaptive Quality  │ Dynamic LOD Manager & Frame-Time Budget Guard       │
│ 13. Perf Monitor      │ Frame Delta Accumulator & VRAM Inspector            │
├───────────────────────┼─────────────────────────────────────────────────────┤
│ 12. Extension SDK     │ Developer API, Layer Hooks & Custom Emitters        │
│ 11. Plugin API        │ Lifecycle Hooks, Register View & Component Bridges  │
├───────────────────────┼─────────────────────────────────────────────────────┤
│ 10. Interaction       │ QuadTree Spatial Indexing & 60 FPS Hit Testing      │
│ 9. Cursor Engine      │ Sub-pixel Magnetic Pointer & Light-Spread Tracking  │
│ 8. Material Engine    │ Physical Surface Shaders (Obsidian, Steel, Glass)   │
│ 7. Lighting Engine    │ Point, Volumetric & Ambient Lighting Pass           │
│ 6. Particle Engine    │ Float32Array Typed-Array Particle Pools             │
│ 5. Layer Engine       │ 5-Plane Compositor & Independent Render Passes      │
│ 4. Animation Engine   │ Physics Tweens, Spring Dynamics & Bezier Curves     │
├───────────────────────┼─────────────────────────────────────────────────────┤
│ 3. Scheduler          │ Priority Queue rAF Loop Manager (Critical/Idle)     │
│ 2. Scene Graph        │ Hierarchical Transform Matrix Tree                  │
│ 1. Core Renderer      │ Dual Canvas 2D / WebGL 2.0 Double-Buffered Pipeline │
└───────────────────────┴─────────────────────────────────────────────────────┘
```

---

## 2. THE 15 CORE ENGINE SUBSYSTEMS

### 1. Dual-Context Core Renderer (`CitadelRenderer`)
* **Architecture**: Double-buffered HTML5 Canvas 2D and WebGL 2.0 pipeline. Automatically selects WebGL 2.0 when hardware acceleration is present; falls back seamlessly to Canvas 2D.
* **Code Contract**:
```typescript
export class CitadelRenderer {
	private gl: WebGL2RenderingContext | null;
	private ctx2d: CanvasRenderingContext2D | null;
	private doubleBuffer: HTMLCanvasElement;

	constructor(container: HTMLElement, options: RendererOptions) {
		/* Initialize dual rendering buffers */
	}

	public render(scene: SceneGraph): void {
		/* Execute render pass pipelines */
	}
}
```

---

### 2. Hierarchical Scene Graph (`SceneGraph`, `SceneNode`)
* **Architecture**: Tree data structure maintaining parent-child transform relationships, spatial bounding boxes (`AABB`), z-index ordering, and dirty-flag state mutation.
* **Code Contract**:
```typescript
export class SceneNode {
	public id: string;
	public transform: Matrix3x3;
	public children: SceneNode[] = [];
	public isDirty: boolean = true;
	public zIndex: number = 0;

	public updateGlobalTransform(parentMatrix?: Matrix3x3): void;
}
```

---

### 3. Priority Task Scheduler (`TaskScheduler`, `FrameLoop`)
* **Architecture**: Fixed 60 FPS `requestAnimationFrame` loop manager operating a 3-tier priority queue (`Critical`, `Standard`, `Idle`). Defers heavy background particle updates to idle frame slots.
* **Code Contract**:
```typescript
export enum TaskPriority { CRITICAL = 0, STANDARD = 1, IDLE = 2 }

export class TaskScheduler {
	public schedule(task: () => void, priority: TaskPriority): void;
	public tick(deltaTime: number): void;
}
```

---

### 4. Kinematic Animation Engine (`AnimationEngine`, `Tween`)
* **Architecture**: Frame-rate independent tweening engine supporting custom Bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`), spring physics (`stiffness`, `damping`), and sequence chains.
* **Code Contract**:
```typescript
export class Tween<T> {
	constructor(target: T, props: Partial<T>, duration: number, easing: EasingFunction);
	public start(): Promise<void>;
}
```

---

### 5. Multi-Plane Layer Engine (`LayerCompositor`, `RenderLayer`)
* **Architecture**: 5-plane hardware-composited layer manager allowing independent rendering, opacity blending, and GPU transformation per z-layer.
* **Code Contract**:
```typescript
export class LayerCompositor {
	private layers: Map<string, RenderLayer> = new Map();
	public addLayer(name: string, layer: RenderLayer, zIndex: number): void;
	public composite(targetCtx: CanvasRenderingContext2D): void;
}
```

---

### 6. Typed-Array Particle Engine (`ParticleSystem`, `Emitter`)
* **Architecture**: High-performance particle pool allocating zero-garbage `Float32Array` buffers for starfields, gold dust specks, and quasar jet streams.
* **Code Contract**:
```typescript
export class ParticleSystem {
	private positionBuffer: Float32Array; // [x, y, z] x N
	private velocityBuffer: Float32Array; // [vx, vy, vz] x N
	private lifeBuffer: Float32Array;     // [alpha, phase] x N

	constructor(maxParticles: number = 10000);
	public update(dt: number): void;
}
```

---

### 7. Deferred Lighting Engine (`LightingEngine`, `LightSource`)
* **Architecture**: 2D/3D lighting pass computing point lights, ambient bounce, volumetric caustics, and specular highlights across physical materials.
* **Code Contract**:
```typescript
export interface LightSource {
	position: [number, number];
	color: [number, number, number];
	intensity: number;
	radius: number;
}

export class LightingEngine {
	public addLight(light: LightSource): void;
	public renderLightingPass(ctx: CanvasRenderingContext2D): void;
}
```

---

### 8. Physical Material Shader Pipeline (`MaterialEngine`)
* **Architecture**: Material system compiling surface properties (reflectivity, roughness, specular color) into WebGL fragment shaders and CSS custom property contracts.
* **Code Contract**:
```typescript
export interface MaterialDescriptor {
	name: string;
	reflectivity: number;
	roughness: number;
	surfaceGradient: string;
}

export class MaterialEngine {
	public registerMaterial(desc: MaterialDescriptor): void;
}
```

---

### 9. Sub-Pixel Cursor Engine (`CursorTracker`)
* **Architecture**: Sub-pixel pointer tracking engine with magnetic element snapping, velocity calculation, and radial light-spread aura projection.
* **Code Contract**:
```typescript
export class CursorTracker {
	public position: [number, number] = [0, 0];
	public velocity: [number, number] = [0, 0];
	public attachMagneticTarget(el: HTMLElement, strength: number): void;
}
```

---

### 10. QuadTree Interaction Engine (`InteractionManager`, `SpatialIndex`)
* **Architecture**: Spatial QuadTree partitioning index enabling 60 FPS hit-testing, cursor proximity detection, and event bubbling across 10,000+ interactive nodes.
* **Code Contract**:
```typescript
export class QuadTree<T> {
	constructor(bounds: AABB, capacity: number = 16);
	public insert(item: T, bounds: AABB): void;
	public query(range: AABB): T[];
}
```

---

### 11. Extensible Plugin API (`CitadelPlugin`, `PluginContext`)
* **Architecture**: Modular plugin architecture allowing third-party developers to inject custom render layers, register UI components, and extend the engine lifecycle.
* **Code Contract**:
```typescript
export abstract class CitadelPlugin {
	public abstract name: string;
	public abstract init(ctx: PluginContext): void;
	public abstract destroy(): void;
}
```

---

### 12. Developer Extension SDK (`@citadel/engine-sdk`)
* **Architecture**: Typed npm package exposing utility functions, custom particle emitters, custom easing curves, and UI component bridges.
* **Code Contract**:
```typescript
import { CitadelEngine, ParticleEmitter } from "@citadel/engine-sdk";

const engine = new CitadelEngine({ target: "#canvas-root" });
engine.use(new ParticleEmitter({ density: 100 }));
```

---

### 13. Frame Delta Performance Monitor (`PerfMonitor`)
* **Architecture**: Rolling 60-frame time accumulator calculating average delta time, dropped frame counts, and active GPU VRAM memory allocation.
* **Code Contract**:
```typescript
export class PerfMonitor {
	public getAverageFPS(): number;
	public getFrameDelta(): number;
	public isPerformanceDegraded(): boolean;
}
```

---

### 14. Adaptive Quality LOD Manager (`AdaptiveQualityManager`)
* **Architecture**: Dynamic Level-of-Detail (LOD) manager that automatically scales particle counts, disables blur filters, and throttles secondary layers during frame-rate drops (< 45 FPS).
* **Code Contract**:
```typescript
export class AdaptiveQualityManager {
	public updateLOD(currentFPS: number): void {
		if (currentFPS < 45) {
			this.setQualityTier("LOW");
		}
	}
}
```

---

### 15. Automated Testing Strategy (`CitadelTestSuite`)
* **Architecture**: Multi-layered quality assurance suite combining headless WebGL regression testing, visual diff snapshots via Puppeteer, and automated 60 FPS benchmark suites.
* **Test Matrix**:
  1. **Headless Canvas Tests**: Verify particle state buffer updates without DOM rendering.
  2. **Visual Snapshot Diffs**: Pixel-match comparison against master component renders.
  3. **Frame-Rate Stress Benchmark**: Spawn 5,000 active nodes and verify FPS stays >= 50 FPS.

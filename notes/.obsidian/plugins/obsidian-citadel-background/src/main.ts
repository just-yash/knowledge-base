import { Plugin } from "obsidian";
import { CitadelSettings, DEFAULT_SETTINGS, CitadelSettingTab } from "./settings";
import { CanvasManager } from "./canvas/background";

export default class CitadelBackgroundPlugin extends Plugin {
	settings: CitadelSettings;
	canvasManager: CanvasManager | null = null;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new CitadelSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			this.initCanvas();
		});
	}

	initCanvas() {
		const container = document.body.querySelector(".app-container") || document.body;
		this.canvasManager = new CanvasManager(container as HTMLElement, this.settings);
		this.canvasManager.start();
	}

	onunload() {
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

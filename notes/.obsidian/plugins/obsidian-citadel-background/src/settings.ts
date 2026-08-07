import { App, PluginSettingTab, Setting } from "obsidian";
import type CitadelBackgroundPlugin from "./main";

export interface CitadelSettings {
	enableStars: boolean;
	enableNebula: boolean;
	enableAurora: boolean;
	enableGalaxies: boolean;
	enableFog: boolean;
	enableDust: boolean;
	starDensity: number;
	enableAutoPerf: boolean;
}

export const DEFAULT_SETTINGS: CitadelSettings = {
	enableStars: true,
	enableNebula: true,
	enableAurora: false,
	enableGalaxies: true,
	enableFog: true,
	enableDust: true,
	starDensity: 150, // Increased default because we split into two layers
	enableAutoPerf: true,
};

export class CitadelSettingTab extends PluginSettingTab {
	plugin: CitadelBackgroundPlugin;

	constructor(app: App, plugin: CitadelBackgroundPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "Infinite Citadel Environment Engine" });

		new Setting(containerEl)
			.setName("Enable Starfield Engine")
			.setDesc("Render procedural twinkling star particles on 2D Canvas.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableStars)
					.onChange(async (value) => {
						this.plugin.settings.enableStars = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Enable Distant Galaxies")
			.setDesc("Render deep-space star clusters.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableGalaxies)
					.onChange(async (value) => {
						this.plugin.settings.enableGalaxies = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Enable Nebula Gas")
			.setDesc("Render massive, slow-moving interstellar clouds.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableNebula)
					.onChange(async (value) => {
						this.plugin.settings.enableNebula = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Enable Volumetric Fog")
			.setDesc("Render low-hanging atmospheric fog.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableFog)
					.onChange(async (value) => {
						this.plugin.settings.enableFog = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Enable Ambient Dust")
			.setDesc("Render out-of-focus, fast-moving foreground particles.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableDust)
					.onChange(async (value) => {
						this.plugin.settings.enableDust = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Star Density")
			.setDesc("Number of star particles drawn per frame (10 to 400).")
			.addSlider((slider) =>
				slider
					.setLimits(10, 400, 10)
					.setValue(this.plugin.settings.starDensity)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.starDensity = value;
						await this.plugin.saveSettings();
						this.plugin.canvasManager?.updateSettings(this.plugin.settings);
					})
			);

		new Setting(containerEl)
			.setName("Adaptive Performance Guard")
			.setDesc("Automatically reduce particle count if frame rate drops below 45 FPS.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableAutoPerf)
					.onChange(async (value) => {
						this.plugin.settings.enableAutoPerf = value;
						await this.plugin.saveSettings();
					})
			);
	}
}

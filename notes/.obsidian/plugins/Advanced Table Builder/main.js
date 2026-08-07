const { Plugin, Modal, Setting, Notice } = require("obsidian");

class AdvancedTableBuilderPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "open-advanced-table-builder",
			name: "Open Advanced Table Builder",
			callback: () => {
				new AdvancedTableBuilderModal(this.app).open();
			},
		});
	}
}

class AdvancedTableBuilderModal extends Modal {
	constructor(app) {
		super(app);
		this.rows = 3;
		this.cols = 3;
		this.cells = [];
		this.selection = null;
		this.dragState = {
			active: false,
			startRow: null,
			startCol: null,
		};
		this.cleanupFns = [];
		this.rowInputEl = null;
		this.colInputEl = null;
		this.gridContainerEl = null;
		this.previewEl = null;
		this.gridTableEl = null;
		this.statusEl = null;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("advanced-table-builder-modal");
		if (this.modalEl) {
			this.modalEl.addClass("mod-advanced-table-builder");
		}

		this.injectStyles();
		this.applyModalSizing();
		this.buildLayout();
		this.createGrid(this.rows, this.cols);
	}

	onClose() {
		this.cleanupEventHandlers();
		this.resetModalSizing();
		if (this.modalEl) {
			this.modalEl.removeClass("mod-advanced-table-builder");
		}
		this.contentEl.empty();
	}

	applyModalSizing() {
		if (this.modalEl) {
			this.modalEl.style.width = "92vw";
			this.modalEl.style.maxWidth = "92vw";
			this.modalEl.style.height = "86vh";
			this.modalEl.style.maxHeight = "86vh";
		}

		if (this.contentEl) {
			this.contentEl.style.height = "100%";
			this.contentEl.style.display = "flex";
			this.contentEl.style.flexDirection = "column";
		}
	}

	resetModalSizing() {
		if (this.modalEl) {
			this.modalEl.style.removeProperty("width");
			this.modalEl.style.removeProperty("max-width");
			this.modalEl.style.removeProperty("height");
			this.modalEl.style.removeProperty("max-height");
		}

		if (this.contentEl) {
			this.contentEl.style.removeProperty("height");
			this.contentEl.style.removeProperty("display");
			this.contentEl.style.removeProperty("flex-direction");
		}
	}

	injectStyles() {
		if (document.getElementById("advanced-table-builder-styles")) {
			return;
		}

		const styleEl = document.createElement("style");
		styleEl.id = "advanced-table-builder-styles";
		styleEl.textContent = `
			.modal.mod-advanced-table-builder,
			.modal.mod-advanced-table-builder .modal-content,
			.advanced-table-builder-modal .modal-content {
				width: 90vw;
				max-width: 90vw;
				height: 82vh;
				max-height: 82vh;
				padding: 20px 24px;
				box-sizing: border-box;
				overflow: hidden;
			}
			.advanced-table-builder-root {
				display: flex;
				flex-direction: column;
				gap: 12px;
				height: 100%;
				min-height: 0;
				overflow: hidden;
			}
			.advanced-table-builder-toolbar {
				display: flex;
				flex-wrap: wrap;
				gap: 10px;
				align-items: flex-end;
			}
			.advanced-table-builder-actions {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;
			}
			.advanced-table-builder-body {
				display: flex;
				flex-direction: column;
				gap: 12px;
				flex: 1 1 auto;
				min-height: 0;
				overflow: hidden;
			}
			.advanced-table-builder-panel {
				border: 1px solid var(--background-modifier-border);
				border-radius: 8px;
				padding: 10px;
				background: var(--background-secondary);
				min-height: 0;
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}
			.advanced-table-builder-panel h3 {
				margin: 0 0 10px;
				font-size: 15px;
			}
			.advanced-table-builder-grid-wrap {
				overflow: auto;
				flex: 1 1 auto;
				min-height: 0;
				height: 100%;
				border: 1px solid var(--background-modifier-border);
				border-radius: 6px;
				background: var(--background-primary);
			}
			.advanced-table-builder-grid {
				border-collapse: collapse;
				table-layout: fixed;
				user-select: none;
				width: 100%;
				min-width: max-content;
			}
			.advanced-table-builder-grid td {
				border: 1px solid var(--background-modifier-border);
				min-width: 140px;
				height: 56px;
				padding: 0;
				vertical-align: top;
				position: relative;
				background: var(--background-primary);
			}
			.advanced-table-builder-grid td.is-hidden {
				display: none;
			}
			.advanced-table-builder-grid td.is-selected {
				outline: 2px solid var(--interactive-accent);
				outline-offset: -2px;
				background: color-mix(in srgb, var(--interactive-accent) 12%, var(--background-primary));
			}
			.advanced-table-builder-grid td.is-merged-master {
				background: color-mix(in srgb, var(--interactive-accent) 8%, var(--background-primary));
			}
			.advanced-table-builder-cell-content {
				padding: 12px;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				outline: none;
				overflow-wrap: break-word;
				user-select: text;
				font-size: 15px;
				line-height: 1.4;
			}
			.advanced-table-builder-code {
				margin-top: 4px;
				border: 1px solid var(--background-modifier-border);
				border-radius: 6px;
				padding: 12px;
				background: var(--background-primary);
				font-family: var(--font-monospace);
				font-size: 12px;
				white-space: pre-wrap;
				word-break: break-word;
				min-height: 96px;
				max-height: 140px;
				overflow: auto;
			}
			.advanced-table-builder-html-wrap {
				flex: 0 0 auto;
			}
			.advanced-table-builder-status {
				font-size: 12px;
				color: var(--text-muted);
			}
			@media (min-width: 1600px) {
				.advanced-table-builder-modal .modal-content {
					width: 92vw;
					max-width: 92vw;
					height: 86vh;
					max-height: 86vh;
				}
			}
			@media (max-width: 900px) {
				.advanced-table-builder-modal .modal-content {
					width: 98vw;
					max-width: 98vw;
					height: 94vh;
					max-height: 94vh;
					padding: 16px;
				}
				.advanced-table-builder-grid td {
					min-width: 110px;
					height: 56px;
				}
			}
		`;
		document.head.appendChild(styleEl);
	}

	buildLayout() {
		const rootEl = this.contentEl.createDiv({ cls: "advanced-table-builder-root" });
		const toolbarEl = rootEl.createDiv({ cls: "advanced-table-builder-toolbar" });

		new Setting(toolbarEl)
			.setName("Rows")
			.addText((text) => {
				this.rowInputEl = text.inputEl;
				text
					.setPlaceholder("Rows")
					.setValue(String(this.rows))
					.onChange(() => {});
				this.rowInputEl.type = "number";
				this.rowInputEl.min = "1";
				this.rowInputEl.max = "50";
			});

		new Setting(toolbarEl)
			.setName("Columns")
			.addText((text) => {
				this.colInputEl = text.inputEl;
				text
					.setPlaceholder("Columns")
					.setValue(String(this.cols))
					.onChange(() => {});
				this.colInputEl.type = "number";
				this.colInputEl.min = "1";
				this.colInputEl.max = "20";
			});

		const actionsEl = toolbarEl.createDiv({ cls: "advanced-table-builder-actions" });
		this.createButton(actionsEl, "Create", () => this.handleCreate());
		this.createButton(actionsEl, "Merge", () => this.handleMerge());
		this.createButton(actionsEl, "Unmerge", () => this.handleUnmerge());
		this.createButton(actionsEl, "Reset", () => this.handleReset());
		this.createButton(actionsEl, "Insert Into Note", () => this.insertIntoNote(), true);

		this.statusEl = rootEl.createDiv({ cls: "advanced-table-builder-status" });
		this.setStatus("Drag to select a rectangular range, then merge or edit cells.");

		const bodyEl = rootEl.createDiv({ cls: "advanced-table-builder-body" });

		const gridPanelEl = bodyEl.createDiv({ cls: "advanced-table-builder-panel" });
		gridPanelEl.style.flex = "1 1 0";
		gridPanelEl.style.minHeight = "0";
		gridPanelEl.createEl("h3", { text: "Table Builder" });
		this.gridContainerEl = gridPanelEl.createDiv({ cls: "advanced-table-builder-grid-wrap" });

		const htmlPanelEl = bodyEl.createDiv({ cls: "advanced-table-builder-panel advanced-table-builder-html-wrap" });
		htmlPanelEl.style.flex = "0 0 auto";
		htmlPanelEl.style.maxHeight = "200px";
		htmlPanelEl.createEl("h3", { text: "Generated HTML" });
		this.previewEl = htmlPanelEl.createDiv();
	}

	createButton(containerEl, label, onClick, cta) {
		const buttonEl = containerEl.createEl("button", { text: label });
		if (cta) {
			buttonEl.addClass("mod-cta");
		}
		buttonEl.addEventListener("click", onClick);
		this.cleanupFns.push(() => buttonEl.removeEventListener("click", onClick));
		return buttonEl;
	}

	handleCreate() {
		const rows = this.parsePositiveInt(this.rowInputEl && this.rowInputEl.value, 3, 1, 50);
		const cols = this.parsePositiveInt(this.colInputEl && this.colInputEl.value, 3, 1, 20);

		if (rows === null || cols === null) {
			new Notice("Please enter valid row and column counts.");
			return;
		}

		this.rows = rows;
		this.cols = cols;
		this.createGrid(rows, cols);
		this.setStatus(`Created a ${rows} x ${cols} table.`);
	}

	handleReset() {
		if (!this.cells.length) {
			return;
		}
		this.createGrid(this.rows, this.cols);
		this.setStatus("Grid reset.");
	}

	parsePositiveInt(value, fallback, min, max) {
		const parsed = Number(value);
		if (!Number.isFinite(parsed)) {
			return fallback;
		}
		const safeValue = Math.floor(parsed);
		if (safeValue < min || safeValue > max) {
			return null;
		}
		return safeValue;
	}

	createGrid(rows, cols) {
		this.cleanupGridEvents();
		this.selection = null;
		this.dragState.active = false;
		this.dragState.startRow = null;
		this.dragState.startCol = null;
		this.cells = [];

		for (let row = 0; row < rows; row += 1) {
			const rowCells = [];
			for (let col = 0; col < cols; col += 1) {
				rowCells.push(this.createCell(row, col));
			}
			this.cells.push(rowCells);
		}

		this.renderGrid();
		this.updatePreview();
	}

	createCell(row, col) {
		return {
			row,
			col,
			text: "",
			rowspan: 1,
			colspan: 1,
			hidden: false,
			masterRow: row,
			masterCol: col,
			el: null,
			contentEl: null,
		};
	}

	renderGrid() {
		if (!this.gridContainerEl) {
			return;
		}

		this.gridContainerEl.empty();
		this.gridTableEl = this.gridContainerEl.createEl("table", { cls: "advanced-table-builder-grid" });
		const tbodyEl = this.gridTableEl.createEl("tbody");

		for (let row = 0; row < this.rows; row += 1) {
			const trEl = tbodyEl.createEl("tr");
			for (let col = 0; col < this.cols; col += 1) {
				const cell = this.cells[row][col];
				const tdEl = trEl.createEl("td");
				tdEl.dataset.row = String(row);
				tdEl.dataset.col = String(col);
				cell.el = tdEl;

				if (cell.hidden) {
					tdEl.addClass("is-hidden");
					continue;
				}

				if (cell.rowspan > 1) {
					tdEl.rowSpan = cell.rowspan;
				}
				if (cell.colspan > 1) {
					tdEl.colSpan = cell.colspan;
					tdEl.addClass("is-merged-master");
				}

				const contentEl = tdEl.createDiv({ cls: "advanced-table-builder-cell-content" });
				contentEl.contentEditable = "true";
				contentEl.spellcheck = false;
				contentEl.innerText = cell.text;
				cell.contentEl = contentEl;

				const onInput = () => {
					cell.text = contentEl.innerText;
					this.updatePreview();
				};

				const onFocus = () => {
					this.selectSingleCell(row, col);
				};

				contentEl.addEventListener("input", onInput);
				contentEl.addEventListener("focus", onFocus);
				this.cleanupFns.push(() => contentEl.removeEventListener("input", onInput));
				this.cleanupFns.push(() => contentEl.removeEventListener("focus", onFocus));
			}
		}

		this.attachGridEvents();
		this.renderSelection();
	}

	attachGridEvents() {
		if (!this.gridTableEl) {
			return;
		}

		const onMouseDown = (event) => {
			const tdEl = event.target && event.target.closest("td");
			if (!tdEl || !this.gridTableEl.contains(tdEl)) {
				return;
			}

			const row = Number(tdEl.dataset.row);
			const col = Number(tdEl.dataset.col);
			if (!Number.isInteger(row) || !Number.isInteger(col)) {
				return;
			}

			const cell = this.getCell(row, col);
			if (!cell || cell.hidden) {
				return;
			}

			this.dragState.active = true;
			this.dragState.startRow = row;
			this.dragState.startCol = col;
			this.selection = this.normalizeSelection(row, col, row, col);
			this.renderSelection();
		};

		const onMouseOver = (event) => {
			if (!this.dragState.active) {
				return;
			}

			const tdEl = event.target && event.target.closest("td");
			if (!tdEl || !this.gridTableEl.contains(tdEl)) {
				return;
			}

			const row = Number(tdEl.dataset.row);
			const col = Number(tdEl.dataset.col);
			if (!Number.isInteger(row) || !Number.isInteger(col)) {
				return;
			}

			const cell = this.getCell(row, col);
			if (!cell || cell.hidden) {
				return;
			}

			this.selection = this.normalizeSelection(
				this.dragState.startRow,
				this.dragState.startCol,
				row,
				col
			);
			this.renderSelection();
		};

		const onMouseUp = () => {
			this.dragState.active = false;
		};

		this.gridTableEl.addEventListener("mousedown", onMouseDown);
		this.gridTableEl.addEventListener("mouseover", onMouseOver);
		document.addEventListener("mouseup", onMouseUp);

		this.gridEvents = { onMouseDown, onMouseOver, onMouseUp };
	}

	cleanupGridEvents() {
		if (this.gridTableEl && this.gridEvents) {
			this.gridTableEl.removeEventListener("mousedown", this.gridEvents.onMouseDown);
			this.gridTableEl.removeEventListener("mouseover", this.gridEvents.onMouseOver);
		}
		if (this.gridEvents) {
			document.removeEventListener("mouseup", this.gridEvents.onMouseUp);
		}
		this.gridEvents = null;
	}

	cleanupEventHandlers() {
		this.cleanupGridEvents();
		while (this.cleanupFns.length) {
			const fn = this.cleanupFns.pop();
			try {
				fn();
			} catch (error) {}
		}
	}

	selectSingleCell(row, col) {
		const cell = this.getCell(row, col);
		if (!cell || cell.hidden) {
			return;
		}
		this.selection = this.normalizeSelection(row, col, row, col);
		this.renderSelection();
	}

	normalizeSelection(startRow, startCol, endRow, endCol) {
		return {
			startRow: Math.min(startRow, endRow),
			endRow: Math.max(startRow, endRow),
			startCol: Math.min(startCol, endCol),
			endCol: Math.max(startCol, endCol),
		};
	}

	renderSelection() {
		for (let row = 0; row < this.rows; row += 1) {
			for (let col = 0; col < this.cols; col += 1) {
				const cell = this.cells[row][col];
				if (!cell.el) {
					continue;
				}
				cell.el.removeClass("is-selected");
			}
		}

		if (!this.selection) {
			return;
		}

		for (let row = this.selection.startRow; row <= this.selection.endRow; row += 1) {
			for (let col = this.selection.startCol; col <= this.selection.endCol; col += 1) {
				const cell = this.getCell(row, col);
				if (!cell || cell.hidden || !cell.el) {
					continue;
				}
				cell.el.addClass("is-selected");
			}
		}
	}

	getCell(row, col) {
		if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) {
			return null;
		}
		return this.cells[row][col];
	}

	getSelectedVisibleCells() {
		if (!this.selection) {
			return [];
		}

		const selected = [];
		for (let row = this.selection.startRow; row <= this.selection.endRow; row += 1) {
			for (let col = this.selection.startCol; col <= this.selection.endCol; col += 1) {
				const cell = this.getCell(row, col);
				if (!cell || cell.hidden) {
					return null;
				}
				selected.push(cell);
			}
		}
		return selected;
	}

	handleMerge() {
		const selectedCells = this.getSelectedVisibleCells();
		if (!selectedCells || !selectedCells.length) {
			new Notice("Select visible cells to merge.");
			return;
		}

		if (selectedCells.length < 2) {
			new Notice("Select at least two cells to merge.");
			return;
		}

		for (let index = 0; index < selectedCells.length; index += 1) {
			const cell = selectedCells[index];
			if (cell.rowspan !== 1 || cell.colspan !== 1 || cell.hidden) {
				new Notice("Merged cells cannot be merged again. Unmerge first.");
				return;
			}
		}

		const master = this.getCell(this.selection.startRow, this.selection.startCol);
		if (!master) {
			new Notice("Invalid selection.");
			return;
		}

		const collectedText = [];
		for (let row = this.selection.startRow; row <= this.selection.endRow; row += 1) {
			for (let col = this.selection.startCol; col <= this.selection.endCol; col += 1) {
				const cell = this.getCell(row, col);
				if (!cell) {
					continue;
				}
				const text = typeof cell.text === "string" ? cell.text.trim() : "";
				if (text) {
					collectedText.push(text);
				}
			}
		}

		master.rowspan = this.selection.endRow - this.selection.startRow + 1;
		master.colspan = this.selection.endCol - this.selection.startCol + 1;
		master.hidden = false;
		master.masterRow = master.row;
		master.masterCol = master.col;
		if (!master.text.trim() && collectedText.length) {
			master.text = collectedText.join(" ");
		}

		for (let row = this.selection.startRow; row <= this.selection.endRow; row += 1) {
			for (let col = this.selection.startCol; col <= this.selection.endCol; col += 1) {
				if (row === master.row && col === master.col) {
					continue;
				}
				const cell = this.getCell(row, col);
				if (!cell) {
					continue;
				}
				cell.hidden = true;
				cell.rowspan = 1;
				cell.colspan = 1;
				cell.masterRow = master.row;
				cell.masterCol = master.col;
			}
		}

		this.renderGrid();
		this.selection = this.normalizeSelection(master.row, master.col, master.row, master.col);
		this.renderSelection();
		this.updatePreview();
		this.setStatus("Cells merged.");
	}

	handleUnmerge() {
		const selectedCells = this.getSelectedVisibleCells();
		if (!selectedCells || !selectedCells.length) {
			new Notice("Select a merged cell to unmerge.");
			return;
		}

		if (selectedCells.length !== 1) {
			new Notice("Select one merged cell to unmerge.");
			return;
		}

		const cell = selectedCells[0];
		if (cell.rowspan === 1 && cell.colspan === 1) {
			new Notice("Selected cell is not merged.");
			return;
		}

		const endRow = cell.row + cell.rowspan - 1;
		const endCol = cell.col + cell.colspan - 1;

		for (let row = cell.row; row <= endRow; row += 1) {
			for (let col = cell.col; col <= endCol; col += 1) {
				const target = this.getCell(row, col);
				if (!target) {
					continue;
				}
				target.hidden = false;
				target.rowspan = 1;
				target.colspan = 1;
				target.masterRow = row;
				target.masterCol = col;
			}
		}

		cell.rowspan = 1;
		cell.colspan = 1;
		this.renderGrid();
		this.selection = this.normalizeSelection(cell.row, cell.col, cell.row, cell.col);
		this.renderSelection();
		this.updatePreview();
		this.setStatus("Cell unmerged.");
	}

	generateTableHtml() {
		const lines = ["<table>"];

		for (let row = 0; row < this.rows; row += 1) {
			lines.push("  <tr>");
			for (let col = 0; col < this.cols; col += 1) {
				const cell = this.getCell(row, col);
				if (!cell || cell.hidden) {
					continue;
				}

				const attrs = [];
				if (cell.rowspan > 1) {
					attrs.push(`rowspan="${cell.rowspan}"`);
				}
				if (cell.colspan > 1) {
					attrs.push(`colspan="${cell.colspan}"`);
				}

				const attrText = attrs.length ? ` ${attrs.join(" ")}` : "";
				const cellText = this.escapeHtml(cell.text || "");
				lines.push(`    <td${attrText}>${cellText}</td>`);
			}
			lines.push("  </tr>");
		}

		lines.push("</table>");
		return lines.join("\n");
	}

	updatePreview() {
		if (!this.previewEl) {
			return;
		}

		const html = this.generateTableHtml();
		this.previewEl.empty();

		const codeEl = this.previewEl.createDiv({ cls: "advanced-table-builder-code" });
		codeEl.setText(html);
	}

	insertIntoNote() {
		const editor = this.app.workspace.activeEditor && this.app.workspace.activeEditor.editor;
		if (!editor) {
			new Notice("No active editor found.");
			return;
		}

		const html = this.generateTableHtml();
		editor.replaceSelection(html);
		new Notice("Advanced table inserted into note.");
		this.close();
	}

	escapeHtml(value) {
		return String(value)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	setStatus(message) {
		if (this.statusEl) {
			this.statusEl.setText(message);
		}
	}
}

module.exports = AdvancedTableBuilderPlugin;

"use strict";
const obsidian_1 = require("obsidian");
const SIMPLE_TEXT_COMMANDS = [
    { id: "insert-exclamation-mark", name: "Insert !", insert: "!" },
    { id: "insert-at-sign", name: "Insert @", insert: "@" },
    { id: "insert-hash-sign", name: "Insert #", insert: "#" },
    { id: "insert-dollar-sign", name: "Insert $", insert: "$" },
    { id: "insert-percent-sign", name: "Insert %", insert: "%" },
    { id: "insert-caret-sign", name: "Insert ^", insert: "^" },
    { id: "insert-ampersand", name: "Insert &", insert: "&" },
    { id: "insert-right-angle-bracket", name: "Insert >", insert: ">" },
    { id: "insert-right-square-bracket", name: "Insert ]", insert: "]" },
    { id: "insert-right-curly-bracket", name: "Insert }", insert: "}" },
    { id: "insert-vertical-line", name: "Insert |", insert: "|" },
    { id: "insert-left-angle-bracket", name: "Insert <", insert: "<" },
    { id: "insert-en-dash", name: "Insert –", insert: "–" },
    { id: "insert-em-dash", name: "Insert —", insert: "—" },
    {
        id: "wrap-selection-with-angle-brackets",
        name: "Wrap selection with <>",
        insert: "<",
        wrapWith: { opening: "<", closing: ">" },
    },
    {
        id: "insert-or-wrap-double-brackets",
        name: "Insert [ or wrap selection with [[ ]]",
        insert: "[",
        wrapWith: { opening: "[[", closing: "]]" },
    },
    {
        id: "insert-or-wrap-curly-braces",
        name: "Insert { or wrap selection with {}",
        insert: "{",
        wrapWith: { opening: "{", closing: "}" },
    },
];
class ShortcutsExtenderPlugin extends obsidian_1.Plugin {
    onload() {
        this.registerSimpleTextCommands();
        this.registerAdvancedCommands();
    }
    registerSimpleTextCommands() {
        for (const command of SIMPLE_TEXT_COMMANDS) {
            this.addCommand({
                id: command.id,
                name: command.name,
                hotkeys: command.hotkeys,
                editorCallback: (editor) => {
                    if (command.wrapWith && editor.somethingSelected()) {
                        this.wrapSelection(editor, command.wrapWith.opening, command.wrapWith.closing);
                        return;
                    }
                    editor.replaceSelection(command.insert);
                },
            });
        }
    }
    registerAdvancedCommands() {
        this.addCommand({
            id: "insert-inline-code-or-wrap-selection",
            name: "Insert ` or wrap selection with inline code",
            editorCallback: (editor) => {
                if (editor.somethingSelected()) {
                    this.wrapSelection(editor, "`", "`");
                }
                else {
                    editor.replaceSelection("`");
                }
            },
        });
        this.addCommand({
            id: "insert-python-code-block",
            name: "Insert Python code block",
            editorCallback: (editor) => {
                const selectedText = editor.getSelection();
                if (selectedText) {
                    editor.replaceSelection(["```py", selectedText, "```"].join("\n"));
                }
                else {
                    editor.replaceSelection("```py\n\n```");
                    const cursor = editor.getCursor();
                    editor.setCursor({ line: cursor.line - 1, ch: 0 });
                }
            },
        });
        this.addCommand({
            id: "toggle-code-block",
            name: "Toggle code block",
            editorCallback: (editor) => this.toggleCodeBlock(editor),
        });
        this.addCommand({
            id: "toggle-blockquote-for-lines",
            name: "Toggle blockquote for selected lines or insert > on empty line",
            editorCallback: (editor) => this.toggleBlockquoteOrInsert(editor),
        });
        this.addCommand({
            id: "toggle-bullet-list-for-lines",
            name: "Toggle bullet list for selected lines",
            editorCallback: (editor) => this.togglePrefixForLines(editor, /^-\s+/, "- "),
        });
        this.addCommand({
            id: "toggle-selection-case",
            name: "Toggle selection case",
            editorCallback: (editor) => this.toggleSelectionCase(editor),
        });
        this.addCommand({
            id: "increase-heading-level",
            name: "Increase heading level",
            editorCallback: (editor) => this.changeHeadingLevel(editor, 1),
        });
        this.addCommand({
            id: "decrease-heading-level",
            name: "Decrease heading level",
            editorCallback: (editor) => this.changeHeadingLevel(editor, -1),
        });
        this.addCommand({
            id: "insert-or-wrap-french-quotes",
            name: "Insert «» or wrap selection with «»",
            editorCallback: (editor) => this.insertOrWrapFrenchQuotes(editor),
        });
    }
    wrapSelection(editor, opening, closing) {
        const selectedText = editor.getSelection();
        editor.replaceSelection(`${opening}${selectedText}${closing}`);
    }
    getLineRange(editor) {
        if (editor.somethingSelected()) {
            const from = editor.getCursor("from");
            const to = editor.getCursor("to");
            return {
                start: { line: from.line, ch: 0 },
                end: { line: to.line, ch: editor.getLine(to.line).length },
                content: editor.getRange({ line: from.line, ch: 0 }, { line: to.line, ch: editor.getLine(to.line).length }),
            };
        }
        const line = editor.getCursor().line;
        const content = editor.getLine(line);
        return {
            start: { line, ch: 0 },
            end: { line, ch: content.length },
            content,
        };
    }
    toggleBlockquoteOrInsert(editor) {
        if (!editor.somethingSelected()) {
            const cursor = editor.getCursor();
            const currentLine = editor.getLine(cursor.line);
            if (currentLine.trim().length === 0) {
                editor.replaceSelection("> ");
                return;
            }
        }
        this.togglePrefixForLines(editor, /^>\s?/, "> ");
    }
    togglePrefixForLines(editor, prefixPattern, prefixToAdd) {
        const range = this.getLineRange(editor);
        const lines = range.content.split("\n");
        const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
        const shouldRemove = nonEmptyLines.length > 0 && nonEmptyLines.every((line) => prefixPattern.test(line));
        const nextLines = lines.map((line) => {
            if (line.trim().length === 0) {
                return line;
            }
            if (shouldRemove) {
                return line.replace(prefixPattern, "");
            }
            return `${prefixToAdd}${line}`;
        });
        editor.replaceRange(nextLines.join("\n"), range.start, range.end);
    }
    toggleCodeBlock(editor) {
        const selectedText = editor.getSelection();
        if (!selectedText) {
            const cursor = editor.getCursor();
            editor.replaceSelection("```\n\n```");
            editor.setCursor({ line: cursor.line + 1, ch: 0 });
            return;
        }
        const trimmed = selectedText.trim();
        const isWrapped = trimmed.startsWith("```") && trimmed.endsWith("```");
        if (isWrapped) {
            const withoutStartFence = trimmed.replace(/^```[a-zA-Z0-9_-]*\n?/, "");
            const unwrapped = withoutStartFence.replace(/\n?```$/, "");
            editor.replaceSelection(unwrapped);
            return;
        }
        editor.replaceSelection(["```", selectedText, "```"].join("\n"));
    }
    toggleSelectionCase(editor) {
        const selectedText = editor.getSelection();
        if (!selectedText) {
            return;
        }
        const hasLowercase = selectedText !== selectedText.toUpperCase();
        const nextText = hasLowercase ? selectedText.toUpperCase() : selectedText.toLowerCase();
        editor.replaceSelection(nextText);
    }
    // Меняет уровень markdown-heading в текущей строке или во всём выделенном блоке.
    //
    // Актуальная логика такая:
    // - если строка начинается со спецсимвола, markdown-маркера списка/чекбокса
    //   или с номера списка (например `1. ` / `1) `), она не меняется;
    // - если строка пустая или начинается с обычного текста,
    //   Increase heading level делает heading 6 уровня,
    //   а Decrease heading level делает heading 1 уровня;
    // - если строка уже является heading, то Increase heading level
    //   уменьшает количество # (###### -> ##### -> ... -> # -> обычный текст);
    // - Decrease heading level работает наоборот и увеличивает количество #
    //   (# -> ## -> ... -> ###### -> обычный текст).
    changeHeadingLevel(editor, delta) {
        const range = this.getLineRange(editor);
        const lines = range.content.split("\n");
        const nextLines = lines.map((line) => this.changeHeadingLevelForLine(line, delta));
        editor.replaceRange(nextLines.join("\n"), range.start, range.end);
    }
    changeHeadingLevelForLine(line, delta) {
        const headingMatch = line.match(/^(\s*)(#{1,6})\s+(.*)$/);
        if (headingMatch) {
            const [, indent, hashes, content] = headingMatch;
            const currentLevel = hashes.length;
            // Increase heading level = визуально сделать заголовок более "крупным",
            // то есть уменьшить глубину и УМЕНЬШИТЬ количество #.
            if (delta === 1) {
                if (currentLevel === 1) {
                    return `${indent}${content}`;
                }
                return `${indent}${"#".repeat(currentLevel - 1)} ${content}`;
            }
            // Decrease heading level = сделать заголовок более "глубоким",
            // то есть увеличить глубину и ДОБАВИТЬ #.
            // Особый случай: H6 по следующему нажатию превращается в обычный текст.
            if (currentLevel === 6) {
                return `${indent}${content}`;
            }
            return `${indent}${"#".repeat(currentLevel + 1)} ${content}`;
        }
        const blankOrPlainTextMatch = line.match(/^(\s*)(.*)$/);
        if (!blankOrPlainTextMatch) {
            return line;
        }
        const [, indent, content] = blankOrPlainTextMatch;
        const trimmed = content.trim();
        if (trimmed.length === 0) {
            return delta === 1 ? `${indent}###### ` : `${indent}# `;
        }
        // Не создаём heading поверх markdown-списков и checkbox-строк.
        // Сюда же относим строки, начинающиеся с других спецсимволов.
        if (this.isProtectedNonHeadingLine(trimmed)) {
            return line;
        }
        return delta === 1 ? `${indent}###### ${trimmed}` : `${indent}# ${trimmed}`;
    }
    // Возвращает true для строк, которые нельзя автоматически превращать в heading.
    //
    // Защищаем:
    // - bullet list: `- item`, `* item`, `+ item`;
    // - checkbox: `- [ ] task`, `- [x] task`;
    // - ordered list: `1. item`, `2) item`;
    // - строки, начинающиеся с других спецсимволов.
    //
    // Но обычные строки, начинающиеся с цифр ВНУТРИ текста, не блокируем.
    // Например `2025 report` можно превратить в heading, а `1. report` — нет.
    isProtectedNonHeadingLine(trimmedLine) {
        if (/^[-*+]\s+\[[ xX]\]\s+/.test(trimmedLine)) {
            return true;
        }
        if (/^[-*+]\s+/.test(trimmedLine)) {
            return true;
        }
        if (/^\d+[.)]\s+/.test(trimmedLine)) {
            return true;
        }
        return /^[^\p{L}\p{N}]/u.test(trimmedLine);
    }
    insertOrWrapFrenchQuotes(editor) {
        if (editor.somethingSelected()) {
            this.wrapSelection(editor, "«", "»");
            return;
        }
        const cursor = editor.getCursor();
        editor.replaceSelection("«»");
        editor.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
    }
}
module.exports = ShortcutsExtenderPlugin;

/* nosourcemap */
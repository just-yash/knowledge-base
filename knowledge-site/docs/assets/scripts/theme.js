import { STORAGE_KEYS } from "./config.js";

function resolvedTheme(savedTheme) {
  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeButton(button, activeTheme) {
  const nextTheme = activeTheme === "dark" ? "light" : "dark";
  button.textContent = nextTheme === "light" ? "\u2600" : "\u263E";
  button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  button.title = `Switch to ${nextTheme} mode`;
}

export function initTheme() {
  const button = document.getElementById("theme-toggle");
  const initialTheme = resolvedTheme(window.localStorage.getItem(STORAGE_KEYS.theme));
  document.body.dataset.theme = initialTheme;
  updateThemeButton(button, initialTheme);
  document.dispatchEvent(new CustomEvent("atlas:theme-change", { detail: { theme: initialTheme } }));

  button.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
    updateThemeButton(button, nextTheme);
    document.dispatchEvent(new CustomEvent("atlas:theme-change", { detail: { theme: nextTheme } }));
  });
}

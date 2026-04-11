import { COMPONENT_PATH } from "./config.js";

const cache = new Map();

async function fetchFragment(name) {
  if (!cache.has(name)) {
    cache.set(name, fetch(`${COMPONENT_PATH}/${name}.html`).then((response) => response.text()));
  }
  return cache.get(name);
}

export async function mountShell() {
  const [topbar, sidebar, notePanel, metaPanel, graphPanel, footer] = await Promise.all([
    fetchFragment("topbar"),
    fetchFragment("sidebar"),
    fetchFragment("note-panel"),
    fetchFragment("meta-panel"),
    fetchFragment("graph-panel"),
    fetchFragment("footer")
  ]);

  document.getElementById("topbar-slot").innerHTML = topbar;
  document.getElementById("sidebar-slot").innerHTML = `<div class="left-column">${sidebar}${graphPanel}</div>`;
  document.getElementById("note-slot").innerHTML = notePanel;
  document.getElementById("meta-slot").innerHTML = metaPanel;
  document.getElementById("footer-slot").innerHTML = footer;
}

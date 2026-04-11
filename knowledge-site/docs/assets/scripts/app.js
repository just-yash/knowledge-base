import { mountShell } from "./component-loader.js";
import { loadSiteData } from "./data-loader.js";
import { renderMarkdown } from "./markdown.js";
import { bindHistory, currentRoute, navigateToFolder, navigateToNote } from "./router.js";
import { renderSidebar, highlightActiveSidebar } from "./sidebar.js";
import { initSearch } from "./search.js";
import { renderFolderMetaPanel, renderGraphMetaPanel, renderMetaPanel } from "./backlinks.js";
import { initTheme } from "./theme.js";
import { focusGraphNode, initGraph, mountGraphPage, unmountGraphPage } from "./graph.js";

let lastViewedNote = null;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function fallbackRenderHtml(note) {
  return note.body
    .split(/\r?\n\r?\n/)
    .map((block) => `<p>${escapeHtml(block).replace(/\r?\n/g, "<br />")}</p>`)
    .join("");
}

function scrollNoteTarget(hash = "") {
  const notePanel = document.querySelector(".note-panel");
  if (!notePanel) {
    return;
  }

  if (!hash) {
    notePanel.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  window.requestAnimationFrame(() => {
    const target = document.getElementById(hash);
    if (!target) {
      notePanel.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setPageTitle(siteName, noteTitle) {
  document.title = noteTitle ? `${noteTitle} - ${siteName}` : siteName;
}

function breadcrumbHtml(folderSegments) {
  if (!folderSegments.length) {
    return "Vault";
  }

  return folderSegments
    .map((segment, index) => {
      const folderKey = folderSegments.slice(0, index + 1).join("/");
      return `<a href="?folder=${encodeURIComponent(folderKey)}" class="breadcrumb-link" data-folder-link="${escapeHtml(folderKey)}">${escapeHtml(segment)}</a>`;
    })
    .join('<span class="breadcrumb-separator">/</span>');
}

function applySiteBranding(data) {
  const tagline = document.getElementById("site-tagline");
  for (const homeLink of document.querySelectorAll("[data-home-link]")) {
    if (!homeLink.classList.contains("footer-link-icon")) {
      homeLink.textContent = data.site.name;
    }
  }
  if (tagline) {
    tagline.textContent = data.site.tagline;
  }
}

function applyFade() {
  const panel = document.querySelector(".note-panel");
  panel.classList.remove("note-fade");
  requestAnimationFrame(() => panel.classList.add("note-fade"));
}

function isCompactViewport() {
  return window.matchMedia("(max-width: 860px)").matches;
}

function closeFloatingPanels() {
  document.body.classList.remove("sidebar-open", "meta-open");
}

function setIconButton(button, icon, label, active = false) {
  if (!button) {
    return;
  }

  button.textContent = icon;
  button.setAttribute("aria-label", label);
  button.title = label;
  button.classList.toggle("is-active", active);
}

function syncPanelToggleLabels() {
  const leftToggle = document.getElementById("left-panel-toggle");
  const rightToggle = document.getElementById("right-panel-toggle");
  if (!leftToggle || !rightToggle) {
    return;
  }

  if (isCompactViewport()) {
    const leftOpen = document.body.classList.contains("sidebar-open");
    const rightOpen = document.body.classList.contains("meta-open");
    setIconButton(leftToggle, "\u2630", leftOpen ? "Close navigation" : "Open navigation", leftOpen);
    setIconButton(rightToggle, "\u25EB", rightOpen ? "Close context panel" : "Open context panel", rightOpen);
    return;
  }

  const leftVisible = !document.body.classList.contains("left-panel-hidden");
  const rightVisible = !document.body.classList.contains("right-panel-hidden");
  setIconButton(leftToggle, "\u2630", leftVisible ? "Hide navigation" : "Show navigation", leftVisible);
  setIconButton(rightToggle, "\u25EB", rightVisible ? "Hide context panel" : "Show context panel", rightVisible);
}

function bindPanelToggles() {
  const leftToggle = document.getElementById("left-panel-toggle");
  const rightToggle = document.getElementById("right-panel-toggle");

  leftToggle.onclick = () => {
    if (isCompactViewport()) {
      document.body.classList.toggle("sidebar-open");
      document.body.classList.remove("meta-open");
    } else {
      document.body.classList.toggle("left-panel-hidden");
    }
    syncPanelToggleLabels();
  };

  rightToggle.onclick = () => {
    if (isCompactViewport()) {
      document.body.classList.toggle("meta-open");
      document.body.classList.remove("sidebar-open");
    } else {
      document.body.classList.toggle("right-panel-hidden");
    }
    syncPanelToggleLabels();
  };

  window.addEventListener("resize", () => {
    if (!isCompactViewport()) {
      closeFloatingPanels();
    }
    syncPanelToggleLabels();
  });

  syncPanelToggleLabels();
}

function renderNoteChrome(note) {
  document.getElementById("note-breadcrumb").innerHTML = breadcrumbHtml(note.folderSegments);
  document.getElementById("note-title").textContent = note.title;
  document.getElementById("note-tags").innerHTML = note.tags
    .map((tag) => `<span class="tag-chip">#${tag}</span>`)
    .join("");
}

function renderFolderChrome(folder) {
  document.getElementById("note-breadcrumb").innerHTML = breadcrumbHtml(folder.folderSegments);
  document.getElementById("note-title").textContent = folder.name;
  document.getElementById("note-tags").innerHTML = [
    `<span class="tag-chip">Folder</span>`,
    `<span class="tag-chip">${folder.folders.length} subfolders</span>`,
    `<span class="tag-chip">${folder.notes.length} notes</span>`
  ].join("");
}

function graphSourceNote(data, route) {
  if (route?.slug) {
    return data.lookups.noteBySlug.get(route.slug) || null;
  }
  return lastViewedNote;
}

function renderGraphChrome(data, route) {
  const source = graphSourceNote(data, route);
  const fromLabel = source?.title || "Vault Home";
  document.getElementById("note-breadcrumb").innerHTML = "Vault<span class=\"breadcrumb-separator\">/</span>Graph View";
  const graphTitle = document.getElementById("note-title");
  graphTitle.textContent = `Graph View - from: ${fromLabel}`;
  graphTitle.setAttribute("aria-label", `Graph view from ${fromLabel}`);
  document.getElementById("note-tags").innerHTML = [
    `<span class="tag-chip">Graph View</span>`,
    `<span class="tag-chip">from: ${escapeHtml(fromLabel)}</span>`,
    `<span class="tag-chip">${data.graph.nodes.length} notes</span>`,
    `<span class="tag-chip">${data.graph.edges.length} links</span>`
  ]
    .filter(Boolean)
    .join("");
}

function renderFolderBody(folder) {
  const subfolders = [...folder.folders]
    .sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: "base" }))
    .map(
      (child) => `
        <a href="?folder=${encodeURIComponent(child.pathKey)}" class="folder-overview-link" data-folder-link="${escapeHtml(child.pathKey)}">
          <span class="folder-overview-title">${escapeHtml(child.name)}</span>
          <span class="folder-overview-meta">${child.folders.length} folders &bull; ${child.notes.length} notes</span>
        </a>
      `
    )
    .join("");

  const notes = [...folder.notes]
    .sort((left, right) => left.title.localeCompare(right.title, undefined, { sensitivity: "base" }))
    .map(
      (note) => `
        <a href="?note=${encodeURIComponent(note.slug)}" class="folder-overview-link" data-note-link="${note.slug}">
          <span class="folder-overview-title">${escapeHtml(note.title)}</span>
        </a>
      `
    )
    .join("");

  return `
    <section class="folder-overview">
      <p class="folder-overview-intro">Choose a subfolder or note from this folder.</p>
      <div class="folder-overview-grid">
        <section class="folder-overview-section">
          <h2>Subfolders</h2>
          <div class="folder-overview-list">
            ${subfolders || '<p class="folder-overview-empty">No subfolders inside this folder.</p>'}
          </div>
        </section>
        <section class="folder-overview-section">
          <h2>Notes</h2>
          <div class="folder-overview-list">
            ${notes || '<p class="folder-overview-empty">No notes directly inside this folder.</p>'}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderGraphBody(sourceLabel = "Vault Home") {
  return `
    <section class="graph-page">
      <header class="graph-page-header">
        <p class="eyebrow">Graph View</p>
        <h2>Explore the full note graph</h2>
        <p class="graph-page-copy" data-graph-status>Graph View — from: ${escapeHtml(sourceLabel)}. Hover notes to inspect neighbors, then click any node to open its note.</p>
      </header>
      <div class="graph-page-shell">
        <div id="graph-page-canvas" class="graph-canvas graph-canvas-full"></div>
      </div>
    </section>
  `;
}

function bindGlobalUi(data) {
  bindPanelToggles();

  document.getElementById("note-slot").addEventListener("click", (event) => {
    const folderLink = event.target.closest("[data-folder-link]");
    const noteLink = event.target.closest("[data-note-link]");
    const localAnchor = event.target.closest("[data-local-anchor]");
    if (folderLink) {
      event.preventDefault();
      navigateToFolder(folderLink.dataset.folderLink);
      closeFloatingPanels();
      syncPanelToggleLabels();
      return;
    }
    if (localAnchor) {
      event.preventDefault();
      scrollNoteTarget(localAnchor.dataset.localAnchor);
      return;
    }
    if (!noteLink) {
      return;
    }
    event.preventDefault();
    navigateToNote(noteLink.dataset.noteLink, { hash: noteLink.dataset.noteHash || "" });
    closeFloatingPanels();
    syncPanelToggleLabels();
  });
}

async function renderRoute(data) {
  const route = currentRoute(data);
  renderSidebar(data, route);
  const notePanel = document.querySelector(".note-panel");
  notePanel.classList.remove("is-graph-mode");

  if (route.type === "folder") {
    unmountGraphPage();
    const folder = data.lookups.folderByPath.get(route.folderKey);
    if (!folder) {
      navigateToNote(data.site.defaultNote, { replace: true });
      return;
    }

    renderFolderChrome(folder);
    document.getElementById("note-body").innerHTML = renderFolderBody(folder);
    renderFolderMetaPanel(folder);
    highlightActiveSidebar(route);
    setPageTitle(data.site.name, folder.name);
    applyFade();
    closeFloatingPanels();
    syncPanelToggleLabels();
    scrollNoteTarget(route.hash);
    return;
  }

  if (route.type === "graph") {
    const source = graphSourceNote(data, route);
    renderGraphChrome(data, route);
    notePanel.classList.add("is-graph-mode");
    document.getElementById("note-body").innerHTML = renderGraphBody(source?.title || "Vault Home");
    renderGraphMetaPanel(data);
    highlightActiveSidebar(null);
    setPageTitle(data.site.name, "Graph View");
    applyFade();
    closeFloatingPanels();
    syncPanelToggleLabels();
    await mountGraphPage(data, route.slug);
    scrollNoteTarget(route.hash);
    return;
  }

  unmountGraphPage();

  const note = data.lookups.noteBySlug.get(route.slug) || data.notes[0];

  if (!note) {
    return;
  }

  let html = "";
  try {
    html = await renderMarkdown(note.body, data, note);
  } catch (error) {
    console.warn("Falling back to plain note rendering", error);
    html = fallbackRenderHtml(note);
  }
  renderNoteChrome(note);
  document.getElementById("note-body").innerHTML = html;
  renderMetaPanel(note, data);
  highlightActiveSidebar(route);
  setPageTitle(data.site.name, note.title);
  applyFade();
  lastViewedNote = note;
  focusGraphNode(note);
  closeFloatingPanels();
  syncPanelToggleLabels();
  scrollNoteTarget(route.hash);
}

async function bootstrap() {
  await mountShell();
  const data = await loadSiteData();

  applySiteBranding(data);
  initTheme();
  bindGlobalUi(data);
  try {
    await initGraph(data);
  } catch (error) {
    console.warn("Graph initialization failed", error);
  }
  try {
    await initSearch(data);
  } catch (error) {
    console.warn("Search initialization failed", error);
  }
  await renderRoute(data);
  bindHistory(() => renderRoute(data));

  for (const homeLink of document.querySelectorAll("[data-home-link]")) {
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      navigateToNote(data.site.defaultNote);
    });
  }
}

bootstrap();

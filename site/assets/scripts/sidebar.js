import { navigateToFolder, navigateToNote } from "./router.js";

const collapsedFolders = new Set();
let initializedCollapsedState = false;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function byName(left, right) {
  return left.name.localeCompare(right.name, undefined, { sensitivity: "base" });
}

function byTitle(left, right) {
  return left.title.localeCompare(right.title, undefined, { sensitivity: "base" });
}

function folderMarkup(folder) {
  const folders = [...folder.folders].sort(byName).map((child) => folderMarkup(child)).join("");
  const notes = [...folder.notes]
    .sort(byTitle)
    .map(
      (note) => `
        <div class="tree-note">
          <a href="?note=${encodeURIComponent(note.slug)}" class="tree-note-link" data-note-link="${note.slug}">
            <span>${note.title}</span>
          </a>
        </div>
      `
    )
    .join("");

  const isCollapsed = collapsedFolders.has(folder.pathKey);
  const collapsedClass = isCollapsed ? "is-collapsed" : "";
  return `
    <section class="tree-folder ${collapsedClass}" data-folder="${folder.pathKey}">
      <div class="folder-row">
        <a href="?folder=${encodeURIComponent(folder.pathKey)}" class="folder-link" data-folder-link="${escapeHtml(folder.pathKey)}">
          <span>${folder.name}</span>
        </a>
        <button
          type="button"
          class="folder-toggle"
          data-folder-toggle="${folder.pathKey}"
          aria-label="${isCollapsed ? "Expand" : "Collapse"} ${escapeHtml(folder.name)}"
          aria-expanded="${isCollapsed ? "false" : "true"}"
          title="${isCollapsed ? "Expand" : "Collapse"} ${escapeHtml(folder.name)}"
        >
          <span aria-hidden="true">${isCollapsed ? "\u25B8" : "\u25BE"}</span>
        </button>
      </div>
      <div class="tree-children">
        ${folders}
        ${notes}
      </div>
    </section>
  `;
}

function buildTreeMarkup(sidebarTree) {
  return [
    ...[...sidebarTree.folders].sort(byName).map((folder) => folderMarkup(folder)),
    ...[...sidebarTree.notes].sort(byTitle).map(
      (note) => `
        <div class="tree-note">
          <a href="?note=${encodeURIComponent(note.slug)}" class="tree-note-link" data-note-link="${note.slug}">
            <span>${note.title}</span>
          </a>
        </div>
      `
    )
  ].join("");
}

function collectFolderKeys(node, keys = []) {
  for (const folder of node.folders || []) {
    keys.push(folder.pathKey);
    collectFolderKeys(folder, keys);
  }
  return keys;
}

function initializeCollapsedFolders(data) {
  const folderKeys = collectFolderKeys(data.sidebar);
  if (!initializedCollapsedState) {
    folderKeys.forEach((key) => collapsedFolders.add(key));
    initializedCollapsedState = true;
  }
  return folderKeys;
}

function folderKeysForRoute(route, data) {
  if (!route) {
    return [];
  }

  if (route.type === "folder") {
    const folder = data.lookups.folderByPath.get(route.folderKey);
    return folder ? folder.folderSegments.map((_, index) => folder.folderSegments.slice(0, index + 1).join("/")) : [];
  }

  if (route.type === "note") {
    const note = data.lookups.noteBySlug.get(route.slug);
    return note ? note.folderSegments.map((_, index) => note.folderSegments.slice(0, index + 1).join("/")) : [];
  }

  return [];
}

function syncCollapsedFolders(route, data) {
  for (const folderKey of folderKeysForRoute(route, data)) {
    collapsedFolders.delete(folderKey);
  }
}

function restoreSidebarState(data, route) {
  initializeCollapsedFolders(data);
  syncCollapsedFolders(route, data);
}

export function renderSidebar(data, route = null, options = {}) {
  const { syncRoute = true } = options;
  const sidebarTree = document.getElementById("sidebar-tree");
  const previousScrollTop = sidebarTree.scrollTop;
  if (syncRoute) {
    restoreSidebarState(data, route);
  } else {
    initializeCollapsedFolders(data);
  }
  sidebarTree.innerHTML = buildTreeMarkup(data.sidebar);

  const collapseButton = document.getElementById("sidebar-collapse-toggle");
  const folderKeys = initializeCollapsedFolders(data);
  const allCollapsed = folderKeys.length > 0 && folderKeys.every((key) => collapsedFolders.has(key));
  collapseButton.textContent = allCollapsed ? "\u25B8\u25B8" : "\u25BE\u25BE";
  collapseButton.setAttribute("aria-label", allCollapsed ? "Expand all folders" : "Collapse all folders");
  collapseButton.title = allCollapsed ? "Expand all folders" : "Collapse all folders";
  sidebarTree.scrollTop = previousScrollTop;

  sidebarTree.onclick = (event) => {
    const folderButton = event.target.closest("[data-folder-toggle]");
    const folderLink = event.target.closest("[data-folder-link]");
    const noteLink = event.target.closest("[data-note-link]");

    if (folderButton) {
      const folderKey = folderButton.dataset.folderToggle;
      if (collapsedFolders.has(folderKey)) {
        collapsedFolders.delete(folderKey);
      } else {
        collapsedFolders.add(folderKey);
      }
      renderSidebar(data, route, { syncRoute: false });
      return;
    }

    if (folderLink) {
      event.preventDefault();
      navigateToFolder(folderLink.dataset.folderLink);
      document.body.classList.remove("sidebar-open");
      return;
    }

    if (noteLink) {
      event.preventDefault();
      navigateToNote(noteLink.dataset.noteLink);
      document.body.classList.remove("sidebar-open");
    }
  };

  collapseButton.onclick = () => {
    if (allCollapsed) {
      collapsedFolders.clear();
    } else {
      folderKeys.forEach((key) => collapsedFolders.add(key));
    }
    renderSidebar(data, route, { syncRoute: false });
  };
}

export function highlightActiveSidebar(route) {
  let activeLink;
  for (const link of document.querySelectorAll(".tree-note-link")) {
    const isActive = route?.type === "note" && link.dataset.noteLink === route.slug;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      activeLink = link;
    }
  }

  for (const link of document.querySelectorAll(".folder-link")) {
    const isActive = route?.type === "folder" && link.dataset.folderLink === route.folderKey;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      activeLink = link;
    }
  }

  if (activeLink) {
    activeLink.scrollIntoView({ block: "nearest" });
  }
}

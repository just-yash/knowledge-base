import { resolveNoteReference } from "./data-loader.js";
import { navigateToFolder, navigateToNote } from "./router.js";

function setMetaSectionTitles(context, backlinks, outgoing) {
  const contextTitle = document.getElementById("meta-summary-title");
  const backlinksTitle = document.getElementById("backlinks-title");
  const outgoingTitle = document.getElementById("outgoing-title");

  if (contextTitle) {
    contextTitle.textContent = context;
  }
  if (backlinksTitle) {
    backlinksTitle.textContent = backlinks;
  }
  if (outgoingTitle) {
    outgoingTitle.textContent = outgoing;
  }
}

function setMetaMode(mode = "note") {
  const panel = document.querySelector(".meta-panel");
  if (!panel) {
    return;
  }

  panel.classList.toggle("graph-meta-mode", mode === "graph");
}

function renderLinkList(notes, emptyMessage, attributeName) {
  if (!notes.length) {
    return `<p class="note-excerpt">${emptyMessage}</p>`;
  }

  return notes
    .map(
      (note) => `
        <a href="?note=${encodeURIComponent(note.slug)}" class="backlink-link" ${attributeName}="${note.slug}">
          <span>${note.title}</span>
        </a>
      `
    )
    .join("");
}

function renderFolderList(folders, emptyMessage, attributeName) {
  if (!folders.length) {
    return `<p class="note-excerpt">${emptyMessage}</p>`;
  }

  return folders
    .map(
      (folder) => `
        <a href="?folder=${encodeURIComponent(folder.pathKey)}" class="backlink-link" ${attributeName}="${folder.pathKey}">
          <span>${folder.name}</span>
        </a>
      `
    )
    .join("");
}

export function renderMetaPanel(note, data) {
  const metaSummary = document.getElementById("meta-summary");
  const backlinksList = document.getElementById("backlinks-list");
  const outgoingLinks = document.getElementById("outgoing-links");
  const topicNote = resolveNoteReference(data, note.topicName) || data.lookups.noteBySlug.get(data.site.defaultNote);
  setMetaMode("note");
  setMetaSectionTitles("Context", "Backlinks", "Outgoing Links");

  metaSummary.innerHTML = [
    topicNote
      ? `<a href="?note=${encodeURIComponent(topicNote.slug)}" class="tag-chip" data-meta-note="${topicNote.slug}">${note.topicName}</a>`
      : `<span class="tag-chip">${note.topicName}</span>`,
    ...note.tags.map((tag) => `<span class="tag-chip">#${tag}</span>`)
  ].join("");

  const backlinks = note.backlinks.map((id) => data.lookups.noteById.get(id)).filter(Boolean);
  const outgoing = note.links.map((id) => data.lookups.noteById.get(id)).filter(Boolean);

  backlinksList.innerHTML = renderLinkList(backlinks, "No backlinks yet. This note is currently a leaf in the graph.", "data-backlink-note");
  outgoingLinks.innerHTML = renderLinkList(outgoing, "This note does not link out to other notes yet.", "data-outgoing-note");

  document.querySelector(".meta-panel").onclick = (event) => {
    const link = event.target.closest("[data-backlink-note], [data-outgoing-note], [data-meta-note]");
    if (!link) {
      return;
    }
    event.preventDefault();
    navigateToNote(link.dataset.backlinkNote || link.dataset.outgoingNote || link.dataset.metaNote);
  };
}

export function renderFolderMetaPanel(folder) {
  const metaSummary = document.getElementById("meta-summary");
  const backlinksList = document.getElementById("backlinks-list");
  const outgoingLinks = document.getElementById("outgoing-links");
  setMetaMode("note");
  setMetaSectionTitles("Context", "Backlinks", "Outgoing Links");

  metaSummary.innerHTML = [
    `<span class="tag-chip">Folder</span>`,
    `<span class="tag-chip">${folder.folders.length} subfolders</span>`,
    `<span class="tag-chip">${folder.notes.length} notes</span>`
  ].join("");

  backlinksList.innerHTML = renderFolderList(
    folder.folders,
    "No subfolders here yet.",
    "data-folder-meta"
  );
  outgoingLinks.innerHTML = renderLinkList(
    folder.notes,
    "No notes directly inside this folder yet.",
    "data-outgoing-note"
  );

  document.querySelector(".meta-panel").onclick = (event) => {
    const link = event.target.closest("[data-folder-meta], [data-outgoing-note]");
    if (!link) {
      return;
    }
    event.preventDefault();
    if (link.dataset.folderMeta) {
      navigateToFolder(link.dataset.folderMeta);
      return;
    }
    navigateToNote(link.dataset.outgoingNote);
  };
}

export function renderGraphMetaPanel(data) {
  const metaSummary = document.getElementById("meta-summary");
  const backlinksList = document.getElementById("backlinks-list");
  const outgoingLinks = document.getElementById("outgoing-links");

  setMetaMode("graph");
  setMetaSectionTitles("Overview", "Connected Notes", "Vault");

  const mostConnected = [...data.graph.nodes]
    .sort((left, right) => right.degree - left.degree || left.label.localeCompare(right.label))
    .slice(0, 5)
    .map((node) => data.lookups.noteBySlug.get(node.slug))
    .filter(Boolean);

  metaSummary.innerHTML = [
    `<span class="tag-chip">Graph</span>`,
    `<span class="tag-chip">${data.graph.nodes.length} notes</span>`,
    `<span class="tag-chip">${data.graph.edges.length} links</span>`
  ].join("");

  backlinksList.innerHTML = renderLinkList(
    mostConnected,
    "The graph is ready. Click a node to open its note.",
    "data-graph-note"
  );

  outgoingLinks.innerHTML = `<a href="?note=${encodeURIComponent(data.site.defaultNote)}" class="backlink-link" data-graph-home="${data.site.defaultNote}"><span>Vault Home</span></a>`;

  document.querySelector(".meta-panel").onclick = (event) => {
    const noteLink = event.target.closest("[data-graph-note]");
    const homeLink = event.target.closest("[data-graph-home]");

    if (noteLink) {
      event.preventDefault();
      navigateToNote(noteLink.dataset.graphNote);
      return;
    }

    if (homeLink) {
      event.preventDefault();
      navigateToNote(homeLink.dataset.graphHome);
    }
  };
}

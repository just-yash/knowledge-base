import { navigateToGraph, navigateToNote } from "./router.js";
import { buildGraphModel, createGraphRenderer } from "./graph-render.js";

let graphState;
let graphEventsBound = false;

function settleRenderer(renderer, options = {}) {
  if (!renderer) {
    return;
  }

  const { focusNodeId = null, zoom = 1.85 } = options;
  const applyLayout = () => {
    renderer.resize();
    if (focusNodeId) {
      renderer.centerNode(focusNodeId, { duration: 360, zoom });
      return;
    }
    renderer.zoomToFit(360);
  };

  window.requestAnimationFrame(applyLayout);
  window.setTimeout(applyLayout, 140);
}

function ensureGraphState(data) {
  if (!graphState) {
    graphState = {
      model: buildGraphModel(data),
      previewRenderer: null,
      pageRenderer: null,
      hoverNodeId: null,
      activeNodeId: null,
      searchQuery: "",
      searchMatchIds: [],
      searchPrimaryId: null
    };
  }

  return graphState;
}

function renderers() {
  if (!graphState) {
    return [];
  }

  return [graphState.previewRenderer, graphState.pageRenderer].filter(Boolean);
}

function setGraphStatus(text) {
  for (const label of document.querySelectorAll("[data-graph-status]")) {
    label.textContent = text;
  }
}

function noteById(nodeId) {
  if (!graphState?.model || !nodeId) {
    return null;
  }

  return graphState.model.nodeById.get(nodeId) || null;
}

function noteSlugById(nodeId) {
  return noteById(nodeId)?.slug || null;
}

function syncGraphStatus() {
  if (!graphState) {
    return;
  }

  if (graphState.hoverNodeId) {
    const hovered = noteById(graphState.hoverNodeId);
    if (hovered) {
      setGraphStatus(`${hovered.label} - ${hovered.degree} connections`);
      return;
    }
  }

  if (graphState.searchQuery) {
    if (graphState.searchMatchIds.length) {
      setGraphStatus(`Search: "${graphState.searchQuery}" - ${graphState.searchMatchIds.length} matches`);
      return;
    }
    setGraphStatus(`Search: "${graphState.searchQuery}" - no graph matches`);
    return;
  }

  if (graphState.activeNodeId) {
    const active = noteById(graphState.activeNodeId);
    if (active) {
      const prefix = graphState.pageRenderer ? "Last note: " : "";
      setGraphStatus(`${prefix}${active.label} - ${active.degree} connections`);
      return;
    }
  }

  setGraphStatus("Hover notes to inspect them. Open the full graph from this header, then click any node to open its note.");
}

function setActiveGraphNode(nodeId, options = {}) {
  if (!graphState || !nodeId) {
    return;
  }

  const { centerPage = false, zoom = 1.7 } = options;

  graphState.activeNodeId = nodeId;
  graphState.previewRenderer?.setActiveNode(nodeId);
  graphState.pageRenderer?.setActiveNode(nodeId);

  if (centerPage && graphState.pageRenderer) {
    graphState.pageRenderer.centerNode(nodeId, { duration: 360, zoom });
  }

  syncGraphStatus();
}

function bindGraphEvents() {
  if (graphEventsBound) {
    return;
  }

  document.addEventListener("atlas:theme-change", () => {
    for (const renderer of renderers()) {
      renderer.refreshTheme();
    }
  });

  document.addEventListener("atlas:graph-search", (event) => {
    if (!graphState) {
      return;
    }

    const detail = event.detail || {};
    const slugs = Array.isArray(detail.slugs) ? detail.slugs : [];
    const matchedIds = slugs
      .map((slug) => graphState.model.nodeBySlug.get(slug)?.id)
      .filter(Boolean);

    graphState.searchQuery = detail.query || "";
    graphState.searchMatchIds = matchedIds;
    graphState.searchPrimaryId = matchedIds[0] || null;

    for (const renderer of renderers()) {
      renderer.setSearchMatches(matchedIds);
    }

    syncGraphStatus();
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-graph]");
    if (!trigger) {
      return;
    }

    event.preventDefault();
    navigateToGraph(noteSlugById(graphState?.activeNodeId) || null);
  });

  graphEventsBound = true;
}

async function buildPreviewRenderer(container, state) {
  if (!container) {
    return null;
  }

  state.previewRenderer?.destroy?.();

  const renderer = await createGraphRenderer(container, state.model, {
    onNodeHover(node) {
      state.hoverNodeId = node?.id || null;
      syncGraphStatus();
    },
    onNodeClick(node) {
      setActiveGraphNode(node.id);
      navigateToNote(node.slug);
    },
    onBackgroundClick() {
      state.hoverNodeId = null;
      syncGraphStatus();
    }
  });

  renderer.setSearchMatches(state.searchMatchIds);
  if (state.activeNodeId) {
    renderer.setActiveNode(state.activeNodeId);
  }

  state.previewRenderer = renderer;
  settleRenderer(renderer);
  syncGraphStatus();
  return renderer;
}

export async function initGraph(data) {
  const state = ensureGraphState(data);
  bindGraphEvents();

  const container = document.getElementById("graph-canvas");
  if (!container) {
    return state;
  }

  if (state.previewRenderer && state.previewRenderer.container === container) {
    settleRenderer(state.previewRenderer);
    syncGraphStatus();
    return state;
  }

  await buildPreviewRenderer(container, state);
  return state;
}

export async function mountGraphPage(data, focusSlug = null) {
  const state = ensureGraphState(data);
  bindGraphEvents();

  const container = document.getElementById("graph-page-canvas");
  if (!container) {
    return state;
  }

  state.pageRenderer?.destroy?.();

  const renderer = await createGraphRenderer(container, state.model, {
    onNodeHover(node) {
      state.hoverNodeId = node?.id || null;
      syncGraphStatus();
    },
    onNodeClick(node) {
      setActiveGraphNode(node.id, { centerPage: true, zoom: 1.85 });
      navigateToNote(node.slug);
    },
    onBackgroundClick() {
      state.hoverNodeId = null;
      syncGraphStatus();
    }
  });

  state.pageRenderer = renderer;
  renderer.setSearchMatches(state.searchMatchIds);

  const focusNode = focusSlug
    ? state.model.nodeBySlug.get(focusSlug) || null
    : noteById(state.activeNodeId) || null;

  if (focusNode) {
    setActiveGraphNode(focusNode.id);
    settleRenderer(state.pageRenderer);
  } else {
    settleRenderer(state.pageRenderer);
  }

  syncGraphStatus();
  return state;
}

export function unmountGraphPage() {
  if (!graphState?.pageRenderer) {
    return;
  }

  graphState.pageRenderer.destroy?.();
  graphState.pageRenderer = null;
  syncGraphStatus();
}

export async function openGraph(data) {
  await initGraph(data);
  navigateToGraph(noteSlugById(graphState?.activeNodeId) || null);
}

export function focusGraphNode(note) {
  if (!graphState || !note) {
    return;
  }

  setActiveGraphNode(note.id);
}

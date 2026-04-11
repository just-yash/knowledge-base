function cssVar(name, fallback) {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
}

function readGraphPalette() {
  return {
    text: cssVar("--graph-text", "#f5eee5"),
    textSoft: cssVar("--graph-text-soft", "#c9b5a1"),
    labelBg: cssVar("--graph-label-bg", "rgba(54, 44, 37, 0.96)"),
    labelBorder: cssVar("--graph-label-border", "rgba(236, 213, 185, 0.08)"),
    nodeBase: cssVar("--graph-node-base", "#baa274"),
    nodeNeighbor: cssVar("--graph-node-neighbor", "#d7c2a6"),
    nodeActive: cssVar("--graph-node-active", "#ddb07e"),
    nodeHover: cssVar("--graph-node-hover", "#fff3e5"),
    nodeSearch: cssVar("--graph-node-search", "#c89176"),
    nodeMuted: cssVar("--graph-node-muted", "rgba(139, 111, 88, 0.24)"),
    nodeStroke: cssVar("--graph-node-stroke", "rgba(255, 255, 255, 0.8)"),
    halo: cssVar("--graph-halo", "rgba(221, 176, 126, 0.17)"),
    edge: cssVar("--graph-edge", "rgba(236, 213, 185, 0.16)"),
    edgeActive: cssVar("--graph-edge-active", "rgba(221, 176, 126, 0.42)"),
    edgeHover: cssVar("--graph-edge-hover", "rgba(255, 239, 220, 0.82)"),
    edgeMuted: cssVar("--graph-edge-muted", "rgba(236, 213, 185, 0.06)")
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function nodeRadius(node) {
  return 2.35 + Math.min(7.4, Math.sqrt((node.degree || 0) + 1) * 1.45);
}

function makeNeighborhoodSet(node) {
  return new Set([node.id, ...node.neighborIds]);
}

function intersectSets(left, right) {
  const intersection = new Set();
  for (const value of left) {
    if (right.has(value)) {
      intersection.add(value);
    }
  }
  return intersection;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function seededNoise(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 10000) / 10000;
}

function initializeNodePositions(nodes) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const maxDegree = Math.max(...nodes.map((node) => node.degree || 0), 1);
  const graphRadius = 18 + Math.sqrt(nodes.length + 1) * 16;

  nodes.forEach((node, index) => {
    const degreeRatio = Math.min(1, (node.degree || 0) / maxDegree);
    const orbitRadius = graphRadius * (0.2 + (1 - degreeRatio) * 0.8);
    node.orbitRadius = orbitRadius;

    if (!Number.isFinite(node.x) || !Number.isFinite(node.y)) {
      const jitter = (seededNoise(node.id || `${index}`) - 0.5) * Math.PI * 0.14;
      const angle = index * goldenAngle + jitter;
      node.x = Math.cos(angle) * orbitRadius;
      node.y = Math.sin(angle) * orbitRadius;
    }

    node.vx = Number.isFinite(node.vx) ? node.vx : 0;
    node.vy = Number.isFinite(node.vy) ? node.vy : 0;
    node.fx = Number.isFinite(node.fx) ? node.fx : null;
    node.fy = Number.isFinite(node.fy) ? node.fy : null;
  });
}

function computeDegreeBounds(nodes) {
  let minDegree = Infinity;
  let maxDegree = -Infinity;

  for (const node of nodes) {
    const degree = node.degree || 0;
    minDegree = Math.min(minDegree, degree);
    maxDegree = Math.max(maxDegree, degree);
  }

  return {
    minDegree: Number.isFinite(minDegree) ? minDegree : 0,
    maxDegree: Number.isFinite(maxDegree) ? maxDegree : 0
  };
}

function isNodeVisible(state, nodeId) {
  return !state.visibleNodeIds || state.visibleNodeIds.has(nodeId);
}

function recomputeState(state) {
  const activeNode = state.activeNodeId ? state.model.nodeById.get(state.activeNodeId) : null;
  const hoveredNode = state.hoverNodeId ? state.model.nodeById.get(state.hoverNodeId) : null;
  const focusNode = state.focusMode && state.focusAnchorId ? state.model.nodeById.get(state.focusAnchorId) : null;

  state.activeNeighborhoodIds = activeNode ? makeNeighborhoodSet(activeNode) : null;
  state.hoverNeighborhoodIds = hoveredNode ? makeNeighborhoodSet(hoveredNode) : null;
  state.focusNeighborhoodIds = focusNode ? makeNeighborhoodSet(focusNode) : null;
  state.searchMatchIdSet = new Set(state.searchMatchIds);
  state.searchPrimaryId = state.searchMatchIds[0] || null;

  let visibleNodeIds = null;

  if (state.tagFilter) {
    visibleNodeIds = new Set(
      state.model.nodes.filter((node) => node.tags.includes(state.tagFilter)).map((node) => node.id)
    );
  }

  if (state.focusMode && state.focusNeighborhoodIds) {
    visibleNodeIds = visibleNodeIds
      ? intersectSets(visibleNodeIds, state.focusNeighborhoodIds)
      : new Set(state.focusNeighborhoodIds);
  }

  if (visibleNodeIds && state.activeNodeId) {
    visibleNodeIds.add(state.activeNodeId);
  }

  state.visibleNodeIds = visibleNodeIds;
  state.visibleNodes = visibleNodeIds
    ? state.model.nodes.filter((node) => visibleNodeIds.has(node.id))
    : state.model.nodes;
  state.visibleLinks = state.model.links.filter(
    (link) => isNodeVisible(state, link.source.id) && isNodeVisible(state, link.target.id)
  );
}

function buildLabelText(state, node) {
  if (node.id === state.hoverNodeId || node.id === state.activeNodeId || node.id === state.searchPrimaryId) {
    return node.label;
  }
  return "";
}

function nodeStyleFor(state, node) {
  const palette = state.palette;
  const isHovered = node.id === state.hoverNodeId;
  const isActive = node.id === state.activeNodeId;
  const isSearch = state.searchMatchIdSet.has(node.id);
  const isSearchPrimary = node.id === state.searchPrimaryId;
  const isFocusAnchor = state.focusMode && node.id === state.focusAnchorId;
  const isHoverNeighbor = !!state.hoverNeighborhoodIds && state.hoverNeighborhoodIds.has(node.id) && !isHovered;
  const isActiveNeighbor = !!state.activeNeighborhoodIds && state.activeNeighborhoodIds.has(node.id) && !isActive;
  const isFocusNeighbor = !!state.focusNeighborhoodIds && state.focusNeighborhoodIds.has(node.id) && !isFocusAnchor;

  let fill = palette.nodeBase;
  let alpha = 0.92;
  let halo = false;
  let stroke = null;
  let sizeBoost = 0;

  if (isFocusNeighbor || isActiveNeighbor || isHoverNeighbor) {
    fill = palette.nodeNeighbor;
  }

  if (isSearch) {
    fill = palette.nodeSearch;
    sizeBoost = 0.65;
  }

  if (isActive || isFocusAnchor) {
    fill = palette.nodeActive;
    halo = true;
    stroke = palette.nodeStroke;
    sizeBoost = 1.15;
  }

  if (isHovered || isSearchPrimary) {
    fill = palette.nodeHover;
    halo = true;
    stroke = palette.nodeStroke;
    sizeBoost = 1.75;
  }

  if (state.hoverNeighborhoodIds && !state.hoverNeighborhoodIds.has(node.id)) {
    fill = palette.nodeMuted;
    alpha = 0.18;
  }

  return {
    fill,
    alpha,
    halo,
    stroke,
    radius: nodeRadius(node) + sizeBoost,
    label: buildLabelText(state, node)
  };
}

function linkStyleFor(state, link) {
  const palette = state.palette;
  const sourceId = link.source.id;
  const targetId = link.target.id;
  const touchesHover = state.hoverNodeId && (sourceId === state.hoverNodeId || targetId === state.hoverNodeId);
  const touchesActive = state.activeNodeId && (sourceId === state.activeNodeId || targetId === state.activeNodeId);
  const touchesSearch = state.searchPrimaryId && (sourceId === state.searchPrimaryId || targetId === state.searchPrimaryId);
  const insideHoverNeighborhood =
    !!state.hoverNeighborhoodIds &&
    state.hoverNeighborhoodIds.has(sourceId) &&
    state.hoverNeighborhoodIds.has(targetId);

  if (touchesHover) {
    return { color: palette.edgeHover, width: 1.4 };
  }
  if (touchesSearch || touchesActive) {
    return { color: palette.edgeActive, width: 1.0 };
  }
  if (insideHoverNeighborhood) {
    return { color: palette.edgeActive, width: 0.82 };
  }
  if (state.hoverNeighborhoodIds && !insideHoverNeighborhood) {
    return { color: palette.edgeMuted, width: 0.32 };
  }
  return { color: palette.edge, width: 0.54 };
}

function worldToScreen(state, x, y) {
  return {
    x: x * state.scale + state.offsetX,
    y: y * state.scale + state.offsetY
  };
}

function screenToWorld(state, x, y) {
  return {
    x: (x - state.offsetX) / state.scale,
    y: (y - state.offsetY) / state.scale
  };
}

function drawNode(ctx, state, node) {
  const style = nodeStyleFor(state, node);
  const { x, y } = worldToScreen(state, node.x, node.y);
  const radius = style.radius * state.scale;
  const label = style.label;

  ctx.save();
  ctx.globalAlpha = style.alpha;

  if (style.halo) {
    ctx.beginPath();
    ctx.fillStyle = state.palette.halo;
    ctx.arc(x, y, radius + 4.5, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.fillStyle = style.fill;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();

  if (style.stroke) {
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = clamp(1.15, 0.9, 1.8);
    ctx.stroke();
  }

  if (label) {
    const fontSize = clamp(12, 10.5, 13.5);
    ctx.font = `600 ${fontSize}px Manrope`;
    const paddingX = 6;
    const paddingY = 4;
    const labelWidth = ctx.measureText(label).width;
    const boxWidth = labelWidth + paddingX * 2;
    const boxHeight = fontSize + paddingY * 2;
    const boxX = x + radius + 8;
    const boxY = y - boxHeight / 2;

    drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, 6);
    ctx.fillStyle = state.palette.labelBg;
    ctx.fill();
    ctx.strokeStyle = state.palette.labelBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = state.palette.text;
    ctx.textBaseline = "middle";
    ctx.fillText(label, boxX + paddingX, y);
  }

  ctx.restore();
}

function fitToVisible(state, padding = 36) {
  const nodes = state.visibleNodes.length ? state.visibleNodes : state.model.nodes;
  if (!nodes.length || !state.width || !state.height) {
    return;
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const node of nodes) {
    minX = Math.min(minX, node.x);
    maxX = Math.max(maxX, node.x);
    minY = Math.min(minY, node.y);
    maxY = Math.max(maxY, node.y);
  }

  const spanX = Math.max(maxX - minX, 40);
  const spanY = Math.max(maxY - minY, 40);
  const availableWidth = Math.max(state.width - padding * 2, 40);
  const availableHeight = Math.max(state.height - padding * 2, 40);

  state.scale = clamp(
    Math.min(availableWidth / spanX, availableHeight / spanY),
    state.minZoom,
    state.maxZoom
  );
  state.offsetX = state.width / 2 - ((minX + maxX) / 2) * state.scale;
  state.offsetY = state.height / 2 - ((minY + maxY) / 2) * state.scale;
}

function runPhysics(state) {
  const nodes = state.visibleNodes.length ? state.visibleNodes : state.model.nodes;
  const links = state.visibleLinks;
  if (!nodes.length) {
    return;
  }

  const chargeStrength = 1650 * state.alpha;
  const centerStrength = 0.0032 * state.alpha;
  const radialStrength = 0.003 * state.alpha;
  const linkStrength = 0.0125 * state.alpha;
  const damping = 0.8;
  let totalMotion = 0;

  for (let index = 0; index < nodes.length; index += 1) {
    const nodeA = nodes[index];
    for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
      const nodeB = nodes[otherIndex];
      let dx = nodeB.x - nodeA.x;
      let dy = nodeB.y - nodeA.y;
      let distanceSquared = dx * dx + dy * dy;

      if (distanceSquared < 0.01) {
        dx = 0.6 - Math.random() * 1.2;
        dy = 0.6 - Math.random() * 1.2;
        distanceSquared = dx * dx + dy * dy;
      }

      const distance = Math.sqrt(distanceSquared);
      const force = chargeStrength / distanceSquared;
      const forceX = (dx / distance) * force;
      const forceY = (dy / distance) * force;

      if (nodeA.fx == null) {
        nodeA.vx -= forceX;
        nodeA.vy -= forceY;
      }
      if (nodeB.fx == null) {
        nodeB.vx += forceX;
        nodeB.vy += forceY;
      }
    }
  }

  for (const link of links) {
    const source = link.source;
    const target = link.target;
    let dx = target.x - source.x;
    let dy = target.y - source.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (!distance) {
      distance = 0.001;
      dx = 0.001;
      dy = 0.001;
    }

    const desiredLength = 34 + Math.min(Math.max(source.degree || 0, target.degree || 0), 18) * 1.9;
    const delta = distance - desiredLength;
    const force = delta * linkStrength;
    const forceX = (dx / distance) * force;
    const forceY = (dy / distance) * force;

    if (source.fx == null) {
      source.vx += forceX;
      source.vy += forceY;
    }
    if (target.fx == null) {
      target.vx -= forceX;
      target.vy -= forceY;
    }
  }

  for (const node of nodes) {
    if (node.fx != null && node.fy != null) {
      node.x = node.fx;
      node.y = node.fy;
      node.vx = 0;
      node.vy = 0;
      continue;
    }

    node.vx += -node.x * centerStrength;
    node.vy += -node.y * centerStrength;
    const distanceFromCenter = Math.sqrt(node.x * node.x + node.y * node.y) || 0.0001;
    const orbitRadius = node.orbitRadius || 0;
    const radialDelta = orbitRadius - distanceFromCenter;
    node.vx += (node.x / distanceFromCenter) * radialDelta * radialStrength;
    node.vy += (node.y / distanceFromCenter) * radialDelta * radialStrength;
    node.vx *= damping;
    node.vy *= damping;
    node.x += node.vx;
    node.y += node.vy;

    totalMotion += Math.abs(node.vx) + Math.abs(node.vy);
  }

  state.alpha = Math.max(0, state.alpha * 0.975 - 0.0008);
  if (totalMotion > 0.12) {
    state.alpha = Math.max(state.alpha, 0.012);
  }
}

function drawGraph(ctx, state) {
  ctx.clearRect(0, 0, state.width, state.height);

  for (const link of state.visibleLinks) {
    const style = linkStyleFor(state, link);
    const source = worldToScreen(state, link.source.x, link.source.y);
    const target = worldToScreen(state, link.target.x, link.target.y);
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
    ctx.restore();
  }

  for (const node of state.visibleNodes) {
    drawNode(ctx, state, node);
  }
}

function hitTestNode(state, x, y) {
  let best = null;
  let bestDistance = Infinity;

  for (const node of state.visibleNodes) {
    const point = worldToScreen(state, node.x, node.y);
    const radius = nodeRadius(node) * state.scale + 7;
    const dx = x - point.x;
    const dy = y - point.y;
    const distanceSquared = dx * dx + dy * dy;

    if (distanceSquared <= radius * radius && distanceSquared < bestDistance) {
      best = node;
      bestDistance = distanceSquared;
    }
  }

  return best;
}

function normalizePointer(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

export function buildGraphModel(data) {
  const nodes = data.graph.nodes.map((node) => ({
    ...node,
    neighborIds: new Set()
  }));
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const nodeBySlug = new Map(nodes.map((node) => [node.slug, node]));
  const tagCounts = new Map();

  initializeNodePositions(nodes);

  for (const node of nodes) {
    for (const tag of node.tags || []) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  const links = data.graph.edges
    .map((edge) => {
      const source = nodeById.get(edge.source);
      const target = nodeById.get(edge.target);
      if (!source || !target || source.id === target.id) {
        return null;
      }
      source.neighborIds.add(target.id);
      target.neighborIds.add(source.id);
      return { ...edge, source, target };
    })
    .filter(Boolean);

  const tags = [...tagCounts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([tag, count]) => ({ tag, count }));

  return {
    nodes,
    links,
    tags,
    nodeById,
    nodeBySlug,
    ...computeDegreeBounds(nodes)
  };
}

export async function createGraphRenderer(container, model, callbacks = {}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const state = {
    model,
    palette: readGraphPalette(),
    hoverNodeId: null,
    activeNodeId: null,
    focusMode: false,
    focusAnchorId: null,
    tagFilter: "",
    searchMatchIds: [],
    searchMatchIdSet: new Set(),
    searchPrimaryId: null,
    activeNeighborhoodIds: null,
    hoverNeighborhoodIds: null,
    focusNeighborhoodIds: null,
    visibleNodeIds: null,
    visibleNodes: model.nodes,
    visibleLinks: model.links,
    minZoom: 0.18,
    maxZoom: 8,
    width: 0,
    height: 0,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    alpha: 0.26,
    pixelRatio: window.devicePixelRatio || 1,
    needsDraw: true,
    rafId: 0,
    destroyed: false,
    draggingNode: null,
    panningView: false,
    pointerDownNodeId: null,
    pointerDownX: 0,
    pointerDownY: 0,
    panStartX: 0,
    panStartY: 0,
    panOriginX: 0,
    panOriginY: 0
  };

  recomputeState(state);
  container.innerHTML = "";
  container.appendChild(canvas);

  function scheduleFrame() {
    if (state.rafId || state.destroyed) {
      return;
    }

    state.rafId = window.requestAnimationFrame(() => {
      state.rafId = 0;
      if (state.destroyed) {
        return;
      }

      const shouldSimulate = state.alpha > 0.002 || !!state.draggingNode;
      if (shouldSimulate) {
        runPhysics(state);
        state.needsDraw = true;
      }

      if (state.needsDraw) {
        drawGraph(ctx, state);
        state.needsDraw = false;
      }

      if (shouldSimulate || state.needsDraw) {
        scheduleFrame();
      }
    });
  }

  function invalidate(withEnergy = false) {
    if (withEnergy) {
      state.alpha = Math.max(state.alpha, 0.1);
    }
    state.needsDraw = true;
    scheduleFrame();
  }

  function resize() {
    const width = Math.max(container.clientWidth || 0, 10);
    const height = Math.max(container.clientHeight || 0, 10);
    state.width = width;
    state.height = height;
    state.pixelRatio = window.devicePixelRatio || 1;

    canvas.width = Math.round(width * state.pixelRatio);
    canvas.height = Math.round(height * state.pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);

    if (!state.offsetX && !state.offsetY) {
      fitToVisible(state);
    }
    invalidate();
  }

  function updateHover(node) {
    const nextId = node?.id || null;
    if (state.hoverNodeId === nextId) {
      return;
    }
    state.hoverNodeId = nextId;
    recomputeState(state);
    invalidate();
    callbacks.onNodeHover?.(node || null);
  }

  function zoomToFit() {
    fitToVisible(state);
    invalidate();
  }

  function centerNode(nodeId, options = {}) {
    const { zoom = null } = options;
    const node = model.nodeById.get(nodeId);
    if (!node) {
      return;
    }

    if (typeof zoom === "number") {
      state.scale = clamp(zoom, state.minZoom, state.maxZoom);
    }

    state.offsetX = state.width / 2 - node.x * state.scale;
    state.offsetY = state.height / 2 - node.y * state.scale;
    invalidate();
  }

  function refresh() {
    recomputeState(state);
    invalidate();
  }

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const pointer = normalizePointer(canvas, event);
    const worldBefore = screenToWorld(state, pointer.x, pointer.y);
    const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9;
    state.scale = clamp(state.scale * scaleFactor, state.minZoom, state.maxZoom);
    state.offsetX = pointer.x - worldBefore.x * state.scale;
    state.offsetY = pointer.y - worldBefore.y * state.scale;
    invalidate();
  }, { passive: false });

  canvas.addEventListener("pointerdown", (event) => {
    const pointer = normalizePointer(canvas, event);
    const node = hitTestNode(state, pointer.x, pointer.y);
    state.pointerDownNodeId = node?.id || null;
    state.pointerDownX = pointer.x;
    state.pointerDownY = pointer.y;

    if (node) {
      state.draggingNode = node;
      const world = screenToWorld(state, pointer.x, pointer.y);
      node.fx = world.x;
      node.fy = world.y;
      canvas.setPointerCapture?.(event.pointerId);
      invalidate(true);
      return;
    }

    state.panningView = true;
    state.panStartX = pointer.x;
    state.panStartY = pointer.y;
    state.panOriginX = state.offsetX;
    state.panOriginY = state.offsetY;
    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    const pointer = normalizePointer(canvas, event);

    if (state.draggingNode) {
      const world = screenToWorld(state, pointer.x, pointer.y);
      state.draggingNode.fx = world.x;
      state.draggingNode.fy = world.y;
      state.draggingNode.x = world.x;
      state.draggingNode.y = world.y;
      invalidate(true);
      updateHover(state.draggingNode);
      return;
    }

    if (state.panningView) {
      state.offsetX = state.panOriginX + (pointer.x - state.panStartX);
      state.offsetY = state.panOriginY + (pointer.y - state.panStartY);
      invalidate();
      return;
    }

    updateHover(hitTestNode(state, pointer.x, pointer.y));
  });

  canvas.addEventListener("pointerup", (event) => {
    const pointer = normalizePointer(canvas, event);
    const moved =
      Math.abs(pointer.x - state.pointerDownX) > 4 ||
      Math.abs(pointer.y - state.pointerDownY) > 4;

    if (state.draggingNode) {
      const releasedNode = state.draggingNode;
      releasedNode.fx = null;
      releasedNode.fy = null;
      state.draggingNode = null;
      state.alpha = Math.max(state.alpha, 0.12);
      invalidate(true);

      if (!moved && state.pointerDownNodeId === releasedNode.id) {
        callbacks.onNodeClick?.(releasedNode, event);
      }
    } else if (state.panningView) {
      state.panningView = false;
      if (!moved) {
        const node = hitTestNode(state, pointer.x, pointer.y);
        if (node) {
          callbacks.onNodeClick?.(node, event);
        } else {
          callbacks.onBackgroundClick?.();
        }
      }
    } else {
      const node = hitTestNode(state, pointer.x, pointer.y);
      if (node) {
        callbacks.onNodeClick?.(node, event);
      } else {
        callbacks.onBackgroundClick?.();
      }
    }

    canvas.releasePointerCapture?.(event.pointerId);
  });

  canvas.addEventListener("pointerleave", () => {
    if (!state.draggingNode && !state.panningView) {
      updateHover(null);
    }
  });

  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          resize();
        })
      : null;
  resizeObserver?.observe(container);

  resize();
  zoomToFit();
  invalidate(true);

  return {
    container,
    refresh,
    resize,
    zoomToFit,
    centerNode,
    setActiveNode(nodeId) {
      state.activeNodeId = nodeId || null;
      if (state.focusMode && nodeId) {
        state.focusAnchorId = nodeId;
      }
      refresh();
    },
    setSearchMatches(nodeIds) {
      state.searchMatchIds = [...nodeIds];
      refresh();
    },
    setTagFilter(tag) {
      state.tagFilter = tag || "";
      refresh();
      zoomToFit();
    },
    setFocusMode(enabled, anchorId) {
      state.focusMode = enabled;
      state.focusAnchorId = enabled ? anchorId || state.activeNodeId : null;
      refresh();
      zoomToFit();
    },
    refreshTheme() {
      state.palette = readGraphPalette();
      invalidate();
    },
    destroy() {
      state.destroyed = true;
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId);
      }
      resizeObserver?.disconnect();
      container.innerHTML = "";
    },
    getState() {
      return state;
    }
  };
}

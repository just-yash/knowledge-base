// vault-graph.jsx — Phase 3: Force-directed knowledge graph (mini + full modal)

const { useRef, useEffect, useState, useCallback } = React;

// ─── Group colors (matching the screenshot palette) ───────────────────────────
const GROUP_COLORS = {
  notes:    '#6b8dd6',  // blue
  moc:      '#e87c66',  // orange/coral
  research: '#7bc9a0',  // green
  raw:      '#d4a96a',  // amber
};

// ─── Force Graph Simulation ───────────────────────────────────────────────────
class ForceGraph {
  constructor(nodes, edges, width, height) {
    this.width = width;
    this.height = height;
    this.alpha = 1;
    this.alphaDecay = 0.011;   // slower cooling → settles more gracefully
    this.velocityDecay = 0.42;

    // Adjacency map for highlight lookups
    this.adjacency = new Map();
    nodes.forEach(n => this.adjacency.set(n.id, new Set()));
    edges.forEach(e => {
      this.adjacency.get(e.source)?.add(e.target);
      this.adjacency.get(e.target)?.add(e.source);
    });

    this.nodes = nodes.map(n => {
      const deg = this.adjacency.get(n.id)?.size || 0;
      return {
        ...n,
        x: width / 2 + (Math.random() - 0.5) * Math.min(width, height) * 0.65,
        y: height / 2 + (Math.random() - 0.5) * Math.min(width, height) * 0.65,
        vx: 0, vy: 0,
        degree: deg,
        r: Math.max(2.5, Math.min(5.5, 2.5 + deg * 0.35)),
      };
    });

    this.edges = edges
      .map(e => ({
        source: this.nodes.find(n => n.id === e.source),
        target: this.nodes.find(n => n.id === e.target),
      }))
      .filter(e => e.source && e.target);
  }

  tick() {
    if (this.alpha < 0.001) return false;
    const { nodes, edges, width, height, alpha } = this;
    const cx = width / 2, cy = height / 2;

    // Repulsion — O(n²) fine for ≤ 40 nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        const dist2 = dx * dx + dy * dy || 0.01;
        const dist = Math.sqrt(dist2);
        const force = 2600 / dist2 * alpha;
        const fx = force * dx / dist, fy = force * dy / dist;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }

    // Attraction along edges
    for (const e of edges) {
      const dx = e.target.x - e.source.x;
      const dy = e.target.y - e.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const ideal = 80;
      const force = ((dist - ideal) / dist) * 0.06 * alpha;
      e.source.vx += force * dx; e.source.vy += force * dy;
      e.target.vx -= force * dx; e.target.vy -= force * dy;
    }

    // Weak center gravity
    for (const n of nodes) {
      n.vx += (cx - n.x) * 0.009 * alpha;
      n.vy += (cy - n.y) * 0.009 * alpha;
    }

    // Integrate
    for (const n of nodes) {
      n.vx *= this.velocityDecay;
      n.vy *= this.velocityDecay;
      n.x = Math.max(n.r + 3, Math.min(width - n.r - 3, n.x + n.vx));
      n.y = Math.max(n.r + 3, Math.min(height - n.r - 3, n.y + n.vy));
    }

    this.alpha -= this.alphaDecay;
    return true;
  }

  getNodeAt(x, y, hitRadius = 12) {
    let best = null, bestDist = hitRadius;
    for (const n of this.nodes) {
      const d = Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2);
      if (d < bestDist) { bestDist = d; best = n; }
    }
    return best;
  }
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────
// showLabels: draw name tags for all nodes; labelAlpha: 0–1 fade-in by zoom level
function drawGraph(ctx, g, W, H, activeId, hovNode, dimUnlit, showLabels = false, labelAlpha = 0) {
  ctx.clearRect(0, 0, W, H);

  const hov = hovNode;
  const highlighted = new Set();
  if (hov) {
    highlighted.add(hov.id);
    g.adjacency.get(hov.id)?.forEach(id => highlighted.add(id));
  }
  // Also highlight neighbours of active note when nothing is hovered
  const activeNeighbours = new Set();
  if (!hov && activeId) {
    activeNeighbours.add(activeId);
    g.adjacency.get(activeId)?.forEach(id => activeNeighbours.add(id));
  }

  // Edges
  for (const e of g.edges) {
    const isActiveEdge = activeNeighbours.has(e.source.id) && activeNeighbours.has(e.target.id);
    const lit = hov
      ? highlighted.has(e.source.id) && highlighted.has(e.target.id)
      : isActiveEdge;
    ctx.beginPath();
    ctx.moveTo(e.source.x, e.source.y);
    ctx.lineTo(e.target.x, e.target.y);
    ctx.strokeStyle = lit
      ? 'rgba(255,255,255,0.50)'
      : dimUnlit ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.13)';
    ctx.lineWidth = lit ? 1.4 : 0.75;
    ctx.stroke();
  }

  // Nodes
  for (const n of g.nodes) {
    const isActive = n.id === activeId;
    const isHov = n.id === hov?.id;
    const isLit = hov ? highlighted.has(n.id) : activeNeighbours.has(n.id);
    const color = GROUP_COLORS[n.group] || 'rgba(255,255,255,0.65)';
    const r = n.r + (isActive ? 2 : isHov ? 1.5 : 0);

    // Glow ring for active/hovered
    if (isActive || isHov) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(107,141,214,0.28)' : 'rgba(255,255,255,0.12)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    const dim = (dimUnlit || (activeNeighbours.size > 0 && !hov)) && !isLit && !isActive;
    ctx.fillStyle = isActive ? '#ffffff'
      : isHov ? '#fff'
      : dim ? 'rgba(255,255,255,0.18)'
      : color;
    ctx.globalAlpha = dim ? 0.30 : 1;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Always-visible labels (scaled by zoom / labelAlpha)
  if (showLabels && labelAlpha > 0) {
    ctx.font = '10.5px "IBM Plex Sans", sans-serif';
    for (const n of g.nodes) {
      if (n.id === hov?.id) continue; // hovered label drawn separately below
      const isActive = n.id === activeId;
      const dim = (activeNeighbours.size > 0 && !hov) && !activeNeighbours.has(n.id);
      const alpha = labelAlpha * (isActive ? 0.95 : dim ? 0.22 : 0.55);
      if (alpha < 0.05) continue;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = isActive ? '#ffffff' : 'rgba(210,212,220,1)';
      ctx.fillText(n.label || n.id, n.x + n.r + 5, n.y + 4);
    }
    ctx.globalAlpha = 1;
  }

  // Hovered node label — prominent pill
  if (hov) {
    const label = hov.label || hov.id;
    ctx.font = 'bold 11px "IBM Plex Sans", sans-serif';
    const tw = ctx.measureText(label).width;
    const lx = Math.min(W - tw - 14, Math.max(4, hov.x - tw / 2));
    const ly = hov.y - hov.r - 9;
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = 'rgba(14,15,18,0.92)';
    ctx.beginPath();
    ctx.roundRect(lx - 6, ly - 13, tw + 12, 18, 4);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, lx, ly);
    ctx.globalAlpha = 1;
  }
}

// ─── Mini Graph (in sidebar) — pan + zoom + node-drag + click-to-navigate ─────
const MiniGraph = ({ currentNote, onNavigate, onOpenFull }) => {
  const canvasRef    = useRef(null);
  const graphRef     = useRef(null);
  const rafRef       = useRef(null);
  const hovRef       = useRef(null);
  const dragNodeRef  = useRef(null);
  const activeRef    = useRef(currentNote);
  const panRef       = useRef({ x: 0, y: 0, dragging: false, lx: 0, ly: 0, moved: false });
  const zoomRef      = useRef(1);
  const [hovId, setHovId]       = useState(null);
  const [cursor, setCursor]     = useState('grab');

  useEffect(() => { activeRef.current = currentNote; }, [currentNote]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.GRAPH_NODES) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 220;
    const H = canvas.offsetHeight || 160;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    graphRef.current = new ForceGraph([...GRAPH_NODES], [...GRAPH_EDGES], W, H);

    const loop = () => {
      const g = graphRef.current;
      if (!g) return;
      // Pin dragged node
      if (dragNodeRef.current) {
        dragNodeRef.current.vx = 0;
        dragNodeRef.current.vy = 0;
        if (g.alpha < 0.3) g.alpha = 0.3;
      }
      g.tick();
      const { x: px, y: py } = panRef.current;
      const zoom = zoomRef.current;

      ctx.save();
      ctx.clearRect(0, 0, W, H);
      ctx.translate(W / 2 + px, H / 2 + py);
      ctx.scale(zoom, zoom);
      ctx.translate(-W / 2, -H / 2);
      drawGraph(ctx, g, W, H, activeRef.current, hovRef.current, false, false, 0);
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const toGraph = useCallback((cx, cy) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const { x: px, y: py } = panRef.current;
    const zoom = zoomRef.current;
    return {
      x: (cx - rect.left - W / 2 - px) / zoom + W / 2,
      y: (cy - rect.top  - H / 2 - py) / zoom + H / 2,
    };
  }, []);

  const onMouseMove = useCallback((e) => {
    const { x, y } = toGraph(e.clientX, e.clientY);
    if (dragNodeRef.current) {
      dragNodeRef.current.x = x;
      dragNodeRef.current.y = y;
      panRef.current.moved = true;
      return;
    }
    const p = panRef.current;
    if (p.dragging) {
      p.x += e.clientX - p.lx;
      p.y += e.clientY - p.ly;
      p.lx = e.clientX; p.ly = e.clientY;
      p.moved = true;
      return;
    }
    const node = graphRef.current?.getNodeAt(x, y, 14);
    hovRef.current = node || null;
    setHovId(node?.id || null);
    setCursor(node ? 'pointer' : 'grab');
  }, [toGraph]);

  const onMouseDown = useCallback((e) => {
    const { x, y } = toGraph(e.clientX, e.clientY);
    const node = graphRef.current?.getNodeAt(x, y, 14);
    if (node) {
      dragNodeRef.current = node;
      panRef.current.moved = false;
      setCursor('grabbing');
    } else {
      panRef.current = { ...panRef.current, dragging: true, lx: e.clientX, ly: e.clientY, moved: false };
      setCursor('grabbing');
    }
  }, [toGraph]);

  const onMouseUp = useCallback((e) => {
    if (dragNodeRef.current) {
      dragNodeRef.current.vx = 0; dragNodeRef.current.vy = 0;
      dragNodeRef.current = null;
      setCursor('grab');
      return;
    }
    const p = panRef.current;
    if (!p.moved) {
      const { x, y } = toGraph(e.clientX, e.clientY);
      const node = graphRef.current?.getNodeAt(x, y, 14);
      if (node && window.VAULT_NOTES?.[node.id]) onNavigate(node.id);
    }
    p.dragging = false; p.moved = false;
    setCursor('grab');
  }, [toGraph, onNavigate]);

  const onMouseLeave = useCallback(() => {
    hovRef.current = null; setHovId(null);
    if (dragNodeRef.current) { dragNodeRef.current.vx = 0; dragNodeRef.current.vy = 0; dragNodeRef.current = null; }
    panRef.current.dragging = false;
    setCursor('grab');
  }, []);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    zoomRef.current = Math.max(0.3, Math.min(6, zoomRef.current * (e.deltaY < 0 ? 1.12 : 0.89)));
  }, []);

  return (
    <div style={{ margin: '8px 8px 4px', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onWheel={onWheel}
        style={{
          width: '100%', height: 160, display: 'block',
          borderRadius: 6, border: '1px solid var(--border)',
          background: 'var(--bg-graph)',
          cursor,
        }}
      />
      <button onClick={onOpenFull} title="Open full graph view" style={{
        position: 'absolute', bottom: 7, right: 8,
        background: 'rgba(14,15,18,0.78)', backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4,
        padding: '2px 8px', fontSize: 10, color: 'rgba(255,255,255,0.5)',
        cursor: 'pointer', transition: 'color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
      >
        Graph view
      </button>
    </div>
  );
};

// ─── Full Graph Modal ─────────────────────────────────────────────────────────
const FullGraph = ({ currentNote, onNavigate, onClose }) => {
  const canvasRef    = useRef(null);
  const graphRef     = useRef(null);
  const rafRef       = useRef(null);
  const hovRef       = useRef(null);
  const dragNodeRef  = useRef(null);
  const activeRef    = useRef(currentNote);
  const panRef       = useRef({ x: 0, y: 0, dragging: false, lx: 0, ly: 0, moved: false });
  const zoomRef      = useRef(1);
  const [hovId, setHovId]   = useState(null);
  const [cursor, setCursor] = useState('grab');

  useEffect(() => { activeRef.current = currentNote; }, [currentNote]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.GRAPH_NODES) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = canvas.offsetWidth  * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    graphRef.current = new ForceGraph([...GRAPH_NODES], [...GRAPH_EDGES], W, H);
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const g = graphRef.current;
      if (!g) return;
      if (dragNodeRef.current) {
        dragNodeRef.current.vx = 0;
        dragNodeRef.current.vy = 0;
        if (g.alpha < 0.3) g.alpha = 0.3;
      }
      g.tick();
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      const zoom = zoomRef.current;
      const labelAlpha = Math.min(1, Math.max(0, (zoom - 0.35) / 0.55));

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
      const { x: px, y: py } = panRef.current;
      ctx.translate(W / 2 + px, H / 2 + py);
      ctx.scale(zoom, zoom);
      ctx.translate(-W / 2, -H / 2);

      drawGraph(ctx, g, W, H, activeRef.current, hovRef.current, !!hovRef.current, true, labelAlpha);

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const toGraph = useCallback((cx, cy) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const { x: px, y: py } = panRef.current;
    const zoom = zoomRef.current;
    return {
      x: (cx - rect.left - W / 2 - px) / zoom + W / 2,
      y: (cy - rect.top  - H / 2 - py) / zoom + H / 2,
    };
  }, []);

  const onMouseMove = useCallback((e) => {
    const { x, y } = toGraph(e.clientX, e.clientY);
    if (dragNodeRef.current) {
      dragNodeRef.current.x = x;
      dragNodeRef.current.y = y;
      panRef.current.moved = true;
      return;
    }
    const p = panRef.current;
    if (p.dragging) {
      p.x += e.clientX - p.lx; p.y += e.clientY - p.ly;
      p.lx = e.clientX; p.ly = e.clientY; p.moved = true;
      return;
    }
    const node = graphRef.current?.getNodeAt(x, y, 16);
    hovRef.current = node || null;
    setHovId(node?.id || null);
    setCursor(node ? 'pointer' : 'grab');
  }, [toGraph]);

  const onMouseDown = useCallback((e) => {
    const { x, y } = toGraph(e.clientX, e.clientY);
    const node = graphRef.current?.getNodeAt(x, y, 16);
    if (node) {
      dragNodeRef.current = node;
      panRef.current.moved = false;
      setCursor('grabbing');
    } else {
      panRef.current = { ...panRef.current, dragging: true, lx: e.clientX, ly: e.clientY, moved: false };
      setCursor('grabbing');
    }
  }, [toGraph]);

  const onMouseUp = useCallback((e) => {
    if (dragNodeRef.current) {
      dragNodeRef.current.vx = 0; dragNodeRef.current.vy = 0;
      dragNodeRef.current = null;
      setCursor('grab');
      return;
    }
    const p = panRef.current;
    if (!p.moved) {
      const { x, y } = toGraph(e.clientX, e.clientY);
      const node = graphRef.current?.getNodeAt(x, y, 16);
      // Single-click navigates but keeps the graph open (like Obsidian)
      if (node && window.VAULT_NOTES?.[node.id]) { onNavigate(node.id); }
    }
    p.dragging = false; p.moved = false;
    setCursor('grab');
  }, [toGraph, onNavigate]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    zoomRef.current = Math.max(0.2, Math.min(8, zoomRef.current * (e.deltaY < 0 ? 1.12 : 0.89)));
  }, []);

  // Keyboard: Escape to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        width: '82vw', height: '80vh', maxWidth: 1120, maxHeight: 760,
        background: 'var(--bg-app)', borderRadius: 12,
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-modal)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0,
        }}>
          <Icon name="git-branch" size={14} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>
            Knowledge Graph — {GRAPH_NODES.length} nodes · {GRAPH_EDGES.length} edges
          </span>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--text-muted)' }}>
            {Object.entries(GROUP_COLORS).map(([g, c]) => (
              <span key={g} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />
                {g}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 12 }}>
            Scroll to zoom · Drag to pan · Click node to open
          </span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', display: 'flex', padding: 4, borderRadius: 4,
            marginLeft: 6, transition: 'color 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Icon name="x" size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onMouseMove={onMouseMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={() => {
            hovRef.current = null; setHovId(null);
            if (dragNodeRef.current) { dragNodeRef.current.vx = 0; dragNodeRef.current.vy = 0; dragNodeRef.current = null; }
            panRef.current.dragging = false;
            setCursor('grab');
          }}
          onWheel={onWheel}
          style={{
            flex: 1, width: '100%', display: 'block',
            background: 'var(--bg-graph)',
            cursor,
          }}
        />

        {/* Footer */}
        <div style={{
          padding: '7px 16px', borderTop: '1px solid var(--border)',
          fontSize: 11, color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
        }}>
          {hovId && window.VAULT_NOTES?.[hovId] && (
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              <Icon name="file" size={11} strokeWidth={1.5} style={{ marginRight: 4, verticalAlign: 'middle' }} />
              {VAULT_NOTES[hovId].title}
            </span>
          )}
          <span style={{ marginLeft: 'auto' }}>Active: <strong style={{ color: 'var(--text-secondary)' }}>{currentNote ? (VAULT_NOTES[currentNote]?.title || currentNote) : '—'}</strong></span>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { MiniGraph, FullGraph, ForceGraph });

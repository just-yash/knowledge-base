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
    this.alphaDecay = 0.015;
    this.velocityDecay = 0.38;

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
      const ideal = 70;
      const force = ((dist - ideal) / dist) * 0.055 * alpha;
      e.source.vx += force * dx; e.source.vy += force * dy;
      e.target.vx -= force * dx; e.target.vy -= force * dy;
    }

    // Weak center gravity
    for (const n of nodes) {
      n.vx += (cx - n.x) * 0.012 * alpha;
      n.vy += (cy - n.y) * 0.012 * alpha;
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
function drawGraph(ctx, g, W, H, activeId, hovNode, dimUnlit) {
  ctx.clearRect(0, 0, W, H);

  const hov = hovNode;
  const highlighted = new Set();
  if (hov) {
    highlighted.add(hov.id);
    g.adjacency.get(hov.id)?.forEach(id => highlighted.add(id));
  }

  // Edges
  for (const e of g.edges) {
    const lit = hov
      ? highlighted.has(e.source.id) && highlighted.has(e.target.id)
      : (e.source.id === activeId || e.target.id === activeId);
    ctx.beginPath();
    ctx.moveTo(e.source.x, e.source.y);
    ctx.lineTo(e.target.x, e.target.y);
    ctx.strokeStyle = lit
      ? 'rgba(255,255,255,0.45)'
      : dimUnlit ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = lit ? 1.2 : 0.7;
    ctx.stroke();
  }

  // Nodes
  for (const n of g.nodes) {
    const isActive = n.id === activeId;
    const isHov = n.id === hov?.id;
    const isLit = hov ? highlighted.has(n.id) : isActive;
    const color = GROUP_COLORS[n.group] || 'rgba(255,255,255,0.6)';
    const r = n.r + (isActive ? 1.8 : isHov ? 1.2 : 0);

    // Glow ring for active/hovered
    if (isActive || isHov) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(107,141,214,0.22)' : 'rgba(255,255,255,0.1)';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    const dim = dimUnlit && !isLit && !isActive;
    ctx.fillStyle = isActive ? '#ffffff'
      : dim ? 'rgba(255,255,255,0.15)'
      : isHov ? '#fff'
      : color;
    ctx.globalAlpha = dim ? 0.35 : 1;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Label for hovered
  if (hov) {
    const label = hov.label || hov.id;
    ctx.font = '10px IBM Plex Sans, sans-serif';
    const tw = ctx.measureText(label).width;
    const lx = Math.min(W - tw - 8, Math.max(4, hov.x - tw / 2));
    const ly = hov.y - hov.r - 7;
    ctx.fillStyle = 'rgba(18,19,22,0.9)';
    ctx.beginPath();
    ctx.roundRect(lx - 5, ly - 12, tw + 10, 17, 3);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText(label, lx, ly);
  }
}

// ─── Mini Graph (in sidebar) — pan + zoom + click-to-navigate ────────────────
const MiniGraph = ({ currentNote, onNavigate, onOpenFull }) => {
  const canvasRef    = useRef(null);
  const graphRef     = useRef(null);
  const rafRef       = useRef(null);
  const hovRef       = useRef(null);
  const activeRef    = useRef(currentNote);
  const panRef       = useRef({ x: 0, y: 0, dragging: false, lx: 0, ly: 0, moved: false });
  const zoomRef      = useRef(1);
  const [hovId, setHovId] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => { activeRef.current = currentNote; }, [currentNote]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.GRAPH_NODES) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 220;
    const H = canvas.offsetHeight || 138;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    graphRef.current = new ForceGraph([...GRAPH_NODES], [...GRAPH_EDGES], W, H);

    const loop = () => {
      graphRef.current?.tick();
      const g = graphRef.current;
      const { x: px, y: py } = panRef.current;
      const zoom = zoomRef.current;

      ctx.save();
      ctx.clearRect(0, 0, W, H);
      ctx.translate(W / 2 + px, H / 2 + py);
      ctx.scale(zoom, zoom);
      ctx.translate(-W / 2, -H / 2);
      drawGraph(ctx, g, W, H, activeRef.current, hovRef.current, false);
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Convert screen → graph coordinates
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
    const p = panRef.current;
    if (p.dragging) {
      p.x += e.clientX - p.lx;
      p.y += e.clientY - p.ly;
      p.lx = e.clientX; p.ly = e.clientY;
      p.moved = true;
      return;
    }
    const { x, y } = toGraph(e.clientX, e.clientY);
    const node = graphRef.current?.getNodeAt(x, y, 14);
    hovRef.current = node || null;
    setHovId(node?.id || null);
  }, [toGraph]);

  const onMouseDown = useCallback((e) => {
    panRef.current = { ...panRef.current, dragging: true, lx: e.clientX, ly: e.clientY, moved: false };
    setDragging(true);
  }, []);

  const onMouseUp = useCallback((e) => {
    const p = panRef.current;
    if (!p.moved) {
      const { x, y } = toGraph(e.clientX, e.clientY);
      const node = graphRef.current?.getNodeAt(x, y, 14);
      if (node && window.VAULT_NOTES?.[node.id]) onNavigate(node.id);
    }
    p.dragging = false; p.moved = false;
    setDragging(false);
  }, [toGraph, onNavigate]);

  const onMouseLeave = useCallback(() => {
    hovRef.current = null; setHovId(null);
    panRef.current.dragging = false; setDragging(false);
  }, []);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    zoomRef.current = Math.max(0.3, Math.min(5, zoomRef.current * (e.deltaY < 0 ? 1.12 : 0.89)));
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
          width: '100%', height: 138, display: 'block',
          borderRadius: 6, border: '1px solid var(--border)',
          background: 'var(--bg-graph)',
          cursor: dragging ? 'grabbing' : hovId && window.VAULT_NOTES?.[hovId] ? 'pointer' : 'grab',
        }}
      />
      <button onClick={onOpenFull} title="Open full graph view" style={{
        position: 'absolute', bottom: 7, right: 8,
        background: 'rgba(14,15,18,0.75)', backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4,
        padding: '2px 8px', fontSize: 10, color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer', transition: 'color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
      >
        Graph view
      </button>
    </div>
  );
};

// ─── Full Graph Modal ─────────────────────────────────────────────────────────
const FullGraph = ({ currentNote, onNavigate, onClose }) => {
  const canvasRef  = useRef(null);
  const graphRef   = useRef(null);
  const rafRef     = useRef(null);
  const hovRef     = useRef(null);
  const activeRef  = useRef(currentNote);
  const panRef     = useRef({ x: 0, y: 0, dragging: false, lx: 0, ly: 0, moved: false });
  const zoomRef    = useRef(1);
  const [hovId, setHovId] = useState(null);

  useEffect(() => { activeRef.current = currentNote; }, [currentNote]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.GRAPH_NODES) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    graphRef.current = new ForceGraph([...GRAPH_NODES], [...GRAPH_EDGES], W, H);
    const ctx = canvas.getContext('2d');

    const loop = () => {
      graphRef.current?.tick();
      const g = graphRef.current;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const { x: px, y: py } = panRef.current;
      const zoom = zoomRef.current;
      ctx.translate(W / 2 + px, H / 2 + py);
      ctx.scale(zoom, zoom);
      ctx.translate(-W / 2, -H / 2);

      drawGraph(ctx, g, W, H, activeRef.current, hovRef.current, !!hovRef.current);

      // Node labels for all nodes when zoomed in
      if (zoom > 1.2) {
        ctx.font = '10px IBM Plex Sans, sans-serif';
        for (const n of g.nodes) {
          if (n.id === hovRef.current?.id) continue; // already drawn by drawGraph
          ctx.fillStyle = 'rgba(255,255,255,0.38)';
          ctx.fillText(n.label || n.id, n.x + n.r + 4, n.y + 4);
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Convert screen → graph coordinates (accounting for pan + zoom)
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
    const p = panRef.current;
    if (p.dragging) {
      p.x += e.clientX - p.lx; p.y += e.clientY - p.ly;
      p.lx = e.clientX; p.ly = e.clientY; p.moved = true;
      return;
    }
    const { x, y } = toGraph(e.clientX, e.clientY);
    const node = graphRef.current?.getNodeAt(x, y, 16);
    hovRef.current = node || null;
    setHovId(node?.id || null);
  }, [toGraph]);

  const onMouseDown = useCallback((e) => {
    panRef.current = { ...panRef.current, dragging: true, lx: e.clientX, ly: e.clientY, moved: false };
  }, []);

  const onMouseUp = useCallback((e) => {
    const p = panRef.current;
    if (!p.moved) {
      const { x, y } = toGraph(e.clientX, e.clientY);
      const node = graphRef.current?.getNodeAt(x, y, 16);
      if (node && window.VAULT_NOTES?.[node.id]) { onNavigate(node.id); onClose(); }
    }
    p.dragging = false; p.moved = false;
  }, [toGraph, onNavigate, onClose]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    zoomRef.current = Math.max(0.25, Math.min(5, zoomRef.current * (e.deltaY < 0 ? 1.12 : 0.89)));
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
          onMouseLeave={() => { hovRef.current = null; setHovId(null); panRef.current.dragging = false; }}
          onWheel={onWheel}
          style={{
            flex: 1, width: '100%', display: 'block',
            background: 'var(--bg-graph)',
            cursor: hovId ? 'pointer' : panRef.current?.dragging ? 'grabbing' : 'grab',
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

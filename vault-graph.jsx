// vault-graph.jsx — Phase 3: Force-directed knowledge graph (mini + full modal)

const { useRef, useEffect, useState, useCallback } = React;

// ─── Group colors (matching the screenshot palette) ───────────────────────────
const GROUP_COLORS = {
  notes:    '#6b8dd6',  // blue
  moc:      '#e87c66',  // orange/coral
  research: '#7bc9a0',  // green
  raw:      '#d4a96a',  // amber
};

// ─── Default physics / display config ────────────────────────────────────────
const DEFAULT_CFG = {
  // display
  arrows:             false,
  textFadeThreshold:  3.5,
  nodeSize:           1.0,
  linkThickness:      1.0,
  // forces
  centerForce:  0.005,
  repelForce:   4500,
  linkForce:    0.04,
  linkDistance: 80,
};

// ─── Force Graph Simulation ───────────────────────────────────────────────────
class ForceGraph {
  constructor(nodes, edges, width, height, cfg = {}) {
    this.width  = width;
    this.height = height;
    this.alpha  = 1;
    this.alphaDecay   = 0.010;
    this.velocityDecay = 0.42;
    // Mutable physics config — caller can update at runtime
    this.cfg = { ...DEFAULT_CFG, ...cfg };

    this.adjacency = new Map();
    nodes.forEach(n => this.adjacency.set(n.id, new Set()));
    edges.forEach(e => {
      this.adjacency.get(e.source)?.add(e.target);
      this.adjacency.get(e.target)?.add(e.source);
    });

    this.nodes = nodes.map(n => {
      const deg = this.adjacency.get(n.id)?.size || 0;
      const spread = Math.min(width, height) * 0.55;
      return {
        ...n,
        x: width  / 2 + (Math.random() - 0.5) * spread,
        y: height / 2 + (Math.random() - 0.5) * spread,
        vx: 0, vy: 0,
        degree: deg,
        r: Math.max(1.5, Math.min(5, 1.5 + deg * 0.18)),
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
    const { nodes, edges, width, height, alpha, cfg } = this;
    const cx = width / 2, cy = height / 2;
    const n2 = nodes.length;

    const K2 = cfg.repelForce / (n2 || 1);
    for (let i = 0; i < n2; i++) {
      for (let j = i + 1; j < n2; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        const dist2 = dx * dx + dy * dy || 0.01;
        const dist = Math.sqrt(dist2);
        const force = K2 / dist2 * alpha;
        const fx = force * dx / dist, fy = force * dy / dist;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }

    for (const e of edges) {
      const dx = e.target.x - e.source.x;
      const dy = e.target.y - e.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = ((dist - cfg.linkDistance) / dist) * cfg.linkForce * alpha;
      e.source.vx += force * dx; e.source.vy += force * dy;
      e.target.vx -= force * dx; e.target.vy -= force * dy;
    }

    for (const n of nodes) {
      n.vx += (cx - n.x) * cfg.centerForce * alpha;
      n.vy += (cy - n.y) * cfg.centerForce * alpha;
    }

    for (const n of nodes) {
      n.vx *= this.velocityDecay;
      n.vy *= this.velocityDecay;
      n.x  += n.vx;
      n.y  += n.vy;
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

// ─── Arrow head helper ────────────────────────────────────────────────────────
function drawArrowhead(ctx, sx, sy, tx, ty, targetR, size = 5) {
  const angle = Math.atan2(ty - sy, tx - sx);
  const ex = tx - targetR * Math.cos(angle);
  const ey = ty - targetR * Math.sin(angle);
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(ex - size * Math.cos(angle - Math.PI / 6), ey - size * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(ex - size * Math.cos(angle + Math.PI / 6), ey - size * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────
// cfg: live display/physics config from settings panel
function drawGraph(ctx, g, W, H, activeId, hovNode, dimUnlit, showLabels = false, labelAlpha = 0, cfg = {}) {
  ctx.clearRect(0, 0, W, H);

  const isLight = document.documentElement.dataset.theme === 'light';

  const hov        = hovNode;
  const ns         = cfg.nodeSize       || 1.0;
  const lt         = cfg.linkThickness  || 1.0;
  const highlighted = new Set();
  if (hov) {
    highlighted.add(hov.id);
    g.adjacency.get(hov.id)?.forEach(id => highlighted.add(id));
  }
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

    const edgeColor = isLight
      ? lit ? 'rgba(0,0,0,0.45)' : dimUnlit ? 'rgba(0,0,0,0.07)' : 'rgba(0,0,0,0.18)'
      : lit ? 'rgba(255,255,255,0.55)' : dimUnlit ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.13)';
    const lw = (lit ? 1.4 : 0.75) * lt;

    ctx.beginPath();
    ctx.moveTo(e.source.x, e.source.y);
    ctx.lineTo(e.target.x, e.target.y);
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth   = lw;
    ctx.stroke();

    // Arrowheads
    if (cfg.arrows) {
      const targetDispR = e.target.r * ns + (e.target.id === activeId ? 1.2 : e.target.id === hov?.id ? 0.8 : 0);
      ctx.fillStyle = edgeColor;
      drawArrowhead(ctx, e.source.x, e.source.y, e.target.x, e.target.y, targetDispR + 2, 5 * lt);
    }
  }

  // Nodes
  for (const n of g.nodes) {
    const isActive = n.id === activeId;
    const isHov    = n.id === hov?.id;
    const isLit    = hov ? highlighted.has(n.id) : activeNeighbours.has(n.id);
    const color    = GROUP_COLORS[n.group] || (isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)');
    const r        = n.r * ns + (isActive ? 1.2 : isHov ? 0.8 : 0);

    // Glow ring for active/hovered
    if (isActive || isHov) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(107,141,214,0.25)' : (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.10)');
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    // Only dim during hover — default state keeps all nodes fully visible
    const dim = dimUnlit && !isLit && !isActive && !isHov;
    ctx.fillStyle = isActive ? (isLight ? '#1a1b1e' : '#ffffff')
      : isHov     ? (isLight ? '#1a1b1e' : '#fff')
      : color;
    ctx.globalAlpha = dim ? 0.15 : 1;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Labels — only when very zoomed in (caller controls labelAlpha)
  if (showLabels && labelAlpha > 0.02) {
    ctx.font = '10px "IBM Plex Sans", sans-serif';
    for (const n of g.nodes) {
      if (n.id === hov?.id) continue; // hovered label drawn separately below
      const isActive = n.id === activeId;
      const dim = dimUnlit && !(hov ? highlighted.has(n.id) : false) && n.id !== activeId;
      const a = labelAlpha * (isActive ? 1 : dim ? 0.3 : 0.65);
      if (a < 0.04) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle = isActive
        ? (isLight ? '#1a1b1e' : '#ffffff')
        : (isLight ? 'rgba(40,45,60,1)' : 'rgba(210,215,225,1)');
      ctx.fillText(n.label || n.id, n.x + n.r * ns + 4, n.y + 3.5);
    }
    ctx.globalAlpha = 1;
  }

  // Hovered node label — prominent pill (always visible)
  if (hov) {
    const label = hov.label || hov.id;
    ctx.font = 'bold 11px "IBM Plex Sans", sans-serif';
    const tw = ctx.measureText(label).width;
    const lx = Math.min(W - tw - 14, Math.max(4, hov.x - tw / 2));
    const ly = hov.y - hov.r * ns - 9;
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = isLight ? 'rgba(20,21,24,0.88)' : 'rgba(14,15,18,0.92)';
    ctx.beginPath();
    ctx.roundRect(lx - 6, ly - 13, tw + 12, 18, 4);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, lx, ly);
    ctx.globalAlpha = 1;
  }
}

// ─── Settings Panel ───────────────────────────────────────────────────────────
const GraphSettingsPanel = ({ cfg, onChange, onAnimate }) => {
  const isMob = window.innerWidth <= 768;
  const [displayOpen, setDisplayOpen] = useState(true);
  const [forcesOpen,  setForcesOpen]  = useState(true);
  const [panelOpen,   setPanelOpen]   = useState(!isMob); // starts closed on mobile

  // Section header button (collapsible)
  const SectionBtn = ({ label, isOpen, onToggle }) => (
    <button
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, width: '100%',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '6px 12px 4px', textAlign: 'left',
        color: 'var(--text-muted)', fontSize: 10.5,
        fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em',
        transition: 'color 0.12s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
    >
      <svg width="8" height="8" viewBox="0 0 8 8" style={{
        transform: isOpen ? 'rotate(90deg)' : 'none',
        transition: 'transform 0.15s',
        flexShrink: 0, color: 'inherit',
      }}>
        <path d="M2 1l4 3-4 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label}
    </button>
  );

  // Slider row
  const SliderRow = ({ label, field, min, max, step, display }) => (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
        <span style={{
          fontSize: 10.5, color: 'var(--text-secondary)',
          fontVariantNumeric: 'tabular-nums', minWidth: 32, textAlign: 'right',
        }}>
          {display ? display(cfg[field]) : cfg[field]}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step}
        value={cfg[field]}
        onChange={e => onChange({ [field]: parseFloat(e.target.value) })}
        style={{
          width: '100%', cursor: 'pointer',
          accentColor: 'var(--accent)',
          appearance: 'auto', height: 2,
        }}
      />
    </div>
  );

  // Collapsed state — show small icon button
  if (!panelOpen) {
    return (
      <button
        onClick={() => setPanelOpen(true)}
        title="Graph settings"
        style={{
          position: 'absolute', bottom: 12, left: 12, zIndex: 10,
          background: 'var(--bg-panel)', backdropFilter: 'blur(6px)',
          border: '1px solid var(--border)', borderRadius: 6,
          width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-muted)',
          boxShadow: 'var(--shadow-modal)',
          transition: 'color 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)';   e.currentTarget.style.borderColor = 'var(--border)'; }}
      >
        <Icon name="sliders" size={15} strokeWidth={1.6} />
      </button>
    );
  }

  // Full panel — bottom-sheet on mobile, floating card on desktop
  const panelStyle = isMob ? {
    position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
    background: 'var(--bg-panel)', backdropFilter: 'blur(12px)',
    border: '1px solid var(--border)',
    borderRadius: '14px 14px 0 0',
    maxHeight: '60vh', overflowY: 'auto',
    boxShadow: 'var(--shadow-modal)',
  } : {
    position: 'absolute', top: 12, bottom: 12, left: 12, zIndex: 10,
    background: 'var(--bg-panel)', backdropFilter: 'blur(10px)',
    border: '1px solid var(--border)', borderRadius: 8,
    width: 220, maxHeight: 'calc(100% - 24px)', overflowY: 'auto',
    boxShadow: 'var(--shadow-modal)',
    display: 'flex', flexDirection: 'column',
  };

  return (
    <div style={panelStyle} className="scrollable">
      {/* Panel header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '8px 12px 7px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'var(--bg-panel)', zIndex: 2,
      }}>
        <Icon name="sliders" size={12} strokeWidth={1.8} style={{ color: 'var(--text-muted)', marginRight: 6 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>
          Graph settings
        </span>
        <button
          onClick={() => setPanelOpen(false)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', padding: 2, borderRadius: 3,
            display: 'flex', transition: 'color 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <Icon name="x" size={12} strokeWidth={2} />
        </button>
      </div>

      {/* ── Display section ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <SectionBtn label="Display" isOpen={displayOpen} onToggle={() => setDisplayOpen(o => !o)} />
        {displayOpen && (
          <div style={{ padding: '4px 12px 10px' }}>
            {/* Arrows toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Arrows</span>
              <label style={{
                position: 'relative', display: 'inline-block',
                width: 30, height: 16, cursor: 'pointer', flexShrink: 0,
              }}>
                <input
                  type="checkbox"
                  checked={cfg.arrows}
                  onChange={e => onChange({ arrows: e.target.checked })}
                  style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                />
                {/* Track */}
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: 10,
                  background: cfg.arrows ? 'var(--accent)' : 'var(--border-strong)',
                  transition: 'background 0.2s',
                }} />
                {/* Thumb */}
                <span style={{
                  position: 'absolute', top: 2.5,
                  left: cfg.arrows ? 15 : 3,
                  width: 11, height: 11, borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.18s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }} />
              </label>
            </div>

            <SliderRow label="Text fade threshold" field="textFadeThreshold"
              min={0} max={8} step={0.1} display={v => v.toFixed(1)} />
            <SliderRow label="Node size" field="nodeSize"
              min={0.5} max={3} step={0.05} display={v => v.toFixed(2)} />
            <SliderRow label="Link thickness" field="linkThickness"
              min={0.5} max={3} step={0.05} display={v => v.toFixed(2)} />

            {/* Animate button */}
            <button
              onClick={onAnimate}
              style={{
                marginTop: 4, width: '100%', padding: '5px 0',
                background: 'var(--accent-soft)',
                border: '1px solid var(--tag-border)',
                borderRadius: 5, fontSize: 11,
                color: 'var(--text-link)', fontWeight: 500,
                cursor: 'pointer', transition: 'background 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-active)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-soft)'}
            >
              <Icon name="zap" size={11} strokeWidth={2} />
              Animate
            </button>
          </div>
        )}
      </div>

      {/* ── Forces section ── */}
      <div>
        <SectionBtn label="Forces" isOpen={forcesOpen} onToggle={() => setForcesOpen(o => !o)} />
        {forcesOpen && (
          <div style={{ padding: '4px 12px 12px' }}>
            <SliderRow label="Center force" field="centerForce"
              min={0.001} max={0.12} step={0.001} display={v => v.toFixed(3)} />
            <SliderRow label="Repel force" field="repelForce"
              min={100} max={3000} step={25} display={v => Math.round(v)} />
            <SliderRow label="Link force" field="linkForce"
              min={0.005} max={0.35} step={0.005} display={v => v.toFixed(3)} />
            <SliderRow label="Link distance" field="linkDistance"
              min={20} max={300} step={5} display={v => Math.round(v)} />
          </div>
        )}
      </div>
    </div>
  );
};

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
      drawGraph(ctx, g, W, H, activeRef.current, hovRef.current, false, false, 0, DEFAULT_CFG);
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
      const node = dragNodeRef.current;
      const wasDragged = panRef.current.moved;
      node.vx = 0; node.vy = 0;
      dragNodeRef.current = null;
      panRef.current.moved = false;
      setCursor('grab');
      if (!wasDragged && window.VAULT_NOTES?.[node.id]) onNavigate(node.id);
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
  const isMob        = window.innerWidth <= 768;
  const canvasRef    = useRef(null);
  const graphRef     = useRef(null);
  const rafRef       = useRef(null);
  const hovRef       = useRef(null);
  const dragNodeRef  = useRef(null);
  const activeRef    = useRef(currentNote);
  const panRef       = useRef({ x: 0, y: 0, dragging: false, lx: 0, ly: 0, moved: false });
  const zoomRef      = useRef(1);
  const touchRef     = useRef({ lastDist: null }); // for pinch-to-zoom
  // cfg ref for use inside RAF loop (avoids stale closure)
  const cfgRef       = useRef({ ...DEFAULT_CFG });

  const [hovId,    setHovId]    = useState(null);
  const [cursor,   setCursor]   = useState('grab');
  // State copy drives settings panel re-render
  const [graphCfg, setGraphCfg] = useState({ ...DEFAULT_CFG });

  useEffect(() => { activeRef.current = currentNote; }, [currentNote]);

  // Update both ref + state; push to simulation
  const updateCfg = useCallback((updates) => {
    const next = { ...cfgRef.current, ...updates };
    cfgRef.current = next;
    setGraphCfg({ ...next });
    if (graphRef.current) {
      graphRef.current.cfg = next;
      // Auto-reheat on force changes so effect is visible immediately
      const forceKeys = ['centerForce', 'repelForce', 'linkForce', 'linkDistance'];
      const touchedForce = forceKeys.some(k => k in updates);
      if (touchedForce && graphRef.current.alpha < 0.15) {
        graphRef.current.alpha = 0.35;
      }
    }
  }, []);

  // Animate button: fully reheat simulation
  const handleAnimate = useCallback(() => {
    if (graphRef.current) {
      graphRef.current.alpha = 1;
      graphRef.current.alphaDecay = 0.013;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.GRAPH_NODES) return;

    const dpr = window.devicePixelRatio || 1;

    // Defer init until the modal has finished layout — on mobile the canvas
    // offsetWidth is 0 on the first synchronous render, making the ForceGraph
    // place all nodes at (0,0) and the pixel buffer empty.
    const init = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) {
        rafRef.current = requestAnimationFrame(init);
        return;
      }

      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      graphRef.current = new ForceGraph([...GRAPH_NODES], [...GRAPH_EDGES], W, H, cfgRef.current);
      const ctx = canvas.getContext('2d');

      const loop = () => {
        const g = graphRef.current;
        if (!g) return;

        // Keep canvas pixel buffer in sync with CSS size (orientation changes, etc.)
        const cW = canvas.offsetWidth, cH = canvas.offsetHeight;
        if (cW && cH && (canvas.width !== Math.round(cW * dpr) || canvas.height !== Math.round(cH * dpr))) {
          canvas.width  = cW * dpr;
          canvas.height = cH * dpr;
        }

        if (dragNodeRef.current) {
          dragNodeRef.current.vx = 0;
          dragNodeRef.current.vy = 0;
          if (g.alpha < 0.3) g.alpha = 0.3;
        }
        g.tick();

        const zoom = zoomRef.current;
        const cfg  = cfgRef.current;
        const labelAlpha = cfg.textFadeThreshold <= 0
          ? 1
          : Math.min(1, Math.max(0, (zoom - cfg.textFadeThreshold) / 1.5));

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(dpr, dpr);
        const { x: px, y: py } = panRef.current;
        ctx.translate(cW / 2 + px, cH / 2 + py);
        ctx.scale(zoom, zoom);
        ctx.translate(-cW / 2, -cH / 2);

        drawGraph(ctx, g, cW, cH, activeRef.current, hovRef.current, !!hovRef.current, true, labelAlpha, cfg);

        ctx.restore();
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    };

    rafRef.current = requestAnimationFrame(init);
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
      const node = dragNodeRef.current;
      const wasDragged = panRef.current.moved;
      node.vx = 0; node.vy = 0;
      dragNodeRef.current = null;
      panRef.current.moved = false;
      setCursor('grab');
      // Pure click (no drag movement) → navigate to the note
      if (!wasDragged && window.VAULT_NOTES?.[node.id]) onNavigate(node.id);
      return;
    }
    const p = panRef.current;
    if (!p.moved) {
      const { x, y } = toGraph(e.clientX, e.clientY);
      const node = graphRef.current?.getNodeAt(x, y, 16);
      if (node && window.VAULT_NOTES?.[node.id]) onNavigate(node.id);
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

  // Touch events (non-passive so we can preventDefault and stop page scroll)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        const t = e.touches[0];
        onMouseDown({ clientX: t.clientX, clientY: t.clientY });
      } else if (e.touches.length === 2) {
        panRef.current.dragging = false;
        dragNodeRef.current = null;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchRef.current.lastDist = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        const t = e.touches[0];
        onMouseMove({ clientX: t.clientX, clientY: t.clientY });
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (touchRef.current.lastDist) {
          const scale = dist / touchRef.current.lastDist;
          zoomRef.current = Math.max(0.2, Math.min(8, zoomRef.current * scale));
        }
        touchRef.current.lastDist = dist;
      }
    };

    const onTouchEnd = (e) => {
      e.preventDefault();
      touchRef.current.lastDist = null;
      const t = e.changedTouches[0];
      if (t) onMouseUp({ clientX: t.clientX, clientY: t.clientY });
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
    canvas.addEventListener('touchend',   onTouchEnd,   { passive: false });
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove',  onTouchMove);
      canvas.removeEventListener('touchend',   onTouchEnd);
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(0,0,0,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        width: isMob ? '96vw' : '82vw',
        height: isMob ? '92vh' : '80vh',
        maxWidth: 1120, maxHeight: isMob ? '92vh' : 760,
        background: 'var(--bg-app)', borderRadius: 12,
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-modal)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: isMob ? '8px 12px' : '10px 16px',
          borderBottom: '1px solid var(--border)', flexShrink: 0,
          minWidth: 0,
        }}>
          <Icon name="git-branch" size={14} strokeWidth={1.6} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isMob
              ? `Graph · ${GRAPH_NODES.length}N ${GRAPH_EDGES.length}E`
              : `Knowledge Graph — ${GRAPH_NODES.length} nodes · ${GRAPH_EDGES.length} edges`}
          </span>
          {/* Legend dots — always visible; labels hidden on mobile */}
          <div style={{ display: 'flex', gap: isMob ? 7 : 14, fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>
            {Object.entries(GROUP_COLORS).map(([g, c]) => (
              <span key={g} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />
                {!isMob && g}
              </span>
            ))}
          </div>
          {!isMob && (
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8, whiteSpace: 'nowrap' }}>
              Scroll to zoom · Drag to pan · Click node to open
            </span>
          )}
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', display: 'flex', padding: 4, borderRadius: 4,
            marginLeft: 4, flexShrink: 0, transition: 'color 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Icon name="x" size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Canvas area — position:relative so settings panel anchors inside it */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
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
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', display: 'block',
              background: 'var(--bg-graph)',
              cursor, touchAction: 'none',
            }}
          />

          {/* Settings panel — floats over canvas bottom-left */}
          <GraphSettingsPanel
            cfg={graphCfg}
            onChange={updateCfg}
            onAnimate={handleAnimate}
          />
        </div>

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
          <span style={{ marginLeft: 'auto' }}>
            Active: <strong style={{ color: 'var(--text-secondary)' }}>
              {currentNote ? (VAULT_NOTES[currentNote]?.title || currentNote) : '—'}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { MiniGraph, FullGraph, ForceGraph });

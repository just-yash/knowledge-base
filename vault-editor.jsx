// vault-editor.jsx v2 — Phase 2: KaTeX math, task lists, callouts, scroll-spy

// ─── Configure marked at module level (runs once) ────────────────────────────
(function initMarked() {
  if (!window.marked) return;
  const renderer = new marked.Renderer();

  // ── Code blocks ──────────────────────────────────────────────────────────
  renderer.code = function(code, lang) {
    const language = (lang || 'text').trim().toLowerCase();
    let highlighted = code;
    try {
      if (window.hljs) {
        highlighted = hljs.getLanguage(language)
          ? hljs.highlight(code, { language, ignoreIllegals: true }).value
          : hljs.highlightAuto(code).value;
      }
    } catch (_) { /* keep plain */ }
    const displayLang = language === 'text' ? '' : language;
    return `<div class="vault-code-block">
      <div class="vault-code-header">
        <span class="vault-code-lang">${displayLang}</span>
        <button class="vault-copy-btn" onclick="(function(b){const t=b.closest('.vault-code-block').querySelector('pre');navigator.clipboard.writeText(t.innerText).then(()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1500)}).catch(()=>{});})(this)">Copy</button>
      </div>
      <pre><code>${highlighted}</code></pre>
    </div>`;
  };

  // ── Blockquotes / Callouts ────────────────────────────────────────────────
  renderer.blockquote = function(quote) {
    // Strip outer <p> tags to reliably detect [!TYPE]
    const stripped = quote.replace(/^\s*<p>\s*/,'').replace(/\s*<\/p>\s*$/,'');
    const m = stripped.match(/^\[!(NOTE|TIP|WARNING|INFO|IMPORTANT|CAUTION|ABSTRACT|QUOTE)\]\s*(.*?)(?=\n|$)/i);
    if (m) {
      const type  = m[1].toUpperCase();
      const title = m[2].trim() || (type[0] + type.slice(1).toLowerCase());
      const body  = stripped.slice(m[0].length).replace(/^\s*<\/p>/, '').trim();
      const colors = {
        NOTE:'var(--accent)', TIP:'#7bc9a0', WARNING:'#e6a84a',
        INFO:'#5ba3c9',    IMPORTANT:'#e87c66', CAUTION:'#d4a96a',
        ABSTRACT:'#9b88c0', QUOTE:'var(--text-secondary)',
      };
      const color = colors[type] || 'var(--accent)';
      return `<div class="vault-callout" style="--callout-color:${color}">
        <div class="vault-callout-title">${title}</div>
        ${body ? `<div class="vault-callout-body">${body}</div>` : ''}
      </div>`;
    }
    return `<blockquote>${quote}</blockquote>`;
  };

  // ── Headings — stamped with IDs for scroll-spy ───────────────────────────
  renderer.heading = function(text, level) {
    const id = text
      .replace(/<[^>]+>/g, '')   // strip any inline HTML
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-{2,}/g, '-');
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  // ── Task list items ───────────────────────────────────────────────────────
  renderer.listitem = function(text, task, checked) {
    if (task) {
      const clean = text.replace(/^<p>\s*/,'').replace(/\s*<\/p>$/,'');
      return `<li class="vault-task-item${checked ? ' done' : ''}">
        <span class="vault-cb${checked ? ' checked' : ''}" role="checkbox" aria-checked="${checked}"></span>
        <span class="vault-task-label">${clean}</span>
      </li>`;
    }
    return `<li>${text}</li>`;
  };

  // ── List wrapper — adds class when it contains tasks ─────────────────────
  renderer.list = function(body, ordered, start) {
    const tag = ordered ? 'ol' : 'ul';
    const startAttr = (ordered && start !== 1) ? ` start="${start}"` : '';
    const cls = body.includes('vault-task-item') ? ' class="vault-task-list"' : '';
    return `<${tag}${startAttr}${cls}>${body}</${tag}>`;
  };

  // ── External links → open in new tab ─────────────────────────────────────
  renderer.link = function(href, title, text) {
    const bare = href || '';
    const isExternal = bare.startsWith('http://') || bare.startsWith('https://') || bare.startsWith('www.');
    // Normalize bare www. URLs (e.g. "www.example.com") so they resolve correctly
    const resolvedHref = bare.startsWith('www.') ? 'https://' + bare : bare;
    const titleAttr    = title ? ` title="${title}"` : '';
    if (isExternal) {
      return `<a href="${resolvedHref}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    return `<a href="${resolvedHref}"${titleAttr}>${text}</a>`;
  };

  marked.setOptions({ renderer, gfm: true, breaks: false, html: true });
})();

// ─── Wiki-link title→id resolver (runs once at load time) ────────────────────
(function buildNoteLookup() {
  const map = {};
  const notes = window.VAULT_NOTES || {};
  for (const [id, note] of Object.entries(notes)) {
    if (note.title) {
      // exact title
      map[note.title.toLowerCase()] = id;
      // title without extension (e.g. "AVL Tree" for file "AVL Tree")
      const bare = note.title.replace(/\.[^.]+$/, '');
      map[bare.toLowerCase()] = id;
    }
  }
  window.findNoteByName = function(name) {
    if (!name) return null;
    const lower = name.toLowerCase().trim();
    // 1. direct map hit
    if (map[lower]) return map[lower];
    // 2. partial: ends-with match for "Folder/Note" style wikilinks
    const parts = lower.split('/');
    const last = parts[parts.length - 1];
    return map[last] || null;
  };
})();

// ─── Shield math from marked (marked mangles _ * inside $…$) ────────────────
// Replace all math blocks with safe placeholders before marked runs,
// then restore them afterwards so KaTeX auto-render can see them.
const MATH_TOKEN = 'MTHSHLD';
function shieldMath(md) {
  const store = [];
  const ph = (match) => { const i = store.length; store.push(match); return `${MATH_TOKEN}${i}X`; };
  // Display math $$…$$ first (greedy would eat inline, so non-greedy + dotall)
  let out = md.replace(/\$\$([\s\S]*?)\$\$/g, ph);
  // LaTeX \[…\] display
  out = out.replace(/\\\[([\s\S]*?)\\\]/g, ph);
  // Inline $…$ — single line only, not empty
  out = out.replace(/\$([^\n$`]{1,400}?)\$/g, ph);
  // Inline \(…\)
  out = out.replace(/\\\((.+?)\\\)/g, ph);
  return { out, store };
}
function unshieldMath(html, store) {
  return html.replace(new RegExp(`${MATH_TOKEN}(\\d+)X`, 'g'), (_, i) => store[+i]);
}

// ─── Pre-process: ![[image.ext]] → raw <img> tag ─────────────────────────────
// Using <img> directly (not markdown ![]) so spaces in paths never break parsing.
// Also strips Obsidian alias syntax: ![[img.png|200]] → just the filename.
function resolveObsidianEmbeds(md) {
  return md.replace(
    /!\[\[([^\]|#\n]+?\.(png|jpg|jpeg|gif|svg|webp))(?:\|[^\]]*)?\]\]/gi,
    (_, filename) => {
      const bare = filename.trim();
      // Try exact filename, then just the last path segment
      const assetPath = window.VAULT_ASSETS?.[bare]
        ?? window.VAULT_ASSETS?.[bare.split('/').pop()];
      const src = assetPath
        ? assetPath.split('/').map(encodeURIComponent).join('/')
        : 'notes/07%20-%20Annexure/Excalidraw/' + encodeURIComponent(bare);
      const alt = bare.replace(/"/g, '&quot;');
      // Blank lines force marked to treat this as a block, not inline
      return `\n\n<img src="${src}" alt="${alt}" />\n\n`;
    }
  );
}

// ─── Post-process: [[WikiLinks]] → clickable spans ───────────────────────────
// Handles all Obsidian wikilink formats:
//   [[Note]]
//   [[Note|Alias]]
//   [[Note#Heading]]
//   [[Note#Heading|Alias]]
//   [[Note#^blockId|Alias]]   ← block references (^id), navigate to note only
function processWikiLinks(html) {
  return html.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
    // Split alias (everything after the first |)
    const pipeIdx = inner.indexOf('|');
    const refPart = pipeIdx >= 0 ? inner.slice(0, pipeIdx).trim() : inner.trim();
    const alias   = pipeIdx >= 0 ? inner.slice(pipeIdx + 1).trim() : '';

    // Split anchor (everything after the first #)
    const hashIdx  = refPart.indexOf('#');
    const noteName = hashIdx >= 0 ? refPart.slice(0, hashIdx).trim() : refPart;
    const anchor   = hashIdx >= 0 ? refPart.slice(hashIdx + 1).trim() : '';

    // Display text: alias → noteName (never expose raw #heading or ^blockId)
    const display = alias || noteName;

    // Resolve note ID from the name part only
    const noteId = (window.findNoteByName ? findNoteByName(noteName) : null) || '';

    // Block references start with ^ — we navigate to the note but can't scroll to the block
    // Heading references are slugified to match the id marked.js stamps on <h> elements
    const isBlockRef = anchor.startsWith('^');
    const headingId  = (!isBlockRef && anchor)
      ? anchor.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-{2,}/g, '-')
      : '';

    const esc = (s) => s.replace(/"/g, '&quot;');
    return `<a class="wiki-link" data-note-id="${esc(noteId)}" data-note-name="${esc(noteName)}" data-heading-id="${esc(headingId)}" href="#">${display}</a>`;
  });
}

// ─── Reading Progress bar ─────────────────────────────────────────────────────
const ReadingProgress = ({ scrollRef }) => {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.round((el.scrollTop / max) * 100) : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef]);

  return (
    <div style={{ height: 2, background: 'var(--border)', position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, height: '100%',
        width: `${pct}%`, background: 'var(--accent)',
        transition: 'width 0.15s linear',
      }} />
    </div>
  );
};

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
const TabBar = ({ tabs, currentNote, onTabClick, onTabClose, onNewTab,
                  leftOpen, onToggleLeft, rightOpen, onToggleRight }) => {
  function iconBtn(active) {
    return {
      width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: active ? 'var(--bg-active)' : 'none',
      border: 'none', borderRadius: 4, cursor: 'pointer',
      color: active ? 'var(--accent)' : 'var(--text-muted)',
      transition: 'color 0.12s, background 0.12s',
    };
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', height: 36, flexShrink: 0,
      background: 'var(--bg-tabs)', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display:'flex', gap:2, padding:'0 5px', borderRight:'1px solid var(--border)', height:'100%', alignItems:'center' }}>
        <button title="Toggle sidebar (⌘\)" onClick={onToggleLeft} style={iconBtn(leftOpen)}
          onMouseEnter={e=>{if(!leftOpen){e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='var(--bg-hover)';}}}
          onMouseLeave={e=>{if(!leftOpen){e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.background='none';}}}>
          <Icon name="panel-left" size={14} strokeWidth={1.6}/>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', flex:1, overflow:'hidden', alignItems:'stretch', height:'100%' }}>
        {tabs.map(tabId => {
          const note = VAULT_NOTES[tabId];
          const isActive = tabId === currentNote;
          const title = note ? note.title : tabId;
          return (
            <div key={tabId} onClick={() => onTabClick(tabId)} style={{
              display:'flex', alignItems:'center', gap:5, padding:'0 10px',
              maxWidth:200, minWidth:80, cursor:'pointer', flexShrink:0,
              background: isActive ? 'var(--bg-content)' : 'transparent',
              borderRight:'1px solid var(--border)',
              borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              transition:'background 0.1s',
            }}
            onMouseEnter={e=>{if(!isActive) e.currentTarget.style.background='var(--bg-hover)';}}
            onMouseLeave={e=>{if(!isActive) e.currentTarget.style.background='transparent';}}>
              <Icon name="file" size={12} strokeWidth={1.5}
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', flexShrink:0 }}/>
              <span style={{
                fontSize:12.5, flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 500 : 400,
              }}>
                {title.length > 22 ? title.slice(0,21) + '…' : title}
              </span>
              <button onClick={e=>{e.stopPropagation(); onTabClose(tabId);}} style={{
                width:16, height:16, display:'flex', alignItems:'center', justifyContent:'center',
                background:'none', border:'none', borderRadius:3, cursor:'pointer',
                color:'var(--text-muted)', flexShrink:0, padding:0,
                opacity: isActive ? 1 : 0, transition:'opacity 0.12s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--bg-hover)'; e.currentTarget.style.opacity=1;}}
              onMouseLeave={e=>{e.currentTarget.style.background='none'; e.currentTarget.style.opacity = isActive ? 1 : 0;}}>
                <Icon name="x" size={10} strokeWidth={2.2}/>
              </button>
            </div>
          );
        })}
        <button onClick={onNewTab} style={{
          width:30, height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
          background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)',
          transition:'color 0.12s, background 0.12s', flexShrink:0,
        }}
        onMouseEnter={e=>{e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.background='var(--bg-hover)';}}
        onMouseLeave={e=>{e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.background='none';}}>
          <Icon name="plus" size={14} strokeWidth={2}/>
        </button>
      </div>

      <div style={{ display:'flex', gap:2, padding:'0 5px', borderLeft:'1px solid var(--border)', height:'100%', alignItems:'center' }}>
        <button title="Toggle right panel" onClick={onToggleRight} style={iconBtn(rightOpen)}
          onMouseEnter={e=>{if(!rightOpen){e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='var(--bg-hover)';}}}
          onMouseLeave={e=>{if(!rightOpen){e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.background='none';}}}>
          <Icon name="panel-right" size={14} strokeWidth={1.6}/>
        </button>
      </div>
    </div>
  );
};

// ─── Note toolbar (breadcrumb + actions) ──────────────────────────────────────
const NoteToolbar = ({ note, focusMode, onFocusToggle, onNavBack, onNavForward, canBack, canForward }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [menuOpen,     setMenuOpen]     = React.useState(false);
  const [copied,       setCopied]       = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  // ── Share: copy link ───────────────────────────────────────────────────────
  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${note.id}`;
    const doCopy = () => { setCopied(true); setTimeout(() => { setCopied(false); setMenuOpen(false); }, 2000); };
    navigator.clipboard.writeText(url).then(doCopy).catch(() => {
      const inp = document.createElement('input');
      inp.value = url; document.body.appendChild(inp); inp.select();
      document.execCommand('copy'); document.body.removeChild(inp);
      doCopy();
    });
  };

  // ── Share: export as PDF (opens a clean print window) ─────────────────────
  const handleExportPDF = () => {
    setMenuOpen(false);
    if (!note) return;
    const contentEl = document.querySelector('[data-print-content]');
    const html = contentEl ? contentEl.innerHTML : '';

    const win = window.open('', '_blank');
    if (!win) { alert('Please allow pop-ups for this site to export PDF.'); return; }

    win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${note.title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      max-width: 780px; margin: 0 auto; padding: 52px 48px 72px;
      color: #1a1c1e; background: #fff; line-height: 1.75; font-size: 15px;
    }
    .print-title { font-size: 30px; font-weight: 700; color: #111; margin-bottom: 8px; line-height: 1.2; }
    .print-meta  { font-size: 12px; color: #888; margin-bottom: 36px; padding-bottom: 18px; border-bottom: 1px solid #eaeaea; }
    h1 { font-size: 24px; margin: 36px 0 14px; color: #111; }
    h2 { font-size: 20px; margin: 28px 0 12px; color: #111; }
    h3 { font-size: 17px; margin: 22px 0 10px; color: #222; }
    h4 { font-size: 15px; margin: 18px 0 8px; color: #333; }
    p  { margin: 0 0 14px; }
    a  { color: #3366cc; text-decoration: none; }
    a::after { content: " (" attr(href) ")"; font-size: 0.78em; color: #888; }
    a[href^="#"]::after { content: ""; }
    ul, ol { padding-left: 22px; margin: 0 0 14px; }
    li { margin-bottom: 4px; }
    blockquote { border-left: 3px solid #d0d0d0; padding: 4px 0 4px 16px; color: #555; margin: 16px 0; }
    table { border-collapse: collapse; width: 100%; margin: 18px 0; font-size: 14px; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    tr:nth-child(even) td { background: #fafafa; }
    img { max-width: 100%; height: auto; border-radius: 4px; margin: 8px 0; }
    hr { border: none; border-top: 1px solid #eaeaea; margin: 28px 0; }
    code { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; font-size: 0.88em;
           background: #f0f0f0; padding: 2px 5px; border-radius: 3px; color: #c0392b; }
    pre  { background: #f6f6f6; border: 1px solid #e8e8e8; border-radius: 6px;
           padding: 16px 18px; overflow-x: auto; margin: 16px 0; }
    pre code { background: none; padding: 0; color: #333; font-size: 13px; }
    .vault-code-header { display: none; }
    .vault-code-block  { margin: 16px 0; }
    .vault-callout { border-left: 3px solid var(--callout-color, #888);
      background: #fafafa; border-radius: 0 6px 6px 0;
      padding: 12px 16px; margin: 18px 0; }
    .vault-callout-title { font-weight: 700; margin-bottom: 5px; font-size: 14px; }
    .vault-callout-body  { font-size: 14px; color: #444; }
    .vault-task-list { list-style: none; padding-left: 0; }
    .vault-task-item { display: flex; align-items: flex-start; gap: 7px; margin-bottom: 5px; }
    .vault-cb::before { content: '☐'; font-size: 15px; line-height: 1.4; }
    .vault-cb.checked::before { content: '☑'; color: #3c9; }
    .wikilink { color: #3366cc; }
    @media print {
      body { padding: 20px 30px; font-size: 13px; }
      .print-title { font-size: 24px; }
      pre { font-size: 11px; }
      a::after { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-title">${note.title}</div>
  <div class="print-meta">Modified ${note.modified || '—'} &nbsp;·&nbsp; ${(note.wordCount||0).toLocaleString()} words</div>
  ${html}
  <script>window.onload = () => setTimeout(() => { window.print(); }, 450);<\/script>
</body>
</html>`);
    win.document.close();
  };

  if (!note) return null;

  const iconBtnStyle = {
    width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center',
    background:'none', border:'none', borderRadius:4, cursor:'pointer',
    color:'var(--text-muted)', transition:'color 0.12s, background 0.12s', flexShrink:0,
  };
  function navBtn(disabled) {
    return {
      ...iconBtnStyle,
      cursor: disabled ? 'default' : 'pointer',
      color: disabled ? 'var(--text-muted)' : 'var(--text-secondary)',
      opacity: disabled ? 0.32 : 1,
    };
  }

  // Dropdown menu item
  const MenuItem = ({ icon, label, onClick, badge }) => {
    const [hov, setHov] = React.useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display:'flex', alignItems:'center', gap:10, width:'100%',
          background: hov ? 'var(--bg-hover)' : 'none',
          border:'none', padding:'7px 14px', cursor:'pointer',
          textAlign:'left', transition:'background 0.1s',
        }}
      >
        <Icon name={icon} size={13} strokeWidth={1.8} style={{ color: hov ? 'var(--accent)' : 'var(--text-muted)', flexShrink:0 }} />
        <span style={{ fontSize:13, color:'var(--text-primary)', flex:1 }}>{label}</span>
        {badge && <span style={{ fontSize:11, color:'#7bc9a0', fontWeight:500 }}>{badge}</span>}
      </button>
    );
  };

  return (
    <div style={{
      display:'flex', alignItems:'center', padding:'0 12px', height:34, flexShrink:0,
      borderBottom:'1px solid var(--border)', background:'var(--bg-content)',
    }}>
      <button onClick={onNavBack}    disabled={!canBack}    style={navBtn(!canBack)}    onMouseEnter={e=>{if(canBack){e.currentTarget.style.color='var(--text-primary)';e.currentTarget.style.background='var(--bg-hover)';}}} onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='none';}}><Icon name="arrow-left"  size={14} strokeWidth={1.8}/></button>
      <button onClick={onNavForward} disabled={!canForward} style={navBtn(!canForward)} onMouseEnter={e=>{if(canForward){e.currentTarget.style.color='var(--text-primary)';e.currentTarget.style.background='var(--bg-hover)';}}} onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='none';}}><Icon name="arrow-right" size={14} strokeWidth={1.8}/></button>

      {/* Breadcrumb */}
      <div style={{ flex:1, display:'flex', alignItems:'center', gap:4, overflow:'hidden', margin:'0 8px' }}>
        {note.path.map((seg, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color:'var(--text-muted)', fontSize:11 }}>/</span>}
            <span style={{
              fontSize:12.5, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
              color: i === note.path.length-1 ? 'var(--text-secondary)' : 'var(--text-muted)',
            }}>{seg}</span>
          </React.Fragment>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display:'flex', gap:2, alignItems:'center' }}>
        {/* Fullscreen */}
        <button title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} onClick={toggleFullscreen}
          style={{ ...iconBtnStyle, color: isFullscreen ? 'var(--accent)' : 'var(--text-muted)', background: isFullscreen ? 'var(--bg-active)' : 'none' }}
          onMouseEnter={e=>{if(!isFullscreen){e.currentTarget.style.color='var(--text-primary)';e.currentTarget.style.background='var(--bg-hover)';}}}
          onMouseLeave={e=>{if(!isFullscreen){e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.background='none';}}}>
          <Icon name={isFullscreen ? 'minimize' : 'maximize'} size={13} strokeWidth={1.8}/>
        </button>

        {/* More / share dropdown */}
        <div ref={menuRef} style={{ position:'relative' }}>
          <button
            title="More options"
            onClick={() => setMenuOpen(o => !o)}
            style={{ ...iconBtnStyle, background: menuOpen ? 'var(--bg-hover)' : 'none', color: menuOpen ? 'var(--text-primary)' : 'var(--text-muted)' }}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--text-primary)';e.currentTarget.style.background='var(--bg-hover)';}}
            onMouseLeave={e=>{if(!menuOpen){e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.background='none';}}}
          >
            <Icon name="more-horizontal" size={14} strokeWidth={2}/>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div style={{
              position:'absolute', top:'calc(100% + 6px)', right:0, zIndex:300,
              background:'var(--bg-modal)', border:'1px solid var(--border-strong)',
              borderRadius:8, padding:'4px 0', minWidth:200,
              boxShadow:'var(--shadow-modal)',
              animation:'slideDown 0.14s cubic-bezier(0.16,1,0.3,1) both',
            }}>
              {/* Section label */}
              <div style={{ padding:'4px 14px 6px', fontSize:10.5, color:'var(--text-muted)',
                fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase',
                borderBottom:'1px solid var(--border)', marginBottom:2 }}>
                Share
              </div>
              <MenuItem
                icon={copied ? 'check' : 'link'}
                label="Copy link"
                badge={copied ? 'Copied!' : null}
                onClick={handleCopyLink}
              />
              <MenuItem
                icon="file-text"
                label="Export as PDF"
                onClick={handleExportPDF}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Note Content (renders markdown + LaTeX + scroll-spy) ─────────────────────
const NoteContent = ({ note, onNoteNavigate, readingWidth, fontSize }) => {
  const containerRef = React.useRef(null);

  const rendered = React.useMemo(() => {
    if (!note || !window.marked) return '';
    // 1. Convert ![[image]] → <img> HTML
    const withImgs = resolveObsidianEmbeds(note.content);
    // 2. Shield $…$ and $$…$$ from marked so _ and * aren't mangled
    const { out: shielded, store } = shieldMath(withImgs);
    // 3. Parse markdown
    let html = marked.parse(shielded);
    // 4. Restore math blocks (KaTeX auto-render will handle them in useEffect)
    html = unshieldMath(html, store);
    // 5. Linkify [[WikiLinks]]
    html = processWikiLinks(html);
    return html;
  }, [note?.id]);

  // 1. KaTeX math rendering after DOM update
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.renderMathInElement) {
      try {
        renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$',  right: '$',  display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true  },
          ],
          throwOnError: false,
          strict: false,
        });
      } catch (_) { /* silent */ }
    }

    // 2. Scroll-spy: observe every heading via IntersectionObserver
    const headings = Array.from(el.querySelectorAll('h1,h2,h3,h4,h5,h6'));
    if (!headings.length) return;

    const observer = new IntersectionObserver((entries) => {
      // Pick the first entry that's intersecting (topmost on screen)
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        const topmost = visible.sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        window.dispatchEvent(new CustomEvent('vault-active-heading', { detail: { id: topmost.target.id } }));
      }
    }, {
      threshold: 0,
      rootMargin: '0px 0px -70% 0px',
    });

    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, [note?.id]);

  // 3. Link click delegation
  //    a) Wiki-links  → in-app navigation
  //    b) External links → force new tab (catches raw HTML links that bypass the renderer)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => {
      const a = e.target.closest('a');
      if (!a) return;

      // ── Wiki-link ────────────────────────────────────────────────────────
      if (a.classList.contains('wiki-link')) {
        e.preventDefault();
        const noteId    = a.dataset.noteId;
        const headingId = a.dataset.headingId || '';
        if (noteId && window.VAULT_NOTES?.[noteId]) {
          onNoteNavigate(noteId);
          // After navigation the content re-renders; wait then scroll to heading
          if (headingId) {
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('vault-scroll-to', { detail: { headingId } }));
            }, 320);
          }
        }
        return;
      }

      // ── External link ────────────────────────────────────────────────────
      const href = a.getAttribute('href') || '';
      const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('www.');
      if (isExternal) {
        // Normalize bare www. links that the renderer may not have seen (e.g. raw HTML in notes)
        const resolvedHref = href.startsWith('www.') ? 'https://' + href : href;
        if (a.target === '_blank') {
          // Renderer already set target; let browser open it — but fix href if bare www.
          if (href.startsWith('www.')) { e.preventDefault(); window.open(resolvedHref, '_blank', 'noopener,noreferrer'); }
        } else {
          e.preventDefault();
          window.open(resolvedHref, '_blank', 'noopener,noreferrer');
        }
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [note?.id, onNoteNavigate]);

  const maxW = readingWidth === 'compact' ? 580 : readingWidth === 'wide' ? 880 : 700;

  return (
    <div
      ref={containerRef}
      className="note-content"
      data-print-content="true"
      style={{ fontSize: fontSize || 15, '--reading-max': maxW + 'px' }}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};

// ─── Animated note wrapper (React-controlled, avoids CSS animation glitch) ──────
const NoteAnimWrapper = ({ noteId, readingWidth, children }) => {
  const maxW = readingWidth === 'compact' ? 580 : readingWidth === 'wide' ? 880 : 700;
  return (
    <div style={{ width:'100%', maxWidth: maxW + 'px', padding:'32px 48px 96px' }}>
      {children}
    </div>
  );
};

// ─── Connect / Socials bar ────────────────────────────────────────────────────
const SocialIcon = ({ paths, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const SOCIAL_LINKS = [
  {
    id: 'github', href: 'https://github.com/just-yash', title: 'GitHub',
    icon: <SocialIcon paths={<><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.28-.36 6.44-1.6 6.44-7.04A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.56 8.5c0 5.4 3.16 6.64 6.44 7A4.8 4.8 0 0 0 9 18.8V22"/><path d="M9 18c-4.51 2-5-2-7-2"/></>} />,
  },
  {
    id: 'linkedin', href: 'https://www.linkedin.com/in/yash-agrawall/', title: 'LinkedIn',
    icon: <SocialIcon paths={<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>} />,
  },
  {
    id: 'email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=yashagrawall333@gmail.com', title: 'Email',
    icon: <SocialIcon paths={<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>} />,
  },
  {
    id: 'instagram', href: 'https://instagram.com/just._yash/', title: 'Instagram',
    icon: <SocialIcon paths={<><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.25"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></>} />,
  },
];

const ConnectBar = ({ scrollRef }) => {
  const scrollToTop = () => {
    if (scrollRef?.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '5px 16px',
      background: 'var(--bg-tabs)',
      borderTop: '1px solid var(--border)',
      flexShrink: 0, height: 36,
    }}>
      {/* Label — left-anchored */}
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'IBM Plex Sans', sans-serif", flexShrink: 0 }}>
        Find me on
      </span>

      {/* Social icon buttons — pushed to the right */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0, marginLeft: 'auto' }}>
        {SOCIAL_LINKS.map(({ id, icon, href, title }) => (
          <a key={id} href={href} title={title} target="_blank" rel="noopener noreferrer" style={{
            width: 26, height: 26, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            transition: 'background 0.15s, color 0.15s, border-color 0.15s',
            textDecoration: 'none', flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-soft)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            {icon}
          </a>
        ))}
        {/* Scroll to top */}
        <button onClick={scrollToTop} title="Scroll to top" style={{
          width: 26, height: 26, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', color: 'var(--text-muted)',
          border: '1px solid var(--border)', cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s, border-color 0.15s', flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-soft)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <Icon name="arrow-up" size={12} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, color:'var(--text-muted)' }}>
    <Icon name="book-open" size={36} strokeWidth={1} style={{ opacity:0.28 }}/>
    <div style={{ textAlign:'center' }}>
      <div style={{ fontSize:14, marginBottom:4, color:'var(--text-secondary)' }}>No note open</div>
      <div style={{ fontSize:12, opacity:0.55 }}>Select from the sidebar or press <kbd style={{ background:'var(--bg-hover)', border:'1px solid var(--border)', borderRadius:3, padding:'1px 5px', fontSize:11 }}>⌘K</kbd></div>
    </div>
  </div>
);

// ─── Note Editor (main export) ────────────────────────────────────────────────
const NoteEditor = ({
  currentNote, openTabs, onTabClick, onTabClose, onNewTab,
  leftOpen, onToggleLeft, rightOpen, onToggleRight,
  focusMode, onFocusToggle,
  onNoteNavigate, onNavBack, onNavForward, canBack, canForward,
  readingWidth, fontSize,
}) => {
  const note      = currentNote ? VAULT_NOTES[currentNote] : null;
  const scrollRef = React.useRef(null);

  // Reset scroll to top whenever the active note changes.
  // useLayoutEffect (not useEffect) so this runs synchronously after React
  // commits the new DOM but BEFORE the browser paints — the first frame the
  // user ever sees is already scrolled to 0, eliminating the flash.
  React.useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [currentNote]);

  // Scroll to heading dispatched by right panel outline clicks
  React.useEffect(() => {
    const handler = (e) => {
      const el = document.getElementById(e.detail?.headingId);
      const container = scrollRef.current;
      if (!el || !container) return;
      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 72;
      container.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };
    window.addEventListener('vault-scroll-to', handler);
    return () => window.removeEventListener('vault-scroll-to', handler);
  }, [currentNote]);

  // Reading time estimate
  const readingTime = note ? Math.max(1, Math.round((note.wordCount || 0) / 220)) : 0;

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'var(--bg-content)', minWidth:0 }}
      className={focusMode ? 'focus-mode' : ''}>
      <TabBar
        tabs={openTabs} currentNote={currentNote}
        onTabClick={onTabClick} onTabClose={onTabClose} onNewTab={onNewTab}
        leftOpen={leftOpen} onToggleLeft={onToggleLeft}
        rightOpen={rightOpen} onToggleRight={onToggleRight}
      />
      <ReadingProgress scrollRef={scrollRef} />
      <NoteToolbar
        note={note} focusMode={focusMode} onFocusToggle={onFocusToggle}
        onNavBack={onNavBack} onNavForward={onNavForward}
        canBack={canBack} canForward={canForward}
      />

      <div ref={scrollRef} className="scrollable"
        style={{ flex:1, overflowY:'auto', overflowX:'hidden', display:'flex', justifyContent:'center', background:'var(--bg-content)', overflowAnchor:'none' }}>
        {note ? (
          <NoteAnimWrapper noteId={note.id} readingWidth={readingWidth}>
            {/* Note meta bar */}
            <div style={{
              display:'flex', alignItems:'center', gap:8, marginBottom:28,
              paddingBottom:14, borderBottom:'1px solid var(--border)', flexWrap:'wrap',
            }}>
              <span style={{ fontSize:11, color:'var(--text-muted)' }}>Modified {note.modified}</span>
              <span style={{ color:'var(--border)' }}>·</span>
              <span className="reading-chip">
                <Icon name="clock" size={10} strokeWidth={2} />
                {readingTime} min read
              </span>
              <span style={{ color:'var(--border)' }}>·</span>
              <span style={{ fontSize:11, color:'var(--text-muted)' }}>{note.wordCount?.toLocaleString()} words</span>
              {(note.tags||[]).length > 0 && <span style={{ color:'var(--border)' }}>·</span>}
              <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                {(note.tags||[]).map(t => <TagBadge key={t} label={t} />)}
              </div>
            </div>

            <NoteContent
              note={note}
              onNoteNavigate={onNoteNavigate}
              readingWidth={readingWidth}
              fontSize={fontSize}
            />
          </NoteAnimWrapper>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Connect / socials bar */}
      {!focusMode && <ConnectBar scrollRef={scrollRef} />}

      {/* Focus mode indicator */}
      {focusMode && (
        <div className="focus-mode-bar">
          <Icon name="eye" size={13} strokeWidth={1.5} />
          Focus mode
          <kbd>⌘E</kbd> to exit
        </div>
      )}
    </div>
  );
};

Object.assign(window, { NoteEditor });

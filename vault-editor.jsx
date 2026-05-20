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

  marked.setOptions({ renderer, gfm: true, breaks: false, html: true });
})();

// ─── Pre-process: ![[image.ext]] → <img> using VAULT_ASSETS ─────────────────
function resolveObsidianEmbeds(md) {
  return md.replace(/!\[\[([^\]]+?\.(png|jpg|jpeg|gif|svg|webp))\]\]/gi, (_, filename) => {
    const assetPath = window.VAULT_ASSETS?.[filename];
    if (assetPath) {
      return `![${filename}](${assetPath})`;
    }
    // fallback: try direct path guess
    return `![${filename}](notes/07 - Annexure/Excalidraw/${filename})`;
  });
}

// ─── Post-process: [[WikiLinks]] → clickable spans ───────────────────────────
function processWikiLinks(html) {
  return html.replace(/\[\[([^\]]+)\]\]/g, (_, name) => {
    const id = (window.findNoteByName ? findNoteByName(name) : null) || '';
    return `<a class="wiki-link" data-note-id="${id}" data-note-name="${name}" href="#">${name}</a>`;
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

  React.useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
  if (!note) return null;
  function navBtn(disabled) {
    return {
      width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center',
      background:'none', border:'none', borderRadius:4,
      cursor: disabled ? 'default' : 'pointer',
      color: disabled ? 'var(--text-muted)' : 'var(--text-secondary)',
      opacity: disabled ? 0.32 : 1, transition:'color 0.12s, background 0.12s', flexShrink:0,
    };
  }
  return (
    <div style={{
      display:'flex', alignItems:'center', padding:'0 12px', height:34, flexShrink:0,
      borderBottom:'1px solid var(--border)', background:'var(--bg-content)',
    }}>
      <button onClick={onNavBack}    disabled={!canBack}    style={navBtn(!canBack)}><Icon name="arrow-left"  size={14} strokeWidth={1.8}/></button>
      <button onClick={onNavForward} disabled={!canForward} style={navBtn(!canForward)}><Icon name="arrow-right" size={14} strokeWidth={1.8}/></button>

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

      <div style={{ display:'flex', gap:2 }}>
        <button title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} onClick={toggleFullscreen} style={{
          width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center',
          background: isFullscreen ? 'var(--bg-active)' : 'none', border:'none', borderRadius:4,
          cursor:'pointer', color: isFullscreen ? 'var(--accent)' : 'var(--text-muted)',
          transition:'color 0.12s, background 0.12s',
        }}>
          <Icon name={isFullscreen ? 'minimize' : 'maximize'} size={13} strokeWidth={1.8}/>
        </button>
        <button title="More" style={{
          width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center',
          background:'none', border:'none', borderRadius:4, cursor:'pointer',
          color:'var(--text-muted)', transition:'color 0.12s, background 0.12s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.color='var(--text-primary)';e.currentTarget.style.background='var(--bg-hover)';}}
        onMouseLeave={e=>{e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.background='none';}}>
          <Icon name="more-horizontal" size={14} strokeWidth={2}/>
        </button>
      </div>
    </div>
  );
};

// ─── Note Content (renders markdown + LaTeX + scroll-spy) ─────────────────────
const NoteContent = ({ note, onNoteNavigate, readingWidth, fontSize }) => {
  const containerRef = React.useRef(null);

  const rendered = React.useMemo(() => {
    if (!note || !window.marked) return '';
    const preprocessed = resolveObsidianEmbeds(note.content);
    let html = marked.parse(preprocessed);
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

  // 3. Wiki-link click delegation
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => {
      const a = e.target.closest('.wiki-link');
      if (!a) return;
      e.preventDefault();
      const id = a.dataset.noteId;
      if (id && window.VAULT_NOTES?.[id]) onNoteNavigate(id);
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [note?.id, onNoteNavigate]);

  const maxW = readingWidth === 'compact' ? 580 : readingWidth === 'wide' ? 880 : 700;

  return (
    <div
      ref={containerRef}
      className="note-content"
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
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '12px 24px',
      background: 'var(--bg-tabs)',
      borderTop: '1px solid var(--border)',
      flexShrink: 0,
    }}>
      {/* Left: text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 2, fontFamily: "'IBM Plex Sans', sans-serif" }}>
          Connect
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)', fontFamily: "'Lora', Georgia, serif", lineHeight: 1.2, marginBottom: 2 }}>
          Find Yash Around The Web
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: "'IBM Plex Sans', sans-serif" }}>
          This knowledge garden is public, but the conversation does not have to stop here.
        </div>
      </div>

      {/* Right: social icon buttons */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
        {SOCIAL_LINKS.map(({ id, icon, href, title }) => (
          <a key={id} href={href} title={title} target="_blank" rel="noopener noreferrer" style={{
            width: 34, height: 34, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)',
            border: '1px solid var(--border-strong)',
            transition: 'background 0.15s, color 0.15s, transform 0.12s',
            textDecoration: 'none', flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-soft)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {icon}
          </a>
        ))}
        {/* Scroll to top */}
        <button onClick={scrollToTop} title="Scroll to top" style={{
          width: 34, height: 34, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)',
          border: '1px solid var(--border-strong)', cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s, transform 0.12s', flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-soft)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Icon name="arrow-up" size={14} strokeWidth={2} />
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
        style={{ flex:1, overflowY:'auto', overflowX:'hidden', display:'flex', justifyContent:'center' }}>
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

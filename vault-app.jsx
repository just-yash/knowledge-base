// vault-app.jsx — Root component: state, keyboard shortcuts, layout orchestration

const { useState, useEffect, useCallback, useReducer } = React;

// ─── Nav history (back/forward like a browser) ────────────────────────────────
function useNavHistory(initial) {
  const [stack, setStack] = useState([initial]);
  const [cursor, setCursor] = useState(0);

  const navigate = useCallback((noteId) => {
    setStack(s => {
      const newStack = [...s.slice(0, cursor + 1), noteId];
      return newStack;
    });
    setCursor(c => c + 1);
  }, [cursor]);

  const back    = useCallback(() => setCursor(c => Math.max(0, c - 1)), []);
  const forward = useCallback(() => setStack(s => { setCursor(c => Math.min(s.length - 1, c + 1)); return s; }), []);

  return {
    current: stack[cursor],
    navigate,
    back,
    forward,
    canBack:    cursor > 0,
    canForward: cursor < stack.length - 1,
  };
}

// ─── Persisted state helper ────────────────────────────────────────────────────
function usePersisted(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : defaultValue; }
    catch { return defaultValue; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

// ─── Mobile detection ─────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ─── Command Palette (inline, Phase 5 will polish) ───────────────────────────
const CommandPalette = ({ onClose, onNavigate, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = React.useRef(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const notes = Object.values(VAULT_NOTES);
  const results = query.trim() === ''
    ? notes.slice(0, 8)
    : notes.filter(n => {
        const q = query.toLowerCase();
        if (q.startsWith('#')) {
          const tag = q.slice(1);
          return (n.tags || []).some(t => t.includes(tag));
        }
        return n.title.toLowerCase().includes(q) ||
               (n.tags || []).some(t => t.includes(q));
      }).slice(0, 10);

  const choose = (id) => { onNavigate(id); onClose(); };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && results[selected]) choose(results[selected].id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [results, selected]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'var(--bg-overlay)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh',
      }}
    >
      <div style={{
        width: 'min(90vw, 520px)', background: 'var(--bg-modal)',
        borderRadius: 10, border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-modal)', overflow: 'hidden',
      }} className="cmd-palette-inner slide-down">
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', borderBottom: '1px solid var(--border)',
        }}>
          <Icon name="search" size={16} strokeWidth={1.8} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search notes…"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 14.5, color: 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',display:'flex',padding:2,borderRadius:3 }}>
              <Icon name="x" size={13} strokeWidth={2} />
            </button>
          )}
          <kbd style={{
            fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-hover)',
            border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px',
          }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 340, overflowY: 'auto' }} className="scrollable">
          {results.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No notes match "{query}"
            </div>
          ) : (
            <>
              {!query && (
                <div style={{ padding: '6px 16px 2px', fontSize: 10.5, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Recent
                </div>
              )}
              {results.map((note, i) => (
                <button
                  key={note.id}
                  onClick={() => choose(note.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', background: i === selected ? 'var(--bg-active)' : 'none',
                    border: 'none', padding: '9px 16px', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 0.1s', borderRadius: 0,
                  }}
                  onMouseEnter={e => { setSelected(i); e.currentTarget.style.background = 'var(--bg-active)'; }}
                  onMouseLeave={e => { if (i !== selected) e.currentTarget.style.background = 'none'; }}
                >
                  <Icon name="file" size={14} strokeWidth={1.5} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: 13.5, color: 'var(--text-primary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {note.title}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {note.path?.join(' / ')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {(note.tags || []).slice(0, 2).map(t => (
                      <TagBadge
                        key={t}
                        label={t}
                        onClick={(e) => { e.stopPropagation(); setCmdQuery('#' + t); }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div style={{
          display: 'flex', gap: 16, padding: '8px 16px',
          borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)',
        }}>
          {[['↑↓', 'navigate'], ['↵', 'open'], ['ESC', 'close']].map(([key, label]) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <kbd style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: 3, padding: '1px 5px', fontSize: 10 }}>{key}</kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
const App = () => {
  const isMobile = useIsMobile();
  const [theme,       setTheme]       = usePersisted('vault-theme', 'dark');
  const [leftOpen,    setLeftOpen]    = usePersisted('vault-left',  true);
  const [rightOpen,   setRightOpen]   = usePersisted('vault-right', true);
  const [focusMode,   setFocusMode]   = useState(false);
  const [cmdOpen,     setCmdOpen]     = useState(false);
  const [graphOpen,   setGraphOpen]   = useState(false);
  const [cmdQuery,    setCmdQuery]    = useState('');
  const [openTabs,    setOpenTabs]    = usePersisted('vault-tabs',  ['index']);
  const [readingWidth,setReadingWidth]= usePersisted('vault-rw',    'normal');
  const [fontSize,    setFontSize]    = usePersisted('vault-fs',    17);
  const [expandedFolders, setExpandedFolders] = usePersisted('vault-expanded', ['notes']);

  const nav = useNavHistory(
    (() => {
      try {
        // Hash in URL takes priority (shared links like #python-libraries)
        const hash = window.location.hash.slice(1);
        if (hash && window.VAULT_NOTES?.[hash]) return hash;
        return JSON.parse(localStorage.getItem('vault-current')) || 'index';
      } catch { return 'index'; }
    })()
  );

  // Persist current note + keep URL hash in sync (makes every note linkable)
  useEffect(() => {
    try { localStorage.setItem('vault-current', JSON.stringify(nav.current)); } catch {}
    if (nav.current) {
      // Use replaceState instead of window.location.hash = ... because assigning
      // to location.hash makes the browser scroll to the element whose id matches
      // the hash value (e.g. the h1 heading gets id="complete-binary-tree" which
      // matches the note id, so the browser would jump to it after every navigation,
      // overriding the useLayoutEffect scroll-to-top reset).
      history.replaceState(null, '', '#' + nav.current);
    }
  }, [nav.current]);

  // Apply theme to <html>
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === 'k') { e.preventDefault(); setCmdOpen(true); return; }
      if (e.key === 'Escape')   { setCmdOpen(false); setFocusMode(false); setGraphOpen(false); return; }
      if (mod && e.key === 'e') { e.preventDefault(); setFocusMode(f => !f); return; }
      if (mod && e.key === '\\')  { e.preventDefault(); setLeftOpen(o => !o); return; }
      if (mod && e.shiftKey && e.key === 'E') { e.preventDefault(); setRightOpen(o => !o); return; }
      if (mod && e.key === '[') { e.preventDefault(); nav.back(); return; }
      if (mod && e.key === ']') { e.preventDefault(); nav.forward(); return; }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [nav]);

  // Tag click → open command palette pre-filled
  useEffect(() => {
    const handler = (e) => { setCmdQuery('#' + e.detail.tag); setCmdOpen(true); };
    window.addEventListener('vault-search-tag', handler);
    return () => window.removeEventListener('vault-search-tag', handler);
  }, []);

  const handleNoteNavigate = useCallback((id) => {
    if (!VAULT_NOTES[id]) return;
    nav.navigate(id);
    setOpenTabs(tabs => tabs.includes(id) ? tabs : [...tabs, id]);
    // On mobile, close the left overlay after selecting a note
    if (isMobile) setLeftOpen(false);
  }, [nav, isMobile]);

  const handleTabClose = useCallback((id) => {
    setOpenTabs(tabs => {
      const next = tabs.filter(t => t !== id);
      if (nav.current === id) {
        // Navigate to the adjacent tab, or fall back to index when last tab closed
        nav.navigate(next.length > 0 ? next[next.length - 1] : 'index');
      }
      return next;
    });
  }, [nav]);

  // Auto-reveal: expand folders and scroll to the current note in the sidebar
  const handleAutoReveal = useCallback(() => {
    const noteId = nav.current;
    if (!noteId) return;

    // Walk the folder tree to find which folder IDs need to be expanded
    function findFolderPath(children, targetId, parentIds) {
      for (const item of children) {
        if (item.type === 'folder') {
          const result = findFolderPath(item.children || [], targetId, [...parentIds, item.id]);
          if (result) return result;
        } else if (item.id === targetId) {
          return parentIds;
        }
      }
      return null;
    }

    for (const topFolder of VAULT_FOLDERS) {
      const path = findFolderPath(topFolder.children || [], noteId, [topFolder.id]);
      if (path) {
        setExpandedFolders(prev => {
          const s = new Set(Array.isArray(prev) ? prev : []);
          path.forEach(id => s.add(id));
          return [...s];
        });
        // Scroll the sidebar item into view after folders expand
        setTimeout(() => {
          const el = document.querySelector(`[data-sidebar-note="${noteId}"]`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 160);
        break;
      }
    }
  }, [nav.current]);

  const handleCollapseAll = useCallback(() => {
    setExpandedFolders([]);
  }, []);

  const handleFolderToggle = useCallback((folderId) => {
    setExpandedFolders(prev => {
      const s = new Set(Array.isArray(prev) ? prev : []);
      s.has(folderId) ? s.delete(folderId) : s.add(folderId);
      return [...s];
    });
  }, []);

  const expandedSet = new Set(Array.isArray(expandedFolders) ? expandedFolders : []);
  const showLeft  = !focusMode && leftOpen;
  const showRight = !focusMode && rightOpen;

  // ── Tweaks wiring ──────────────────────────────────────────────────────────
  const [tweaks, setTweak] = useTweaks({
    theme:        theme,
    readingWidth: readingWidth,
    fontSize:     fontSize,
  });

  // Sync tweaks panel → persisted state (one direction only)
  useEffect(() => {
    if (tweaks.theme        && tweaks.theme        !== theme)        setTheme(tweaks.theme);
    if (tweaks.readingWidth && tweaks.readingWidth !== readingWidth) setReadingWidth(tweaks.readingWidth);
    if (tweaks.fontSize     && tweaks.fontSize     !== fontSize)     setFontSize(tweaks.fontSize);
  }, [tweaks.theme, tweaks.readingWidth, tweaks.fontSize]);

  // On mobile: force both panels closed on first load (never restore persisted open state)
  const mobileInitDone = React.useRef(false);
  useEffect(() => {
    if (isMobile && !mobileInitDone.current) {
      mobileInitDone.current = true;
      setLeftOpen(false);
      setRightOpen(false);
    }
  }, [isMobile]);

  // ── Shared sidebar props ──────────────────────────────────────────────────
  const leftSidebarProps = {
    open: true,  // always-open inside the overlay wrapper
    theme, onThemeToggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
    currentNote: nav.current, onNoteSelect: handleNoteNavigate,
    expandedFolders: expandedSet, onFolderToggle: handleFolderToggle,
    onAutoReveal: handleAutoReveal, onCollapseAll: handleCollapseAll,
    onSearch: () => setCmdOpen(true),
    onHome: () => handleNoteNavigate('index'),
    onOpenGraph: () => { setGraphOpen(true); if (isMobile) setLeftOpen(false); },
  };

  return (
    <>
      <div
        className="app-shell"
        data-theme={theme}
        style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-app)' }}
      >
        {/* Mobile backdrop — tapping it closes both panels */}
        {isMobile && (showLeft || showRight) && (
          <div
            onClick={() => { setLeftOpen(false); setRightOpen(false); }}
            style={{
              position: 'fixed', inset: 0, zIndex: 400,
              background: 'rgba(0,0,0,0.52)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
            }}
          />
        )}

        {/* Left sidebar — overlay on mobile, flex child on desktop */}
        {isMobile ? (
          <div style={{
            position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 500,
            transform: showLeft ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.26s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: showLeft ? '6px 0 32px rgba(0,0,0,0.45)' : 'none',
          }}>
            <LeftSidebar {...leftSidebarProps} />
          </div>
        ) : (
          <LeftSidebar {...leftSidebarProps} open={showLeft} />
        )}

        {/* Center editor */}
        <NoteEditor
          currentNote={nav.current}
          openTabs={openTabs.length > 0 ? openTabs : ['index']}
          onTabClick={handleNoteNavigate}
          onTabClose={handleTabClose}
          onNewTab={() => setCmdOpen(true)}
          leftOpen={showLeft}
          onToggleLeft={() => setLeftOpen(o => !o)}
          rightOpen={showRight}
          onToggleRight={() => setRightOpen(o => !o)}
          focusMode={focusMode}
          onFocusToggle={() => setFocusMode(f => !f)}
          onNoteNavigate={handleNoteNavigate}
          onNavBack={nav.back}
          onNavForward={nav.forward}
          canBack={nav.canBack}
          canForward={nav.canForward}
          readingWidth={tweaks.readingWidth}
          fontSize={tweaks.fontSize}
        />

        {/* Right panel — overlay on mobile, flex child on desktop */}
        {isMobile ? (
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 500,
            transform: showRight ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.26s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: showRight ? '-6px 0 32px rgba(0,0,0,0.45)' : 'none',
          }}>
            <RightPanel
              open={true}
              currentNote={nav.current}
              onNoteNavigate={handleNoteNavigate}
              onClose={() => setRightOpen(false)}
            />
          </div>
        ) : (
          <RightPanel
            open={showRight}
            currentNote={nav.current}
            onNoteNavigate={handleNoteNavigate}
            onClose={() => setRightOpen(false)}
          />
        )}

        {/* Command palette */}
        {cmdOpen && (
          <CommandPalette
            initialQuery={cmdQuery}
            onClose={() => { setCmdOpen(false); setCmdQuery(''); }}
            onNavigate={handleNoteNavigate}
          />
        )}

        {/* Full graph modal */}
        {graphOpen && window.FullGraph && (
          <FullGraph
            currentNote={nav.current}
            onNavigate={handleNoteNavigate}
            onClose={() => setGraphOpen(false)}
          />
        )}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Appearance">
          <TweakRadio
            label="Theme"
            value={tweaks.theme}
            options={['dark','light']}
            onChange={v => setTweak('theme', v)}
          />
          <TweakSlider
            label="Font size"
            value={tweaks.fontSize}
            min={13} max={19} step={1}
            onChange={v => setTweak('fontSize', v)}
          />
        </TweakSection>
        <TweakSection label="Reading">
          <TweakRadio
            label="Content width"
            value={tweaks.readingWidth}
            options={['compact','normal','wide']}
            onChange={v => setTweak('readingWidth', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

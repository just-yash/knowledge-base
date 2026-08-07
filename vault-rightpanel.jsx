// vault-rightpanel.jsx — Outline, backlinks, outgoing links, tags, related notes

const { useState: useStateRP, useEffect: useEffectRP } = React;

// ─── Outline Section (with scroll-spy highlight) ──────────────────────────────
const OutlineSection = ({ note, onHeadingClick }) => {
  const [open,     setOpen]     = useStateRP(true);
  const [activeId, setActiveId] = useStateRP('');

  // Listen for scroll-spy events dispatched by the editor
  useEffectRP(() => {
    const handler = (e) => setActiveId(e.detail?.id || '');
    window.addEventListener('vault-active-heading', handler);
    return () => window.removeEventListener('vault-active-heading', handler);
  }, []);

  // Reset active heading when note changes
  useEffectRP(() => { setActiveId(''); }, [note?.id]);

  if (!note?.outline?.length) return null;

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <SectionHeader
        title="Outline"
        icon="list"
        isOpen={open}
        onToggle={() => setOpen(o => !o)}
        count={note.outline.length}
      />
      {open && (
        <div style={{ padding: '2px 0 8px' }}>
          {note.outline.map((item, i) => {
            const isActive = item.id === activeId;
            // Indent per level: h2=14, h3=24, h4=34, h5=44, h6=54
            const INDENT = { 2: 14, 3: 24, 4: 34, 5: 44, 6: 54 };
            const indent = INDENT[item.level] ?? 14;
            // Visual weight decreases with depth
            const color = isActive ? 'var(--text-primary)'
              : item.level === 2 ? 'var(--text-secondary)'
              : item.level === 3 ? 'var(--text-secondary)'
              : 'var(--text-muted)';
            const fontSize = item.level === 2 ? 13.5 : item.level === 3 ? 12.5 : 12;
            const fontWeight = item.level <= 3 ? 500 : 400;
            return (
              <button
                key={i}
                title={item.text}
                onClick={() => onHeadingClick(item.id)}
                style={{
                  display: 'block', width: '100%', border: 'none',
                  padding: `3px 14px 3px ${isActive ? indent - 2 : indent}px`,
                  textAlign: 'left', cursor: 'pointer', fontSize,
                  borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  background: isActive ? 'var(--bg-active)' : 'none',
                  color, fontWeight,
                  lineHeight: 1.45, borderRadius: 0,
                  transition: 'color 0.12s, background 0.12s, border-color 0.12s',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = color; e.currentTarget.style.background = 'none'; }}}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Note Preview Card (used in backlinks + related) ─────────────────────────
const NoteCard = ({ noteId, onNavigate, showExcerpt = false }) => {
  const note = VAULT_NOTES[noteId];
  if (!note) {
    return (
      <div style={{ padding: '5px 14px' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{noteId}</span>
      </div>
    );
  }
  const excerpt = note.content.replace(/#{1,6}\s/g, '').replace(/`{1,3}[^`]*`{1,3}/g, '').replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').trim().slice(0, 90);

  return (
    <button
      onClick={() => onNavigate(noteId)}
      style={{
        display: 'block', width: '100%', background: 'none', border: 'none',
        padding: '6px 14px', textAlign: 'left', cursor: 'pointer', borderRadius: 0,
        transition: 'background 0.12s, border-color 0.12s',
        borderLeft: '2px solid transparent',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--bg-hover)';
        e.currentTarget.style.borderLeftColor = 'var(--accent)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'none';
        e.currentTarget.style.borderLeftColor = 'transparent';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: showExcerpt ? 3 : 0 }}>
        <Icon name="file" size={11} strokeWidth={1.5} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {note.title}
        </span>
      </div>
      {showExcerpt && (
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5, paddingLeft: 16, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {excerpt}…
        </div>
      )}
    </button>
  );
};

// ─── Backlinks ────────────────────────────────────────────────────────────────
const BacklinksSection = ({ note, onNavigate }) => {
  const [open, setOpen] = useStateRP(true);
  const backlinks = note?.backlinks || [];

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <SectionHeader
        title="Backlinks"
        icon="arrow-left"
        isOpen={open}
        onToggle={() => setOpen(o => !o)}
        count={backlinks.length}
      />
      {open && (
        <div style={{ padding: '2px 0 6px' }}>
          {backlinks.length === 0 ? (
            <div style={{ padding: '4px 22px 8px', fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No notes link here yet
            </div>
          ) : (
            backlinks.map(id => (
              <NoteCard key={id} noteId={id} onNavigate={onNavigate} showExcerpt />
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ─── Outgoing Links ───────────────────────────────────────────────────────────
const OutgoingLinksSection = ({ note, onNavigate }) => {
  const [open, setOpen] = useStateRP(true);
  const links = note?.links || [];

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <SectionHeader
        title="Outgoing Links"
        icon="arrow-up-right"
        isOpen={open}
        onToggle={() => setOpen(o => !o)}
        count={links.length}
      />
      {open && (
        <div style={{ padding: '2px 0 6px' }}>
          {links.length === 0 ? (
            <div style={{ padding: '4px 22px 8px', fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No outgoing links
            </div>
          ) : (
            links.map(id => <NoteCard key={id} noteId={id} onNavigate={onNavigate} />)
          )}
        </div>
      )}
    </div>
  );
};

// ─── Tags Section ─────────────────────────────────────────────────────────────
const TagsSection = ({ note, onTagClick }) => {
  const [open, setOpen] = useStateRP(true);
  const tags = note?.tags || [];

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <SectionHeader
        title="Tags"
        icon="hash"
        isOpen={open}
        onToggle={() => setOpen(o => !o)}
        count={tags.length}
      />
      {open && (
        <div style={{ padding: '4px 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tags.length === 0
            ? <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>No tags</span>
            : tags.map(t => (
                <TagBadge
                  key={t} label={t}
                  onClick={() => onTagClick && onTagClick(t)}
                />
              ))
          }
        </div>
      )}
    </div>
  );
};

// ─── Related Notes ────────────────────────────────────────────────────────────
const getRelated = (note) => {
  if (!note) return [];
  // Notes sharing tags with the current note, excluding the note itself and already linked
  const myTags = new Set(note.tags || []);
  const excluded = new Set([note.id, ...(note.links || []), ...(note.backlinks || [])]);
  return Object.values(VAULT_NOTES)
    .filter(n => !excluded.has(n.id) && (n.tags || []).some(t => myTags.has(t)))
    .slice(0, 4);
};

const RelatedSection = ({ note, onNavigate }) => {
  const [open, setOpen] = useStateRP(false);
  const related = getRelated(note);

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <SectionHeader
        title="Related"
        icon="layers"
        isOpen={open}
        onToggle={() => setOpen(o => !o)}
        count={related.length}
      />
      {open && (
        <div style={{ padding: '2px 0 6px' }}>
          {related.length === 0 ? (
            <div style={{ padding: '4px 22px 8px', fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>No related notes found</div>
          ) : (
            related.map(n => <NoteCard key={n.id} noteId={n.id} onNavigate={onNavigate} showExcerpt />)
          )}
        </div>
      )}
    </div>
  );
};

// ─── Note Properties ──────────────────────────────────────────────────────────
const PropertiesSection = ({ note }) => {
  const [open, setOpen] = useStateRP(false);
  if (!note) return null;

  const rows = [
    { label: 'Created', value: note.created },
    { label: 'Modified', value: note.modified },
    { label: 'Words', value: note.wordCount?.toLocaleString() },
    { label: 'Folder', value: note.folder },
  ];

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <SectionHeader title="Properties" icon="type" isOpen={open} onToggle={() => setOpen(o => !o)} />
      {open && (
        <div style={{ padding: '4px 14px 10px' }}>
          {rows.map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 0' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{label}</span>
              <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', maxWidth: 130, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Right Panel Header ───────────────────────────────────────────────────────
const RightPanelHeader = ({ note, onClose }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '0 10px 0 14px', height: 36, flexShrink: 0,
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-panel)',
  }}>
    <span style={{
      flex: 1, fontSize: 13, fontWeight: 600,
      color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    }}>
      {note?.title || 'No note'}
    </span>
    <button
      title="Close panel"
      onClick={onClose}
      style={{
        width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'none', border: 'none', borderRadius: 4, cursor: 'pointer',
        color: 'var(--text-muted)', transition: 'color 0.15s, background 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
    >
      <Icon name="x" size={13} strokeWidth={2} />
    </button>
  </div>
);

// ─── Right Panel (main export) ────────────────────────────────────────────────
const RightPanel = ({ open, currentNote, onNoteNavigate, onClose }) => {
  const note = currentNote ? VAULT_NOTES[currentNote] : null;

  // Scroll to heading by dispatching to NoteEditor's scroll container
  const handleHeadingClick = (id) => {
    window.dispatchEvent(new CustomEvent('vault-scroll-to', { detail: { headingId: id } }));
  };

  // Open tag note if available, else open command palette pre-filled with tag query
  const handleTagClick = (tag) => {
    const tagId = window.findNoteByName ? window.findNoteByName(tag) : null;
    if (tagId && window.VAULT_NOTES?.[tagId]) {
      onNoteNavigate(tagId);
    } else {
      window.dispatchEvent(new CustomEvent('vault-search-tag', { detail: { tag } }));
    }
  };

  return (
    <div style={{
      width: open ? 280 : 0,
      flexShrink: 0,
      overflow: 'hidden',
      transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1)',
      background: 'var(--bg-panel)',
      borderLeft: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ width: 280, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <RightPanelHeader note={note} onClose={onClose} />
        <div style={{ flex: 1, overflowY: 'auto' }} className="scrollable">
          <OutlineSection note={note} onHeadingClick={handleHeadingClick} />
          <BacklinksSection note={note} onNavigate={onNoteNavigate} />
          <OutgoingLinksSection note={note} onNavigate={onNoteNavigate} />
          <TagsSection note={note} onTagClick={handleTagClick} />
          <RelatedSection note={note} onNavigate={onNoteNavigate} />
          <PropertiesSection note={note} />
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { RightPanel });

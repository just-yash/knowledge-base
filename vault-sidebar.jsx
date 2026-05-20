// vault-sidebar.jsx — Left sidebar: icon rail + file tree + mini graph placeholder

// ─── Icon Rail ────────────────────────────────────────────────────────────────
const RAIL_TOP = [
  { id: 'search', icon: 'search', title: 'Search  ⌘K' },
];
const RAIL_BOT = [
  { id: 'theme', icon: 'moon', title: 'Toggle Theme' },
];

const RailButton = ({ id, icon, title, active, onClick, themeIcon }) => (
  <button
    title={title}
    onClick={() => onClick(id)}
    style={{
      width: 42, height: 42, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: active ? 'var(--bg-active)' : 'none',
      border: 'none', borderRadius: 6, cursor: 'pointer',
      color: active ? 'var(--accent)' : 'var(--text-muted)',
      transition: 'color 0.15s, background 0.15s', flexShrink: 0,
    }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}}
  >
    <Icon name={themeIcon || icon} size={16} strokeWidth={1.6} />
  </button>
);

const IconRail = ({ activeSection, onSectionClick, theme, onThemeToggle }) => (
  <div style={{
    width: 48, flexShrink: 0,
    background: 'var(--bg-rail)',
    borderRight: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', padding: '8px 0',
    gap: 2, zIndex: 10,
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
      {RAIL_TOP.map(item => (
        <RailButton
          key={item.id} {...item}
          active={activeSection === item.id}
          onClick={item.id === 'search' ? onSectionClick : onSectionClick}
        />
      ))}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <RailButton
        id="theme" icon="moon" title="Toggle Theme"
        themeIcon={theme === 'dark' ? 'sun' : 'moon'}
        active={false}
        onClick={onThemeToggle}
      />
    </div>
  </div>
);

// ─── Folder / File Item ───────────────────────────────────────────────────────
const FOLDER_ICONS = {
  // ── Top-level folders ─────────────────────────────────────────────────
  '00-home':      'home',
  'mocs':         'map',
  'raw-notes':    'pencil',
  'notes':        'notebook',
  'research':     'flask',
  'creativity':   'palette',
  'archive':      'archive',
  'annexure':     'folder',
  'tags-folder':  'hash',
  'templates':    'layout-template',
  'private':      'lock',
  'projects':     'kanban',
  // ── 02 - Raw Notes subfolders ─────────────────────────────────────────
  'raw-notes-books-papers':    'books',
  'raw-notes-classes':         'graduation-cap',
  'raw-notes-conversations':   'message-circle',
  'raw-notes-news-updates':    'newspaper',
  'raw-notes-podcasts':        'mic',
  'raw-notes-thought':         'lightbulb',
  'raw-notes-videos':          'video',
  // ── 07 - Annexure subfolders ──────────────────────────────────────────
  'annexure-documents':        'file-text',
  'annexure-excalidraw':       'pen-tool',
  'annexure-html':             'file-code',
  'annexure-images':           'image',
  'annexure-media':            'film',
  // ── 05 - Creativity subfolders ────────────────────────────────────────
  'creativity-poetry':         'feather',
};

const FolderRow = ({ folder, depth, expanded, active, onToggle, onNoteSelect, currentNote }) => {
  const indent = depth * 14 + 8;
  const isExpanded = expanded.has(folder.id);

  return (
    <div>
      <button
        onClick={() => onToggle(folder.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          width: '100%', background: 'none', border: 'none',
          padding: `3px 8px 3px ${indent}px`,
          cursor: 'pointer', borderRadius: 4,
          color: 'var(--text-secondary)', fontSize: 14,
          transition: 'background 0.1s, color 0.1s',
          textAlign: 'left', userSelect: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        <span style={{ flexShrink: 0, color: 'var(--text-muted)', display: 'flex' }}>
          <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={11} strokeWidth={2.5} />
        </span>
        <span style={{ flexShrink: 0, display: 'flex', opacity: 0.9 }}>
          <Icon name={FOLDER_ICONS[folder.id] || 'folder'} size={13} strokeWidth={1.6} />
        </span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {folder.name}
        </span>
      </button>

      {isExpanded && folder.children.map(child => (
        child.type === 'folder'
          ? <FolderRow
              key={child.id}
              folder={child}
              depth={depth + 1}
              expanded={expanded}
              active={active}
              onToggle={onToggle}
              onNoteSelect={onNoteSelect}
              currentNote={currentNote}
            />
          : <FileRow
              key={child.id}
              item={child}
              depth={depth + 1}
              isActive={currentNote === child.id}
              onSelect={() => (child.type === 'note' || child.type === 'asset' || child.type === 'image') ? onNoteSelect(child.id) : null}
            />
      ))}
    </div>
  );
};

const FILE_ICON = { tag: 'hash', asset: 'file-text', image: 'image', excalidraw: 'pen-tool', stub: 'file' };

const FileRow = ({ item, depth, isActive, onSelect }) => {
  const indent   = depth * 14 + 8;
  const isTag    = item.type === 'tag';
  const isStub   = item.type === 'stub' || item.type === 'excalidraw';
  const isAsset  = item.type === 'asset' || item.type === 'image';
  const clickable = !isStub;
  const icon     = FILE_ICON[item.type] || 'file';

  return (
    <button
      data-sidebar-note={item.id}
      onClick={onSelect}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        width: '100%', border: 'none',
        padding: `3px 8px 3px ${indent}px`,
        cursor: clickable ? 'pointer' : 'default',
        borderRadius: 4, textAlign: 'left', userSelect: 'none',
        fontSize: 13, transition: 'background 0.1s, color 0.1s',
        borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
        background: isActive ? 'var(--bg-active)' : 'none',
        color: isActive ? 'var(--text-primary)' : isStub ? 'var(--text-muted)' : 'var(--text-secondary)',
        paddingLeft: isActive ? `${indent - 2}px` : `${indent}px`,
      }}
      onMouseEnter={e => { if (!isActive && clickable) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = isStub ? 'var(--text-muted)' : 'var(--text-secondary)'; }}}
    >
      <span style={{ flexShrink: 0, display: 'flex', opacity: isActive ? 1 : 0.8 }}>
        <Icon name={icon} size={12} strokeWidth={1.5} />
      </span>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item.name}
      </span>
      {isStub && (
        <span style={{ fontSize: 9, opacity: 0.4, fontStyle: 'italic', marginRight: 4 }}>excalidraw</span>
      )}
    </button>
  );
};

// ─── Sidebar Header (actions row) ─────────────────────────────────────────────
const SidebarHeader = ({ onAutoReveal, onCollapseAll, onSearch, onHome }) => (
  <div style={{
    display: 'flex', alignItems: 'center',
    padding: '5px 6px 5px 8px',
    borderBottom: '1px solid var(--border)',
    flexShrink: 0, gap: 6,
  }}>
    <button onClick={onHome} title="Go to vault index" style={{
      display: 'flex', alignItems: 'center', gap: 6, flex: 1,
      background: 'none', border: 'none', cursor: 'pointer', padding: '2px 2px',
      borderRadius: 4, overflow: 'hidden', transition: 'background 0.12s',
      minWidth: 0,
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
    onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      <Icon name="book-open" size={13} strokeWidth={1.8} style={{ color: 'var(--accent)', opacity: 0.9, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        Yash-Zattelkasten
      </span>
    </button>
    <div style={{ display: 'flex', gap: 1 }}>
      {[
        { icon: 'search',   title: 'Search (⌘K)',              action: onSearch },
        { icon: 'locate',   title: 'Reveal current file',      action: onAutoReveal },
        { icon: 'minimize', title: 'Collapse all',             action: onCollapseAll },
      ].map(({ icon, title, action }) => (
        <button key={icon} title={title} onClick={action} style={{
          width: 27, height: 27, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', borderRadius: 4, cursor: 'pointer',
          color: 'var(--text-muted)', transition: 'color 0.12s, background 0.12s', flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
        >
          <Icon name={icon} size={12} strokeWidth={1.8} />
        </button>
      ))}
    </div>
  </div>
);

// ─── Mini Graph Placeholder (Phase 3 will fill this) ─────────────────────────
const MiniGraphPlaceholder = ({ onOpenGraph }) => (
  <div
    onClick={onOpenGraph}
    style={{
      margin: '8px 8px 6px',
      height: 163,
      background: 'var(--bg-graph)',
      borderRadius: 6,
      border: '1px solid var(--border)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'border-color 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
  >
    {/* Decorative graph dots — replaced in Phase 3 with real canvas */}
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      {/* Edges */}
      {[
        [60,65,95,40],[60,65,30,50],[95,40,120,60],[30,50,20,80],
        [120,60,150,45],[150,45,175,65],[175,65,155,90],[155,90,120,100],
        [120,100,95,40],[20,80,50,100],[50,100,80,110],[80,110,120,100],
        [175,65,200,50],[200,50,215,75],[215,75,195,95],[195,95,175,65],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      ))}
      {/* Nodes */}
      {[
        [60,65,3.5,'var(--accent)'],[95,40,2.5,'#aaa'],[30,50,2,'#aaa'],
        [120,60,4,'var(--accent)'],[150,45,2,'#aaa'],[175,65,5,'#c792ea'],
        [155,90,2.5,'#aaa'],[120,100,3,'#7bc9a0'],[20,80,2,'#aaa'],
        [50,100,2,'#aaa'],[80,110,2,'#d4a96a'],[200,50,2.5,'#aaa'],
        [215,75,2,'#aaa'],[195,95,2,'#aaa'],[35,105,1.8,'#aaa'],
        [70,45,1.8,'#aaa'],[140,115,2,'#aaa'],[100,20,2,'#aaa'],
      ].map(([cx,cy,r,fill],i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill} opacity="0.85" />
      ))}
    </svg>
    <div style={{
      position: 'absolute', bottom: 6, right: 8,
      fontSize: 10, color: 'var(--text-muted)', opacity: 0.7,
    }}>
      Graph view
    </div>
  </div>
);

// ─── Vault Footer ─────────────────────────────────────────────────────────────
const VaultFooter = ({ theme, onThemeToggle }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '7px 10px',
    borderTop: '1px solid var(--border)',
    flexShrink: 0,
  }}>
    <div style={{
      width: 22, height: 22, borderRadius: 4,
      background: 'var(--accent-soft)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Icon name="user" size={13} strokeWidth={1.6} style={{ color: 'var(--accent)' }} />
    </div>
    <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      Yash-Zattelkasten
    </span>
    <button title="Toggle theme" onClick={onThemeToggle} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      color: 'var(--text-muted)', display: 'flex', padding: 3, borderRadius: 4,
      transition: 'color 0.12s, background 0.12s',
    }}
    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} strokeWidth={1.6} />
    </button>
  </div>
);

// ─── File Tree ────────────────────────────────────────────────────────────────
const FileTree = ({ folders, expandedFolders, onFolderToggle, currentNote, onNoteSelect }) => (
  <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0 4px' }} className="scrollable">
    {folders.map(folder => (
      <FolderRow
        key={folder.id}
        folder={folder}
        depth={0}
        expanded={expandedFolders}
        currentNote={currentNote}
        onToggle={onFolderToggle}
        onNoteSelect={onNoteSelect}
      />
    ))}
  </div>
);

// ─── Left Sidebar (main export) ───────────────────────────────────────────────
const LeftSidebar = ({
  open,
  theme, onThemeToggle,
  currentNote, onNoteSelect,
  expandedFolders, onFolderToggle,
  onAutoReveal, onCollapseAll,
  onSearch, onHome, onOpenGraph,
}) => (
  <div style={{ display: 'flex', flexShrink: 0, height: '100%', overflow: 'hidden' }}>
    <div style={{
      width: open ? 220 : 0,
      flexShrink: 0, overflow: 'hidden',
      transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1)',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ width: 220, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <SidebarHeader
          onAutoReveal={onAutoReveal}
          onCollapseAll={onCollapseAll}
          onSearch={onSearch}
          onHome={onHome}
        />
        <FileTree
          folders={VAULT_FOLDERS}
          expandedFolders={expandedFolders}
          onFolderToggle={onFolderToggle}
          currentNote={currentNote}
          onNoteSelect={onNoteSelect}
        />
        {window.MiniGraph
          ? <MiniGraph currentNote={currentNote} onNavigate={onNoteSelect} onOpenFull={onOpenGraph} />
          : <MiniGraphPlaceholder onOpenGraph={onOpenGraph} />
        }
        <VaultFooter theme={theme} onThemeToggle={onThemeToggle} />
      </div>
    </div>
  </div>
);

Object.assign(window, { LeftSidebar });

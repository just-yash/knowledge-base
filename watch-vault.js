// watch-vault.js — auto-rebuilds vault-data.js whenever a .md file changes
// Run: node watch-vault.js
// Requires Node ≥ 18 (native fs.watch recursive) or install chokidar for older Node.

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VAULT_ROOT = path.join(__dirname, 'notes');
const DEBOUNCE_MS = 800;   // wait this long after last change before rebuilding

let timer = null;
let building = false;

function rebuild() {
  if (building) return;
  building = true;
  const t = Date.now();
  process.stdout.write('\x1b[36m[vault]\x1b[0m Rebuilding... ');
  try {
    execSync('node build-vault.js', { cwd: __dirname, stdio: 'pipe' });
    const ms = Date.now() - t;
    console.log(`\x1b[32mdone\x1b[0m (${ms}ms)  ${new Date().toLocaleTimeString()}`);
  } catch (e) {
    console.error('\x1b[31mfailed\x1b[0m');
    console.error(e.stderr?.toString() || e.message);
  }
  building = false;
}

function scheduleRebuild() {
  clearTimeout(timer);
  timer = setTimeout(rebuild, DEBOUNCE_MS);
}

// Initial build on start
rebuild();

// Watch for changes
console.log(`\x1b[36m[vault]\x1b[0m Watching ${VAULT_ROOT} for changes…`);
console.log('       Press Ctrl+C to stop.\n');

try {
  // Node 18+ supports recursive watching natively on Windows
  fs.watch(VAULT_ROOT, { recursive: true }, (event, filename) => {
    if (!filename) return;
    const ext = path.extname(filename).toLowerCase();
    if (ext === '.md' || ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.pdf') {
      process.stdout.write(`\x1b[90m[vault] ${event}: ${filename}\x1b[0m\n`);
      scheduleRebuild();
    }
  });
} catch (err) {
  console.error('fs.watch failed:', err.message);
  console.log('Tip: upgrade to Node 18+ or run:  npm install chokidar  then use chokidar instead.');
  process.exit(1);
}

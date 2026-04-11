# Aether Atlas

Aether Atlas is a GitHub Pages-ready static website that publishes Obsidian-style notes with:

- bidirectional wikilinks
- backlinks and tags
- a responsive hierarchical sidebar
- full-text search
- an interactive graph view with zoom, pan, hover highlights, and topic clustering
- safe rendering for raw HTML blocks and attached `.html` files

## Project Structure

```text
knowledge-site/
|-- content/
|-- ../docs/ (generated output at repository root)
|-- scripts/
|   `-- build_site.py
|   `-- build_site.ps1
|   `-- sync_vault.ps1
|-- site.config.json
`-- src/
    |-- components/
    |-- pages/
    |-- scripts/
    `-- styles/
```

## How It Works

1. Put your Obsidian notes in `knowledge-site/content/`.
   To sync from your local vault on Windows:

   ```powershell
   powershell -ExecutionPolicy Bypass -File knowledge-site/scripts/sync_vault.ps1
   ```

2. Run either builder:

   ```powershell
   python knowledge-site/scripts/build_site.py
   ```

   or on Windows:

   ```powershell
   powershell -ExecutionPolicy Bypass -File knowledge-site/scripts/build_site.ps1
   ```

3. The script scans the vault, resolves wikilinks, computes backlinks, builds sidebar data, copies assets, and writes a GitHub Pages-ready site into `/docs` at the repository root.
4. Publish `/docs` with GitHub Pages.

## Supported Authoring Features

- `[[Wikilinks]]`
- `[[Wikilinks|Aliases]]`
- `![[Embedded Note]]`
- `![[Embedded image.png]]`
- `![[Embedded file.pdf]]`
- `![[path/to/embed.html]]`
- inline and block HTML inside notes
- markdown image and attachment links
- markdown links to internal `.html` files
- tags such as `#knowledge`

## GitHub Pages Setup

### Option 1: Deploy `/docs`

1. Push this repository to GitHub.
2. Open repository settings.
3. Go to `Pages`.
4. Set source to `Deploy from a branch`.
5. Select your branch and `/docs`.

### Option 2: GitHub Actions

Use an action that runs:

```powershell
python knowledge-site/scripts/build_site.py
```

and uploads `/docs` as the static artifact.

## Customizing for a Real Vault

- Replace or sync the files inside `knowledge-site/content/`.
- Or point `contentDir` in `knowledge-site/site.config.json` at another vault for local-only builds.
- Keep note titles unique when possible for cleaner wikilink resolution.
- Attachments are resolved by full path and by basename, which works well with Obsidian-style pasted images in shared annexure folders.

## Security Notes

- Raw HTML is sanitized in the client with DOMPurify.
- Internal HTML attachments are rendered in sandboxed iframes.
- Unsafe protocols and scripts are stripped during sanitization.

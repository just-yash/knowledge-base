import { resolveAsset, resolveNoteReference } from "./data-loader.js";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"]);
const AUDIO_EXTENSIONS = new Set([".mp3", ".wav", ".ogg", ".m4a"]);

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function escapeUrl(value) {
  return escapeHtml(encodeURI(value));
}

export function extensionOf(target) {
  const match = target.split(/[?#]/, 1)[0].match(/(\.[a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : "";
}

export function isHtmlAsset(target) {
  return extensionOf(target) === ".html";
}

export function isMarkdownAsset(target) {
  return extensionOf(target) === ".md";
}

export function isImageAsset(target) {
  return IMAGE_EXTENSIONS.has(extensionOf(target));
}

export function isPdfAsset(target) {
  return extensionOf(target) === ".pdf";
}

export function isVideoAsset(target) {
  return VIDEO_EXTENSIONS.has(extensionOf(target));
}

export function isAudioAsset(target) {
  return AUDIO_EXTENSIONS.has(extensionOf(target));
}

export function isEmbeddableAsset(target) {
  return isHtmlAsset(target) || isImageAsset(target) || isPdfAsset(target) || isVideoAsset(target) || isAudioAsset(target);
}

function basename(target) {
  return target.replaceAll("\\", "/").split("/").pop() || target;
}

function humanize(value) {
  return value
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatFrontmatterValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean).join(", ");
  }
  return String(value ?? "").trim();
}

function buildFrontmatterSection(frontmatterEntries) {
  if (!Array.isArray(frontmatterEntries) || !frontmatterEntries.length) {
    return null;
  }

  const frontmatter = document.createElement("section");
  frontmatter.className = "note-frontmatter";
  frontmatter.innerHTML = frontmatterEntries
    .map(
      ({ key, value }) =>
        `<p><span class="frontmatter-key">${escapeHtml(humanize(key))}:</span> <span class="frontmatter-value">${escapeHtml(formatFrontmatterValue(value))}</span></p>`
    )
    .join("");

  return frontmatter;
}

function parseEmbedSize(value) {
  const match = String(value || "").trim().match(/^(\d+)(?:x(\d+))?$/i);
  if (!match) {
    return null;
  }

  return {
    width: Number(match[1]),
    height: match[2] ? Number(match[2]) : null
  };
}

function imageSizingStyle(size) {
  if (!size?.width && !size?.height) {
    return "";
  }

  const styles = [];
  if (size.width) {
    styles.push(`width:min(100%, ${size.width}px)`);
  }
  if (size.height) {
    styles.push(`max-height:${size.height}px`);
  }

  return styles.length ? ` style="${styles.join(";")}"` : "";
}

export function slugifyHeading(value) {
  const cleaned = String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return cleaned || "section";
}

export function parseObsidianReference(raw) {
  const [targetPart, aliasPart = ""] = String(raw || "").split("|");
  const target = targetPart.trim();
  const alias = aliasPart.trim();

  const headingIndex = target.search(/[#^]/);
  const reference = headingIndex >= 0 ? target.slice(0, headingIndex).trim() : target;
  const anchor = headingIndex >= 0 ? target.slice(headingIndex + 1).trim() : "";
  const size = parseEmbedSize(alias);

  return {
    rawTarget: target,
    reference,
    alias,
    anchor,
    size,
    label: (!size && alias) || basename(reference || target) || target
  };
}

export function renderInternalHtmlEmbed(assetUrl, title) {
  return `
    <figure class="note-asset html-embed">
      <iframe
        src="${escapeUrl(assetUrl)}"
        title="${escapeHtml(title || "Embedded HTML")}"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        referrerpolicy="no-referrer"
      ></iframe>
    </figure>
  `;
}

export function renderImageEmbed(assetUrl, altText, options = {}) {
  return `
    <figure class="note-asset image-asset">
      <img src="${escapeUrl(assetUrl)}" alt="${escapeHtml(altText || "Embedded image")}" loading="lazy"${imageSizingStyle(options.size)} />
    </figure>
  `;
}

export function renderPdfLinkCard(assetUrl, title) {
  const label = title || "PDF Document";
  return `
    <a href="${escapeUrl(assetUrl)}" class="note-asset pdf-link-card" target="_blank" rel="noreferrer noopener">
      <span class="pdf-link-badge">PDF</span>
      <span class="pdf-link-name">${escapeHtml(label)}</span>
      <span class="pdf-link-arrow" aria-hidden="true">&#8599;</span>
    </a>
  `;
}

export function renderMediaEmbed(tagName, assetUrl, title) {
  return `
    <figure class="note-asset media-asset">
      <${tagName} controls preload="metadata" src="${escapeUrl(assetUrl)}"></${tagName}>
      ${title ? `<figcaption class="asset-caption">${escapeHtml(title)}</figcaption>` : ""}
    </figure>
  `;
}

export function renderAssetLink(assetUrl, label) {
  return `<a href="${escapeUrl(assetUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(label)}</a>`;
}

export function renderNoteEmbed(note) {
  return `
    <aside class="note-embed">
      <header>Embedded note</header>
      <a href="?note=${encodeURIComponent(note.slug)}" data-note-link="${escapeHtml(note.slug)}">
        ${escapeHtml(note.title)}
      </a>
      <p>${escapeHtml(note.excerpt)}</p>
    </aside>
  `;
}

export function renderCallout(type, titleHtml, bodyHtml, foldState = "") {
  const calloutType = slugifyHeading(type).replaceAll("-", " ");
  const label = titleHtml || humanize(calloutType);
  const className = `callout callout-${slugifyHeading(type)}`;

  if (foldState === "+" || foldState === "-") {
    return `
      <details class="${className}"${foldState === "+" ? " open" : ""}>
        <summary class="callout-title">
          <span class="callout-label">${label}</span>
        </summary>
        <div class="callout-body">${bodyHtml}</div>
      </details>
    `;
  }

  return `
    <aside class="${className}">
      <div class="callout-title">
        <span class="callout-label">${label}</span>
      </div>
      <div class="callout-body">${bodyHtml}</div>
    </aside>
  `;
}

export function renderAssetReference(rawTarget, data, currentNote, options = {}) {
  const { embed = false, label = "", size = null } = options;
  const assetUrl = resolveAsset(data, rawTarget, currentNote?.relPath || "");
  const resolvedLabel = label || basename(rawTarget);

  if (!assetUrl) {
    return `<span class="broken-link">${escapeHtml(resolvedLabel)}</span>`;
  }

  if (embed) {
    if (isHtmlAsset(rawTarget)) {
      return renderInternalHtmlEmbed(assetUrl, resolvedLabel);
    }
    if (isImageAsset(rawTarget)) {
      return renderImageEmbed(assetUrl, resolvedLabel, { size });
    }
    if (isPdfAsset(rawTarget)) {
      return renderPdfLinkCard(assetUrl, resolvedLabel);
    }
    if (isVideoAsset(rawTarget)) {
      return renderMediaEmbed("video", assetUrl, resolvedLabel);
    }
    if (isAudioAsset(rawTarget)) {
      return renderMediaEmbed("audio", assetUrl, resolvedLabel);
    }
  }

  return renderAssetLink(assetUrl, resolvedLabel);
}

function noteHref(note, anchor) {
  const hash = anchor ? `#${slugifyHeading(anchor)}` : "";
  return `?note=${encodeURIComponent(note.slug)}${hash}`;
}

export function renderWikilink(raw, data, currentNote) {
  const parsed = parseObsidianReference(raw);
  const reference = parsed.reference || currentNote?.title || "";
  const label = parsed.alias && !parsed.size ? parsed.alias : parsed.label;

  if (reference && isEmbeddableAsset(reference)) {
    return renderAssetReference(reference, data, currentNote, { label, embed: false, size: parsed.size });
  }

  const note = resolveNoteReference(data, reference, currentNote?.relPath || "");
  if (!note) {
    return `<span class="broken-link">${escapeHtml(label)}</span>`;
  }

  const anchorId = parsed.anchor ? slugifyHeading(parsed.anchor) : "";
  return `<a href="${noteHref(note, parsed.anchor)}" class="wiki-link" data-note-link="${escapeHtml(note.slug)}"${anchorId ? ` data-note-hash="${escapeHtml(anchorId)}"` : ""}>${escapeHtml(label)}</a>`;
}

export function renderEmbed(raw, data, currentNote) {
  const parsed = parseObsidianReference(raw);
  const reference = parsed.reference || currentNote?.title || "";
  const label = parsed.alias && !parsed.size ? parsed.alias : parsed.label;

  if (reference && isEmbeddableAsset(reference)) {
    return renderAssetReference(reference, data, currentNote, { embed: true, label, size: parsed.size });
  }

  const note = resolveNoteReference(data, reference, currentNote?.relPath || "");
  return note ? renderNoteEmbed(note) : `<span class="broken-link">${escapeHtml(label || reference)}</span>`;
}

export function sanitizeCss(cssText) {
  return String(cssText || "")
    .replace(/@import[\s\S]*?;/gi, "")
    .replace(/expression\s*\([^)]*\)/gi, "")
    .replace(/behavior\s*:[^;]+;?/gi, "")
    .replace(/-moz-binding\s*:[^;]+;?/gi, "")
    .replace(/url\s*\(\s*(['"]?)(javascript|vbscript):[\s\S]*?\1\s*\)/gi, 'url("")');
}

export function sanitizeEmbeddedStyles(root) {
  for (const styleTag of root.querySelectorAll("style")) {
    const safeCss = sanitizeCss(styleTag.textContent || "");
    if (!safeCss.trim()) {
      styleTag.remove();
      continue;
    }
    styleTag.textContent = safeCss;
  }

  for (const styledElement of root.querySelectorAll("[style]")) {
    const safeInlineStyle = sanitizeCss(styledElement.getAttribute("style") || "");
    if (!safeInlineStyle.trim()) {
      styledElement.removeAttribute("style");
      continue;
    }
    styledElement.setAttribute("style", safeInlineStyle);
  }
}

export function postProcessRenderedContent(root, frontmatterEntries = null) {
  sanitizeEmbeddedStyles(root);

  const frontmatterSection = buildFrontmatterSection(frontmatterEntries);
  if (frontmatterSection) {
    root.insertBefore(frontmatterSection, root.firstChild);
  }

  const leadingElements = [...root.children];
  const frontmatterNodes = [];

  for (const element of leadingElements) {
    if (element.classList.contains("author-signature")) {
      frontmatterNodes.push(element);
      continue;
    }

    if (element.tagName === "P") {
      const compactText = (element.textContent || "").replace(/\s+/g, " ").trim();
      if (/^(date|tags?|topic|aliases?|status|created|updated)\s*:/i.test(compactText)) {
        frontmatterNodes.push(element);
        continue;
      }
    }

    break;
  }

  if (frontmatterNodes.length) {
    const frontmatter = document.createElement("section");
    frontmatter.className = "note-frontmatter";
    root.insertBefore(frontmatter, frontmatterNodes[0]);
    for (const node of frontmatterNodes) {
      frontmatter.appendChild(node);
    }
  }

  for (const iframe of root.querySelectorAll("iframe")) {
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("sandbox", iframe.getAttribute("sandbox") || "allow-scripts allow-same-origin");
    iframe.setAttribute("referrerpolicy", "no-referrer");
  }

  for (const table of root.querySelectorAll("table")) {
    if (table.parentElement?.classList.contains("table-scroll")) {
      continue;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }

  for (const anchor of root.querySelectorAll('a[href^="#"]')) {
    const id = anchor.getAttribute("href")?.slice(1) || "";
    if (!id) {
      continue;
    }
    anchor.setAttribute("data-local-anchor", id);
  }
}

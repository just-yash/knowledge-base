function updateLocation(route, replace = false) {
  const url = new URL(window.location.href);
  url.searchParams.delete("note");
  url.searchParams.delete("folder");
  url.searchParams.delete("graph");
  url.hash = "";
  if (route.note) {
    url.searchParams.set("note", route.note);
  }
  if (route.folder) {
    url.searchParams.set("folder", route.folder);
  }
  if (route.graph) {
    url.searchParams.set("graph", route.graph);
  }
  if (route.hash) {
    url.hash = route.hash;
  }
  if (replace) {
    window.history.replaceState(route, "", url);
  } else {
    window.history.pushState(route, "", url);
  }
}

export function currentRoute(data) {
  const url = new URL(window.location.href);
  const hash = decodeURIComponent(url.hash.replace(/^#/, ""));
  const graphTarget = url.searchParams.get("graph");
  if (graphTarget) {
    return { type: "graph", slug: graphTarget === "1" ? null : graphTarget, hash };
  }
  const folderKey = url.searchParams.get("folder");
  if (folderKey) {
    return { type: "folder", folderKey, hash };
  }
  return { type: "note", slug: url.searchParams.get("note") || data.site.defaultNote, hash };
}

export function navigateToNote(slug, options = {}) {
  if (!slug) {
    return;
  }

  const { replace = false, hash = "" } = options;
  updateLocation({ type: "note", note: slug, hash }, replace);
  window.dispatchEvent(new CustomEvent("atlas:navigate", { detail: { type: "note", slug, hash } }));
}

export function navigateToFolder(folderKey, options = {}) {
  if (!folderKey) {
    return;
  }

  const { replace = false } = options;
  updateLocation({ type: "folder", folder: folderKey }, replace);
  window.dispatchEvent(new CustomEvent("atlas:navigate", { detail: { type: "folder", folderKey } }));
}

export function navigateToGraph(focusSlug = null, options = {}) {
  const { replace = false } = options;
  updateLocation({ type: "graph", graph: focusSlug || "1" }, replace);
  window.dispatchEvent(new CustomEvent("atlas:navigate", { detail: { type: "graph", slug: focusSlug || null } }));
}

export function bindHistory(onChange) {
  window.addEventListener("popstate", () => onChange());
  window.addEventListener("atlas:navigate", () => onChange());
}

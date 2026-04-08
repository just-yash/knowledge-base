import { navigateToNote } from "./router.js";

function emitGraphSearch(query, matches) {
  document.dispatchEvent(
    new CustomEvent("atlas:graph-search", {
      detail: {
        query,
        slugs: matches.slice(0, 18).map((note) => note.slug)
      }
    })
  );
}

function rankNote(note, query) {
  const loweredQuery = query.toLowerCase();
  const title = note.title.toLowerCase();
  const tags = note.tags.join(" ").toLowerCase();
  const body = note.plainText.toLowerCase();

  let score = 0;
  if (title === loweredQuery) {
    score += 200;
  }
  if (title.startsWith(loweredQuery)) {
    score += 120;
  }
  if (title.includes(loweredQuery)) {
    score += 80;
  }
  if (tags.includes(loweredQuery)) {
    score += 40;
  }
  if (body.includes(loweredQuery)) {
    score += 15;
  }
  return score;
}

export async function initSearch(data) {
  const input = document.getElementById("site-search");
  const results = document.getElementById("search-results");
  let currentMatches = [];

  function closeResults() {
    results.classList.remove("is-open");
    results.innerHTML = "";
    emitGraphSearch("", []);
  }

  function openResults(markup) {
    results.innerHTML = markup;
    results.classList.add("is-open");
  }

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      closeResults();
      return;
    }

    let matches = [];
    if (query.startsWith("#")) {
      matches = data.lookups.tags.get(query.slice(1)) || [];
    } else {
      matches = data.notes
        .map((note) => ({ note, score: rankNote(note, query) }))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score || left.note.title.localeCompare(right.note.title))
        .map((entry) => entry.note);
    }
    currentMatches = matches;
    emitGraphSearch(query, matches);

    if (!matches.length) {
      openResults(`<div class="search-result"><span class="search-result-title">No matches</span><span class="search-result-meta">Try a different title, body phrase, or tag.</span></div>`);
      return;
    }

    openResults(
      matches
        .slice(0, 8)
        .map(
          (note) => `
            <a href="?note=${encodeURIComponent(note.slug)}" class="search-result" data-search-note="${note.slug}">
              <span class="search-result-title">${note.title}</span>
              <span class="search-result-meta">${note.folderSegments.join(" / ") || "Vault"} | ${note.tags.map((tag) => `#${tag}`).join(" ")}</span>
            </a>
          `
        )
        .join("")
    );
  });

  results.addEventListener("click", (event) => {
    const result = event.target.closest("[data-search-note]");
    if (!result) {
      return;
    }
    event.preventDefault();
    navigateToNote(result.dataset.searchNote);
    input.value = "";
    closeResults();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".topbar-search")) {
      closeResults();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && currentMatches.length) {
      event.preventDefault();
      navigateToNote(currentMatches[0].slug);
      closeResults();
      return;
    }
    if (event.key === "Escape") {
      closeResults();
      input.blur();
    }
  });
}

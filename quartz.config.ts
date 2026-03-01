import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Yash Agrawall's Zettelkasten",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "just-yash.github.io/knowledge-base",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
	footer: {
	    links: {
		LinkedIn: "https://www.linkedin.com/in/yash-agrawall",
		GitHub: "https://github.com/just-yash/knowledge-base",
		Email: "mailto:yashagrawall333@gmail.com",
	    },
	  },
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
         light: "#ffffff",
         lightgray: "#f2f4f8",
         gray: "#d1d5db",
         darkgray: "#374151",
         dark: "#111827",
         secondary: "#4f46e5",
         tertiary: "#059669",
         highlight: "rgba(79,70,229,0.12)",
         textHighlight: "#fde04766",
     },
        darkMode: {
 		 light: "#0f1117",
 		 lightgray: "#161b22",
 		 gray: "#2b303b",
 		 darkgray: "#c9d1d9",
 		 dark: "#f0f6fc",
  		 secondary: "#7aa2f7",
		 tertiary: "#9ece6a",
 		 highlight: "rgba(122,162,247,0.15)",
  		 textHighlight: "#ffd16655",
		},
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
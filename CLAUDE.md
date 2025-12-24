# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

This is an Astro 5 project using the minimal template with strict TypeScript.

**Key concepts:**
- File-based routing: Files in `src/pages/` automatically become routes (e.g., `index.astro` → `/`)
- Astro components use `.astro` extension with frontmatter (between `---` fences) for server-side JS/TS
- Static assets go in `public/` and are served from root
- Configuration in `astro.config.mjs` (currently default settings)

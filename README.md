# Coffee Nutz

A self-contained Coffee Nutz website preview prepared for Cloudflare Pages. Search-facing pages use the official `coffee-nutz.com` canonical URLs, while the design-review routes are excluded from indexing.

## Pages

- Home
- Menu gallery
- Frequently asked questions
- Why Coffee Nutz

Each of the six design concepts is also a complete four-page preview with its own themed Home, Menu, Our Story, and FAQ routes. Run `node scripts/generate-concept-pages.mjs` after changing shared concept-page content.

Validate all pages, metadata, structured data, and local links with `node scripts/validate-site.mjs`. Run `node scripts/smoke-test.mjs` to verify that every customer-facing route responds successfully.

No build step is required. The repository root is the Cloudflare Pages output directory.

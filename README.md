# Regexile

Regexile is a fast, dark-mode Path of Exile 2 strategy companion. It combines compact, source-checked farming runbooks with reusable English-client regex tools that help prepare Waystones and Tablets for each strategy.

The product is no longer limited to a regex catalogue: regex remains a core utility, but it supports the wider farming workflow—setup requirements, mechanic trees, run order, loot targets, live market references, and practical pre-run checks.

## Current features

- Operational Farm Guides for Ritual and low-investment Hiveblood + Wombgift Catalyst transit farming
- Quick setup summaries, pre-run checklists, route/run flows, tree allocations, and reward references
- Centralized Map and Tablet regex entries reused by Farm Guides instead of duplicated per page
- Verified English modifier wording with visible sources and patch context
- Responsive desktop and mobile layouts with one-click copy actions

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Content maintenance

- Regex sections, entries, patterns, verification states, and notes: `src/content/regex.ts`
- Typed farming guides, operational sections, sources, and regex-entry references: `src/content/farms.ts`
- PoE2 content version and optional repository URL: `src/config/game.ts`
- Product and interaction principles: `PRODUCT.md`
- Visual system and component treatment: `DESIGN.md`

Only mark an entry `verified` when its English modifier text and copyable expression are supported by current data. Entries without a confirmed expression should remain visible as `needs-verification` with an empty `patterns` array.

Farm guides reference regex entries by ID. Add a missing pattern to `src/content/regex.ts` first, then include its ID in a Farm Guide's `regex` section; do not duplicate expressions inside farm content or React components.

The initial v0.1 patterns were cross-checked against PoE2DB and the generated data and shortening logic in [poe2.re](https://poe2.re) / [veiset/poe.re](https://github.com/veiset/poe.re).

## Scope

Version 0.1 is static and source-controlled. It has no database, authentication, admin surface, analytics, theme switcher, community submission flow, live price ingestion, or profitability calculator. Farm Guides are operational references—not blog posts, personal test logs, or guaranteed-profit claims.

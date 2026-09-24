# Regexile

Regexile is a fast, dark-mode Path of Exile 2 reference for finding and copying useful English-client regex patterns while playing.

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
- PoE2 content version and optional repository URL: `src/config/game.ts`
- Product and interaction principles: `PRODUCT.md`
- Visual system and component treatment: `DESIGN.md`

Only mark an entry `verified` when its English modifier text and copyable expression are supported by current data. Entries without a confirmed expression should remain visible as `needs-verification` with an empty `patterns` array.

The initial v0.1 patterns were cross-checked against PoE2DB and the generated data and shortening logic in [poe2.re](https://poe2.re) / [veiset/poe.re](https://github.com/veiset/poe.re).

## Scope

Version 0.1 is static and source-controlled. It has no database, authentication, admin surface, analytics, theme switcher, or community submission flow.

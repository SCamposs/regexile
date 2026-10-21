# Regexile

<p align="center">
  <strong>A Path of Exile 2 farming companion built for clarity, preparation, and faster decisions.</strong>
</p>

<p align="center">
  Farming runbooks · Map & Tablet regex · Verified modifier references · Responsive interface
</p>

> **Status:** Actively developed, source-controlled strategy companion. Game mechanics, modifiers, and market information may change between patches; always check the current game version and linked sources.

## Overview

Regexile helps Path of Exile 2 players prepare a farming session without juggling scattered notes, modifier lists, and guides. It brings together **actionable farming workflows** and **copy-ready regular expressions** in one focused interface.

Rather than treating regex as an isolated catalogue, Regexile connects a strategy's preparation steps to the relevant Waystone and Tablet checks: *what to prepare, what to look for, what to avoid, and what to do next*.

## Features

| Area | What it provides |
| --- | --- |
| **Farm Guides** | Compact, operational runbooks covering requirements, setup, mechanics, run order, loot priorities, and pre-run checks. |
| **Regex tools** | Reusable expressions for checking Map and Tablet modifiers, with one-click copy actions. |
| **Connected content** | Guides reference canonical regex entries by ID rather than duplicating patterns. |
| **Verification** | English-client modifier wording, verification status, notes, and supporting references. |
| **Interface** | Responsive, dark-first layout designed for quick lookups during play. |

### Farming workflows

The content currently includes guides for **Ritual** and **low-investment Hiveblood + Wombgift Catalyst transit farming**. Guides are practical references, not guaranteed-profit calculators: specific returns depend on patch balance, execution, and market conditions.

### Regex without guesswork

Patterns and modifier wording are maintained in a central catalogue. An entry must not be labelled verified until its English text and copyable expression can be supported by current game data. Unknown expressions stay explicitly marked **needs verification** rather than being presented as reliable.

## Tech stack

- **Next.js 16** and **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Base UI** and **Lucide icons**

The current release is a **static, source-controlled application**. It does not require a database, user account, admin interface, or analytics service.

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/SCamposs/regexile.git
cd regexile
npm install
npm run dev
```

Open **http://localhost:3000**.

### Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Content architecture

Regexile keeps operational content separate from React rendering logic:

```text
src/
  content/
    regex.ts      # Regex entries, patterns, notes and verification status
    farms.ts      # Typed farming workflows and references to regex entries
  config/
    game.ts       # PoE2 content version and optional repository URL
PRODUCT.md        # Product and interaction principles
DESIGN.md         # Visual system and component guidance
```

**Single source of truth:** add or validate each expression in `src/content/regex.ts`, then reference its ID from the relevant guide in `src/content/farms.ts`. Avoid embedding duplicate expressions in guide content or React components.

**Verification workflow:**

1. Check the current English modifier wording and game context against a reliable source.
2. Add the pattern, notes, and supporting references to the canonical regex entry.
3. Mark it verified only when the expression is supported by current data.
4. Associate its ID with the relevant farming guide.
5. Recheck affected entries after game patches.

The initial v0.1 catalogue was cross-checked against [PoE2DB](https://poe2db.tw/) and regex data/shortening references from [poe2.re](https://poe2.re) and [veiset/poe.re](https://github.com/veiset/poe.re).

## Product principles

- **Preparation over noise:** prioritize instructions players can act on.
- **Transparency over certainty:** show sources and state when a pattern needs validation.
- **Reuse over duplication:** maintain shared content once.
- **Speed over complexity:** keep common actions quick on desktop and mobile.

## Current scope and limitations

Regexile does **not currently provide** authentication, community submissions, live price ingestion, profitability projections, or automatic in-game actions. Any market references in a guide are contextual links, not a claim of real-time pricing inside Regexile.

Game names and content belong to their respective owners. Regexile is an independent community project and is not affiliated with or endorsed by Grinding Gear Games.

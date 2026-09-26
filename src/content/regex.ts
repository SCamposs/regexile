import { GAME_VERSION } from "@/src/config/game";

export type VerificationStatus =
  | "verified"
  | "needs-verification"
  | "experimental";

export type EntryVariant =
  | "default"
  | "high-value"
  | "warning"
  | "experimental";

export type RegexPattern = {
  value: string;
  label?: string;
  sourceText?: string;
};

export type VerificationSource = {
  name: string;
  url: string;
  verifiedAt: string;
};

export type RegexEntry = {
  id: string;
  title: string;
  description?: string;
  patterns: RegexPattern[];
  requireAllPatterns?: boolean;
  combinedPattern?: string;
  combinedCopyLabel?: string;
  tags?: string[];
  notes?: string[];
  variant?: EntryVariant;
  verification: VerificationStatus;
  gameVersion?: string;
  category: string;
  sources?: VerificationSource[];
};

export type RegexSection = {
  slug: string;
  path: string;
  title: string;
  navigationLabel: string;
  description: string;
  group: "maps" | "tablets";
  entries: RegexEntry[];
};

const verified = (entry: Omit<RegexEntry, "verification" | "gameVersion">): RegexEntry => ({
  ...entry,
  verification: "verified",
  gameVersion: GAME_VERSION,
});

export const regexSections: RegexSection[] = [
  {
    slug: "maps",
    path: "/maps",
    title: "Map Regexes",
    navigationLabel: "Maps",
    description: "Compact English-client filters for useful Waystone properties.",
    group: "maps",
    entries: [
      verified({
        id: "maps-zero-revives",
        title: "Zero Revives",
        description: "Finds Waystones whose Remaining Revives value is exactly zero.",
        patterns: [{ value: '"le: 0"', sourceText: "Remaining Revives: 0" }],
        tags: ["zero revives", "revives", "waystone"],
        notes: ["This is a positive search for the zero value; it does not rely on excluding Waystones that display Revives."],
        category: "Maps",
        sources: [{ name: "poe2.re Waystone generator", url: "https://github.com/veiset/poe.re/blob/master/poe2/src/pages/waystone/WaystoneResult.ts", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "maps-revives",
        title: "Maps with Revives",
        description: "Matches Waystones showing between one and six available revives.",
        patterns: [{ value: '"le: [1-6]"', sourceText: "Revives available: 1–6" }],
        tags: ["revives", "waystone"],
        category: "Maps",
      }),
      verified({
        id: "maps-item-rarity",
        title: "Item Rarity",
        description: "Finds Waystones with increased rarity of items found in the area.",
        patterns: [{ value: '"m rar"', sourceText: "More Rarity of Items found in Area" }],
        tags: ["item rarity", "yield", "waystone"],
        category: "Maps",
      }),
      verified({
        id: "maps-pack-size",
        title: "Pack Size",
        description: "Finds Waystones with pack-size bonuses.",
        patterns: [{ value: '"k s"', sourceText: "Increased Pack Size" }],
        tags: ["pack size", "density", "waystone"],
        category: "Maps",
      }),
      verified({
        id: "maps-ritual-pack-size-monster-rarity-25",
        title: "Ritual: 25%+ Pack Size + Monster Rarity",
        description: "Requires both recommended Ritual Waystone stats at 25% or higher on the same Waystone.",
        patterns: [
          { value: '"k s.*(2[5-9]|[3-9].|\\d..)%"', label: "Pack Size 25%+", sourceText: "Pack Size: +25% or higher" },
          { value: '"r rar.*(2[5-9]|[3-9].|\\d..)%"', label: "Monster Rarity 25%+", sourceText: "Monster Rarity: +25% or higher" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"k s.*(2[5-9]|[3-9].|\\d..)%" "r rar.*(2[5-9]|[3-9].|\\d..)%"',
        combinedCopyLabel: "Copy Waystone regex",
        tags: ["ritual", "pack size", "monster rarity", "25 percent", "waystone"],
        notes: [
          "Both quoted expressions are required, so both thresholds must be present on the same Waystone.",
          "The numeric branch matches 25–29, 30–99 and three-digit values; 24 is excluded.",
        ],
        variant: "high-value",
        category: "Maps",
        sources: [{ name: "poe2.re Waystone generator", url: "https://github.com/veiset/poe.re/blob/master/poe2/src/pages/waystone/WaystoneResult.ts", verifiedAt: "2026-09-25" }],
      }),
      verified({
        id: "maps-effectiveness",
        title: "Monster Effectiveness",
        description: "Finds Waystones with increased monster effectiveness.",
        patterns: [{ value: '"r ef"', sourceText: "Monsters have more Effectiveness" }],
        tags: ["effectiveness", "monsters", "waystone"],
        category: "Maps",
      }),
      verified({
        id: "maps-monster-rarity",
        title: "Monster Rarity",
        description: "Finds Waystones with increased monster rarity.",
        patterns: [{ value: '"r rar"', sourceText: "More Monster Rarity" }],
        tags: ["monster rarity", "waystone"],
        category: "Maps",
      }),
    ],
  },
  {
    slug: "general",
    path: "/tablets/general",
    title: "General Tablet Regexes",
    navigationLabel: "General / Profitable",
    description: "General tablet modifiers with broad value or pairing potential.",
    group: "tablets",
    entries: [
      verified({
        id: "general-random-modifier",
        title: "Additional Random Modifier",
        description: "Targets tablets that add random modifiers to the map.",
        patterns: [{ value: '"ndo"', sourceText: "Map has additional random Modifiers" }],
        tags: ["random modifier", "effectiveness", "general"],
        notes: ["Can become valuable when paired with Effectiveness."],
        variant: "high-value",
        category: "General Tablet",
      }),
      verified({
        id: "general-two-random-modifiers",
        title: "Two Additional Random Modifiers",
        description: "Matches only the top roll that adds two random modifiers to the map.",
        patterns: [{ value: '"2 additional random"', sourceText: "Map has 2 additional random Modifiers" }],
        tags: ["random modifiers", "two modifiers", "2 modifiers", "general", "jado abyss"],
        notes: ["Use this instead of the broader Additional Random Modifier filter when every Tablet must have the +2 roll."],
        variant: "high-value",
        category: "General Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "general-rare-monsters",
        title: "Increased Rare Monsters",
        description: "Finds Tablets that increase the number of Rare Monsters in the map.",
        patterns: [{ value: '"f rare m"', sourceText: "Map has increased number of Rare Monsters" }],
        tags: ["rare monsters", "density", "general", "abyss"],
        variant: "high-value",
        category: "General Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "general-tablet-pack-size",
        title: "Pack Size in Map",
        description: "Finds the general Tablet modifier that increases Pack Size in the map.",
        patterns: [{ value: '"ze i"', sourceText: "Increased Pack Size in Map" }],
        tags: ["pack size", "density", "general", "abyss"],
        category: "General Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "general-tablet-monster-rarity",
        title: "Monster Rarity",
        description: "Finds the general Tablet modifier that increases Monster Rarity.",
        patterns: [{ value: '"rity$"', sourceText: "Map has increased Monster Rarity" }],
        tags: ["monster rarity", "general", "abyss"],
        category: "General Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "general-tablet-item-rarity",
        title: "Item Rarity",
        description: "Finds the general Tablet modifier that increases the rarity of items found in the map.",
        patterns: [{ value: '"ms f"', sourceText: "Increased Rarity of Items found in Map" }],
        tags: ["item rarity", "general", "abyss"],
        category: "General Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "general-tablet-effectiveness",
        title: "Monster Effectiveness",
        description: "Finds the general Tablet modifier that increases monster Effectiveness.",
        patterns: [{ value: '"eness$"', sourceText: "Monsters have increased Effectiveness" }],
        tags: ["monster effectiveness", "general", "abyss"],
        category: "General Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "general-additional-azmeri",
        title: "Additional Azmeri Spirits",
        description: "Finds tablets that add one or two Azmeri Spirits to the map.",
        patterns: [{ value: '"l azmeri spirits"', sourceText: "Map contains (1–2) additional Azmeri Spirits" }],
        tags: ["azmeri", "strongbox", "general"],
        notes: ["Can become valuable when paired with Strongbox-related modifiers."],
        category: "General Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
    ],
  },
  {
    slug: "irradiated",
    path: "/tablets/irradiated",
    title: "Irradiated Tablet Regexes",
    navigationLabel: "Irradiated",
    description: "Two-condition searches for high-impact Irradiated Tablet combinations.",
    group: "tablets",
    entries: [
      verified({
        id: "irradiated-effectiveness-rare-quantity",
        title: "Effectiveness + Rare Monster Quantity",
        description: "Requires both general Effectiveness and increased Rare Monster quantity.",
        patterns: [
          { value: '"eness$"', label: "Effectiveness", sourceText: "Monsters have increased Effectiveness" },
          { value: '"f rare m"', label: "Rare Monsters", sourceText: "Map has increased number of Rare Monsters" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"eness$" "f rare m"',
        tags: ["effectiveness", "rare monsters", "irradiated"],
        variant: "high-value",
        category: "Irradiated Tablet",
      }),
      verified({
        id: "irradiated-effectiveness-item-rarity",
        title: "Effectiveness + Item Rarity",
        description: "Requires Effectiveness and increased rarity of items found in the map.",
        patterns: [
          { value: '"eness$"', label: "Effectiveness", sourceText: "Monsters have increased Effectiveness" },
          { value: '"ms f"', label: "Item Rarity", sourceText: "Increased Rarity of Items found in Map" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"eness$" "ms f"',
        tags: ["effectiveness", "item rarity", "irradiated"],
        variant: "high-value",
        category: "Irradiated Tablet",
      }),
      verified({
        id: "irradiated-effectiveness-monster-rarity",
        title: "Effectiveness + Monster Rarity",
        description: "Requires Effectiveness and increased Monster Rarity.",
        patterns: [
          { value: '"eness$"', label: "Effectiveness", sourceText: "Monsters have increased Effectiveness" },
          { value: '"rity$"', label: "Monster Rarity", sourceText: "Map has increased Monster Rarity" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"eness$" "rity$"',
        tags: ["effectiveness", "monster rarity", "irradiated"],
        variant: "high-value",
        category: "Irradiated Tablet",
      }),
    ],
  },
  {
    slug: "ritual",
    path: "/tablets/ritual",
    title: "Ritual Tablet Regexes",
    navigationLabel: "Ritual",
    description: "Ready-to-copy searches for valuable Ritual Tablet modifiers.",
    group: "tablets",
    entries: [
      verified({
        id: "ritual-reroll-favours",
        title: "Reroll Favours",
        description: "Finds tablets that allow additional Ritual Favour rerolls.",
        patterns: [{ value: '"allo"', sourceText: "Ritual Altars in Map allow rerolling Favours 1–3 additional times" }],
        tags: ["reroll", "favours", "ritual"],
        notes: ["A cheap tablet with one useful Ritual modifier can be Chaos-crafted to attempt a second useful roll. The result is not guaranteed."],
        variant: "high-value",
        category: "Ritual Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "ritual-omen-chance",
        title: "Omen Chance",
        description: "Finds increased chance for Ritual Favours to be Omens.",
        patterns: [{ value: '"l fa"', sourceText: "Ritual Favours in Map have 35–70% increased chance to be Omens" }],
        tags: ["omen", "favours", "ritual"],
        variant: "high-value",
        category: "Ritual Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "ritual-reduced-defer-cost",
        title: "Reduced Defer Cost",
        description: "Finds reduced Tribute cost when deferring Ritual Favours.",
        patterns: [{ value: '"rri"', sourceText: "Deferring Favours at Ritual Altars in Map costs 20–30% reduced Tribute" }],
        tags: ["defer", "tribute", "ritual"],
        variant: "high-value",
        category: "Ritual Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "ritual-reduced-reroll-cost",
        title: "Reduced Reroll Cost",
        description: "Finds reduced Tribute cost when rerolling Ritual Favours.",
        patterns: [{ value: '"^rer"', sourceText: "Rerolling Favours at Ritual Altars in Map costs 20–30% reduced Tribute" }],
        tags: ["reroll", "tribute", "ritual"],
        variant: "high-value",
        category: "Ritual Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "ritual-increased-tribute",
        title: "Increased Tribute",
        description: "Finds increased Tribute from monsters sacrificed at Ritual Altars.",
        patterns: [{ value: '"iced"', sourceText: "Monsters Sacrificed at Ritual Altars in Map grant 18–30% increased Tribute" }],
        tags: ["tribute", "monsters", "ritual"],
        category: "Ritual Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "ritual-rare-monsters",
        title: "Rare Ritual Monsters",
        description: "Finds increased chance for revived Ritual monsters to be Rare.",
        patterns: [{ value: '"are$"', sourceText: "Revived Monsters from Ritual Altars in Map have 25–40% increased chance to be Rare" }],
        tags: ["rare monsters", "tribute", "ritual"],
        category: "Ritual Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
    ],
  },
  {
    slug: "expedition",
    path: "/tablets/expedition",
    title: "Expedition Tablet Regexes",
    navigationLabel: "Expedition",
    description: "Expedition combinations, with uncertain wording kept visibly separate.",
    group: "tablets",
    entries: [
      verified({
        id: "expedition-chests",
        title: "Buried Strongboxes",
        description: "Finds Expeditions containing buried Strongboxes.",
        patterns: [{ value: '"buried"', sourceText: "Expeditions contain (1–2) buried Strongboxes in Map" }],
        tags: ["chests", "strongboxes", "rare monsters", "expedition"],
        notes: ["Can become more valuable together with Rare Monsters."],
        category: "Expedition Tablet",
        sources: [{ name: "PoE2DB Tablet modifiers", url: "https://poe2db.tw/us/Tablet", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "expedition-additional-azmeri",
        title: "Rare Expedition Monsters",
        description: "Finds increased numbers of Rare Expedition Monsters.",
        patterns: [{ value: '"re e"', sourceText: "25–35% increased number of Rare Expedition Monsters in Map" }],
        tags: ["rare monsters", "expedition"],
        notes: ["The previous Additional Azmeri label was removed because it is not a current Expedition-specific modifier."],
        category: "Expedition Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "expedition-superior-remnants",
        title: "Additional Verisium Remnant",
        description: "Finds Expeditions with a chance to contain an additional Verisium Remnant.",
        patterns: [{ value: '"nal ver"', sourceText: "Expeditions have 30–40% chance to contain an additional Verisium Remnant" }],
        tags: ["verisium remnants", "expedition"],
        notes: ["Can become highly valuable together with additional Runic modifier rolls."],
        category: "Expedition Tablet",
        sources: [{ name: "PoE2DB Tablet modifiers", url: "https://poe2db.tw/us/Tablet", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "expedition-runic-modifier",
        title: "Additional Runic Modifier",
        description: "Matches the current Verisium Remnant modifier that can add a Runic Modifier.",
        patterns: [{ value: '"additional runic mod"', sourceText: "Verisium Remnants have a chance to add an additional Runic Modifier" }],
        tags: ["runic modifier", "verisium remnants", "expedition"],
        notes: ["Can become extremely valuable with the relevant Remnant modifier."],
        variant: "high-value",
        category: "Expedition Tablet",
      }),
    ],
  },
  {
    slug: "delirium",
    path: "/tablets/delirium",
    title: "Delirium Tablet Regexes",
    navigationLabel: "Delirium",
    description: "Delirium searches for paired modifiers and focused tablet crafting.",
    group: "tablets",
    entries: [
      verified({
        id: "delirium-additional-circle",
        title: "Summoning Circle + Unique Bosses",
        description: "Requires both increased Summoning Circle chance and increased chance for Delirium Unique Bosses.",
        patterns: [
          { value: '"a s"', label: "Summoning Circle", sourceText: "Map has increased chance to contain a Summoning Circle" },
          { value: '"nco"', label: "Unique Bosses", sourceText: "Delirium Encounters in Map are more likely to spawn Unique Bosses" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"a s" "nco"',
        tags: ["summoning circle", "unique bosses", "delirium"],
        notes: ["The previous Additional Circle label was replaced with the current English modifier pair."],
        variant: "high-value",
        category: "Delirium Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "delirium-effectiveness-rare-monsters",
        title: "Effectiveness + Rare Monsters",
        description: "Requires both increased Effectiveness and increased Rare Monster quantity.",
        patterns: [
          { value: '"eness$"', label: "Effectiveness", sourceText: "Monsters have increased Effectiveness" },
          { value: '"f rare m"', label: "Rare Monsters", sourceText: "Map has increased number of Rare Monsters" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"eness$" "f rare m"',
        tags: ["effectiveness", "rare monsters", "delirium"],
        variant: "high-value",
        category: "Delirium Tablet",
      }),
      verified({
        id: "delirium-mirrors-stack-size",
        title: "Fracturing Mirrors + Stack Size",
        description: "Requires increased Fracturing Mirrors and increased Simulacrum Splinter stack size.",
        patterns: [
          { value: '"fra"', label: "Fracturing Mirrors", sourceText: "Delirium Fog spawns increased Fracturing Mirrors" },
          { value: '"tac"', label: "Stack Size", sourceText: "Increased Stack size of Simulacrum Splinters" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"fra" "tac"',
        tags: ["fracturing mirrors", "simulacrum splinters", "stack size", "delirium"],
        notes: ["For a desired two-mod Magic tablet, a Regal Orb can preserve the pair while adding one modifier."],
        variant: "high-value",
        category: "Delirium Tablet",
      }),
    ],
  },
  {
    slug: "breach",
    path: "/tablets/breach",
    title: "Breach Tablet Regexes",
    navigationLabel: "Breach",
    description: "Breach searches using the current Hiveblood and Wombgift terminology.",
    group: "tablets",
    entries: [
      verified({
        id: "breach-hiveblood-60",
        title: "Hiveblood 60%+",
        description: "Matches the maximum 60% Hiveblood quantity roll for players who want a strict single-mod search.",
        patterns: [{ value: '"60%.*eb"', sourceText: "60% increased Quantity of Hiveblood found in Map" }],
        tags: ["hiveblood", "60", "maximum", "breach"],
        notes: ["The current modifier range is 30–60%, so a 60% minimum selects the maximum integer roll."],
        variant: "high-value",
        category: "Breach Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "breach-wombgifts-50",
        title: "Wombgifts 50%+",
        description: "Matches Wombgift quantity rolls from 50% through the current 60% maximum.",
        patterns: [{ value: '"(5.|60)%.*ts f"', sourceText: "50–60% increased Quantity of Wombgifts found in Map" }],
        tags: ["wombgifts", "50", "minimum", "breach", "catalyst farm"],
        notes: ["The bounded numeric branch matches 50–59 or 60; the current modifier range is 30–60% and uses integer rolls."],
        variant: "high-value",
        category: "Breach Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "breach-hiveblood-wombgifts",
        title: "Hiveblood + Wombgift",
        description: "Matches Tablets containing both quantity modifiers, regardless of their numeric rolls.",
        patterns: [
          { value: '"eb"', label: "Hiveblood", sourceText: "Increased Quantity of Hiveblood found in Map" },
          { value: '"ts f"', label: "Wombgifts", sourceText: "Increased Quantity of Wombgifts found in Map" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"eb" "ts f"',
        combinedCopyLabel: "Copy Hiveblood + Wombgift",
        tags: ["hiveblood", "wombgifts", "breach", "catalyst farm", "any roll"],
        notes: ["Any positive roll qualifies for the transit farm. Higher is better, but do not overpay for high rolls."],
        variant: "high-value",
        category: "Breach Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "breach-hiveblood",
        title: "Hiveblood Found",
        description: "Single-mod search suitable for Magic tablet crafting.",
        patterns: [{ value: '"eb"', sourceText: "Increased Quantity of Hiveblood found in Map" }],
        tags: ["hiveblood", "breach", "magic tablet"],
        category: "Breach Tablet",
      }),
      verified({
        id: "breach-wombgifts",
        title: "Wombgifts Found",
        description: "Single-mod search suitable for Magic tablet crafting.",
        patterns: [{ value: '"ts f"', sourceText: "Increased Quantity of Wombgifts found in Map" }],
        tags: ["wombgifts", "breach", "magic tablet"],
        category: "Breach Tablet",
      }),
      verified({
        id: "breach-hiveblood-higher-wombgifts",
        title: "Hiveblood + Higher-Level Wombgifts",
        description: "Requires Hiveblood quantity and the chance for Wombgifts to drop one level higher.",
        patterns: [
          { value: '"eb"', label: "Hiveblood", sourceText: "Increased Quantity of Hiveblood found in Map" },
          { value: '"^w"', label: "Wombgift Level", sourceText: "Wombgifts have a chance to drop one Level higher" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"eb" "^w"',
        tags: ["hiveblood", "wombgifts", "item level", "breach"],
        notes: ["High rolls can be costly; compare the tablet against your own strategy before crafting."],
        variant: "high-value",
        category: "Breach Tablet",
      }),
      verified({
        id: "breach-unstable-rares",
        title: "Unstable Breaches: Additional Rare Monsters",
        description: "Finds additional Rare Monsters spawned when an Unstable Breach is stabilised.",
        patterns: [{ value: '"wh"', sourceText: "Unstable Breaches spawn additional Rare Monsters when Stabilised" }],
        tags: ["unstable breach", "rare monsters", "effectiveness", "hiveblood"],
        notes: ["Potential synergy with Effectiveness and Hiveblood modifiers."],
        category: "Breach Tablet",
      }),
    ],
  },
  {
    slug: "abyss",
    path: "/tablets/abyss",
    title: "Abyss Tablet Regexes",
    navigationLabel: "Abyss",
    description: "Verified searches for high-value Abyss Tablet modifiers and premium pairings.",
    group: "tablets",
    entries: [
      verified({
        id: "abyss-closed-pit-effectiveness",
        title: "Effectiveness per Closed Pit",
        description: "Finds the scaling Abyssal Monster Effectiveness modifier used in multi-Abyss setups.",
        patterns: [{ value: '"t,"', sourceText: "Abyssal Monsters have increased Effectiveness for each closed Pit, up to 100%" }],
        tags: ["abyss", "closed pit", "effectiveness", "jado"],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "abyss-four-additional",
        title: "Four Additional Abysses",
        description: "Finds the chance for a map to contain four additional Abysses.",
        patterns: [{ value: '"four"', sourceText: "Map has a chance to contain four additional Abysses" }],
        tags: ["abyss", "four additional", "additional abysses", "jado"],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "abyss-abyssal-modifiers",
        title: "Abyssal Monster Modifiers",
        description: "Finds increased chance for Abyssal monsters to have Abyssal Modifiers.",
        patterns: [{ value: '"ap t"', sourceText: "Increased chance for Abyssal monsters in Map to have Abyssal Modifiers" }],
        tags: ["abyss", "abyssal modifiers", "abyssal monsters", "jado"],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "abyss-increased-monsters",
        title: "Abysses Spawn Increased Monsters",
        description: "Finds increased monster spawns from Abysses in the map.",
        patterns: [{ value: '"n \\d+%"', sourceText: "Abysses in Map spawn increased Monsters" }],
        tags: ["abyss", "monsters", "spawn", "density"],
        category: "Abyss Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "abyss-jado-key-mods",
        title: "Jado Abyss Key Modifiers",
        description: "Matches any of the three Abyss-specific modifiers required across the four-Tablet setup.",
        patterns: [{ value: '"t,|four|ap t"', sourceText: "Closed-Pit Effectiveness OR four additional Abysses OR Abyssal Modifiers chance" }],
        tags: ["abyss", "jado", "required", "four additional", "closed pit", "abyssal modifiers"],
        notes: ["This is an OR search for sorting Tablets. It does not verify that the full four-Tablet setup has every required modifier."],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "PoE2DB Tablet modifiers", url: "https://poe2db.tw/Tablet", verifiedAt: "2026-09-26" }],
      }),
      verified({
        id: "abyss-jado-good-optional",
        title: "Jado Abyss Good Optional Modifiers",
        description: "Matches Pack Size, either Rarity modifier, Monster Effectiveness or increased monsters spawned by Abysses.",
        patterns: [{ value: '"ze i|rity|eness|awn.*m"', sourceText: "Pack Size OR Monster/Item Rarity OR Monster Effectiveness OR increased Abyss monster spawns" }],
        tags: ["abyss", "jado", "optional", "pack size", "rarity", "effectiveness", "monster spawns"],
        notes: ["Monster Effectiveness is useful here, but lower priority because this strategy already stacks substantial Effectiveness."],
        category: "Abyss Tablet",
        sources: [{ name: "PoE2DB Tablet modifiers", url: "https://poe2db.tw/Tablet", verifiedAt: "2026-09-26" }],
      }),
      verified({
        id: "abyss-jado-strong-tablet",
        title: "Jado Abyss Strong Tablet",
        description: "Requires the +2 random-modifier roll and at least one useful density, rarity or Effectiveness modifier on the same Tablet.",
        patterns: [
          { value: '"2 additional r"', label: "+2 Modifiers", sourceText: "Map has 2 additional random Modifiers" },
          { value: '"rare m|ze i|rity|eness|awn.*m"', label: "Useful modifier", sourceText: "Rare Monsters, Pack Size, Monster/Item Rarity, Effectiveness or increased Abyss monster spawns" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"2 additional r" "rare m|ze i|rity|eness|awn.*m"',
        tags: ["abyss", "jado", "two random modifiers", "strong tablet", "density", "rarity"],
        notes: ["Convenience filter for one strong Tablet only. It does not validate the complete four-Tablet setup."],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "PoE2DB Tablet modifiers", url: "https://poe2db.tw/Tablet", verifiedAt: "2026-09-26" }],
      }),
      verified({
        id: "abyss-four-additional-two-random",
        title: "Four Abysses + Two Random Modifiers",
        description: "Premium pairing for Tablets with four additional Abysses and the top +2 random-modifier roll.",
        patterns: [
          { value: '"four"', label: "Four Abysses", sourceText: "Map has a chance to contain four additional Abysses" },
          { value: '"2 additional random"', label: "+2 Modifiers", sourceText: "Map has 2 additional random Modifiers" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"four" "2 additional random"',
        tags: ["abyss", "four additional", "two random modifiers", "jado", "premium"],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "abyss-closed-pit-two-random",
        title: "Closed-Pit Effectiveness + Two Random Modifiers",
        description: "Premium pairing for the closed-Pit Effectiveness modifier and the top +2 random-modifier roll.",
        patterns: [
          { value: '"t,"', label: "Closed-Pit Effectiveness", sourceText: "Abyssal Monsters have increased Effectiveness for each closed Pit, up to 100%" },
          { value: '"2 additional random"', label: "+2 Modifiers", sourceText: "Map has 2 additional random Modifiers" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"t," "2 additional random"',
        tags: ["abyss", "closed pit", "effectiveness", "two random modifiers", "jado", "premium"],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
      verified({
        id: "abyss-abyssal-modifiers-two-random",
        title: "Abyssal Modifiers + Two Random Modifiers",
        description: "Premium pairing for Abyssal Modifiers and the top +2 random-modifier roll.",
        patterns: [
          { value: '"ap t"', label: "Abyssal Modifiers", sourceText: "Increased chance for Abyssal monsters in Map to have Abyssal Modifiers" },
          { value: '"2 additional random"', label: "+2 Modifiers", sourceText: "Map has 2 additional random Modifiers" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"ap t" "2 additional random"',
        tags: ["abyss", "abyssal modifiers", "two random modifiers", "jado", "premium"],
        variant: "high-value",
        category: "Abyss Tablet",
        sources: [{ name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" }],
      }),
    ],
  },
  {
    slug: "temple",
    path: "/tablets/temple",
    title: "Temple Tablet Regexes",
    navigationLabel: "Temple",
    description: "Focused searches for Temple and Vaal Beacon tablet modifiers.",
    group: "tablets",
    entries: [
      verified({
        id: "temple-additional-crystal",
        title: "Additional Crystal",
        description: "Finds the chance to gain an additional Crystal from Vaal Beacons.",
        patterns: [{ value: '"o g"', sourceText: "Chance to gain an additional Crystal from Vaal Beacons" }],
        tags: ["crystal", "vaal beacons", "temple"],
        variant: "high-value",
        category: "Temple Tablet",
      }),
    ],
  },
];

export const getRegexSection = (slug: string) =>
  regexSections.find((section) => section.slug === slug);

export const getRegexEntry = (id: string) =>
  regexSections.flatMap((section) => section.entries).find((entry) => entry.id === id);

export const getSectionCount = (section: RegexSection) => section.entries.length;

export const tabletSections = regexSections.filter((section) => section.group === "tablets");

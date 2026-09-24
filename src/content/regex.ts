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
        id: "breach-hiveblood-wombgifts",
        title: "Hiveblood + Wombgifts Found",
        description: "Both quantity modifiers are required on the same tablet.",
        patterns: [
          { value: '"eb"', label: "Hiveblood", sourceText: "Increased Quantity of Hiveblood found in Map" },
          { value: '"ts f"', label: "Wombgifts", sourceText: "Increased Quantity of Wombgifts found in Map" },
        ],
        requireAllPatterns: true,
        combinedPattern: '"eb" "ts f"',
        tags: ["hiveblood", "wombgifts", "breach"],
        notes: ["On a Magic tablet with both modifiers, a Regal Orb can add one modifier while preserving the pair."],
        variant: "high-value",
        category: "Breach Tablet",
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
    description: "Confirmed English-client Abyss patterns will appear here as they are verified.",
    group: "tablets",
    entries: [],
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

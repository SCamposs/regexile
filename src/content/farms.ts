import { GAME_VERSION } from "@/src/config/game";

export type FarmStep = {
  id: string;
  label: string;
};

export type FarmSource = {
  name: string;
  url: string;
  verifiedAt: string;
};

export type FarmRegexGroup = {
  label: string;
  entryIds: string[];
};

export type FarmChecklistItem = {
  id: string;
  label: string;
  detail?: string;
};

export type FarmSection =
  | {
      type: "summary";
      title: string;
      description?: string;
      items: { label: string; value: string; tone?: "default" | "value" | "warning" }[];
    }
  | {
      type: "checklists";
      title: string;
      description?: string;
      columns: { title: string; tone: "required" | "recommended"; items: FarmChecklistItem[] }[];
    }
  | {
      type: "callout";
      tone: "gold" | "danger" | "neutral";
      eyebrow?: string;
      title: string;
      paragraphs: string[];
      sequence?: string[];
    }
  | {
      type: "tablets";
      title: string;
      description: string;
      status?: string;
      requirements: {
        id: string;
        count: string;
        label: string;
        range: string;
        recommendation: string;
        purpose: string;
      }[];
      note?: string;
      extras?: { title: string; items: string[] };
    }
  | {
      type: "ranked";
      title: string;
      description: string;
      items: { rank: number; label: string; reason: string }[];
      extras?: { title: string; items: string[]; note?: string };
    }
  | {
      type: "cards";
      title: string;
      description?: string;
      items: { label: string; detail: string; tone?: "value" | "warning" | "neutral" }[];
    }
  | {
      type: "tree";
      title: string;
      description: string;
      treeId: string;
      warning: string;
      nodes: { id: string; name: string; priority: "required" | "recommended"; note: string }[];
    }
  | {
      type: "regex";
      title: string;
      description: string;
      groups: FarmRegexGroup[];
    }
  | {
      type: "rewards";
      title: string;
      description: string;
      items: string[];
      note?: string;
    }
  | {
      type: "tags";
      title: string;
      description?: string;
      items: string[];
    }
  | {
      type: "links";
      title: string;
      description?: string;
      links: { label: string; url: string; note?: string }[];
    }
  | {
      type: "notes";
      title: string;
      items: string[];
    };

export type FarmGuide = {
  id: string;
  slug: string;
  path: string;
  navigationLabel: string;
  title: string;
  mechanic: string;
  gameVersion: string;
  description: string;
  difficulty: string;
  investment: string;
  flow: FarmStep[];
  sections: FarmSection[];
  sources: FarmSource[];
};

const ritualSources: FarmSource[] = [
  { name: "Path of Exile 2 Wiki: Ritual", url: "https://www.poe2wiki.net/wiki/Ritual", verifiedAt: "2026-09-24" },
  { name: "Path of Exile 2 Wiki: Freedom of Faith", url: "https://www.poe2wiki.net/wiki/Freedom_of_Faith", verifiedAt: "2026-09-24" },
  { name: "Path of Exile 2 Wiki: Head of the King", url: "https://www.poe2wiki.net/wiki/Head_of_the_King", verifiedAt: "2026-09-24" },
  { name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" },
];

const catalystSources: FarmSource[] = [
  { name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" },
  { name: "poe2.re Tablet generator", url: "https://github.com/veiset/poe.re/blob/master/poe2/src/pages/tablet/TabletResult.ts", verifiedAt: "2026-09-24" },
  { name: "poe2.re Waystone generator", url: "https://github.com/veiset/poe.re/blob/master/poe2/src/pages/waystone/WaystoneResult.ts", verifiedAt: "2026-09-24" },
  { name: "PoE2DB: The Genesis Tree", url: "https://poe2db.tw/us/The_Genesis_Tree", verifiedAt: "2026-09-24" },
  { name: "RePoE: Brequel Tree data", url: "https://repoe-fork.github.io/poe2/passive_skill_trees/BrequelTree.json", verifiedAt: "2026-09-24" },
  { name: "Path of Exile 2 Wiki: The Genesis Tree", url: "https://www.poe2wiki.net/wiki/The_Genesis_Tree", verifiedAt: "2026-09-24" },
  { name: "PoE2DB: Catalysts", url: "https://poe2db.tw/us/Catalysts", verifiedAt: "2026-09-24" },
  { name: "poe.ninja: PoE2 Catalysts", url: "https://poe.ninja/poe2/economy/forbiddenrites/breach-catalyst", verifiedAt: "2026-09-24" },
];

export const farmGuides: FarmGuide[] = [
  {
    id: "farm-ritual-head-of-the-king",
    slug: "ritual",
    path: "/farms/ritual",
    navigationLabel: "Ritual",
    title: "Ritual — Head of the King Omen Farm",
    mechanic: "Ritual",
    gameVersion: GAME_VERSION,
    description: "High-reroll Ritual farming using the Rite of the Nameless, City maps, Freedom of Faith, Omen-focused Tablets and aggressive Favour rerolling.",
    difficulty: "High",
    investment: "High",
    flow: [
      { id: "waystone", label: "Prepare Waystone" },
      { id: "tablets", label: "Check Tablets" },
      { id: "start", label: "Start Head of the King" },
      { id: "route", label: "Order Proliferations" },
      { id: "boss", label: "Boss Ritual First" },
      { id: "remaining", label: "Remaining Rituals" },
      { id: "reroll", label: "Reroll Favours" },
      { id: "defer", label: "Defer Value" },
      { id: "next", label: "Next Rite Map" },
    ],
    sections: [
      {
        type: "checklists",
        title: "Preparation",
        description: "Build requirements and recommended Waystone targets.",
        columns: [
          {
            title: "Mandatory",
            tone: "required",
            items: [
              { id: "head", label: "Head of the King", detail: "Use it at Caer Tarth to begin the Rite of the Nameless." },
              { id: "freedom", label: "Freedom of Faith", detail: "The unique Ritual Tablet doubles the available Favour rerolls." },
              { id: "city", label: "City map coverage", detail: "Keep the selected maps inside City areas so the complete Tablet setup applies." },
              { id: "tier", label: "Tier 15+ Waystones", detail: "Use Tier 15 Waystones or better for the documented setup." },
              { id: "build", label: "Juiced Ritual clear", detail: "The character must comfortably clear dense Ritual encounters." },
            ],
          },
          {
            title: "Recommended Waystone",
            tone: "recommended",
            items: [
              { id: "pack", label: "25%+ Pack Size", detail: "A recommended density target, not a hard game requirement." },
              { id: "rarity", label: "25%+ Monster Rarity", detail: "Raises the chance for Magic and Rare monsters, which grant more Tribute." },
            ],
          },
        ],
      },
      {
        type: "callout",
        tone: "gold",
        title: "Why Freedom of Faith is core",
        paragraphs: [
          "Can Reroll Favours at Ritual Altars in your Maps twice as many times. Its increased Tribute cost is accepted because the setup builds Tribute and reduces Defer and Reroll costs.",
          "Each Ritual completed during the Rite adds another reroll to future Rituals in the chain. Additional-reroll Tablets and Freedom of Faith multiply that snowball.",
        ],
      },
      {
        type: "tablets",
        title: "Tablet coverage",
        description: "Distribute these modifiers across rare Ritual Tablets in any combination.",
        status: "Freedom of Faith + required coverage",
        requirements: [
          { id: "omens", count: "2×", label: "Omen chance", range: "35–70% increased chance", recommendation: "Best: 70%", purpose: "Increases the share of Ritual Favours that are Omens." },
          { id: "defer", count: "2×", label: "Reduced Defer cost", range: "20–30% reduced Tribute", recommendation: "Best: 30%", purpose: "Keeps valuable Favours in the deferred pool at a lower Tribute cost." },
          { id: "reroll-cost", count: "1×", label: "Reduced Reroll cost", range: "20–30% reduced Tribute", recommendation: "Best: 30%", purpose: "Lets the Tribute pool fund more Favour rerolls." },
          { id: "rerolls", count: "1×", label: "Additional rerolls", range: "1–3 additional times", recommendation: "Best: +3", purpose: "Adds rerolls before Freedom of Faith doubles the available count." },
        ],
        note: "Modifiers may overlap on the same Tablet. Divine Orbs can improve numeric rolls when the cost makes sense, but they are not automatically economical.",
        extras: { title: "Optional secondary rolls", items: ["Increased Tribute from sacrificed monsters", "Increased number of Rare Monsters", "Increased chance for revived Ritual monsters to be Rare or Magic", "Other density or Tribute modifiers"] },
      },
      {
        type: "ranked",
        title: "Route priority",
        description: "Complete strong Foretold Proliferations early so later Rite maps inherit them.",
        items: [
          { rank: 1, label: "Ritual Altars offer 20% increased number of Favours", reason: "More choices apply to every remaining map after this Proliferation is completed." },
          { rank: 2, label: "Monsters Sacrificed at Ritual Altars grant 25% increased Tribute", reason: "Builds the Tribute pool that funds rerolls and defers in later maps." },
          { rank: 3, label: "Rituals contain 1 additional pack of Wildwood Monsters", reason: "Adds density and another source of Tribute to subsequent maps." },
        ],
        extras: { title: "Also useful", items: ["Reduced reroll cost", "Additional Favour rerolls", "First reroll costs no Tribute", "Explicit high-value Foretold Bounties"], note: "Evaluate explicit high-value Omens or Uniques separately." },
      },
      {
        type: "callout",
        tone: "danger",
        eyebrow: "Required run rule",
        title: "Boss Ritual first",
        paragraphs: ["Rush the map boss, kill it and complete the boss-room Ritual before any other altar. If a Summoning Circle Ritual is present, do it next. Then complete the remaining Rituals."],
        sequence: ["Boss Ritual", "Summoning Circle if present", "Remaining Rituals"],
      },
      {
        type: "cards",
        title: "During each Ritual",
        description: "Protect the reroll budget first, then spend the surplus on optional re-defers.",
        items: [
          { label: "First appearance", detail: "Defer items worth about 1 Chaos Orb or more. Expensive items always take priority.", tone: "neutral" },
          { label: "High-value item", detail: "Defer immediately. Re-defer when affordable, but preserve the Tribute needed for all remaining rerolls.", tone: "value" },
          { label: "Red-border warning", detail: "Re-defer if you want to keep the item in the deferred pool.", tone: "warning" },
          { label: "Tribute abundant", detail: "Once every remaining reroll is safely funded, become increasingly aggressive with worthwhile Favours.", tone: "value" },
        ],
      },
      {
        type: "cards",
        title: "Mechanics notes",
        description: "Why the recommended Waystone stats matter.",
        items: [
          { label: "Monster Rarity", detail: "More Monster Rarity increases the chance for Magic and Rare monsters, which contribute more Tribute." },
          { label: "Pack Size", detail: "More monsters around Ritual circles increases the pool available to be sacrificed and revived." },
        ],
      },
      {
        type: "regex",
        title: "Regex for this farm",
        description: "Shared Regexile entries with the same copy controls used throughout the app.",
        groups: [
          { label: "Waystones", entryIds: ["maps-pack-size", "maps-monster-rarity"] },
          { label: "Ritual Tablets", entryIds: ["ritual-omen-chance", "ritual-reroll-favours", "ritual-reduced-defer-cost", "ritual-reduced-reroll-cost"] },
          { label: "Optional Tablet rolls", entryIds: ["ritual-increased-tribute", "ritual-rare-monsters"] },
        ],
      },
      {
        type: "notes",
        title: "Operational notes",
        items: [
          "Mageblood, Headhunter and other jackpot Favours are possible outcomes, not guaranteed profit.",
          "Rare Tablet modifiers may overlap on the same Tablet. Required coverage matters more than one prescribed four-item combination.",
          "This version does not require a separate cashout map.",
        ],
      },
    ],
    sources: ritualSources,
  },
  {
    id: "farm-catalyst-hiveblood-wombgift",
    slug: "catalyst",
    path: "/farms/catalyst",
    navigationLabel: "Catalyst",
    title: "Catalyst Farm — Hiveblood + Wombgift",
    mechanic: "Breach / Genesis Tree",
    gameVersion: GAME_VERSION,
    description: "High-investment City strategy that stacks Hiveblood and Wombgift quantity across four Tablets and uses the Catalyst-focused Currency Womb tree.",
    difficulty: "High",
    investment: "High",
    flow: [
      { id: "city", label: "Select City" },
      { id: "tree", label: "Verify Genesis Tree" },
      { id: "tablets", label: "Insert 4 Tablets" },
      { id: "waystone", label: "T15/T16 · 0 Revives" },
      { id: "run", label: "Run Map" },
      { id: "breach", label: "Complete Breach Content" },
      { id: "collect", label: "Collect Catalysts" },
      { id: "check", label: "Price-check" },
      { id: "repeat", label: "Repeat" },
    ],
    sections: [
      {
        type: "summary",
        title: "Setup",
        description: "The complete expensive setup at a glance.",
        items: [
          { label: "Location", value: "City" },
          { label: "Waystone", value: "T15 / T16 · 0 Revives", tone: "warning" },
          { label: "Tablets", value: "4× Hiveblood + Wombgift" },
          { label: "Hiveblood", value: "60%+ each", tone: "value" },
          { label: "Wombgift", value: "50%+ each", tone: "value" },
          { label: "Tree", value: "Currency Womb · Catalyst setup", tone: "warning" },
          { label: "Primary reward", value: "Catalysts", tone: "value" },
        ],
      },
      {
        type: "checklists",
        title: "Pre-run checklist",
        description: "Confirm every part before consuming the expensive setup.",
        columns: [
          {
            title: "Core setup",
            tone: "required",
            items: [
              { id: "city", label: "City selected" },
              { id: "slots", label: "Four Tablet slots available" },
              { id: "tree", label: "Correct Catalyst Currency Womb tree active" },
              { id: "waystone", label: "T15 or T16 Waystone with 0 Revives" },
              { id: "inserted", label: "Four farming Tablets inserted" },
            ],
          },
          {
            title: "Every Tablet",
            tone: "recommended",
            items: [1, 2, 3, 4].map((tablet) => ({ id: `tablet-${tablet}`, label: `Tablet ${tablet}`, detail: "Hiveblood >= 60% and Wombgifts >= 50%" })),
          },
        ],
      },
      {
        type: "tablets",
        title: "Tablet requirements",
        description: "For the high-investment version, both recommended thresholds belong on each of all four Tablets.",
        status: "4 Tablets · both modifiers on every Tablet",
        requirements: [
          { id: "hiveblood", count: "4×", label: "Hiveblood quantity", range: "Current roll range: 30–60%", recommendation: "Recommended minimum: 60%", purpose: "Stack increased Quantity of Hiveblood found in Map across all four slots." },
          { id: "wombgifts", count: "4×", label: "Wombgift quantity", range: "Current roll range: 30–60%", recommendation: "Recommended minimum: 50%", purpose: "Stack increased Quantity of Wombgifts found in Map across all four slots." },
        ],
        note: "These are recommended minimums for this expensive version, not hard game requirements. Rare Tablet numeric rolls may be improved with Divine Orbs when appropriate, but Divining is not always profitable.",
      },
      {
        type: "regex",
        title: "Regex for this farm",
        description: "Copy the two thresholds separately or use the primary AND query to require both on the same Tablet.",
        groups: [
          { label: "Primary Tablet search", entryIds: ["breach-hiveblood-60-wombgifts-50"] },
          { label: "Individual thresholds", entryIds: ["breach-hiveblood-60", "breach-wombgifts-50"] },
          { label: "Waystone quality of life", entryIds: ["maps-zero-revives"] },
        ],
      },
      {
        type: "callout",
        tone: "danger",
        eyebrow: "Critical setup dependency",
        title: "Correct Catalyst tree allocation is required",
        paragraphs: ["The intended version of this farm depends on the Catalyst path in the Genesis Tree Currency Womb. Do not consume the Lavish Wombgifts with a generic currency allocation active."],
      },
      {
        type: "tree",
        title: "Required Genesis Tree setup",
        description: "The verified Currency Womb path and Catalyst-specific branches. Connecting nodes are included so the setup remains actionable without a full tree renderer.",
        treeId: "BrequelTreeCurrency",
        warning: "Complete Refinement is the core conversion node. Enhanced Creation is reached through Jewel Catalyst Chance.",
        nodes: [
          { id: "BrequelTreeCurrency11", name: "Additional Item Chance", priority: "required", note: "Connecting node from the Currency Womb start into the Catalyst branch; grants 20% Surpassing chance to birth an additional item." },
          { id: "BrequelTreeCurrency32-33-40-43", name: "Catalyst Chance ×4", priority: "required", note: "Each node grants 15% chance for birthed Currency to be a Catalyst and forms the path to Complete Refinement." },
          { id: "BrequelTreeCurrency45", name: "Complete Refinement", priority: "required", note: "Can only Birth Catalysts." },
          { id: "BrequelTreeCurrency48", name: "Jewel Catalyst Chance", priority: "recommended", note: "Grants 4% chance for birthed Catalysts to be Jewel Catalysts and connects to Enhanced Creation." },
          { id: "BrequelTreeCurrency49_", name: "Enhanced Creation", priority: "recommended", note: "Grants 10% chance for birthed Catalysts to be Jewel Catalysts." },
          { id: "BrequelTreeCurrency34-36-38-44-47", name: "Additional Duplicate Catalyst Chance", priority: "recommended", note: "Each allocated branch node grants 30% Surpassing chance to birth an additional Catalyst of the same type." },
          { id: "BrequelTreeCurrency41-42", name: "Additional Different Catalyst Chance", priority: "recommended", note: "Each node grants 30% Surpassing chance to birth an additional Catalyst of a different type." },
        ],
      },
      {
        type: "checklists",
        title: "Waystone requirements",
        description: "The power comes from the City, four Tablets and the correct tree—not from specific Waystone affixes.",
        columns: [
          { title: "Mandatory", tone: "required", items: [{ id: "tier", label: "Tier 15 or Tier 16" }, { id: "revives", label: "0 Revives", detail: "Use the shared positive search for Remaining Revives: 0." }] },
          { title: "No specific modifiers required", tone: "recommended", items: [{ id: "simple", label: "Any other affix combination is acceptable", detail: "Choose a map your build can complete reliably." }] },
        ],
      },
      {
        type: "rewards",
        title: "Catalysts to watch",
        description: "Examples worth price-checking. This is not a fixed ranking and contains no stored prices.",
        items: [
          "Refined Sibilant Catalyst", "Refined Reaver Catalyst", "Refined Necrotic Catalyst", "Sibilant Catalyst",
          "Reaver Catalyst", "Skittering Catalyst", "Refined Xoph's Catalyst", "Refined Tul's Catalyst",
          "Refined Carapace Catalyst", "Refined Skittering Catalyst", "Refined Esh's Catalyst", "Refined Uul-Netol's Catalyst",
          "Refined Flesh Catalyst", "Refined Adaptive Catalyst", "Refined Chayula's Catalyst", "Refined Neural Catalyst",
        ],
        note: "Breachstone can appear in the same economy view, but it is not a Catalyst.",
      },
      {
        type: "links",
        title: "Current market reference",
        description: "Use a live external view instead of freezing league prices inside Regexile.",
        links: [{ label: "Check current Catalyst prices", url: "https://poe.ninja/poe2/economy/forbiddenrites/breach-catalyst", note: "poe.ninja · current PoE2 Catalyst category" }],
      },
      {
        type: "tags",
        title: "Not required",
        description: "Do not overcomplicate this setup with requirements from other farms.",
        items: ["25% Pack Size", "25% Monster Rarity", "Specific Item Rarity", "Effectiveness", "Tribute generation", "Ritual modifiers", "Dedicated cashout setup", "Specific Waystone affix combinations"],
      },
      {
        type: "notes",
        title: "Operational notes",
        items: [
          "City access is core because this setup relies on four simultaneous Tablet slots.",
          "The exact Tablet market cost changes throughout the league; no fixed purchase price is part of this guide.",
          "The guide intentionally documents setup and execution without profitability claims or personal test history.",
        ],
      },
    ],
    sources: catalystSources,
  },
];

export const getFarmGuide = (slug: string) => farmGuides.find((guide) => guide.slug === slug);

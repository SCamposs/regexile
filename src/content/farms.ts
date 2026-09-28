import { GAME_VERSION } from "@/src/config/game";
import { gameAssets, mechanicIcons, type GameAsset } from "@/src/content/game-assets";

export type { GameAsset } from "@/src/content/game-assets";

export type FarmStep = {
  id: string;
  label: string;
};

export type FarmSource = {
  name: string;
  url: string;
  verifiedAt: string;
};

export type FarmType = "city" | "transit" | "map-spam" | "mechanic" | "boss";

export type FarmRegexGroup = {
  label: string;
  entryIds: string[];
};

export type FarmChecklistItem = {
  id: string;
  label: string;
  detail?: string;
  asset?: GameAsset;
};

export type FarmMasterNode = {
  id: string;
  name: string;
  summary: string;
  asset: GameAsset;
};

export type FarmSection =
  | {
      type: "master";
      title: string;
      description?: string;
      name: string;
      portrait: GameAsset;
      required: FarmMasterNode[];
      optional?: FarmMasterNode[];
    }
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
      asset?: GameAsset;
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
      asset?: GameAsset;
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
      asset?: GameAsset;
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
      asset?: GameAsset;
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
      links: { label: string; url: string; note?: string; external?: boolean }[];
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
  difficulty?: string;
  investment?: string;
  farmTypes: FarmType[];
  artwork: GameAsset;
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

const fracturedOrbSources: FarmSource[] = [
  { name: "PoE2DB: Masters of the Atlas", url: "https://poe2db.tw/Masters_of_the_Atlas", verifiedAt: "2026-09-27" },
  { name: "Path of Exile 2 Wiki: Doryani", url: "https://www.poe2wiki.net/wiki/Doryani", verifiedAt: "2026-09-27" },
  { name: "Path of Exile 2 Wiki: Cleansed", url: "https://www.poe2wiki.net/wiki/Cleansed", verifiedAt: "2026-09-27" },
  { name: "Path of Exile 2 Wiki: Corrupted Nexus", url: "https://www.poe2wiki.net/wiki/Corrupted_Nexus", verifiedAt: "2026-09-27" },
  { name: "Path of Exile 2 Wiki: Viridian Wildwood", url: "https://www.poe2wiki.net/wiki/The_Viridian_Wildwood", verifiedAt: "2026-09-27" },
  { name: "PoE2DB: Version 0.5.5", url: "https://poe2db.tw/us/Version_0.5.5", verifiedAt: "2026-09-27" },
  { name: "PoE2DB: Fracturing Orb", url: "https://poe2db.tw/us/Fracturing_Orb", verifiedAt: "2026-09-27" },
  { name: "PoE2DB: Sacred Bloom", url: "https://poe2db.tw/us/Sacred_Bloom", verifiedAt: "2026-09-27" },
  { name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-27" },
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
    description: "City-based Rite of the Nameless farming with 100% reduced Deferral Cost, doubled rerolls, high Omen chance and Cryptic Key support.",
    difficulty: "High",
    farmTypes: ["city", "mechanic"],
    artwork: gameAssets.headOfTheKing,
    flow: [
      { id: "waystone", label: "Prepare Waystone" },
      { id: "tablets", label: "Confirm 4-Tablet Setup" },
      { id: "deferral", label: "Reach 100% Deferral" },
      { id: "start", label: "Start Head of the King" },
      { id: "route", label: "Order Proliferations" },
      { id: "boss", label: "Boss Ritual First" },
      { id: "remaining", label: "Remaining Rituals" },
      { id: "reroll", label: "Reroll Aggressively" },
      { id: "defer", label: "Defer Freely" },
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
              { id: "head", label: "Head of the King", detail: "Bring it to Caer Tarth to begin the Rite of the Nameless.", asset: gameAssets.headOfTheKing },
              { id: "freedom", label: "Freedom of Faith", detail: "Use it as the unique fourth Tablet role to double the available Favour rerolls.", asset: gameAssets.freedomOfFaith },
              { id: "city", label: "City · four-Tablet coverage", detail: "Use City maps so all four Tablet roles affect the route." },
              { id: "tier", label: "Tier 15+ Waystones", detail: "Use Tier 15 Waystones or better for the documented setup.", asset: gameAssets.waystoneTier15 },
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
        title: "Head of the King starts the Rite; Freedom of Faith doubles rerolls",
        paragraphs: [
          "Head of the King is the key used at Caer Tarth to begin the Rite of the Nameless. It is not the source of the reroll multiplier.",
          "Freedom of Faith doubles the available Favour rerolls after additional-reroll effects are applied. Its increased Favour cost is offset by free deferral and a larger reroll pool.",
        ],
      },
      {
        type: "tablets",
        title: "Tablet coverage",
        description: "Use three rare Ritual Tablets plus Freedom of Faith across the four City slots.",
        status: "4 slots · target 100% reduced Deferral Cost",
        asset: gameAssets.ritualTablet,
        requirements: [
          { id: "rerolls-deferral", count: "1×", label: "Rerolls + Deferral", range: "+1–3 rerolls · 20–30% reduced Deferral", recommendation: "Core rare Tablet", purpose: "Builds the reroll pool while contributing to the 100% reduced Deferral Cost target." },
          { id: "omens-deferral", count: "1×", label: "Omen Chance + Deferral", range: "35–70% Omen chance · 20–30% reduced Deferral", recommendation: "High Omen roll", purpose: "Adds another Deferral roll and keeps high-value Omens prominent in the Favour pool." },
          { id: "reroll-economy", count: "1×", label: "Reroll economy", range: "20–30% reduced reroll cost · +1–3 rerolls", recommendation: "Complete the 100% target", purpose: "Use Reduced Deferral as the third suffix when the setup still needs it; otherwise prefer Omen Chance on the remaining available roll." },
          { id: "freedom", count: "1×", label: "Freedom of Faith", range: "Unique Ritual Tablet", recommendation: "Doubles rerolls", purpose: "Multiplies the rerolls added by the rare Tablets and the Rite sequence." },
        ],
        note: "Check the final combined Deferral value after Tablet-effect scaling and only treat deferral as free when it reaches 100%. Divine Orbs reroll numeric values inside an existing modifier range; they do not change the modifier or its tier.",
        extras: { title: "High-roll optimization", items: ["Aim toward 60–70% Omen Chance when the correct modifier is already present", "Prioritize maximum Deferral rolls until the final map total reaches 100%", "Improve reroll count and reduced reroll cost after the Deferral target is secure"] },
      },
      {
        type: "ranked",
        title: "Route priority",
        description: "Complete strong Foretold Proliferations early so later Rite maps inherit them.",
        items: [
          { rank: 1, label: "Ritual Altars offer 20% increased number of Favours", reason: "More choices apply to every remaining map after this Proliferation is completed." },
          { rank: 2, label: "Monsters Sacrificed at Ritual Altars grant 25% increased Tribute", reason: "Builds the Tribute pool that funds rerolls and eventual purchases in later maps." },
          { rank: 3, label: "Rituals contain 1 additional pack of Wildwood Monsters", reason: "Adds density and another source of Tribute to subsequent maps." },
        ],
        extras: { title: "Also useful", items: ["Reduced reroll cost", "Additional Favour rerolls", "First reroll costs no Tribute", "Explicit high-value Foretold Bounties"], note: "Evaluate explicit high-value Omens or Uniques separately." },
      },
      {
        type: "callout",
        tone: "gold",
        eyebrow: "Required run rule",
        title: "Boss Ritual first",
        paragraphs: ["Rush the map boss, kill it and complete the boss-room Ritual before any other altar. If a Summoning Circle Ritual is present, do it next. Then complete the remaining Rituals."],
        sequence: ["Boss Ritual", "Summoning Circle if present", "Remaining Rituals"],
      },
      {
        type: "cards",
        title: "100% Deferral execution",
        description: "At the verified 100% cap, deferring and re-deferring Favours costs no Tribute.",
        items: [
          { label: "Defer valuable Favours freely", detail: "Keep valuable Omens and premium Uniques in the deferred pool without reserving Tribute for the deferral action.", tone: "value" },
          { label: "Reroll aggressively", detail: "Use Tribute for the expanded reroll pool instead of holding it back for repeated deferral costs.", tone: "value" },
          { label: "Buy when appropriate", detail: "Delay purchases until later Ritual windows when that preserves more rerolls or improves the route's options.", tone: "neutral" },
          { label: "Red-border warning", detail: "Re-defer an item before it leaves the deferred pool. At 100% reduced Deferral Cost, this still costs no Tribute.", tone: "warning" },
        ],
      },
      {
        type: "master",
        title: "Atlas Master",
        description: "Jado adds the Cryptic Key layer and can strengthen the Tablet modifiers used by the setup.",
        name: "Jado",
        portrait: gameAssets.jado,
        required: [
          { id: "mysterious-gifts", name: "Mysterious Gifts", summary: "Rare Strongbox Monsters have a 5% chance and Unique Monsters have a 1% chance to drop a Cryptic Key.", asset: gameAssets.jadoMysteriousGifts },
        ],
        optional: [
          { id: "partial-translations", name: "Partial Translations", summary: "Randomly grants 0–40% increased effect of explicit modifiers on Tablets, helping strong Deferral rolls reach the final target.", asset: gameAssets.jadoPartialTranslation },
          { id: "trove-seekers", name: "Trove Seekers", summary: "Increases Rare Chest quantity and doubles the chance for Strongboxes to be Unique.", asset: gameAssets.jadoTroveSeekers },
        ],
      },
      {
        type: "checklists",
        title: "Atlas scaling",
        description: "Add Strongboxes without replacing the density that already powers Ritual Tribute.",
        columns: [
          {
            title: "Strongbox layer",
            tone: "recommended",
            items: [
              { id: "strongbox-chance", label: "Strongbox chance", detail: "Allocate general Strongbox chance on the Atlas, especially along routes containing Powerful Bosses." },
              { id: "cryptic-keys", label: "Cryptic Keys", detail: "Mysterious Gifts lets Rare Strongbox Monsters and Unique Monsters generate Cryptic Keys as variable secondary drops.", asset: gameAssets.jadoMysteriousGifts },
            ],
          },
          {
            title: "Ritual density",
            tone: "recommended",
            items: [
              { id: "pack-size", label: "General Pack Size", detail: "Keeps more monsters available to be sacrificed and revived." },
              { id: "magic-density", label: "Magic Monster density", detail: "Adds stronger monster packs and more Tribute potential." },
              { id: "rare-density", label: "Rare Monster density", detail: "Preserves the high-value monster scaling already used by the farm." },
            ],
          },
        ],
      },
      {
        type: "cards",
        title: "Mechanics notes",
        description: "Why the recommended Waystone stats matter.",
        items: [
          { label: "Monster Rarity", detail: "More Monster Rarity increases the chance for Magic and Rare monsters, which contribute more Tribute." },
          { label: "Pack Size", detail: "More monsters around Ritual circles increases the pool available to be sacrificed and revived." },
          { label: "Magic and Rare density", detail: "Atlas density remains part of the core Ritual scaling; Strongboxes are an additional layer, not a replacement." },
        ],
      },
      {
        type: "regex",
        title: "Regex for this farm",
        description: "The Waystone search preserves both 25%+ targets. Combined Tablet searches match the three rare Tablet roles.",
        groups: [
          { label: "Waystone · both recommended thresholds", entryIds: ["maps-ritual-pack-size-monster-rarity-25"] },
          { label: "Core Tablet roles", entryIds: ["ritual-rerolls-deferral", "ritual-omen-deferral", "ritual-reroll-economy"] },
          { label: "Individual Ritual modifiers", entryIds: ["ritual-omen-chance", "ritual-reroll-favours", "ritual-reduced-defer-cost", "ritual-reduced-reroll-cost"] },
          { label: "Optional Tablet rolls", entryIds: ["ritual-increased-tribute", "ritual-rare-monsters"] },
        ],
      },
      {
        type: "notes",
        title: "Operational notes",
        items: [
          "Confirm the displayed Deferral reduction reaches 100% before following the free-deferral execution rules.",
          "Head of the King starts the Rite of the Nameless; Freedom of Faith is the Tablet that doubles rerolls.",
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
    description: "Low-investment transit farm that adds Catalyst value while you spam maps toward the next City using cheap or already-owned Hiveblood + Wombgift Tablets.",
    difficulty: "Low",
    investment: "Low",
    farmTypes: ["transit", "map-spam"],
    artwork: gameAssets.lavishWombgift,
    flow: [
      { id: "destination", label: "Choose Next City" },
      { id: "tree", label: "Equip Catalyst Tree" },
      { id: "tablets", label: "Insert 3 Tablets" },
      { id: "waystone", label: "T15/T16 · 0 Revives" },
      { id: "run", label: "Spam Maps Toward City" },
      { id: "collect", label: "Collect Catalysts" },
      { id: "continue", label: "Continue Atlas Path" },
      { id: "reach", label: "Reach City" },
      { id: "stop", label: "Stop Transit Farm" },
      { id: "switch", label: "Switch Strategy" },
    ],
    sections: [
      {
        type: "summary",
        title: "Quick setup",
        description: "A light, low-cost setup for monetizing Atlas travel.",
        items: [
          { label: "Type", value: "Transit / Map Spam", tone: "value" },
          { label: "Destination", value: "Next City" },
          { label: "Waystone", value: "T15 / T16 · 0 Revives", tone: "warning" },
          { label: "Tablets", value: "3× Hiveblood + Wombgift", tone: "value" },
          { label: "Minimum roll", value: "None", tone: "value" },
          { label: "Buying strategy", value: "Use owned / cheap Tablets", tone: "warning" },
          { label: "Tree", value: "Currency Womb · Catalyst setup", tone: "warning" },
          { label: "Reward", value: "Catalysts", tone: "value" },
        ],
      },
      {
        type: "checklists",
        title: "Pre-run checklist",
        description: "Keep the setup cheap and the route pointed toward your next City.",
        columns: [
          {
            title: "Core setup",
            tone: "required",
            items: [
              { id: "path", label: "Pathing toward a City" },
              { id: "tree", label: "Correct Catalyst Currency Womb tree active", asset: gameAssets.adaptiveCatalyst },
              { id: "tier", label: "T15 or T16 Waystone", asset: gameAssets.waystoneTier15 },
              { id: "revives", label: "0 Revives" },
            ],
          },
          {
            title: "Tablet check",
            tone: "recommended",
            items: [
              { id: "inserted", label: "3 Tablets inserted", asset: gameAssets.breachTablet },
              { id: "hiveblood", label: "Each Tablet contains Hiveblood Quantity" },
              { id: "wombgift", label: "Each Tablet contains Wombgift Quantity", asset: gameAssets.lavishWombgift },
              { id: "cheap", label: "Tablets were owned already or acquired cheaply" },
            ],
          },
        ],
      },
      {
        type: "callout",
        tone: "danger",
        eyebrow: "Low-investment rule",
        title: "Don't overinvest",
        paragraphs: [
          "This farm works best as a low-cost way to monetize Tablets you already own or obtain naturally.",
          "Paying a premium for high Hiveblood or Wombgift rolls can consume most or all of the strategy's margin.",
        ],
      },
      {
        type: "tablets",
        title: "Tablet requirements",
        description: "Every Tablet needs both quantity modifiers, but there is no minimum roll.",
        status: "3 Tablets · both modifiers on every Tablet",
        asset: gameAssets.breachTablet,
        requirements: [
          { id: "hiveblood", count: "3×", label: "Hiveblood quantity", range: "Required per Tablet", recommendation: "Any positive roll", purpose: "Each Tablet must include increased Quantity of Hiveblood found in Map." },
          { id: "wombgifts", count: "3×", label: "Wombgift quantity", range: "Required per Tablet", recommendation: "Any positive roll", purpose: "Each Tablet must include increased Quantity of Wombgifts found in Map." },
        ],
        note: "Any roll works. Higher is better, but do not overpay for high rolls. The goal is to cheaply stack both modifiers across three Tablets.",
      },
      {
        type: "ranked",
        title: "Tablet buying priority",
        description: "Preserve the low-investment edge by sourcing qualifying Tablets in this order.",
        items: [
          { rank: 1, label: "Use qualifying Tablets already in your stash", reason: "Existing resources keep the setup cost low." },
          { rank: 2, label: "Save qualifying Tablets found while mapping", reason: "Natural drops can fund future travel without a separate purchase." },
          { rank: 3, label: "Keep useful Reforging or Crafting outcomes", reason: "Save outcomes that naturally produce both required modifiers." },
          { rank: 4, label: "Buy only cheap qualifying Tablets", reason: "Skip premium high-roll listings that undermine the farm's margin." },
        ],
      },
      {
        type: "regex",
        title: "Primary Tablet search",
        description: "Use this while sorting or reforging Tablets. Any Tablet matching both modifiers can be saved for this farm.",
        groups: [
          { label: "Required on the same Tablet · any roll", entryIds: ["breach-hiveblood-wombgifts"] },
        ],
      },
      {
        type: "callout",
        tone: "gold",
        title: "Why there is no minimum roll",
        paragraphs: [
          "Higher Hiveblood and Wombgift rolls improve the effect, but high-roll Tablets command a significant market premium.",
          "This strategy aims to cheaply stack both modifiers across three Tablets and turn normal Atlas progression into additional Catalyst drops—not to maximize each Tablet.",
        ],
      },
      {
        type: "callout",
        tone: "gold",
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
        asset: gameAssets.lavishWombgift,
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
        description: "This is a map-spam strategy; only tier and revive count are prescribed.",
        columns: [
          { title: "Mandatory", tone: "required", items: [{ id: "tier", label: "Tier 15 or Tier 16" }, { id: "revives", label: "0 Revives", detail: "Use the shared positive search for Remaining Revives: 0." }] },
          { title: "No specific modifiers required", tone: "recommended", items: [{ id: "simple", label: "Any other affix combination is acceptable", detail: "Choose a map your build can complete reliably." }] },
        ],
      },
      {
        type: "cards",
        title: "Map selection and run speed",
        description: "The farm should support Atlas movement, not dictate it.",
        items: [
          { label: "Map toward the City", detail: "Path toward your next City and run the maps you were going to run anyway.", tone: "value" },
          { label: "Prefer comfortable routes", detail: "When route choices are equivalent, favor maps your build clears quickly and reliably." },
          { label: "Keep moving", detail: "Clear efficiently, complete the relevant content, collect valuable Catalysts and continue the Atlas path." },
          { label: "Avoid setup overhead", detail: "Do not treat these maps like a heavily juiced dedicated City farm." },
        ],
      },
      {
        type: "rewards",
        title: "Catalysts to watch",
        description: "Examples worth price-checking. This is not a fixed ranking and contains no stored prices.",
        asset: gameAssets.adaptiveCatalyst,
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
        type: "links",
        title: "After reaching the City",
        description: "Stop the transit setup and consider a dedicated City strategy. Ritual is one option, not a requirement.",
        links: [{ label: "Ritual — Head of the King", url: "/farms/ritual", note: "Optional related City farm", external: false }],
      },
      {
        type: "tags",
        title: "Not required",
        description: "Do not overcomplicate this setup with requirements from other farms.",
        items: ["City access", "Four Tablet slots", "Minimum Hiveblood roll", "Minimum Wombgift roll", "Expensive Tablets", "Pack Size threshold", "Monster Rarity threshold", "Specific Waystone affixes"],
      },
      {
        type: "notes",
        title: "Operational notes",
        items: [
          "The City is the destination, not the farming requirement. Stop this setup when you arrive and switch to a stronger City-specific strategy.",
          "Low cost, map speed, Atlas progression and existing resources matter more than maximum rolls.",
          "The guide intentionally avoids fixed Tablet prices, profitability claims and personal test history.",
        ],
      },
    ],
    sources: catalystSources,
  },
  {
    id: "farm-abyss-rares",
    slug: "abyss-rares",
    path: "/farms/abyss-rares",
    navigationLabel: "Abyss Rares",
    title: "Abyss Rares",
    mechanic: "Abyss",
    gameVersion: GAME_VERSION,
    description: "Four-Tablet City setup that stacks Abyss pits, Abyssal monster scaling and extra map modifiers, then runs corrupted T15 Waystones under 200% Delirium.",
    farmTypes: ["city", "mechanic"],
    artwork: gameAssets.abyssTablet,
    flow: [
      { id: "tablets", label: "Build 4-Tablet Setup" },
      { id: "city", label: "Select City Maps" },
      { id: "waystones", label: "Roll & Corrupt Waystones" },
      { id: "mirror", label: "Apply 200% Delirium" },
      { id: "jado", label: "Run with Jado" },
    ],
    sections: [
      {
        type: "checklists",
        title: "Setup",
        description: "Core map-device and Atlas requirements for the strategy.",
        columns: [
          {
            title: "Required",
            tone: "required",
            items: [
              { id: "city", label: "City maps", detail: "Run Cities so all four Tablet slots can affect the map.", asset: gameAssets.waystoneTier15 },
              { id: "tablets", label: "4× Abyss Tablets", detail: "Up to two may be replaced by other Tablet types to reduce the setup cost.", asset: gameAssets.abyssTablet },
              { id: "delirium", label: "Grand Mirror · 200% Delirium", detail: "Use a Grand Mirror to run the maps at 200% Delirium.", asset: mechanicIcons.delirium },
            ],
          },
          {
            title: "Map target",
            tone: "recommended",
            items: [
              { id: "tier", label: "T15 Waystones", detail: "Use 6–8 modifier T15 Waystones for the normal version of the farm.", asset: gameAssets.waystoneTier15 },
              { id: "mods", label: "8 modifiers ideal · good 6 modifiers valid", detail: "Eight modifiers are ideal but difficult to sustain; run strong six-modifier Waystones too." },
            ],
          },
        ],
      },
      {
        type: "tablets",
        title: "Tablets",
        description: "Distribute the Abyss requirements across four Tablets. Every Tablet must carry the +2 random-modifier roll.",
        status: "4 Tablets · +2 modifiers on every Tablet",
        asset: gameAssets.abyssTablet,
        requirements: [
          { id: "closed-pit", count: "1×", label: "Effectiveness per closed Pit", range: "Required across setup", recommendation: "One source", purpose: "Abyssal Monsters have increased Effectiveness for each closed Pit, up to 100%." },
          { id: "four-abysses", count: "1×", label: "Four additional Abysses", range: "Required across setup", recommendation: "One source", purpose: "Map has a chance to contain four additional Abysses." },
          { id: "two-modifiers", count: "4×", label: "Two additional random Modifiers", range: "Required on every Tablet", recommendation: "Exact +2 roll", purpose: "Each of the four Tablets must add two random map modifiers; the +1 roll is not sufficient." },
          { id: "abyssal-modifiers", count: "1–2×", label: "Abyssal Modifiers chance", range: "At least one source", recommendation: "One always · two acceptable", purpose: "Increases the chance for Abyssal monsters in the map to have Abyssal Modifiers." },
        ],
        note: "Start with four Abyss Tablets. Replacing up to two with other Tablet types is the cheaper alternative, but preserve all mandatory coverage and the +2 roll on every Tablet.",
        extras: {
          title: "Best additional modifiers",
          items: [
            "Increased number of Rare Monsters — best option after +2 random modifiers",
            "Pack Size in Map",
            "Monster Rarity",
            "Rarity of Items found in Map",
            "Monster Effectiveness — useful, but less valuable because the setup already stacks it heavily",
            "Abysses in Map spawn increased Monsters — useful, but its exact strength is uncertain",
          ],
        },
      },
      {
        type: "regex",
        title: "Tablet Regexes",
        description: "Central Regexile entries for sorting the mandatory and useful Tablet modifiers in this setup.",
        groups: [
          { label: "Key Abyss modifiers · any required line", entryIds: ["abyss-rares-key-mods"] },
          { label: "Mandatory on every Tablet · exact +2 roll", entryIds: ["general-two-random-modifiers"] },
          { label: "Best optional modifier", entryIds: ["general-rare-monsters"] },
          { label: "Other good optional modifiers", entryIds: ["abyss-rares-good-optional"] },
          { label: "Strong single-Tablet convenience filter", entryIds: ["abyss-rares-strong-tablet"] },
        ],
      },
      {
        type: "checklists",
        title: "Maps / Waystones",
        description: "Map selection rules for the four-slot City setup.",
        columns: [
          {
            title: "Standard run",
            tone: "required",
            items: [
              { id: "cities", label: "Run Cities", detail: "City layouts provide the four Tablet slots required by the full setup." },
              { id: "t15", label: "T15 · 6–8 modifiers", detail: "T15 is the baseline. Prioritize good six-modifier maps and ideal eight-modifier maps." },
              { id: "deli", label: "200% Delirium", detail: "Use the Grand Mirror before running the prepared maps.", asset: mechanicIcons.delirium },
            ],
          },
          {
            title: "T16 is optional",
            tone: "recommended",
            items: [
              { id: "t16", label: "Run or sell T16 Waystones", detail: "T16 does not inherently improve this farm's loot over T15." },
              { id: "area-level", label: "Area Level 81 use case", detail: "T16 becomes relevant when a +1 Area Level Tablet pushes the map to Area Level 81 for item-level 82 gear." },
            ],
          },
        ],
      },
      {
        type: "regex",
        title: "Waystone Regex",
        description: "Recommended tier, modifier count and rarity targets for the maps used by this farm.",
        groups: [
          { label: "Waystone · T15+ · 6+ mods · 40%+ Item Rarity · 40%+ Monster Rarity", entryIds: ["maps-abyss-rares-item-monster-rarity-40"] },
        ],
      },
      {
        type: "checklists",
        title: "Waystone Preparation",
        description: "Prepare each map before committing it to the City setup.",
        columns: [
          {
            title: "Preparation sequence",
            tone: "required",
            items: [
              { id: "six-mod", label: "Start from a 6-modifier Waystone", detail: "Six modifiers are the practical baseline for maps worth finishing." },
              { id: "effectiveness-omen", label: "Use Omen of Chaotic Effectiveness", detail: "This is the prescribed Omen for the preparation step.", asset: gameAssets.omenChaoticEffectiveness },
              { id: "corrupt", label: "Corrupt every prepared Waystone", detail: "The strategy calls for corrupting all prepared maps." },
            ],
          },
          {
            title: "Optional / outcomes",
            tone: "recommended",
            items: [
              { id: "quantity-omen", label: "Omen of Chaotic Quantity", detail: "Optional.", asset: gameAssets.omenChaoticQuantity },
              { id: "eight-mod", label: "8 modifiers ideal", detail: "Eight modifiers are ideal but difficult to sustain." },
              { id: "six-mod-valid", label: "Good 6 modifiers remain valid", detail: "Keep strong six-modifier maps in the rotation." },
            ],
          },
        ],
      },
      {
        type: "master",
        title: "Master",
        description: "Jado's Spycraft supports the corrupted Waystones and Tablet scaling used by this setup.",
        name: "Jado",
        portrait: gameAssets.jado,
        required: [
          { id: "partial-translations", name: "Partial Translations", summary: "Gives Tablet explicit modifiers a chance to apply at double effect.", asset: gameAssets.jadoPartialTranslation },
          { id: "unforeseen-threats", name: "Unforeseen Threats", summary: "Map completions can reveal a nearby Anomaly Map.", asset: gameAssets.jadoUnforeseenThreats },
          { id: "unexpected-missions", name: "Unexpected Missions", summary: "Corrupted Waystones open a random basic Map Area with an additional random modifier.", asset: gameAssets.jadoUnexpectedMission },
        ],
      },
      {
        type: "notes",
        title: "Notes",
        items: [
          "The strong Tablet regex checks one Tablet for +2 random modifiers plus one useful modifier. It does not certify the complete four-Tablet setup.",
          "Four Abyss Tablets are the full setup; replacing up to two with other Tablets is only the cheaper alternative.",
          "T16 is optional. Its specific use here is reaching Area Level 81 with a +1 Area Level Tablet for item-level 82 gear.",
          "Eight-modifier Waystones are ideal, but good six-modifier Waystones remain valid and should be run.",
        ],
      },
    ],
    sources: [],
  },
  {
    id: "farm-fractured-orb",
    slug: "fractured-orb",
    path: "/farms/fractured-orb",
    navigationLabel: "Fractured Orb",
    title: "Fractured Orb",
    mechanic: "Fractured Orb",
    gameVersion: GAME_VERSION,
    description: "Fast-clearing farm that combines cleansed areas, Viridian Wildwood and heavily modified Ritual Tablets for Fracturing Orb returns.",
    investment: "High",
    farmTypes: ["map-spam", "mechanic"],
    artwork: gameAssets.fracturingOrb,
    flow: [
      { id: "cleanse", label: "Cleanse Area" },
      { id: "wildwood", label: "Add Wildwood" },
      { id: "tablets", label: "Socket 3 Ritual Tablets" },
      { id: "wisps", label: "Collect Yellow → Purple → Blue" },
      { id: "clear", label: "Full Clear Map" },
      { id: "reinvest", label: "Keep or Sell Tablets" },
    ],
    sections: [
      {
        type: "summary",
        title: "Overview",
        description: "The practical setup at a glance.",
        items: [
          { label: "Area", value: "Cleansed Area", tone: "value" },
          { label: "Mechanic", value: "Viridian Wildwood" },
          { label: "Waystones", value: "T15 / T16 · 6+ mods" },
          { label: "Ideal map", value: "8 modifiers", tone: "value" },
          { label: "Tablets", value: "3× Ritual Tablets" },
          { label: "Core roll", value: "+2 random modifiers", tone: "value" },
          { label: "Best fit", value: "Fast full-clear builds" },
          { label: "Converted return", value: "100+ Divines / 10 maps", tone: "value" },
        ],
      },
      {
        type: "master",
        title: "Master",
        description: "Doryani's Science turns explicit map modifiers into the core scaling engine for this farm.",
        name: "Doryani",
        portrait: gameAssets.doryani,
        required: [
          { id: "evolutionary-pressure", name: "Evolutionary Pressure", summary: "Scales item rarity, monster Effectiveness and rare-monster modifier chance with each explicit map modifier.", asset: gameAssets.doryaniEvolutionaryPressure },
          { id: "improved-calibration", name: "Improved Calibration", summary: "Makes either Waystone prefixes or suffixes 25% more effective when the map is opened.", asset: gameAssets.doryaniImprovedCalibration },
          { id: "careful-procurement", name: "Careful Procurement", summary: "Gives Magic monster packs a 35% chance to gain an additional modifier.", asset: gameAssets.doryaniCarefulProcurement },
        ],
        optional: [
          { id: "stitch-the-flesh", name: "Stitch the Flesh", summary: "Adds a map revival, up to six. Recommended because these maps become heavily juiced.", asset: gameAssets.doryaniStitchTheFlesh },
          { id: "disengaged-safeties", name: "Disengaged Safeties", summary: "Makes Map Areas Irradiated. Use this or another preferred node when survivability is already secure.", asset: gameAssets.doryaniDisengagedSafeties },
        ],
      },
      {
        type: "ranked",
        title: "Area Prep / Cleansed Area",
        description: "The farm only runs in a cleansed area. Prepare it through the Corrupted Nexus first.",
        items: [
          { rank: 1, label: "Travel to the Nexus", reason: "Open the Atlas route to the Corrupted Nexus." },
          { rank: 2, label: "Find the marked corrupted zone", reason: "Follow the red-marked area associated with the Nexus." },
          { rank: 3, label: "Kill the normal area boss", reason: "Complete the area's standard boss encounter." },
          { rank: 4, label: "Kill the corrupted boss", reason: "Defeat the Corrupted Boss that appears afterwards." },
          { rank: 5, label: "Use the cleansed area", reason: "The surrounding map area is now ready for this farm." },
        ],
      },
      {
        type: "ranked",
        title: "Wildwood Priority",
        description: "Use Sacred Blooms after cleansing to add Viridian Wildwood, then collect every available spirit in this order.",
        asset: gameAssets.sacredBloom,
        items: [
          { rank: 1, label: "Yellow spirits", reason: "Always prioritize yellow first." },
          { rank: 2, label: "Purple spirits", reason: "Take purple after securing available yellow spirits." },
          { rank: 3, label: "Blue spirits", reason: "Blue is the lowest priority, but still take it when available." },
        ],
        extras: { title: "Sacred Bloom", items: ["Apply Sacred Blooms to the cleansed zone to add Viridian Wildwood."], note: "Priority controls routing, not whether a spirit should be skipped entirely." },
      },
      {
        type: "tablets",
        title: "Tablets",
        description: "Use three Ritual Tablets. The +2 roll is the key condition on each prepared Tablet.",
        status: "3 Ritual Tablets · +2 is core",
        asset: gameAssets.ritualTablet,
        requirements: [
          { id: "two-random", count: "3×", label: "Two additional random Modifiers", range: "Core requirement", recommendation: "Exact +2 roll", purpose: "Map has 2 additional random Modifiers. The +1 version is the cheaper crafting starting point, not the finished target." },
        ],
        note: "Buy finished +2 Tablets when practical, or buy +1 bases and attempt to Divine, reroll or reforge them. Use Regexile filters while sorting results.",
        extras: { title: "Recommended support modifiers", items: ["Monster Effectiveness", "Monster Rarity", "Pack Size in Map"] },
      },
      {
        type: "regex",
        title: "Tablet Regexes",
        description: "Shared Regexile entries for the core roll, support rolls and one-Tablet convenience search.",
        groups: [
          { label: "+2 Random Modifiers · core requirement", entryIds: ["general-two-random-modifiers"] },
          { label: "Good Support Mods · OR search", entryIds: ["fractured-orb-good-support-mods"] },
          { label: "Strong Ritual Tablet · +2 and at least one support mod", entryIds: ["fractured-orb-strong-ritual-tablet"] },
        ],
      },
      {
        type: "checklists",
        title: "Waystones",
        description: "The map base is not important. Modifier count matters more than a particular layout or stat threshold.",
        columns: [
          {
            title: "Required",
            tone: "required",
            items: [
              { id: "tier", label: "Tier 15 or Tier 16", detail: "Either tier is valid for the farm.", asset: gameAssets.waystoneTier15 },
              { id: "six-mod", label: "Minimum 6 modifiers", detail: "Six-modifier maps remain fully effective and valid." },
            ],
          },
          {
            title: "Recommended",
            tone: "recommended",
            items: [
              { id: "eight-mod", label: "Prefer 8 modifiers", detail: "Eight modifiers are the ideal standard for stronger map juice." },
              { id: "useful-stats", label: "Effectiveness and rarity", detail: "Both are useful, but neither has a required minimum percentage." },
            ],
          },
        ],
      },
      {
        type: "ranked",
        title: "Execution",
        description: "Keep the run focused on Wildwood first and a fast full clear afterwards.",
        items: [
          { rank: 1, label: "Socket the prepared Ritual Tablets", reason: "Confirm all three prepared Tablets before opening the map." },
          { rank: 2, label: "Enter the cleansed T15/T16 map", reason: "Use a six-modifier map at minimum; prefer eight modifiers." },
          { rank: 3, label: "Enter Viridian Wildwood first", reason: "Complete the Wildwood portion before the normal map clear." },
          { rank: 4, label: "Route yellow, purple, then blue", reason: "Prioritize yellow and take every available spirit." },
          { rank: 5, label: "Finish the Wildwood mechanic", reason: "Progress until the mechanic is complete and the return portal is available." },
          { rank: 6, label: "Return to the map", reason: "Resume the normal map route after leaving Wildwood." },
          { rank: 7, label: "Clear the map normally", reason: "Maintain a fast, direct clear path." },
          { rank: 8, label: "Finish the full clear", reason: "The farm rewards builds that can clear the entire juiced map quickly." },
        ],
      },
      {
        type: "cards",
        title: "Cost / Setup",
        description: "Practical average estimates. Trade prices move and these values are not fixed guarantees.",
        items: [
          { label: "Waystones", detail: "Eight-mod maps are roughly 3 Chaos each on trade." },
          { label: "Sacred Blooms", detail: "Budget roughly 4.5 Chaos worth per zone on average.", tone: "neutral" },
          { label: "Ritual Tablets", detail: "Finished +2 random-modifier Tablets average roughly 3 Divines each. Buying +1 bases and crafting is the alternative.", tone: "value" },
          { label: "Average setup", detail: "Plan around 9 Divines + 25 Chaos as a practical estimate, not a universal fixed price.", tone: "value" },
        ],
      },
      {
        type: "rewards",
        title: "Validated Results",
        description: "The tested total combines all relevant drops at their converted trade value.",
        asset: gameAssets.fracturingOrb,
        items: ["100+ Divines converted / 10 maps"],
        note: "This total was not all Fracturing Orbs. It includes raw Divines, Chaos Orbs, Perfect Exalted Orbs, Perfect Chaos Orbs and other currencies. Treat it as a tested result, not a guaranteed return.",
      },
      {
        type: "rewards",
        title: "Tablet Upside",
        description: "Tablet drops vary between runs and can add secondary profit beyond the converted currency total.",
        items: ["Sell useful Tablets directly", "Craft or reforge promising bases", "Use Regexile searches to identify valuable modifier combinations"],
        note: "Tablet value depends on the type, base and modifiers that drop. Keep strong outcomes for future mapping or sell them after checking the available regexes.",
      },
      {
        type: "notes",
        title: "Notes",
        items: [
          "Recommended for very fast map-clear builds, especially Twister-style setups, because speed and full clear strongly affect the result.",
          "The strong Ritual Tablet regex validates one Tablet only. Confirm all three Tablets separately before starting the zone.",
          "Blue spirits are lowest priority, not something to avoid. Take them when available after yellow and purple routing.",
        ],
      },
    ],
    sources: fracturedOrbSources,
  },
];

export const getFarmGuide = (slug: string) => farmGuides.find((guide) => guide.slug === slug);

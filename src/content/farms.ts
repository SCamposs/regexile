import { GAME_VERSION } from "@/src/config/game";

export type FarmRequirement = {
  id: string;
  label: string;
  detail: string;
  kind: "mandatory" | "recommended";
};

export type TabletRequirement = {
  id: string;
  label: string;
  minimum: number;
  range: string;
  strongestRoll: string;
  purpose: string;
};

export type FarmStep = {
  id: string;
  label: string;
  detail?: string;
};

export type RoutePriority = {
  rank: number;
  label: string;
  reason: string;
};

export type FarmDecision = {
  label: string;
  action: string;
  tone: "value" | "warning" | "neutral";
};

export type FarmSource = {
  name: string;
  url: string;
  verifiedAt: string;
};

export type FarmImage = {
  src: string;
  alt: string;
  caption?: string;
  sourceUrl?: string;
};

export type FarmRegexGroup = {
  label: string;
  entryIds: string[];
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
  requirements: FarmRequirement[];
  tabletRequirements: TabletRequirement[];
  optionalTabletModifiers: string[];
  routePriorities: RoutePriority[];
  usefulRouteModifiers: string[];
  flow: FarmStep[];
  decisions: FarmDecision[];
  regexGroups: FarmRegexGroup[];
  warnings: string[];
  notes: string[];
  images: FarmImage[];
  sources: FarmSource[];
};

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
    requirements: [
      { id: "head", label: "Head of the King", detail: "Use it at Caer Tarth to begin the Rite of the Nameless.", kind: "mandatory" },
      { id: "freedom", label: "Freedom of Faith", detail: "The unique Ritual Tablet doubles the available Favour rerolls.", kind: "mandatory" },
      { id: "city", label: "City map coverage", detail: "Keep as many selected maps as possible inside City areas so the complete Tablet setup applies.", kind: "mandatory" },
      { id: "tier", label: "Tier 15+ Waystones", detail: "Use Tier 15 Waystones or better for the documented setup.", kind: "mandatory" },
      { id: "build", label: "Juiced Ritual clear", detail: "The character must comfortably clear dense, highly juiced Ritual encounters.", kind: "mandatory" },
      { id: "pack", label: "25%+ Pack Size", detail: "A recommended target for monster density, not a hard game requirement.", kind: "recommended" },
      { id: "rarity", label: "25%+ Monster Rarity", detail: "A recommended target that raises the chance for Magic and Rare monsters, which grant more Tribute.", kind: "recommended" },
    ],
    tabletRequirements: [
      { id: "omens", label: "Omen chance", minimum: 2, range: "35–70% increased chance", strongestRoll: "70%", purpose: "Increases the share of Ritual Favours that are Omens." },
      { id: "defer", label: "Reduced Defer cost", minimum: 2, range: "20–30% reduced Tribute", strongestRoll: "30%", purpose: "Keeps valuable Favours in the deferred pool at a lower Tribute cost." },
      { id: "reroll-cost", label: "Reduced Reroll cost", minimum: 1, range: "20–30% reduced Tribute", strongestRoll: "30%", purpose: "Lets the Tribute pool fund more Favour rerolls." },
      { id: "rerolls", label: "Additional rerolls", minimum: 1, range: "1–3 additional times", strongestRoll: "+3", purpose: "Adds rerolls before Freedom of Faith doubles the available count." },
    ],
    optionalTabletModifiers: [
      "Increased Tribute from sacrificed monsters",
      "Increased number of Rare Monsters",
      "Increased chance for revived Ritual monsters to be Rare or Magic",
      "Other modifiers that improve monster density or Tribute",
    ],
    routePriorities: [
      { rank: 1, label: "Ritual Altars offer 20% increased number of Favours", reason: "More choices apply to every remaining map after this Proliferation is completed." },
      { rank: 2, label: "Monsters Sacrificed at Ritual Altars grant 25% increased Tribute", reason: "Builds the Tribute pool that funds rerolls and defers in later maps." },
      { rank: 3, label: "Rituals contain 1 additional pack of Wildwood Monsters", reason: "Adds density and another source of Tribute to subsequent maps." },
    ],
    usefulRouteModifiers: [
      "Reduced Tribute cost for rerolling Favours",
      "Additional Favour rerolls",
      "The first reroll costs no Tribute",
      "Explicit high-value Foretold Bounties",
    ],
    flow: [
      { id: "waystone", label: "Prepare Waystone" },
      { id: "tablets", label: "Check Tablets" },
      { id: "start", label: "Start Head of the King" },
      { id: "route", label: "Order Proliferations" },
      { id: "enter", label: "Enter Map" },
      { id: "boss", label: "Rush Boss" },
      { id: "boss-ritual", label: "Boss Ritual First" },
      { id: "remaining", label: "Remaining Rituals" },
      { id: "reroll", label: "Reroll Favours" },
      { id: "defer", label: "Defer Valuable Rewards" },
      { id: "complete", label: "Complete Map" },
      { id: "next", label: "Next Rite Map" },
    ],
    decisions: [
      { label: "First appearance", action: "Defer items worth about 1 Chaos Orb or more. Expensive items always take priority.", tone: "neutral" },
      { label: "High-value item", action: "Defer immediately. Re-defer when affordable, but preserve the Tribute needed for all remaining rerolls.", tone: "value" },
      { label: "Lower-value item", action: "Do not repeatedly defer unless Tribute is clearly surplus after reserving the reroll budget.", tone: "neutral" },
      { label: "Red-border warning", action: "Re-defer if you want to keep the item in the deferred pool.", tone: "warning" },
      { label: "Tribute abundant", action: "Once every remaining reroll is safely funded, become increasingly aggressive with worthwhile Omens and Favours.", tone: "value" },
    ],
    regexGroups: [
      { label: "Waystones", entryIds: ["maps-pack-size", "maps-monster-rarity"] },
      { label: "Ritual Tablets", entryIds: ["ritual-omen-chance", "ritual-reroll-favours", "ritual-reduced-defer-cost", "ritual-reduced-reroll-cost"] },
      { label: "Optional Tablet rolls", entryIds: ["ritual-increased-tribute", "ritual-rare-monsters"] },
    ],
    warnings: [
      "Boss Ritual first: rush and kill the map boss, complete the boss-room Ritual, then do a Summoning Circle Ritual if present, followed by the remaining Rituals.",
      "Mageblood, Headhunter and other jackpot Favours are possible outcomes, not guaranteed profit.",
    ],
    notes: [
      "Freedom of Faith makes Favours cost 10–15% increased Tribute, a downside accepted because this setup builds a large Tribute pool and reduces Defer and Reroll costs.",
      "Each Ritual completed during the Rite adds an additional reroll to future Rituals in the Rite, so the available rerolls snowball through the chain.",
      "Foretold Proliferation applies its modifier to the other remaining maps after completion. Run strong Proliferations early; when choices are equivalent, stay inside the City.",
      "Rare Tablet modifiers may overlap on the same Tablet. The required coverage matters, not one prescribed four-item combination.",
      "Numeric rolls can be improved with Divine Orbs when economically appropriate, but using Divines is not automatically correct.",
      "This version does not require a separate cashout map. The normal Head of the King and City sequence is intended to generate the required Tribute.",
    ],
    images: [],
    sources: [
      { name: "Path of Exile 2 Wiki: Ritual", url: "https://www.poe2wiki.net/wiki/Ritual", verifiedAt: "2026-09-24" },
      { name: "Path of Exile 2 Wiki: Freedom of Faith", url: "https://www.poe2wiki.net/wiki/Freedom_of_Faith", verifiedAt: "2026-09-24" },
      { name: "Path of Exile 2 Wiki: Head of the King", url: "https://www.poe2wiki.net/wiki/Head_of_the_King", verifiedAt: "2026-09-24" },
      { name: "PoE2DB Tablet modifiers", url: "https://poe2db.tw/us/Tablet", verifiedAt: "2026-09-24" },
      { name: "poe2.re tablet dataset", url: "https://github.com/veiset/poe.re/blob/master/poe2/generated/tablet/Generated.Tablet.json", verifiedAt: "2026-09-24" },
    ],
  },
];

export const getFarmGuide = (slug: string) => farmGuides.find((guide) => guide.slug === slug);

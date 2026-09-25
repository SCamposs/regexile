export type GameAsset = {
  src: string;
  alt: string;
};

export const gameAssets = {
  abyssTablet: { src: "/game-assets/abyss-tablet.webp", alt: "Abyss Tablet" },
  adaptiveCatalyst: { src: "/game-assets/adaptive-catalyst.webp", alt: "Adaptive Catalyst" },
  breachTablet: { src: "/game-assets/breach-tablet.webp", alt: "Breach Tablet" },
  deliriumTablet: { src: "/game-assets/delirium-tablet.webp", alt: "Delirium Tablet" },
  expeditionTablet: { src: "/game-assets/expedition-tablet.webp", alt: "Expedition Tablet" },
  freedomOfFaith: { src: "/game-assets/freedom-of-faith.webp", alt: "Freedom of Faith" },
  headOfTheKing: { src: "/game-assets/head-of-the-king.webp", alt: "Head of the King" },
  irradiatedTablet: { src: "/game-assets/irradiated-tablet.webp", alt: "Irradiated Tablet" },
  lavishWombgift: { src: "/game-assets/lavish-wombgift.webp", alt: "Lavish Wombgift" },
  overseerTablet: { src: "/game-assets/overseer-tablet.webp", alt: "Overseer Tablet" },
  ritualTablet: { src: "/game-assets/ritual-tablet.webp", alt: "Ritual Tablet" },
  templeTablet: { src: "/game-assets/temple-tablet.webp", alt: "Temple Tablet" },
  waystoneTier15: { src: "/game-assets/waystone-tier-15.webp", alt: "Tier 15 Waystone" },
} satisfies Record<string, GameAsset>;

export const mechanicIcons = {
  abyss: { src: "/game-assets/mechanic-icons/abyss.png", alt: "Abyss mechanic" },
  breach: { src: "/game-assets/mechanic-icons/breach.png", alt: "Breach mechanic" },
  delirium: { src: "/game-assets/mechanic-icons/delirium.png", alt: "Delirium mechanic" },
  expedition: { src: "/game-assets/mechanic-icons/expedition.png", alt: "Expedition mechanic" },
  incursion: { src: "/game-assets/mechanic-icons/incursion.png", alt: "Incursion mechanic" },
  ritual: { src: "/game-assets/mechanic-icons/ritual.png", alt: "Ritual mechanic" },
  trialOfChaos: { src: "/game-assets/mechanic-icons/trial-of-chaos.png", alt: "Trial of Chaos" },
  trialOfSekhema: { src: "/game-assets/mechanic-icons/trial-of-sekhema.png", alt: "Trial of the Sekhemas" },
} satisfies Record<string, GameAsset>;

export const regexSectionAssets: Record<string, GameAsset> = {
  maps: gameAssets.waystoneTier15,
  general: gameAssets.overseerTablet,
  irradiated: gameAssets.irradiatedTablet,
  ritual: mechanicIcons.ritual,
  expedition: mechanicIcons.expedition,
  delirium: mechanicIcons.delirium,
  breach: mechanicIcons.breach,
  abyss: mechanicIcons.abyss,
  temple: mechanicIcons.incursion,
};

export const farmNavigationAssets: Record<string, GameAsset> = {
  ritual: mechanicIcons.ritual,
  catalyst: mechanicIcons.breach,
};

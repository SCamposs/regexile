export type GameAsset = {
  src: string;
  alt: string;
};

export const gameAssets = {
  abyssPit: { src: "/game-assets/abyss-pit.png", alt: "Abyss pit" },
  abyssTablet: { src: "/game-assets/abyss-tablet.webp", alt: "Abyss Tablet" },
  adaptiveCatalyst: { src: "/game-assets/adaptive-catalyst.webp", alt: "Adaptive Catalyst" },
  blueWisp: { src: "/game-assets/blue-wisp.png", alt: "Blue Wildwood wisp" },
  breachTablet: { src: "/game-assets/breach-tablet.webp", alt: "Breach Tablet" },
  cleansedArea: { src: "/game-assets/cleansed-area.png", alt: "Cleansed area" },
  crypticKey: { src: "/game-assets/cryptic-key.png", alt: "Cryptic Key" },
  doryani: { src: "/game-assets/doryani.png", alt: "Doryani" },
  doryaniCarefulProcurement: { src: "/game-assets/doryani-careful-procurement.webp", alt: "Careful Procurement" },
  doryaniDisengagedSafeties: { src: "/game-assets/doryani-disengaged-safeties.webp", alt: "Disengaged Safeties" },
  doryaniEvolutionaryPressure: { src: "/game-assets/doryani-evolutionary-pressure.webp", alt: "Evolutionary Pressure" },
  doryaniImprovedCalibration: { src: "/game-assets/doryani-improved-calibration.webp", alt: "Improved Calibration" },
  doryaniStitchTheFlesh: { src: "/game-assets/doryani-stitch-the-flesh.webp", alt: "Stitch the Flesh" },
  deliriumTablet: { src: "/game-assets/delirium-tablet.webp", alt: "Delirium Tablet" },
  expeditionTablet: { src: "/game-assets/expedition-tablet.webp", alt: "Expedition Tablet" },
  freedomOfFaith: { src: "/game-assets/freedom-of-faith.webp", alt: "Freedom of Faith" },
  fracturingOrb: { src: "/game-assets/fracturing-orb.webp", alt: "Fracturing Orb" },
  headOfTheKing: { src: "/game-assets/head-of-the-king.webp", alt: "Head of the King" },
  irradiatedTablet: { src: "/game-assets/irradiated-tablet.webp", alt: "Irradiated Tablet" },
  hilda: { src: "/game-assets/hilda.png", alt: "Hilda" },
  jado: { src: "/game-assets/jado.png", alt: "Jado" },
  jadoMysteriousGifts: { src: "/game-assets/jado-mysterious-gifts.webp", alt: "Mysterious Gifts" },
  jadoPartialTranslation: { src: "/game-assets/jado-partial-translation.webp", alt: "Partial Translations" },
  jadoTroveSeekers: { src: "/game-assets/jado-trove-seekers.webp", alt: "Trove Seekers" },
  jadoUnexpectedMission: { src: "/game-assets/jado-unexpected-mission.webp", alt: "Unexpected Missions" },
  jadoUnforeseenThreats: { src: "/game-assets/jado-unforeseen-threats.webp", alt: "Unforeseen Threats" },
  lavishWombgift: { src: "/game-assets/lavish-wombgift.webp", alt: "Lavish Wombgift" },
  omenChaoticEffectiveness: { src: "/game-assets/omen-chaotic-effectiveness.webp", alt: "Omen of Chaotic Effectiveness" },
  omenChaoticQuantity: { src: "/game-assets/omen-chaotic-quantity.webp", alt: "Omen of Chaotic Quantity" },
  overseerTablet: { src: "/game-assets/overseer-tablet.webp", alt: "Overseer Tablet" },
  purpleWisp: { src: "/game-assets/purple-wisp.png", alt: "Purple Wildwood wisp" },
  ritualAltar: { src: "/game-assets/ritual-altar.png", alt: "Ritual altar" },
  ritualTablet: { src: "/game-assets/ritual-tablet.webp", alt: "Ritual Tablet" },
  sacredBloom: { src: "/game-assets/sacred-bloom.webp", alt: "Sacred Bloom" },
  strongbox: { src: "/game-assets/strong-box.png", alt: "Strongbox" },
  tabletMapDevice: { src: "/game-assets/tablet-map-device.png", alt: "Four-slot Tablet map device" },
  templeTablet: { src: "/game-assets/temple-tablet.webp", alt: "Temple Tablet" },
  viridianWildwood: { src: "/game-assets/viridian-wildwood.png", alt: "Viridian Wildwood" },
  waystoneTier15: { src: "/game-assets/waystone-tier-15.webp", alt: "Tier 15 Waystone" },
  yellowWisp: { src: "/game-assets/yellow-wisp.png", alt: "Yellow Wildwood wisp" },
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
  "abyss-rares": mechanicIcons.abyss,
  "fractured-orb": gameAssets.fracturingOrb,
};

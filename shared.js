// Shared by index.html (the board) and teams.html (the overview).
// Classic script: these consts are visible to the pages' own scripts.

// ---------------------------------------------------------------------------------
// TEAM SYNC: paste your Firebase web app config here (Firebase console → Project settings
// → Your apps → Config). These values are meant to be public; the Firestore rules protect the data.
// Leave as null to run solo-only.
// ---------------------------------------------------------------------------------
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD-yNSuOgiPTseF5XnBMdjxs1vEAAxLH0s",
  authDomain: "osrsbingo-f5c1c.firebaseapp.com",
  projectId: "osrsbingo-f5c1c",
  storageBucket: "osrsbingo-f5c1c.firebasestorage.app",
  messagingSenderId: "710438315166",
  appId: "1:710438315166:web:d2ea9a50c1cb955b7d078f"
};
const FIREBASE_VERSION = "10.12.2";

// ---------------------------------------------------------------------------------
// Boss data. kph = kills (or raids/chests) per hour. Drop rates are per kill.
// Source: cleaned_boss_kills_per_hour.xlsx (TempleOSRS) unless est: true.
// Pets and jars are left out on purpose; only drops that count for a tile are listed.
// ---------------------------------------------------------------------------------
const BOSSES = {
  sire:       { name: "Abyssal Sire", kph: 32, drops: { "Bludgeon claw": 0.004843, "Bludgeon spine": 0.004843, "Bludgeon axon": 0.004843, "Abyssal dagger": 0.002031 } },
  hydra:      { name: "Alchemical Hydra", kph: 29, drops: { "Hydra's eye": 0.005525, "Hydra's fang": 0.005525, "Hydra's heart": 0.005525, "Hydra tail": 0.001949, "Hydra leather": 0.001946, "Hydra's claw": 0.000999 } },
  araxxor:    { name: "Araxxor", kph: 37, drops: { "Noxious pommel": 0.005, "Noxious point": 0.005, "Noxious blade": 0.005, "Araxyte fang": 0.001667 } },
  callisto:   { name: "Callisto", kph: 55, drops: { "Claws of callisto": 0.005102, "Dragon 2h sword": 0.003906, "Dragon pickaxe": 0.003906, "Voidwaker hilt": 0.002778, "Tyrannical ring": 0.001953 } },
  vetion:     { name: "Vet'ion", kph: 35, drops: { "Skull of vet'ion": 0.005102, "Dragon 2h sword": 0.003906, "Dragon pickaxe": 0.003906, "Voidwaker blade": 0.002778, "Ring of the gods": 0.001953 } },
  venenatis:  { name: "Venenatis", kph: 33, drops: { "Fangs of venenatis": 0.005102, "Dragon 2h sword": 0.003906, "Dragon pickaxe": 0.003906, "Voidwaker gem": 0.002778, "Treasonous ring": 0.001953 } },
  cerberus:   { name: "Cerberus", kph: 54, drops: { "Primordial crystal": 0.001923, "Pegasian crystal": 0.001923, "Eternal crystal": 0.001923, "Smouldering stone": 0.001923 } },
  rex:        { name: "Dagannoth Rex", kph: 100, drops: { "Berserker ring": 0.0078125, "Warrior ring": 0.0078125 } },
  prime:      { name: "Dagannoth Prime", kph: 100, drops: { "Seers ring": 0.0078125 } },
  supreme:    { name: "Dagannoth Supreme", kph: 100, drops: { "Archers ring": 0.0078125 } },
  zilyana:    { name: "Commander Zilyana", kph: 30, drops: { "Saradomin sword": 0.007874, "Saradomin's light": 0.003937, "Armadyl crossbow": 0.001969, "Saradomin hilt": 0.001969 } },
  graardor:   { name: "General Graardor", kph: 31, drops: { "Bandos chestplate": 0.002625, "Bandos tassets": 0.002625, "Bandos boots": 0.002625, "Bandos hilt": 0.001969 } },
  kree:       { name: "Kree'arra", kph: 30, drops: { "Armadyl helmet": 0.002625, "Armadyl chestplate": 0.002625, "Armadyl chainskirt": 0.002625, "Armadyl hilt": 0.001969 } },
  kril:       { name: "K'ril Tsutsaroth", kph: 28, drops: { "Steam battlestaff": 0.007874, "Zamorakian spear": 0.007874, "Staff of the dead": 0.001969, "Zamorak hilt": 0.001969 } },
  kq:         { name: "Kalphite Queen", kph: 37, drops: { "Dragon chainbody": 0.0078125, "Dragon 2h sword": 0.003906, "Dragon pickaxe": 0.0025 } },
  kraken:     { name: "Kraken", kph: 82, drops: { "Trident of the seas": 0.001953, "Kraken tentacle": 0.0025 } },
  muspah:     { name: "Phantom Muspah", kph: 25, drops: { "Venator shard": 0.01 } },
  nex:        { name: "Nex", kph: 20, drops: { "Zaryte vambraces": 0.005814, "Nihil horn": 0.003876, "Torva full helm": 0.003876, "Torva platebody": 0.003876, "Torva platelegs": 0.003876, "Ancient hilt": 0.001938 } },
  nightmare:  { name: "The Nightmare", kph: 11, drops: { "Nightmare staff": 0.005814, "Inquisitor's great helm": 0.004167, "Inquisitor's hauberk": 0.004167, "Inquisitor's plateskirt": 0.004167, "Inquisitor's mace": 0.002331, "Eldritch orb": 0.001821, "Harmonised orb": 0.001821, "Volatile orb": 0.001821 } },
  scorpia:    { name: "Scorpia", kph: 80, drops: { "Odium shard 3": 0.003906, "Malediction shard 3": 0.003906 } },
  crazyarch:  { name: "Crazy Archaeologist", kph: 75, drops: { "Odium shard 2": 0.003906, "Malediction shard 2": 0.003906 } },
  fanatic:    { name: "Chaos Fanatic", kph: 80, drops: { "Odium shard 1": 0.003906, "Malediction shard 1": 0.003906 } },
  thermy:     { name: "Thermonuclear Smoke Devil", kph: 100, drops: { "Occult necklace": 0.002857, "Smoke battlestaff": 0.001953, "Dragon chainbody": 0.0005 } },
  vorkath:    { name: "Vorkath", kph: 33, drops: { "Vorkath's head": 0.02, "Dragonbone necklace": 0.001, "Draconic visage": 0.0002, "Skeletal visage": 0.0002 } },
  yama:       { name: "Yama", kph: 20, drops: { "Soulflame horn": 0.003333, "Oathplate helm": 0.001667, "Oathplate chest": 0.001667, "Oathplate legs": 0.001667 } },
  zulrah:     { name: "Zulrah", kph: 39, drops: { "Tanzanite fang": 0.001953, "Magic fang": 0.001953, "Serpentine visage": 0.001953, "Uncut onyx": 0.001953, "Tanzanite mutagen": 0.000153, "Magma mutagen": 0.000153 } },
  cg:         { name: "Corrupted Gauntlet", kph: 7, drops: { "Crystal weapon seed": 0.02, "Crystal armour seed": 0.02, "Enhanced crystal weapon seed": 0.0025 } },
  gg:         { name: "Grotesque Guardians", kph: 33, drops: { "Granite gloves": 0.004, "Granite ring": 0.004, "Granite hammer": 0.002667, "Black tourmaline core": 0.002 } },
  hueycoatl:  { name: "The Hueycoatl", kph: 20, drops: { "Tome of earth": 0.011111, "Dragon hunter wand": 0.009524 } },
  titans:     { name: "Royal Titans", kph: 60, drops: { "Fire element staff crown": 0.013333, "Ice element staff crown": 0.013333, "Mystic vigour prayer scroll": 0.013333, "Deadeye prayer scroll": 0.013333 } },
  lunar:      { name: "Lunar Chests", kph: 18, drops: { "Any moon unique": 0.052632 } },
  cox:        { name: "Chambers of Xeric", kph: 2.9, drops: { "Dexterous prayer scroll": 0.01, "Arcane prayer scroll": 0.01, "Twisted buckler": 0.002, "Dragon hunter crossbow": 0.002, "Dinh's bulwark": 0.0015, "Ancestral hat": 0.0015, "Ancestral robe top": 0.0015, "Ancestral robe bottom": 0.0015, "Dragon claws": 0.0015, "Elder maul": 0.001, "Kodai insignia": 0.001, "Twisted bow": 0.001 } },
  tob:        { name: "Theatre of Blood", kph: 2.9, drops: { "Avernic defender hilt": 0.046275, "Ghrazi rapier": 0.011567, "Sanguinesti staff": 0.011567, "Justiciar faceguard": 0.011567, "Justiciar chestguard": 0.011567, "Justiciar legguards": 0.011567, "Scythe of vitur": 0.005784 } },

  // ---- Not in the kills/hr sheet: estimates ----
  // Barrows: the sheet's 1/102 doesn't match "any item"; the wiki's ~1/14.3 per chest (all 6 brothers) is used instead.
  barrows:    { name: "Barrows Chests", kph: 22, est: true, drops: { "Any Barrows item": 1 / 14.3 } },
  // ---- Agreed clan rates (not in the sheet; locked in by the clan 2026-11-24) ----
  // Fractured Archive (Oct 2026): 1/17 duo unique chance per the wiki, 1.5 raids/hr.
  tfa:        { name: "The Fractured Archive", kph: 1.5, agreed: true, drops: { "Any Fractured Archive unique": 1 / 17 } },
  // Maggot King (Jun 2026): drop rates from the wiki, 25 kills/hr.
  maggot:     { name: "Maggot King", kph: 25, agreed: true, drops: { "Elder venator fang": 1 / 340, "Crimson kisten": 1 / 520 } },

  // ---- Estimates ----
  // Mad Angel (Jul 2026): ~34 kills/hr from the wiki money-making guide (1.03M gp/hr ÷ 30.3k per kill).
  madangel:   { name: "Mad Angel", kph: 34, est: true, drops: { "Hallowfell": 1 / 127, "Jar of Light": 1 / 1000 } },
  gorillas:   { name: "Demonic gorillas", kph: 100, est: true, drops: { "Zenyte shard": 1 / 300 } },
  tds:        { name: "Tormented Demons", kph: 70, est: true, drops: { "Tormented synapse": 1 / 500, "Burning claw": 1 / 500 } },
  abyssals:   { name: "Abyssal demons", kph: 170, est: true, drops: { "Abyssal whip": 1 / 512 } }
};

// ---------------------------------------------------------------------------------
// Tile pool. APPEND NEW TILES AT THE END: board codes use each tile's position here.
// from  = bosses that can drop it (the fastest one sets the hours)
// items = which drops count ("*" = every drop listed for that boss)
// need  = how many drops are needed (duplicates OK)
// group = tiles in the same group never appear on the same board
// off   = left out of the pool by default
// ---------------------------------------------------------------------------------
const TILES = [
  { id: "free",    free: true, title: "Free space", sub: "Always counts as complete for every line through the centre." },
  { id: "cerb",    img: "Primordial_crystal",           title: "Red & Green Crystals", sub: "Primordial, Pegasian, or Eternal crystal (Cerberus)", from: ["cerberus"], items: ["Primordial crystal", "Pegasian crystal", "Eternal crystal"] },
  { id: "dks",     img: "Berserker_ring",               title: "Lord of the Rings",    sub: "Any 3 Dagannoth King rings", need: 3, from: ["rex", "prime", "supreme"], items: "*" },
  { id: "raid",    img: "Twisted_bow",                  title: "Raid Purple",          sub: "Any CoX, ToB, ToA, or Fractured Archive unique", group: "raid", from: ["cox", "tob", "tfa"], items: "*" },
  { id: "vork",    img: "Vorkath's_head",               title: "Vorkath",              sub: "Any 2: Vorkath's head, Dragonbone necklace, or visage", need: 2, from: ["vorkath"], items: "*" },
  { id: "barrows", img: "Dharok's_helm",                title: "Barrows Haul",         sub: "Any 5 Barrows armour/weapon drops", need: 5, from: ["barrows"], items: "*" },
  { id: "zenyte",  img: "Zenyte_shard",                 title: "Zenyte Shard",         sub: "Demonic gorilla drop", from: ["gorillas"], items: "*" },
  { id: "gwd",     img: "Bandos_hilt",                  title: "GWD Unique",           sub: "Any armour, weapon, or hilt from a God Wars general (no pets)", group: "gwd", from: ["zilyana", "graardor", "kree", "kril"], items: "*" },
  { id: "zulrah",  img: "Tanzanite_fang",               title: "Zulrah Unique",        sub: "Tanzanite/Magic fang, Serpentine visage, Uncut onyx, or mutagen", from: ["zulrah"], items: "*" },
  { id: "dt2",     img: "Ultor_vestige",                title: "DT2 Boss Unique",      sub: "Any unique from Duke, Vardorvis, Leviathan, or Whisperer", fixedHrs: 8.1, fixedNote: "Best at The Whisperer, 21 kills/hr (kills/hr sheet)" },
  { id: "wildy",   img: "Dragon_pickaxe",               title: "Wildy Bosses",         sub: "Any 2 uniques from Callisto, Vet'ion, or Venenatis (or their cave versions)", need: 2, from: ["callisto", "vetion", "venenatis"], items: "*" },
  { id: "muspah",  img: "Venator_shard",                title: "Phantom Muspah",       sub: "Venator shard", from: ["muspah"], items: "*" },
  { id: "cg",      img: "Enhanced_crystal_weapon_seed", title: "Crystal Seeds",        sub: "Crystal armour seed, Crystal weapon seed, or Enhanced weapon seed (Corrupted Gauntlet)", from: ["cg"], items: "*" },
  { id: "slayer",  img: "Abyssal_whip",                 title: "Slayer Staples",       sub: "Abyssal whip, Dark bow, or Black mask", from: ["abyssals"], items: "*" },
  { id: "nex",     img: "Torva_full_helm",              title: "Nex Unique",           sub: "Torva, Zaryte vambraces, Nihil horn, or Ancient hilt", from: ["nex"], items: "*" },
  { id: "hydra",   img: "Hydra's_claw",                 title: "Hydra Uniques",        sub: "Any 2: Claw, Leather, Ring piece, or Tail", need: 2, from: ["hydra"], items: "*" },
  { id: "gg",      img: "Granite_maul",                 title: "Grotesque Guardians",  sub: "Granite gloves, ring, hammer, or Black tourmaline core", from: ["gg"], items: "*" },
  { id: "thermy",  img: "Occult_necklace",              title: "Up in Smoke",          sub: "Any 2: Occult necklace, Smoke battlestaff, or Dragon chainbody (Thermy)", need: 2, from: ["thermy"], items: "*" },
  { id: "moons",   img: "Eclipse_atlatl",               title: "Moons of Peril",       sub: "Any 2 Blood, Blue, or Eclipse moon uniques", need: 2, from: ["lunar"], items: "*" },
  { id: "tds",     img: "Tormented_synapse",            title: "Tormented Demons",     sub: "Tormented synapse or Burning claw", from: ["tds"], items: "*" },
  { id: "arax",    img: "Araxyte_fang",                 title: "Araxxor Uniques",      sub: "Any 2: Noxious point, blade, pommel, or Araxyte fang", need: 2, from: ["araxxor"], items: "*" },
  { id: "kraken",  img: "Kraken_tentacle",              title: "Release the Kraken",   sub: "Kraken tentacle or Trident of the seas", from: ["kraken"], items: "*" },
  { id: "sire",    img: "Bludgeon_claw",                title: "Abyssal Sire",         sub: "Any Bludgeon piece or Abyssal dagger", from: ["sire"], items: "*" },
  { id: "kq",      img: "Dragon_2h_sword",              title: "Kalphite Queen",       sub: "Dragon chainbody, Dragon 2h sword, or Dragon pickaxe", from: ["kq"], items: "*" },
  { id: "angel",   img: "Hallowfell",                   title: "Fallen Angel",         sub: "Hallowfell or Jar of Light (Mad Angel)", from: ["madangel"], items: "*" },
  { id: "nm",      img: "Nightmare_staff",              title: "Sweet Dreams",         sub: "Any Nightmare unique: staff, orb, or Inquisitor's piece", from: ["nightmare"], items: "*" },
  { id: "bandos",  img: "Bandos_chestplate",            title: "Bandos Armour",        sub: "Bandos chestplate, tassets, boots, or hilt", group: "gwd", from: ["graardor"], items: "*" },
  { id: "arma",    img: "Armadyl_helmet",               title: "Armadyl Armour",       sub: "Armadyl helmet, chestplate, chainskirt, or hilt", group: "gwd", from: ["kree"], items: "*" },
  { id: "shards",  img: "Odium_shard_1",                title: "Ward Shards",          sub: "Any 2 Odium or Malediction shards (Scorpia, Crazy Arch, or Chaos Fanatic)", need: 2, from: ["scorpia", "crazyarch", "fanatic"], items: "*" },
  { id: "yama",    img: "Oathplate_helm",               title: "Oathbound",            sub: "Oathplate helm, chest, legs, or Soulflame horn (Yama)", from: ["yama"], items: "*" },
  { id: "huey",    img: "Dragon_hunter_wand",           title: "The Hueycoatl",        sub: "Tome of earth or Dragon hunter wand", from: ["hueycoatl"], items: "*" },
  { id: "titans",  img: "Fire_element_staff_crown",     title: "Royal Titans",         sub: "Any 4: Fire/Ice element staff crown, Mystic vigour, or Deadeye scroll", need: 4, from: ["titans"], items: "*" },
  { id: "tfa",     img: "Zorya's_tome",                 title: "Fractured Archive",    sub: "Any Fractured Archive unique (Zorya's tome, Rondache, Ascension crossbows, Obligator, etc.)", group: "raid", from: ["tfa"], items: "*" },
  { id: "maggot",  img: "Elder_venator_fang",           title: "Maggot King",          sub: "Elder venator fang or Crimson kisten", from: ["maggot"], items: "*" }
];

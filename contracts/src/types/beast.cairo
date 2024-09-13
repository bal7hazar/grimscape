// Constants

pub const BEAST_COUNT: u8 = 75;

// Types

#[derive(Copy, Drop)]
pub enum Beast {
    None,
    // Magical T1s
    Warlock,
    Typhon,
    Jiangshi,
    Anansi,
    Basilisk,
    // Magical T2s
    Gorgon,
    Kitsune,
    Lich,
    Chimera,
    Wendigo,
    // Magical T3s
    Rakshasa,
    Werewolf,
    Banshee,
    Draugr,
    Vampire,
    // Magical T4s
    Goblin,
    Ghoul,
    Wraith,
    Sprite,
    Kappa,
    // Magical T5s
    Fairy,
    Leprechaun,
    Kelpie,
    Pixie,
    Gnome,
    // Hunter T1s
    Griffin,
    Manticore,
    Phoenix,
    Dragon,
    Minotaur,
    // Hunter T2s
    Qilin,
    Ammit,
    Nue,
    Skinwalker,
    Chupacabra,
    // Hunter T3s
    Weretiger,
    Wyvern,
    Roc,
    Harpy,
    Pegasus,
    // Hunter T4s
    Hippogriff,
    Fenrir,
    Jaguar,
    Satori,
    DireWolf,
    // Hunter T5s
    Bear,
    Wolf,
    Mantis,
    Spider,
    Rat,
    // Brute T1s
    Kraken,
    Colossus,
    Balrog,
    Leviathan,
    Tarrasque,
    // Brute T2s
    Titan,
    Nephilim,
    Behemoth,
    Hydra,
    Juggernaut,
    // Brute T3s
    Oni,
    Jotunn,
    Ettin,
    Cyclops,
    Giant,
    // Brute T4s
    NemeanLion,
    Berserker,
    Yeti,
    Golem,
    // Brute T5s
    Ent,
    Troll,
    Bigfoot,
    Ogre,
    Orc,
    Skeleton,
}

// Implementations

#[generate_trait]
impl BeastImpl of BeastTrait {
    #[inline]
    fn from(seed: felt252) -> Beast {
        let seed: u256 = seed.into();
        let beast: u8 = 1 + (seed % BEAST_COUNT.into()).try_into().unwrap();
        beast.into()
    }

    #[inline]
    fn level(self: Beast, adventurer_level: u8, seed: felt252) -> u16 {
        let seed: u256 = seed.into();
        let base_level = 1 + (seed % (adventurer_level.into() * 3)).try_into().unwrap();
        if (adventurer_level >= 50) {
            base_level + 80
        } else if (adventurer_level >= 40) {
            base_level + 40
        } else if (adventurer_level >= 30) {
            base_level + 20
        } else if (adventurer_level >= 20) {
            base_level + 10
        } else {
            base_level
        }
    }

    #[inline]
    fn health(self: Beast, adventurer_level: u8, seed: felt252) -> u16 {
        let seed: u256 = seed.into();
        let health = 1 + (seed % (adventurer_level.into() * 20)).try_into().unwrap();
        if (adventurer_level >= 50) {
            health + 500
        } else if (adventurer_level >= 40) {
            health + 400
        } else if (adventurer_level >= 30) {
            health + 200
        } else if (adventurer_level >= 20) {
            health + 100
        } else {
            health + 10
        }
    }
}

impl IntoBeastU8 of Into<Beast, u8> {
    #[inline]
    fn into(self: Beast) -> u8 {
        match self {
            Beast::None => 0,
            Beast::Warlock => 1,
            Beast::Typhon => 2,
            Beast::Jiangshi => 3,
            Beast::Anansi => 4,
            Beast::Basilisk => 5,
            Beast::Gorgon => 6,
            Beast::Kitsune => 7,
            Beast::Lich => 8,
            Beast::Chimera => 9,
            Beast::Wendigo => 10,
            Beast::Rakshasa => 11,
            Beast::Werewolf => 12,
            Beast::Banshee => 13,
            Beast::Draugr => 14,
            Beast::Vampire => 15,
            Beast::Goblin => 16,
            Beast::Ghoul => 17,
            Beast::Wraith => 18,
            Beast::Sprite => 19,
            Beast::Kappa => 20,
            Beast::Fairy => 21,
            Beast::Leprechaun => 22,
            Beast::Kelpie => 23,
            Beast::Pixie => 24,
            Beast::Gnome => 25,
            Beast::Griffin => 26,
            Beast::Manticore => 27,
            Beast::Phoenix => 28,
            Beast::Dragon => 29,
            Beast::Minotaur => 30,
            Beast::Qilin => 31,
            Beast::Ammit => 32,
            Beast::Nue => 33,
            Beast::Skinwalker => 34,
            Beast::Chupacabra => 35,
            Beast::Weretiger => 36,
            Beast::Wyvern => 37,
            Beast::Roc => 38,
            Beast::Harpy => 39,
            Beast::Pegasus => 40,
            Beast::Hippogriff => 41,
            Beast::Fenrir => 42,
            Beast::Jaguar => 43,
            Beast::Satori => 44,
            Beast::DireWolf => 45,
            Beast::Bear => 46,
            Beast::Wolf => 47,
            Beast::Mantis => 48,
            Beast::Spider => 49,
            Beast::Rat => 50,
            Beast::Kraken => 51,
            Beast::Colossus => 52,
            Beast::Balrog => 53,
            Beast::Leviathan => 54,
            Beast::Tarrasque => 55,
            Beast::Titan => 56,
            Beast::Nephilim => 57,
            Beast::Behemoth => 58,
            Beast::Hydra => 59,
            Beast::Juggernaut => 60,
            Beast::Oni => 61,
            Beast::Jotunn => 62,
            Beast::Ettin => 63,
            Beast::Cyclops => 64,
            Beast::Giant => 65,
            Beast::NemeanLion => 66,
            Beast::Berserker => 67,
            Beast::Yeti => 68,
            Beast::Golem => 69,
            Beast::Ent => 70,
            Beast::Troll => 71,
            Beast::Bigfoot => 72,
            Beast::Ogre => 73,
            Beast::Orc => 74,
            Beast::Skeleton => 75,
        }
    }
}

impl IntoU8Beast of Into<u8, Beast> {
    #[inline]
    fn into(self: u8) -> Beast {
        match self {
            0 => Beast::None,
            1 => Beast::Warlock,
            2 => Beast::Typhon,
            3 => Beast::Jiangshi,
            4 => Beast::Anansi,
            5 => Beast::Basilisk,
            6 => Beast::Gorgon,
            7 => Beast::Kitsune,
            8 => Beast::Lich,
            9 => Beast::Chimera,
            10 => Beast::Wendigo,
            11 => Beast::Rakshasa,
            12 => Beast::Werewolf,
            13 => Beast::Banshee,
            14 => Beast::Draugr,
            15 => Beast::Vampire,
            16 => Beast::Goblin,
            17 => Beast::Ghoul,
            18 => Beast::Wraith,
            19 => Beast::Sprite,
            20 => Beast::Kappa,
            21 => Beast::Fairy,
            22 => Beast::Leprechaun,
            23 => Beast::Kelpie,
            24 => Beast::Pixie,
            25 => Beast::Gnome,
            26 => Beast::Griffin,
            27 => Beast::Manticore,
            28 => Beast::Phoenix,
            29 => Beast::Dragon,
            30 => Beast::Minotaur,
            31 => Beast::Qilin,
            32 => Beast::Ammit,
            33 => Beast::Nue,
            34 => Beast::Skinwalker,
            35 => Beast::Chupacabra,
            36 => Beast::Weretiger,
            37 => Beast::Wyvern,
            38 => Beast::Roc,
            39 => Beast::Harpy,
            40 => Beast::Pegasus,
            41 => Beast::Hippogriff,
            42 => Beast::Fenrir,
            43 => Beast::Jaguar,
            44 => Beast::Satori,
            45 => Beast::DireWolf,
            46 => Beast::Bear,
            47 => Beast::Wolf,
            48 => Beast::Mantis,
            49 => Beast::Spider,
            50 => Beast::Rat,
            51 => Beast::Kraken,
            52 => Beast::Colossus,
            53 => Beast::Balrog,
            54 => Beast::Leviathan,
            55 => Beast::Tarrasque,
            56 => Beast::Titan,
            57 => Beast::Nephilim,
            58 => Beast::Behemoth,
            59 => Beast::Hydra,
            60 => Beast::Juggernaut,
            61 => Beast::Oni,
            62 => Beast::Jotunn,
            63 => Beast::Ettin,
            64 => Beast::Cyclops,
            65 => Beast::Giant,
            66 => Beast::NemeanLion,
            67 => Beast::Berserker,
            68 => Beast::Yeti,
            69 => Beast::Golem,
            70 => Beast::Ent,
            71 => Beast::Troll,
            72 => Beast::Bigfoot,
            73 => Beast::Ogre,
            74 => Beast::Orc,
            75 => Beast::Skeleton,
            _ => Beast::None,
        }
    }
}

mod constants;
mod store;
mod events;
mod emitter;

mod types {
    mod beast;
    mod tier;
    mod slot;
    mod offense;
    mod defense;
    mod direction;
    mod attribute;
}

mod elements {
    mod tiers {
        mod interface;
        mod s;
        mod a;
        mod b;
        mod c;
        mod d;
    }
    mod offenses {
        mod interface;
        mod blade;
        mod bludgeon;
        mod magic;
    }
    mod beasts {
        mod interface;
        // mod warlock;
        // mod typhon;
        // mod jiangshi;
        // mod anansi;
        // mod basilisk;
        // mod gorgon;
        // mod kitsune;
        // mod lich;
        // mod chimera;
        // mod wendigo;
        // mod rakshasa;
        // mod werewolf;
        // mod banshee;
        // mod draugr;
        // mod vampire;
        // mod goblin;
        // mod ghoul;
        // mod wraith;
        // mod sprite;
        // mod kappa;
        mod fairy;
        // mod leprechaun;
        // mod kelpie;
        // mod pixie;
        // mod gnome;
        // mod griffin;
        // mod manticore;
        // mod phoenix;
        // mod dragon;
        // mod minotaur;
        // mod qilin;
        // mod ammit;
        // mod nue;
        // mod skinwalker;
        // mod chupacabra;
        // mod weretiger;
        // mod wyvern;
        // mod roc;
        // mod harpy;
        // mod pegasus;
        // mod hippogriff;
        // mod fenrir;
        // mod jaguar;
        // mod satori;
        // mod direwolf;
        mod bear;
        // mod wolf;
        // mod mantis;
        // mod spider;
        // mod rat;
        // mod kraken;
        // mod colossus;
        // mod balrog;
        // mod leviathan;
        // mod tarrasque;
        // mod titan;
        // mod nephilim;
        // mod behemoth;
        // mod hydra;
        // mod juggernaut;
        // mod oni;
        // mod jotunn;
        // mod ettin;
        // mod cyclops;
        // mod giant;
        // mod nemean_lion;
        // mod berserker;
        // mod yeti;
        // mod golem;
        // mod ent;
        // mod troll;
        // mod bigfoot;
        // mod ogre;
        // mod orc;
        mod skeleton;
    }
}

mod models {
    mod index;
    mod player;
    mod adventurer;
    mod realm;
    mod dungeon;
    mod room;
    mod mob;
}

mod components {
    mod signable;
    mod playable;
}

mod systems {
    mod actions;
}

mod helpers {
    mod bitmap;
    mod math;
    mod seeder;
    mod packer;
}

#[cfg(test)]
mod tests {
    mod setup;
    mod test_actions_setup;
    mod test_actions_move;
    mod test_actions_explore;
    mod test_actions_interact;
    mod test_actions_update;
}


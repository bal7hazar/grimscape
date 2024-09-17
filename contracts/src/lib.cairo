mod constants;
mod store;

mod types {
    mod beast;
    mod direction;
}

// mod elements {
// }

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
    mod campagn;
}

mod helpers {
    mod bitmap;
    mod math;
    mod seeder;
}

#[cfg(test)]
mod tests {
    mod setup;
    mod test_campagn_setup;
    mod test_campagn_move;
    mod test_campagn_explore;
    mod test_campagn_interact;
    mod test_campagn_multi;
}


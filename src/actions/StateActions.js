import dispatcher from "../dispatcher";

export function onStart(loops, ceils, difficulty) {
    dispatcher.dispatch({
        type: "START_ACTION",
        loops: loops,
        ceils: ceils,
        difficulty: difficulty
    });
}

export function onClick(ceil) {
    dispatcher.dispatch({
        type: "CLICK_ACTION",
        ceil: ceil
    });
}
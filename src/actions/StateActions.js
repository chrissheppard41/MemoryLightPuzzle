import dispatcher from "../dispatcher";

export function onStart(loops, ceils) {
    dispatcher.dispatch({
        type: "START_ACTION",
        loops: loops,
        ceils: ceils
    });
}

export function onClick(ceil) {
    dispatcher.dispatch({
        type: "CLICK_ACTION",
        ceil: ceil
    });
}
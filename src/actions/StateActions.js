import dispatcher from "../dispatcher";

/**
 * On game start dispatch this action
 */
export function onStart() {
    dispatcher.dispatch({
        type: "START_ACTION"
    });
}

/**
 * On the click of a cei, dispatch this action
 * @param ceil
 */
export function onClick(ceil) {
    dispatcher.dispatch({
        type: "CLICK_ACTION",
        ceil: ceil
    });
}
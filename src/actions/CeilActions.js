import dispatcher from "../dispatcher";

export function whenClicked() {
    dispatcher.dispatch({
        type: "CLICK_EVENT"
    })
}
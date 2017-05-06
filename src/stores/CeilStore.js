import { EventEmitter } from 'events';
import dispatcher from "../dispatcher";

class CeilStore extends EventEmitter {
    constructor() {
        super();

        this.ceils = [
            {
                colour: "red"
            },
            {
                colour: "blue"
            },
            {
                colour: "green"
            },
            {
                colour: "purple"
            },
            {
                colour: "cyan"
            }
        ];
    }

    onClickEvent() {
        console.log("hello");
    }

    getAll() {
        return this.ceils;
    }

    handleActions(action) {
        console.log("Action", action);

        switch(action.type) {
            case "CLICK_EVENT":
                this.onClickEvent();
                break;
            default:

                break;
        }
    }
}

const ceilStore = new CeilStore();
dispatcher.register(ceilStore.handleActions.bind(ceilStore));
window.dispatcher = dispatcher;
export default ceilStore;
import { EventEmitter } from 'events';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import dispatcher from "../dispatcher";

class StateStore extends EventEmitter {
    constructor() {
        super();

        this.ceils = [];
        this.sequence = [];
        this.user_sequence = [];
    }

    setLoops(loop) {
        this.loops = loop;
    }
    getCeils() {
        return this.ceils;
    }
    setCeils(ceils) {
        //if the ceils passed in is somehow greater than 9, set to 9
        if(ceils > 9) ceils = 9;
        const colours = ["red", "green", "blue", "purple", "cyan", "yellow", "magenta", "orange", "chartreuse"];

        this.ceils = [];
        for (var i = 0, j = ceils; i < j; i++) {
            if(i >= ceils) break;
            this.ceils.push({id: i, colour: colours[i]});
        }
    }

    startGame(loops, ceils) {
        console.log("Starting the game", "loops", loops, "ceils", ceils);

        this.sequence = [3,1,4,0,2];

        this.setLoops(loops);
        this.setCeils(ceils);

        console.log("--->", this.getCeils());

        this.runSequence();

        //when you hit this function, tell the core that you are making a change
        this.emit("change");
    }

    runSequence() {
        this.sequence.forEach((item, index) => {
            console.log(item);
        })
    }

    recordClick(ceil) {
        this.user_sequence.push(ceil);

        if(this.sequence.length === this.user_sequence.length) {
            this.gameResults();
        }
    }

    /**
     * end game
     */
    gameResults() {
        console.log("Done");
        var sequences_match = this.sequence.every((v,i)=> v === this.user_sequence[i]);

        console.log("Sequence matches", sequences_match);
    }

    handleStateActions(action) {
        console.log("State Action", action);

        switch(action.type) {
            case "START_ACTION":
                this.startGame(action.loops, action.ceils);
                break;
            case "CLICK_ACTION":
                this.recordClick(action.ceil);
                break;
            default:
                console.log("State Action unknown");
                break;
        }
    }
}

const stateStore = new StateStore();
dispatcher.register(stateStore.handleStateActions.bind(stateStore));

export default stateStore;
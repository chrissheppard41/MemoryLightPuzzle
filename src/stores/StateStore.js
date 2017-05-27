import { EventEmitter } from 'events';
import dispatcher from "../dispatcher";

class StateStore extends EventEmitter {
    constructor() {
        super();

        this.ceils = [];
        this.animation_count = 0;
        this.sequence = [];
        this.user_sequence = [];
        this.difficulty = 1000;
    }

    /**
     * reset the game
     */
    reset() {
        this.ceils = [];
        this.animation_count = 0;
        this.sequence = [];
        this.user_sequence = [];
        this.difficulty = 1000;
    }

    setDifficulty(difficulty) {
        switch(difficulty) {
            case "easy":
                this.difficulty = 1300;
                break;
            case "hard":
                this.difficulty = 700;
                break;
            default:
                this.difficulty = 1000;
                break;
        }
    }
    getDifficult() {
        return this.difficulty;
    }

    setLoops(loop) {
        this.loops = loop;
    }
    getCeils() {
        return this.ceils;
    }

    animationComplete() {
        return this.animation_count >= this.sequence.length;
    }
    setAnimationCount() {
        this.animation_count++;
    }

    setCeils(ceils) {
        //if the ceils passed in is somehow greater than 9, set to 9
        if(ceils > 9) ceils = 9;
        const colours = ["red", "green", "blue", "purple", "cyan", "yellow", "magenta", "orange", "chartreuse"];

        this.ceils = [];
        for (var i = 0, j = ceils; i < j; i++) {
            if(i >= ceils) break;
            this.ceils.push({id: i, colour: colours[i], sequence: this.sequence[i], state: "preparing"});
        }
    }

    startGame(loops, ceils) {
        console.log("Starting the game", "loops", loops, "ceils", ceils);

        this.sequence = [0,1,2,3,4];

        this.setLoops(loops);
        this.setCeils(ceils);

        console.log("--->", this.getCeils());

        //when you hit this function, tell the core that you are making a change
        this.emit("ceils_updated");
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

        //reset the click count by user and the animation count
        this.animation_count = 0;
        this.user_sequence = [];

        if(sequences_match) {
            //@todo display a success message
            console.log("Done");

            this.ceils = [];
            this.sequence = [];

        } else {
            //@todo display a failed message
            console.log("Failed but done");

            //reset animation by clearing the ceils, then adding them back in
            //this.emit("ceils_clear");
            //this.emit("ceils_updated");
        }
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
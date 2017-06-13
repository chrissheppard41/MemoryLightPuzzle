import { EventEmitter } from 'events';
import dispatcher from "../dispatcher";

class StateStore extends EventEmitter {
    constructor() {
        super();

        this.game_can_be_in_these_states = [
            "Start",
            "Waiting",
            "End_success",
            "End_failure"
        ];

        this.reset();
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
        this.gameState = this.game_can_be_in_these_states[0];

        this.emit("game_state");
    }

    getGameState() {
        return this.gameState;
    }
    setGameState(state) {
        this.gameState = this.game_can_be_in_these_states[state];
    }

    setDifficulty(difficulty) {
        switch(difficulty) {
            case "easy":
                this.difficulty = 1400;
                break;
            case "hard":
                this.difficulty = 800;
                break;
            default:
                this.difficulty = 1100;
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
        for (let i = 0, j = ceils; i < j; i++) {
            if(i >= ceils) break;
            this.ceils.push({id: i, colour: colours[i], triggers: this.sequence[i], state: "preparing"});
        }
    }

    getRandomSequence(ceils) {
        //if the ceils passed in is somehow greater than 9, set to 9
        if(ceils > 9) ceils = 9;

        let min = Math.ceil(0);
        let max = Math.floor(ceils);

        let arr = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };

        for (let i = 0, j = ceils; i < j; i++) {
            //on the randomly generated number, add it in as the index, then use the for loop index to get it's time of
            //execution
            let random = Math.floor(Math.random() * (max - min)) + min;
            arr[random].push((i * this.getDifficult()) + 500);

            //arr.push(Math.floor(Math.random() * (max - min)) + min);
        }
        return arr;
    }

    startGame(loops, ceils) {
        console.log("Starting the game", "loops", loops, "ceils", ceils);

        this.sequence = this.getRandomSequence(ceils);

        this.setLoops(loops);
        this.setCeils(ceils);

        this.emit("ceils_updated");

        console.log("--->", this.getCeils());
        //console.log("--->", this.sequence);

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
        let sequences_match = this.sequence.every((v,i)=> v === this.user_sequence[i]);

        console.log("Sequence matches", sequences_match);

        //reset the click count by user and the animation count
        this.animation_count = 0;
        this.user_sequence = [];

        if(sequences_match) {
            this.setGameState(2);
            console.log("Done");

            this.ceils = [];
            this.sequence = [];

        } else {
            this.setGameState(3);
            console.log("Failed but done");

            //reset animation by clearing the ceils, then adding them back in
            //this.emit("ceils_clear");
            //this.emit("ceils_updated");
        }

        this.emit("ceils_clear");

        //@todo possibly put this into the set game state method
        this.emit("game_state");
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
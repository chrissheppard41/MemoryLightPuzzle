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
        this.ceil_count = 6;
        this.ceils = [];
        this.animation_count = 0;
        this.sequence = [];
        this.trigger = {};
        this.user_sequence = [];
        this.difficulty = 1000;
        this.loops = 5;
        this.gameState = this.game_can_be_in_these_states[0];

        this.emit("game_state");
    }

    /**
     * the current game state
     * @returns {string|*|string}
     */
    getGameState() {
        return this.gameState;
    }

    /**
     * Sets the state of the game which tells the engine what to display
     * @param state
     */
    setGameState(state) {
        this.gameState = this.game_can_be_in_these_states[state];
    }

    /**
     * Set the difficulty of the game
     * @param difficulty string of the difficulty
     */
    setDifficulty(difficulty) {
        switch(difficulty) {
            case "easy":
                this.difficulty = 1300;
                this.loops = 4;
                this.ceil_count = 3;
                break;
            case "hard":
                this.difficulty = 700;
                this.loops = 6;
                this.ceil_count = 9;
                break;
            default:
                this.difficulty = 1000;
                this.loops = 5;
                this.ceil_count = 6;
                break;
        }
    }

    /**
     * get the difficulty
     * @returns {number}
     */
    getDifficult() {
        return this.difficulty;
    }

    /**
     * sets the ceils and all the data related to the state to be based into the Grid render
     * @returns {Array}
     */
    getCeils() {
        return this.ceils;
    }

    /**
     * Is the animation complete so enable clicks
     * @returns {boolean}
     */
    animationComplete() {
        return this.animation_count >= (this.loops - 1);
    }

    /**
     * set the animation count
     */
    setAnimationCount() {
        this.animation_count++;
    }

    /**
     * Generates the ceils to be passed into the Component Grid render to generate the child ceils
     * @param ceils
     */
    setCeils(ceils) {
        //if the ceils passed in is somehow greater than 9, set to 9
        if(ceils > 9) ceils = 9;
        const colours = ["red", "green", "blue", "purple", "cyan", "yellow", "magenta", "orange", "chartreuse"];

        this.ceils = [];
        for (let i = 0, j = ceils; i < j; i++) {
            if(i >= ceils) break;
            this.ceils.push({id: i, colour: colours[i], triggers: this.trigger[i], state: "preparing"});
        }
    }

    /**
     * The main functionality to set the the random sequence and when it should be triggered
     * @param ceils the ceils for the game, based on difficulty
     * @param loops the a mount of loops to do, based on difficulty
     */
    setRandomSequence(ceils, loops) {
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
        let sequence = [];

        for (let i = 0, j = loops; i < j; i++) {
            //on the randomly generated number, add it in as the index, then use the for loop index to get it's time of
            //execution
            let random = Math.floor(Math.random() * (max - min)) + min;
            arr[random].push((i * this.getDifficult()) + 500);
            sequence.push(random);
        }

        //set the triggers and the generated sequence
        this.trigger = arr;
        this.sequence = sequence;
    }

    /**
     * the main function to create the ceils, the loops, the sequence and triggers
     */
    startGame() {
        console.log("Starting the game", "loops", this.loops, "ceils count", this.ceil_count);

        this.setRandomSequence(this.ceil_count, this.loops);

        //this.setLoops(loops);
        this.setCeils(this.ceil_count);

        this.emit("ceils_updated");

        console.log("--->", this.getCeils());
        console.log("--->", this.sequence);

    }

    /**
     * on click record the ceil that was clicked
     * @param ceil int, position of the ceil clicked
     */
    recordClick(ceil) {
        this.user_sequence.push(ceil);

        if(this.loops === this.user_sequence.length) {
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
        }

        this.emit("ceils_clear");

        //@todo possibly put this into the set game state method
        this.emit("game_state");
    }

    /**
     * This states actions
     * @param action the variables set in the State action
     */
    handleStateActions(action) {
        console.log("State Action", action);

        switch(action.type) {
            case "START_ACTION":
                this.startGame();
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
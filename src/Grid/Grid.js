import React, { Component } from 'react';
import * as StateActions from '../actions/StateActions';
import StateStore from '../stores/StateStore';
import Ceil from './Ceil';

class Grid extends Component {
    constructor() {
        super();
        //bind the get ceils state to this component so that when called it understands to execute the function
        this.setCeils = this.setCeils.bind(this);

        //bind the get ceils state to this component so that when called it understands to execute the function
        this.clearCeils = this.clearCeils.bind(this);

        this.gameState = this.gameState.bind(this);

        //set the default state
        this.state = {
            Ceils: StateStore.getCeils(),
            difficulty: "normal",
            difficulty_seconds: StateStore.getDifficult(),
            game_state: StateStore.getGameState()
        }
    }

    /**
     * On components first load, set up a listener to listen for changes to the state, so that everytime something happens,
     * say on ceil update, update the DOM with the new state
     */
    componentWillMount() {
        StateStore.on("ceils_updated", this.setCeils);
        StateStore.on("ceils_clear", this.clearCeils);
        StateStore.on("game_state", this.gameState);
    }

    /**
     * Get the updated Ceils data
     */
    setCeils() {
        this.setState({
            Ceils: StateStore.getCeils()
        });
    }


    clearCeils() {
        this.setState({
            Ceils: []
        });
    }

    /**
     * Start the game mechanics
     */
    startGame() {
        StateActions.onStart(5, 5, this.state.difficulty);
        StateStore.setGameState(1);
        this.gameState();
    }

    /**
     * Sets the difficulty of the game
     * @param event
     */
    difficulty(event) {
        this.setState({
            difficulty: event.target.value,
            difficulty_seconds: StateStore.setDifficulty(event.target.value)
        });

        event.preventDefault();
    }

    gameState() {
        console.log(StateStore.getGameState());

        this.setState({
            game_state: StateStore.getGameState()
        });
    }

    restart(event) {
        StateStore.reset();

        event.preventDefault();
    }

    /**
     * Render this component
     * @returns {XML}
     */
    render() {
        console.log("Render");
        const { Ceils } = this.state;

        var items = Ceils.map((item, index) =>
            <Ceil key={item.id} colour={item.colour} id={item.id} sequence={item.sequence} state={item.state} />
        );

        var intro = this.state.game_state !== "Start" ? "state intro hide" : "state intro show";
        var waiting = this.state.game_state !== "Waiting" ? "state " + this.state.difficulty + " hide" : "state" + this.state.difficulty + " show";
        var end_success = this.state.game_state !== "End_success" ? "state success hide" : "state success show";
        var end_failing = this.state.game_state !== "End_failure" ? "state failure hide" : "state failure show";


        return (
            <div className="container">
                <div className={ intro }>
                    <label htmlFor="difficult">Difficulty:</label>
                    <select name="difficult" value={this.state.difficulty} onChange={this.difficulty.bind(this)}>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button onClick={this.startGame.bind(this)}>Start Game</button>
                </div>
                <ul className={ waiting }>
                    {items}
                </ul>
                <p className={ end_success }>You have matched everything correctly. <a href="#" onClick={this.restart.bind(this)}>Click here to play again.</a></p>
                <p className={ end_failing }>You have matched incorrectly. <a href="#" onClick={this.restart.bind(this)}>Click here to play again.</a></p>
            </div>
        );
    }
}

export default Grid;

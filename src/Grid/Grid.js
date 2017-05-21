import React, { Component } from 'react';
import * as StateActions from '../actions/StateActions';
import StateStore from '../stores/StateStore';
import Ceil from './Ceil';

class Grid extends Component {
    constructor() {
        super();
        //bind the get ceils state to this component so that when called it understands to execute the function
        this.setCeils = this.setCeils.bind(this);

        //set the default state
        this.state = {
            Ceils: StateStore.getCeils(),
            difficulty: "normal"
        }
    }

    /**
     * On components first load, set up a listener to listen for changes to the state, so that everytime something happens,
     * say on ceil update, update the DOM with the new state
     */
    componentWillMount() {
        StateStore.on("ceils_updated", this.setCeils);
    }

    /**
     * Get the updated Ceils data
     */
    setCeils() {
        this.setState({
            Ceils: StateStore.getCeils()
        });
    }

    /**
     * Start the game mechanics
     */
    startGame() {
        StateActions.onStart(5, 5, this.state.difficulty);
    }

    /**
     * Sets the difficulty of the game
     * @param event
     */
    difficulty(event) {
        this.setState({
            difficulty: event.target.value
        });

        event.preventDefault();
    }



    /**
     * Render this component
     * @returns {XML}
     */
    render() {
        const { Ceils } = this.state;

        var items = Ceils.map((item, index) =>
            <Ceil key={item.id} colour={item.colour} id={item.id} sequence={item.sequence} state={item.state} />
        );

        return (
            <div className="container">
                <label htmlFor="difficult">Difficulty:</label>
                <select name="difficult" value={this.state.difficulty} onChange={this.difficulty.bind(this)}>
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="difficult">Difficult</option>
                </select>
                <button onClick={this.startGame.bind(this)}>Start Game</button>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

export default Grid;

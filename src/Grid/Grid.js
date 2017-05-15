import React, { Component } from 'react';
import * as StateActions from '../actions/StateActions';
import StateStore from '../stores/StateStore';
import Ceil from './Ceil';

class Grid extends Component {
    constructor() {
        super();
        //bind the get ceils state to this component so that when called it understands to execute the function
        this.getCeils = this.getCeils.bind(this);

        //set the default state
        this.state = {
            Ceils: StateStore.getCeils()
        }
    }

    /**
     * On components first load, set up a listener to listen for changes to the state, so that everytime something happens,
     * say on ceil update, update the DOM with the new state
     */
    componentWillMount() {
        StateStore.on("change", this.getCeils);
    }

    /**
     * Get the updated Ceils data
     */
    getCeils() {
        this.setState({
            Ceils: StateStore.getCeils()
        });
    }

    /**
     * Start the game mechanics
     */
    startGame() {
        StateActions.onStart(5, 5);
    }

    /**
     * Render this component
     * @returns {XML}
     */
    render() {
        const { Ceils } = this.state;

        var items = Ceils.map((item, index) =>
            <Ceil key={item.id} colour={item.colour} id={item.id} />
        );

        return (
            <div className="container">
                <button onClick={this.startGame.bind(this)}>Start Game</button>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

export default Grid;

import React, { Component } from 'react';
import './Ceil.css';
import * as StateActions from '../actions/StateActions';
import StateStore from '../stores/StateStore';

class Ceil extends Component {

    constructor(props) {
        super(props);

        this.resetCeil = this.resetCeil.bind(this);
        //this.animate = this.animate().bind(this);

        //because we are changing the classes within this component, we set a state for the ceil, which can go between
        //preparing, animate and ready
        this.state = {
            state: props.state
        };
    }

    /**
     * Once the component mounts, call the animation method
     */
    componentDidMount() {
        //StateStore.on("animate");
        this.startAnimation(this.props.triggers);
        console.log("Mount", this.props.state, this.props.id, this.props.triggers);
    }

    /**
     * reset the ceil class name in the state
     */
    resetCeil() {
        this.setState({state: "preparing"});
    }

    /**
     * On click on any of the ceils within the grid, animate the click, and then store the event within the stateStore
     * via action
     * @param event
     */
    gridClick(event) {
        console.log("On click", this.props.id);
        if(StateStore.animationComplete()) {
            this.animate(() => { StateActions.onClick(this.props.id); });
        } else {
            console.log("Animation is not yet done yet!");
        }
    }

    /**
     * This is the startAnimation method fires when the component is first mounted, it sets the time in which to execute
     * using the sequence. All this function does, is changes the class on each of the ceils. CSS transitions will take
     * care of the rest
     */
    startAnimation(triggers) {
        triggers.forEach((execute) => {
            console.log("Animating", execute);
            setTimeout(() => this.animate(), execute);
        });
    }

    /**
     * The animation class sets the initial state when executed to animate, after X amount of milliseconds change the
     * state to ready, ready means that the ceil can be clicked
     */
    animate(after_state) {
        this.setState({state: "progress"});
        setTimeout(() => {
            this.setState({state: "ready"});

            //any extra callback functionality after setting the state to ready
            if(typeof after_state === "function") after_state();
            //no need to increment the count when clicking
            if(!StateStore.animationComplete()) {
                StateStore.setAnimationCount();
            }
        }, (StateStore.getDifficult() / 2));
    }

    /**
     * Render output
     * @returns {XML}
     */
    render() {
        const className = this.props.colour + " " + this.state.state;

        return (
            <li onClick={this.gridClick.bind(this)} className={className}>
            </li>
        );
    }
}

export default Ceil;

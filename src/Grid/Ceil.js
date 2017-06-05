import React, { Component } from 'react';
import './Ceil.css';
import * as StateActions from '../actions/StateActions';
import StateStore from '../stores/StateStore';

class Ceil extends Component {

    constructor(props) {
        super(props);

        this.resetCeil = this.resetCeil.bind(this);

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
        this.startAnimation();
    }

    resetCeil() {
        this.setState({state: "preparing"});
    }

    /**
     * On click on any of the ceils within the grid, animate the click, and then store the event within the stateStore
     * via action
     * @param event
     */
    gridClick(event) {
        //@todo fix the animation effect
        console.log("On click", this.props.id);
        if(StateStore.animationComplete()) {
            StateActions.onClick(this.props.id);
            this.animate();
        } else {
            console.log("Animation is not yet done yet!");
        }
    }

    /**
     * This is the startAnimation method fires when the component is first mounted, it sets the time in which to execute
     * using the sequence. All this function does, is changes the class on each of the ceils. CSS transitions will take
     * care of the rest
     */
    startAnimation() {
        const execute = (this.props.sequence * StateStore.getDifficult()) + 500;
        setTimeout(() => this.animate(), execute);
    }

    /**
     * The animation class sets the initial state when executed to animate, after X amount of milliseconds change the
     * state to ready, ready means that the ceil can be clicked
     */
    animate() {
        this.setState({state: "animate"});
        setTimeout(() => {
            this.setState({state: "ready"});
            //no need to increment the count when clicking
            if(!StateStore.animationComplete()) {
                StateStore.setAnimationCount();
            }
        }, 1000);
    }

    /**
     * Render output
     * @returns {XML}
     */
    render() {
        const className = this.props.colour + " " + this.state.state;

        return (
            <li onClick={this.gridClick.bind(this)} className={className}>
                Ceil
            </li>
        );
    }
}

export default Ceil;

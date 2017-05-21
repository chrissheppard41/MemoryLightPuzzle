import React, { Component } from 'react';
import './Ceil.css';
import * as StateActions from '../actions/StateActions';
import StateStore from '../stores/StateStore';

class Ceil extends Component {

    constructor(props) {
        super(props);

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

    /**
     * On click on any of the ceils within the grid, animate the click, and then store the event within the stateStore
     * via action
     * @param event
     */
    gridClick(event) {
        console.log("On click", this.props.id);
        if(StateStore.animationComplete()) {
            console.log("Animation complete");
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
     * @todo 1s could be more dynamic, on a harder game this should be quicker, css classes should refect this number
     */
    startAnimation() {
        const execute = (this.props.sequence * 1000) + 500;
        setTimeout(() => this.animate(), execute);
    }

    /**
     * The animation class sets the initial state when executed to animate, after X amount of milliseconds change the
     * state to ready, ready means that the ceil can be clicked
     * @todo we should not allow the user to click too soon before the animation cycle is completed. Set something to stop the user clicking too soon
     * @todo StateStore.setAnimationCount once the animation is complete this should not call again, make sure it doesn't
     */
    animate() {
        this.setState({state: "animate"});
        setTimeout(() => {
            this.setState({state: "ready"});
            StateStore.setAnimationCount();
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
                Hello
            </li>
        );
    }
}

export default Ceil;

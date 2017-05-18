import React, { Component } from 'react';
import './Ceil.css';
import * as StateActions from '../actions/StateActions';
//import StateStore from '../stores/StateStore';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Ceil extends Component {

    gridClick(event) {
        console.log("On click", this.props.id);
        StateActions.onClick(this.props.id);
    }

    render() {
        //const time_out = (this.props.id * 1000);
/*
*
 onClick={this.gridClick.bind(this)}
 className={this.props.colour}
* */
        return (
            <TransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeave={false}
                component="li"
            >
                <div>
                    Hello
                </div>
            </TransitionGroup>
        );
    }
}

export default Ceil;

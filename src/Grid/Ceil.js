import React, { Component } from 'react';
import './Ceil.css';
import * as StateActions from '../actions/StateActions';
import StateStore from '../stores/StateStore';

class Ceil extends Component {

    gridClick(event) {
        console.log("On click", this.props.id);
        StateActions.onClick(this.props.id);
    }

    transitions() {

    }

    render() {
        return (
            <li className={this.props.colour} onClick={this.gridClick.bind(this)}>

            </li>
        );
    }
}

export default Ceil;

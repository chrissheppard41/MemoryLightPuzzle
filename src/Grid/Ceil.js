import React, { Component } from 'react';
import * as CeilActions from '../actions/CeilActions';
import './Ceil.css';

class Ceil extends Component {

    gridClick(event) {
        console.log("On click", this);
        CeilActions.whenClicked();
    }

    render() {
        return (
            <li className={this.props.colour} onClick={this.gridClick.bind(this)}>

            </li>
        );
    }
}

export default Ceil;

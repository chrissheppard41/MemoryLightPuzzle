import React, { Component } from 'react';
import Ceil from './Ceil';
import CeilStore from '../stores/CeilStore';

class Grid extends Component {
    constructor () {
        super ();

        this.state = {
            Ceils: CeilStore.getAll()
        }
    }


    render() {
        const items = this.state.Ceils.map((item, index) =>
            <Ceil key={index} colour={item.colour} />
        );

        return (
            <ul>
                {items}
            </ul>
        );
    }
}

export default Grid;

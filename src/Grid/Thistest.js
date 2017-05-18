import React, { Component } from 'react';

import TransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Thistest extends Component {

    /**
     * Render this component
     * @returns {XML}
     */
    render() {
        const time_out = 2000;
        return (
            <TransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={time_out}
                transitionEnter={false}
                transitionLeave={false}
                component="div">
                <span>Fading at Initial Mount :o</span>
            </TransitionGroup>
        );
    }
}

export default Thistest;

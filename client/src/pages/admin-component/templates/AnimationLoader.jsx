import React, { Component, Fragment } from 'react';

class AnimationLoader extends Component {
    render() {
        return (
            <Fragment>
                <svg id="darkLoader" className="sembunyi" width="100%" viewBox="0 0 100 100">
                    <circle className="circle" id="circle-1" cx={50} cy={50} r={1000} fill="rgba(0, 0, 0, .25)" />
                    <circle className="circle" id="circle-2" cx={50} cy={50} r={10} fill="rgba(0, 0, 0, .25)" />
                    <circle className="circle" id="circle-3" cx={50} cy={50} r={10} fill="rgba(0, 0, 0, .25)" />
                </svg>
                <svg id="lightLoader" className="sembunyi" width="100%" viewBox="0 0 100 100">
                    <circle className="circle" id="circle-1" cx={50} cy={50} r={1000} fill="rgba(255, 255, 255, .25)" />
                    <circle className="circle" id="circle-2" cx={50} cy={50} r={10} fill="rgba(255, 255, 255, .25)" />
                    <circle className="circle" id="circle-3" cx={50} cy={50} r={10} fill="rgba(255, 255, 255, .25)" />
                </svg>
            </Fragment>
        );
    }
}

export default AnimationLoader;
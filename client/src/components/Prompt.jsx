import React from 'react';
import $ from 'jquery';

class Prompt extends React.Component {
    constructor(props) {
        super(props);
    }

    // style={{width: "50%"}}
    render() {
        return(
            <div style={{float: 'right', marginRight: '50px'}} className="container">
                <h2>Try drawing this!</h2>
                <h3>{this.props.photo.prompt}</h3>
                <button>Reveal Photo!</button>
                <img width="650px" src={this.props.photo.photoregular}></img>
            </div>
        );
    }
}

export default Prompt;
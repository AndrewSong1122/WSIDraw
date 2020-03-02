import React from 'react';

class Prompt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.showPhoto) {
            var content = (<button onClick={this.props.revealPhoto}>Reveal Photo!</button>);
        } else {
            var content = (<img width="650px" src={this.props.photo.photoregular}></img>);
        }

        return(
            <div className="container">
                <h1>Try drawing this!</h1>
                <h2>{this.props.photo.prompt}</h2>
                {content}
            </div>
        );
    }
}

export default Prompt;
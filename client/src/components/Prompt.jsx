import React from 'react';

class Prompt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.showPhoto) {
            var content = (<button onClick={this.props.revealPhoto}>Reveal Photo!</button>);
        } else {
            var content = (
                <React.Fragment>
                    <img style={{maxWidth: "900px", maxHeight: "700px"}} src={this.props.photo.photoregular}></img>
                    <h4>{`Photo courtesy of `}<a href={this.props.photo.userprofile} target="_blank">{`${this.props.photo.username} @ Unsplash`}</a></h4>
                </React.Fragment>
            );
        }

        return(
            <div className="container">
                <h2>Try drawing this!</h2>
                <h2>{this.props.photo.prompt}</h2>
                {content}
            </div>
        );
    }
}

export default Prompt;
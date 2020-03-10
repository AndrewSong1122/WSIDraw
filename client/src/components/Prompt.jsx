import React from 'react';

class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: Date.now()
        };
    }

    newId() {
        this.setState({
            id: Date.now()
        });
    }

    render() {
        if(!this.props.showPhoto) {
            var content = (<button onClick={this.props.revealPhoto}>Reveal Photo!</button>);
            var header = (
                <React.Fragment>
                    <h2>Try drawing this!</h2>
                    <h3>{this.props.photo.prompt}</h3>
                </React.Fragment>
            );
        } else {
            var content = (
                <React.Fragment>
                    <img style={{maxWidth: "900px", maxHeight: "600px"}} src={this.props.photo.photoregular}></img>
                    <h3>{this.props.photo.prompt}</h3>
                    <h5>{`Photo courtesy of `}<a href={this.props.photo.userprofile} target="_blank">{`${this.props.photo.username} @ Unsplash`}</a></h5>
                    <h3>Submit your drawing!</h3>
                    <form target="hidden-iframe" encType="multipart/form-data" action={`/api/upload/${this.state.id}`} method="post">
                        <input name="submission" id="image-file" type="file" accept="image/*"/>
                        <input onClick={this.newId.bind(this)} type="submit"></input>
                    </form>
                    <iframe name="hidden-iframe" style={{display: 'none'}}></iframe>
                </React.Fragment>
            );
            var header = (<h2><a href="#" onClick={this.props.newPhoto}>What should I draw next?</a></h2>);
        }

        return(
            <div className="container">
                {header}
                {content}
            </div>
        );
    }
}

export default Prompt;
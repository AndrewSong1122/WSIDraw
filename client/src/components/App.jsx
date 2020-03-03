import React from 'react';
import $ from 'jquery';
import Paint from './Paint.jsx';
import Prompt from './Prompt.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {},
            showPhoto: false
        };
        this.getRandomPic = this.getRandomPic.bind(this);
        this.revealPhoto = this.revealPhoto.bind(this);
    }

    getRandomPic() {
        $.get('http://localhost:3000/api/randompic', (photo) => {
            this.setState({photo});
        });
    }

    revealPhoto() {
        this.setState({showPhoto: true});
    }

    componentDidMount() {
        this.getRandomPic();
    }

    render() {
        return(
            <React.Fragment>
                <div class="flex">
                    <Paint />
                    <Prompt revealPhoto={this.revealPhoto} showPhoto={this.state.showPhoto} photo={this.state.photo} />
                </div>
                {/* <div>
                    <h1>Here's what others drew!</h1>
                </div> */}
            </React.Fragment>);
    }
}

export default App;
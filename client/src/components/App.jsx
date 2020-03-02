import React from 'react';
import $ from 'jquery';
import Paint from './Paint.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        
    }

    render() {
        return(<Paint />);
    }
}

export default App;
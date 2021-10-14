import React, { Component } from 'react';
import HomeContent from './HomeContent';
import Slider from './Slider';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div>
                <Slider />
                <br></br>
                <HomeContent/>
            </div>
        );
    }
}
export default Home;

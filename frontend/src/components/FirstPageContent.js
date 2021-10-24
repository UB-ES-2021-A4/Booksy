import React, { Component } from 'react';
import Slider from "./Slider";
import Categories from "./Categories";

export default class FirstPageContent extends Component{
    render() {
        return(
            <section>
                <Slider />
                <br/><br/><br/><br/>
                <Categories />
            </section>
        );
    }
}

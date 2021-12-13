import React, { Component } from 'react';
import FirstPageContent from './FirstPageContent';


class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.checkIfUser = this.checkIfUser.bind(this);
    }

    componentDidMount() {
        this.checkIfUser();
    }

    checkIfUser () {
        if (window.localStorage.getItem('user_id') !== null) {
            window.location.assign("/homePage")
        }
    }
    render(){
        return(
            <section>
                <FirstPageContent/>
            </section>
        );
    }
}
export default FirstPage;

import React, { Component } from 'react';
import ConfirmationGif from '../pictures/confrimation.gif'
import './Cart.css'

export default class Confirmation extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <h1 className="centered_title"> Confirmation </h1>
                <br/>
                <center>
                    <img src={ConfirmationGif} alt="order-done" />
                    <br/><br/>
                    <h2>Your have officially completed your order!!</h2>
                    <p className="subtext-confirmation" >Would you like to continue shopping? Go to <a href='/home_page'>Home page</a> and enjoy.</p>
                </center>
            </div>
        );
    }
}

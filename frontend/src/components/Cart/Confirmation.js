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
                <div className="card">
                    <div className="card-header">
                        <div className="steps">
                            <div className="step-done"><span className="step-done-span">Check-out</span></div>
                            <div className="step-done"><span className="step-done-span">Shipping</span></div>
                            <div className="step-done"><span className="step-done-span">Payment</span></div>
                            <div className="step-done"><span className="step-done-span">Review</span></div>
                            <div className="step-active"><span className="step-active-span">Confirmation</span></div>
                        </div>
                    </div>
                </div>
                <br/>
                <h1 className="centered_title"> Confirmation </h1>
                <br/>
                <center>
                    <img src={ConfirmationGif} alt="order-done" />
                    <br/><br/>
                    <h1>You have officially completed your order!!</h1>
                    <h5 className="subtext-confirmation" >Would you like to continue shopping? Go to <a href='/home_page'>Home page</a> and enjoy.</h5>
                    <br/>
                </center>
            </div>
        );
    }
}

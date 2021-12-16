import React, { Component } from 'react';
import ConfirmationGif from '../pictures/confrimation.gif'
import './Cart.css'

export default class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.makeTimer()
        this.clearLocalStorage()
    }


    clearLocalStorage() {
        localStorage.setItem('items_to_cart', [])
    }

    makeTimer(){
        setInterval(() => {
            if (window.localStorage.getItem('user_id') === null) {
                this.logOut()
            }
        }, 750)
    }

    logOut()  {
        this.props.history.push('/');
    }

    back = e => {
        this.props.prevStep();
    };

    render() {
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
                    <h5 className="subtext-confirmation" >Would you like to continue shopping? Go to Home page and enjoy.</h5>
                    <br/>
                </center>
            </div>
        );
    }
}

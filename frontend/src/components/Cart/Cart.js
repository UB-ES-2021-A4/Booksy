import React, {Component} from "react";
import Review from "./Review";
import Confirmation from "./Confirmation";
import Payment from "./Payment";
import Shipping from "./Shipping";
import Checkout from "./Checkout";
import emptyCart from '../pictures/empty_cart.png'
import {withRouter} from "react-router-dom";

const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            nombre: '',
            apellidos: '',
            email: '',
            direccion: '',
            ciudad: '',
            pais: '',
            codigoPostal: 0,
            nombreTarjeta: '',
            numeroTarjeta: 0,
            expDate: '',
            CVV: 0,
            subtotal: 0,
            num_items: 0,
            items_to_cart: [],
        };
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    prev2Steps = () => {
        const { step } = this.state;
        this.setState({
            step: step - 2
        });
    };

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    getStore() {
        return this.state;
    }

    setStore(store) {
        this.setState({
            nombre: store.nombre,
            apellidos: store.apellidos,
            direccion: store.direccion,
            ciudad: store.ciudad,
            pais: store.pais,
            codigoPostal: store.codigoPostal,
            nombreTarjeta: store.nombreTarjeta,
            numeroTarjeta: store.numeroTarjeta,
            expDate: store.expDate,
            CVV: store.CVV,
            subtotal: store.subtotal,
            num_items: store.num_items,
        })
    }

    componentDidMount() {
        this.setItems = this.setItems.bind(this);
        this.setItems()
    }

    setItems() {
        if (this.props.location.state) {
            this.state.items_to_cart = JSON.parse(localStorage.getItem("items_to_cart"));
        }
    }

    render() {
        const { step } = this.state;
        const { nombre, apellidos, email, direccion, ciudad, pais, codigoPostal, nombreTarjeta, numeroTarjeta, expDate, CVV, subtotal, num_items } = this.state;
        const values = { nombre, apellidos, email, direccion, ciudad, pais, codigoPostal, nombreTarjeta, numeroTarjeta, expDate, CVV, subtotal, num_items };

        switch (step) {
            case 1:
                if (this.props.location.state.items_to_cart.length > 0){
                    return (
                        <Checkout
                            nextStep={this.nextStep}
                            handleChange={() => this.handleChange}
                            getStore={() => (this.getStore())}
                            setStore = {(e) => this.setStore(e)}
                            values={values}
                        />
                    );
                } else {
                    return (
                        <div>
                            <center>
                                <img className="align-content-center" style={{width:'450px', height:'375px'}} src={emptyCart} alt="emptyCart" /><br/>
                                <br/>
                                <a href='/home_page'><b>Shop for items now!</b></a>
                            </center>
                        </div>
                    );
                }
            case 2:
                return (
                    <Shipping
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        getStore={() => (this.getStore())}
                        setStore = {(e) => this.setStore(e)}
                        handleChange={() => this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <Payment
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        getStore={() => (this.getStore())}
                        setStore = {(e) => this.setStore(e)}
                        handleChange={() => this.handleChange}
                        values={values}
                    />
                );
            case 4:
                return (
                    <Review
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        prev2Steps={this.prev2Steps}
                        getStore={() => (this.getStore())}
                        handleChange={() => this.handleChange}
                        values={values}
                    />
                );
            case 5:
                return <Confirmation />;
            default:
                (console.log('This is a multi-step form built with React.'))
        }
    }
}

export default withRouter(Cart);

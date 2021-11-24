import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PaymentPhoto from "../pictures/payment.png";

const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreTarjeta: props.getStore().nombreTarjeta,
            numeroTarjeta: props.getStore().numeroTarjeta,
            expDate: props.getStore().expDate,
            expMonth: 0,
            expYear: 0,
            CVV: props.getStore().CVV,
            nombre: props.getStore().nombre,
            apellidos: props.getStore().apellidos,
            direccion: props.getStore().direccion,
            ciudad: props.getStore().ciudad,
            pais: props.getStore().pais,
            codigoPostal: props.getStore().codigoPostal,
            subtotal: props.getStore().subtotal,
            num_items: props.getStore().num_items,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.getStore())
    }


    continue = e => {
        e.preventDefault();
        this.updateStoreInfo();
        console.log(this.props.values)
        this.props.nextStep();
    };

    getExpDate () {
        let exp = this.state.expMonth.toString() + '/' + this.state.expYear.toString()
        return exp
    }

    back = e => {
        e.preventDefault();
        this.updateStoreInfo();
        this.props.prevStep();
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    updateStoreInfo() {

        this.props.values.nombreTarjeta = this.state.nombreTarjeta
        this.props.values.numeroTarjeta = this.state.numeroTarjeta
        this.props.values.expDate= this.getExpDate();
        this.props.values.CVV = this.state.CVV
        this.props.values.nombre = this.state.nombre
        this.props.values.apellidos = this.state.apellidos
        this.props.values.direccion= this.state.direccion
        this.props.values.ciudad = this.state.ciudad
        this.props.values.pais = this.state.pais
        this.props.values.codigoPostal = this.state.codigoPostal
        this.props.values.subtotal = this.state.subtotal
        this.props.values.num_items = this.state.num_items
        this.setState({
            [this.props.values]: this.state
        });
        console.log(this.props.values)
        this.props.setStore(this.props.values)
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="steps">
                            <div className="step-done"><span className="step-done-span">Check-out</span></div>
                            <div className="step-done"><span className="step-done-span">Shipping</span></div>
                            <div className="step-active"><span className="step-active-span">Payment</span></div>
                            <div className="step"><span className="step-span">Review</span></div>
                            <div className="step"><span className="step-span">Confirmation</span></div>
                        </div>
                    </div>
                </div>
                <br/>
                <Container>
                    <Row>
                        <Col md={"auto"}>
                            <ArrowBackIosNewIcon className="arrowBack" onClick={this.back}/>
                        </Col>
                        <Col >
                            <h1 className="centered_title">Payment Information</h1>
                        </Col>
                    </Row>
                </Container>
                <section>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col  xs lg="5">
                                <br/><br/>
                                <h4>Rellena todos los campos, por favor.</h4>
                                <br/>
                                <form action="">
                                    <div className="input-field">
                                        <input type="text" id="nombreTarjeta" onChange={this.handleChange} required/>
                                        <label htmlFor="nombreTarjeta">Nombre de la Tarjeta</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="numeroTarjeta" onChange={this.handleChange} required/>
                                        <label htmlFor="numeroTarjeta">Número de la Tarjeta</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="expMonth" onChange={this.handleChange} required/>
                                        <label htmlFor="expMonth">Mes de expiración</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="expYear" onChange={this.handleChange} required/>
                                        <label htmlFor="expYear">Año de expiración</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="CVV" onChange={this.handleChange} required/>
                                        <label htmlFor="CVV">CVV</label>
                                    </div>
                                </form>
                                <br/>
                                <button className="button-changeToPayment" onClick={this.continue} id="proceedReview">Proceed to Review</button>
                            </Col>
                            <Col md={"auto"}>
                                <br/><br/>
                                <div className="vl"/>
                                <br/><br/>
                            </Col>
                            <Col xs lg={5}>
                                <center>
                                    <br/><br/>
                                    <img className="img-shipping" src={PaymentPhoto} width={525} height={500} alt="img-shipping"/>
                                </center>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}


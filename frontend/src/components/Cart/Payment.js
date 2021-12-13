import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PaymentPhoto from "../pictures/payment.png";
import swal from "sweetalert";

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
        this.makeTimer()
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

    continue = e => {
        e.preventDefault();
        if (this.checkFormParams()) {
            this.updateStoreInfo();
            this.props.nextStep();
        }
    };

    fillAllParamsAlert () {
        // Use sweetalert2
        swal('Error', 'In order to continue shopping, all parameters should be\n filled correctly.', 'error');
    };

    wrongDateAlert () {
        // Use sweetalert2
        swal('Error', 'Month and year should be two-digit numbers.', 'error');
    };

    wrongCVVAlert () {
        // Use sweetalert2
        swal('Error', 'CVV number can only be a three-digit number.', 'error');
    };

    wrongNumberCardAlert () {
        // Use sweetalert2
        swal('Error', 'Card number can only be a 16-digit number.', 'error');
    };

    checkFormParams() {
        let CVV_String = (this.state.CVV).toString()
        let CVV_Result = CVV_String.match(/\d{3}/);

        let dateString = (this.state.expMonth).toString() + '/' + (this.state.expYear).toString()
        let dateResult = dateString.match(/[0-9]{2}(\/)\d{2}/);

        let numString = (this.state.numeroTarjeta).toString()
        let numResult = numString.match(/\d{16}/);

        if (this.state.nombreTarjeta === '' || this.state.numeroTarjeta === 0
            || this.state.expMonth === 0 || this.state.expYear === 0 || this.state.CVV === 0) {
            this.fillAllParamsAlert();
            return false
        } else if (dateString.length !== 5 || dateResult === null) {
            this.wrongDateAlert();
            return false
        } else if (CVV_Result === null) {
            this.wrongCVVAlert();
            return false
        } else if (numResult === null) {
            this.wrongNumberCardAlert();
            return false
        }
        return true;
    }

    getExpDate () {
        return this.state.expMonth.toString() + '/' + this.state.expYear.toString()
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
        this.props.setStore(this.props.values)
    }

    render() {
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
                                        <input type="number" id="numeroTarjeta" maxLength={16} onChange={this.handleChange} required/>
                                        <label htmlFor="numeroTarjeta">Número de la Tarjeta</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="expMonth" min={1} max={12} maxLength={2} onChange={this.handleChange} required/>
                                        <label htmlFor="expMonth">Mes de expiración</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="expYear" min={0} max={99} maxLength={2} onChange={this.handleChange} required/>
                                        <label htmlFor="expYear">Año de expiración</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="CVV" min={100} max={999} maxLength={3} onChange={this.handleChange} required/>
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


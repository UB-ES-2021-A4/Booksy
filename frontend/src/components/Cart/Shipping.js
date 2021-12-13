import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ShippingPhoto from "../pictures/shipping.jpg";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './Cart.css'
import swal from "sweetalert";

export default class Shipping extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.makeTimer();
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

    checkFormParams() {
        let portalString = (this.state.codigoPostal).toString()
        let postalResult = portalString.match(/\d{5}/);
        if (this.state.nombre === '' || this.state.apellidos === '' || this.state.direccion === '' ||
            this.state.ciudad === '' || this.state.pais === '' || this.state.codigoPostal === 0) {
            return false
        } else return (this.state.codigoPostal.length < 6 && postalResult !== null);
    }

    fillAllParamsAlert () {
        // Use sweetalert2
        swal('Error', 'In order to continue shopping, all parameters should be\n filled correctly. \n The zip code can only be a five-digit number.', 'error');
    };


    continue = e => {
        if (this.checkFormParams()) {
            this.updateStoreInfo();
            this.props.nextStep();
        } else {
            this.fillAllParamsAlert();
        }
    };

    back = e => {
        this.props.prevStep();
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    updateStoreInfo() {
        this.props.values.nombre = this.state.nombre
        this.props.values.apellidos = this.state.apellidos
        this.props.values.direccion = this.state.direccion
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
                            <div className="step-active"><span className="step-active-span">Shipping</span></div>
                            <div className="step"><span className="step-span">Payment</span></div>
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
                            <h1 className="centered_title">Shipping Information</h1>
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
                                        <input type="text" id="nombre" onChange={this.handleChange} required/>
                                        <label htmlFor="nombre">Nombre</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="text" id="apellidos" onChange={this.handleChange} required/>
                                        <label htmlFor="apellidos">Apellidos</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="text" id="direccion" onChange={this.handleChange} required/>
                                        <label htmlFor="direccion">Dirección</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="text" id="ciudad" onChange={this.handleChange} required/>
                                        <label htmlFor="ciudad">Ciudad</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="text" id="pais" onChange={this.handleChange} required/>
                                        <label htmlFor="pais">País</label>
                                    </div>
                                    <br/>
                                    <div className="input-field">
                                        <input type="number" id="codigoPostal" maxLength={5} min={0} onChange={this.handleChange} required/>
                                        <label htmlFor="codigoPostal">Código Postal</label>
                                    </div>
                                </form>
                                <br/>
                                <button className="button-changeToPayment" onClick={this.continue} id="proceedPayment">Proceed to Payment</button>
                            </Col>
                            <Col md={"auto"}>
                                <br/><br/>
                                <div className="vl"/>
                                <br/><br/>
                            </Col>
                            <Col xs lg={5}>
                                <center>
                                    <br/><br/>
                                    <img className="img-shipping" src={ShippingPhoto} width={525} height={500} alt="img-shipping"/>
                                </center>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}

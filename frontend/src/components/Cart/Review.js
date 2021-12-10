import React, { Component } from 'react';
import './Cart.css'
import {Col, Container, Row} from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import swal from "sweetalert";

//const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreTarjeta: props.getStore().nombreTarjeta,
            numeroTarjeta: props.getStore().numeroTarjeta,
            expDate: props.getStore().expDate,
            CVV: props.getStore().CVV,
            nombre: props.getStore().nombre,
            apellidos: props.getStore().apellidos,
            direccion: props.getStore().direccion,
            ciudad: props.getStore().ciudad,
            pais: props.getStore().pais,
            codigoPostal: props.getStore().codigoPostal,
            subtotal: props.getStore().subtotal,
            num_items: props.getStore().num_items,
            shipping: 0,
            orderTotal: 0,
        };
    }

    componentWillMount() {
        this.calculateShipping = this.calculateShipping.bind(this);
        this.calculateShipping();
    }

    calculateShipping () {
        let ship = this.state.num_items * 3
        let total = ship + this.state.subtotal
        this.setState({shipping: ship, orderTotal: total})
    }

    order = event => {
        event.preventDefault()

        //We are using FormData because the backend needs a form-encoded data (request.POST)
        let formItem = new FormData()
        let ids = Object.values(this.props.getStore().items_to_cart)
        for (let i=0; i < ids.length; i++){
            formItem.append('id', ids[i])
        }
        formItem.append('name',this.state.nombre)
        formItem.append('surnames',this.state.apellidos)
        formItem.append('direction',this.state.direccion)
        formItem.append('city', this.state.ciudad)
        formItem.append('country',this.state.pais)
        formItem.append('zip_code',this.state.codigoPostal)
        formItem.append('card_name', this.state.nombreTarjeta)
        formItem.append('card_num',this.state.numeroTarjeta)
        formItem.append('expiration_card', this.state.expDate)
        formItem.append('cvv',this.state.CVV)

        axios.post(`${url}/api/buy/`, formItem,
            {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
            .then((res) => {
                console.error(res.data)
                this.continue()
            })
            .catch((error) => {
                this.errorInPostAlert()
                console.error(error)
            })
    }

    errorInPostAlert () {
        swal('Error', 'Something went wrong while making your order. \n Try again later.', 'error');
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    back2 = e => {
        e.preventDefault();
        this.props.prev2Steps();
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
                            <div className="step-active"><span className="step-active-span">Review</span></div>
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
                            <h1 className="centered_title">Review</h1>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <Container className="container container-order border">
                    <Row>
                        <Col>
                            <h4>Item subtotal: {this.state.subtotal}€</h4>
                            <h4>Shipping: {this.state.shipping}€</h4>
                        </Col>
                        <Col>
                            <center>
                                <br/>
                                <h3><b>Order total: {this.state.orderTotal}€</b></h3>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <button className="button button-order" id="order" onClick={this.order}>Order</button>
                    </Row>
                </Container>
                <br/>
                <Container>
                    <Row>
                        <Col>
                            <Container className="container border">
                                <Row>
                                    <h3 className="review-card-title"><b>Shipping Information</b></h3>
                                    <br/>
                                    <body className="card-body review-body">
                                        <h5><b>Nombre: {this.state.nombre}</b></h5>
                                        <h5><b>Apellidos: {this.state.apellidos}</b></h5>
                                        <h5><b>Dirección: {this.state.direccion}</b></h5>
                                        <h5><b>Ciudad: {this.state.ciudad}</b></h5>
                                        <h5><b>País: {this.state.pais}</b></h5>
                                        <h5><b>Código Postal: {this.state.codigoPostal}</b></h5>
                                    </body>
                                </Row>
                                <Row>
                                    <button className="button button-editar" onClick={this.back2}>EDITAR</button>
                                </Row>
                            </Container>
                        </Col>
                        <Col>
                            <Container className="container border">
                                <Row>
                                    <h3 className="review-card-title"><b>Payment Information</b></h3>
                                    <br/>
                                    <body className="card-body review-body">
                                    <h5  className="spaces_cart"><b>Nombre de la Tarjeta: {this.state.nombreTarjeta}</b></h5>
                                    <h5  className="spaces_cart"><b>Número de la Tarjeta: {this.state.numeroTarjeta} </b></h5>
                                    <h5  className="spaces_cart"><b>Fecha de Expiración: {this.state.expDate}</b></h5>
                                    <h5  className="spaces_cart"><b>CVV:{this.state.CVV} </b></h5>
                                    </body>
                                </Row>
                                <Row>
                                    <button className="button button-editar" onClick={this.back}>EDITAR</button>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <br/><br/>
            </div>
        );
    }
};



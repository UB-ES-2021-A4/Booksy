import React, { Component } from 'react';
import './Cart.css'
import {Col, Container, Row} from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

export default class Review extends Component {
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
        const { values, handleChange } = this.props;
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
                            <h4>Item subtotal: </h4>
                            <h4>Shipping: </h4>
                        </Col>
                        <Col>
                            <center>
                                <br/>
                                <h3><b>Order total: </b></h3>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <button className="button button-order" id="order" onClick={this.continue}>Order</button>
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
                                        <h5><b>Nombre: </b></h5>
                                        <h5><b>Apellidos: </b></h5>
                                        <h5><b>Dirección: </b></h5>
                                        <h5><b>Ciudad: </b></h5>
                                        <h5><b>País: </b></h5>
                                        <h5><b>Código Postal: </b></h5>
                                        <h5><b>Email: </b></h5>
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
                                    <h5  className="spaces"><b>Nombre de la Tarjeta: </b></h5>
                                    <h5  className="spaces"><b>Número de la Tarjeta: </b></h5>
                                    <h5  className="spaces"><b>Mes de Expiración: </b></h5>
                                    <h5  className="spaces"><b>año de Expiración: </b></h5>
                                    <h5  className="spaces"><b>CVV: </b></h5>
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



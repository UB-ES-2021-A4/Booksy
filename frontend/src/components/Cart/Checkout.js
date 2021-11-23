import React, { Component } from 'react';
import {Col, Row, Container, Card} from 'react-bootstrap';
import './Cart.css'
import './wizard-stepper.css'
import Book1 from '../pictures/book1.png'
import VerifiedSharpIcon from "@mui/icons-material/VerifiedSharp";
import axios from "axios";

const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            items_to_cart: [],
        }
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    };

    componentDidMount() {
        this.getCards = this.getCards.bind(this);
        this.getCards()
    }

    getCards() {
        this.state.items_to_cart = JSON.parse(localStorage.getItem("items_to_cart"));

        axios.get(`${url}/api/product/`)
            .then((res)=> {
                this.populateCards(res.data)
            })
    };

    populateCards = async data => {
        this.state.cards = []
        let tmp = []

        for (let index = 0; index < data.length; index++) {
            if (this.state.items_to_cart.includes(data[index]['id'])) {
                data[index]['images'] = []
                await axios.get(`${url}/api/product/image/?id=${data[index]['id']}`)
                    .then((res) => {
                        data[index]['images'].push(res.data['image'])
                    })
                    .catch((error) => {
                        console.log(error)
                        data[index]['images'] = []
                    })
                tmp.push(data[index])
            }
        }
        this.setState({cards: tmp});
        //setState calls render() when used and is an asynchronous function, care headaches!
    }

    renderCards() {
        const allCards = this.state.cards
        return allCards.map(card =>
            <Card className="card border">
                <Row>
                    <Col xs lg={3}>
                        <br/>
                        <center>
                            <img width={175}
                                 height={250}
                                 src={`${url}${card['images']}`}
                                 alt="No image"
                            />
                        </center>
                        <br/>
                    </Col>
                    <Col xs lg={7}>
                        <body>
                        <br/>
                        <Row>
                            <h1>{card['title']}</h1>
                        </Row>
                        <Row>
                            <p><b>Sold by username1234</b></p>
                        </Row>
                        <br/>
                        <Row>
                            <h3>Description:</h3>
                            <p>{card['description']}</p>
                        </Row>
                        </body>
                    </Col>
                    <Col xs lg={2}>
                        <center >
                            <br/>
                            <h1>{card['price']}€</h1>
                            <button className="button button-erase">ERASE</button>
                        </center>
                    </Col>
                </Row>
            </Card>
        );
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="checkout">
                <div className="card">
                    <div className="card-header">
                        <div className="steps">
                            <div className="step-active"><span className="step-active-span">Check-out</span></div>
                            <div className="step"><span className="step-span">Shipping</span></div>
                            <div className="step"><span className="step-span">Payment</span></div>
                            <div className="step"><span className="step-span">Review</span></div>
                            <div className="step"><span className="step-span">Confirmation</span></div>
                        </div>
                    </div>
                </div>
                <br/>
                <h1 className="centered_title"> Check-out Information </h1> <br/>
                <section className="subHeader">
                    <Container>
                        <center>
                            <Row>
                                <Col>
                                    <h5><b>Total items:</b> </h5>
                                </Col>
                                <Col>
                                    <button className="button button-changeStep" id="proceedShipping" onClick={this.continue}>Proceed to Shipping</button>
                                </Col>
                                <Col>
                                    <h5><b>Subtotal:</b> </h5>
                                </Col>
                            </Row>
                        </center>
                    </Container>
                </section>
                <br/><br/>
                <section >
                    <Container>
                        {this.renderCards()}
                        <br/>
                    </Container>
                </section>
            </div>
        )
    }
}

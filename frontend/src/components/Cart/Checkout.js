import React, { Component } from 'react';
import {Col, Row, Container, Card} from 'react-bootstrap';
import './Cart.css'
import './wizard-stepper.css'
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
            subtotal: props.getStore().subtotal,
            num_items: props.getStore().num_items,
        }
    }
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
        let total = 0
        for (let index = 0; index < data.length; index++) {
            if (this.state.items_to_cart.includes(data[index]['id'])) {
                data[index]['images'] = []
                total += data[index]['price']
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
        let items_num = this.state.items_to_cart.length
        this.setState({cards: tmp, subtotal: total, num_items: items_num});
    }

    renderCards() {
        const allCards = this.state.cards
        return allCards.map(card =>
            <section>
                <Card className="card border checkout_card">
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
                <br/>
            </section>

        );
    }

    continue = e => {
        e.preventDefault();
        this.updateStoreInfo();
        this.props.nextStep();

    };

    updateStoreInfo() {
        this.props.values.subtotal = this.state.subtotal
        this.props.values.num_items = this.state.num_items
        this.setState({
            [this.props.values]: this.state
        });
        this.props.setStore(this.props.values)
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
                <h1 className="centered_title"> Check-out Information </h1>
                <br/>
                <section className="subHeader">
                    <Container>
                        <center>
                            <Row>
                                <Col>
                                    <h5><b>Total items: {this.state.items_to_cart.length}</b></h5>
                                </Col>
                                <Col>
                                    <button className="button button-changeStep" id="proceedShipping" onClick={this.continue}>Proceed to Shipping</button>
                                </Col>
                                <Col>
                                    <h5><b>Subtotal: {this.state.subtotal}€</b></h5>
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

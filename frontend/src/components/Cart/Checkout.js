import React, { Component } from 'react';
import {Col, Row, Container, Card} from 'react-bootstrap';
import './Cart.css'
import './wizard-stepper.css'
import axios from "axios";
import emptyCart from "../pictures/empty_cart.png";

const deploy_url = 'https://booksy-es2021.herokuapp.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;


export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            items_to_cart: [],
            sellers: [],
            subtotal: props.getStore().subtotal,
            num_items: props.getStore().num_items,
        }
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

    componentDidMount() {
        this.getCards = this.getCards.bind(this);
        this.getCards()
    }

    getCards = async data => {
        if ([localStorage.getItem('items_to_cart')][0] !== "") {
            let splitted_text = (JSON.stringify(localStorage.getItem('items_to_cart'))).split(",");

            if (splitted_text.length > 1) {
                splitted_text[0] = parseInt(splitted_text[0].substr(1))

                for (let idx = 1; idx < splitted_text.length - 1; idx ++) {
                    splitted_text[idx] = parseInt(splitted_text[idx])
                }

                let last_word = splitted_text[splitted_text.length - 1]
                last_word = last_word.substr(0, last_word.length - 1)
                splitted_text[splitted_text.length - 1] = parseInt(last_word)

            } else {
                splitted_text[0] = parseInt(splitted_text[0].substr(1, splitted_text[0].length - 2))
            }
            this.setState({items_to_cart : splitted_text})
        }
        await axios.get(`${url}/api/product/`)
            .then((res)=> {
                this.populateCards(res.data)
            })
    };

    populateCards = async data => {
        let tmp = []
        let total = 0
        for (let index = 0; index < data.length; index++) {
            if (this.state.items_to_cart.includes(data[index]['id'])) {
                data[index]['images'] = []
                data[index]['seller_username'] = ''
                total += data[index]['price']

                await axios.get(`${url}/api/account/login/?id=${data[index]['seller']}`)
                    .then((res) => {
                        data[index]['seller_username'] = res.data.username
                    })
                    .catch((error) => {
                        data[index]['seller_username'] = ''
                        console.error(error)
                    })

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
        if (this.state.items_to_cart.length > 0){
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
                                         alt="NoImage"
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
                                    <p><b>Sold by {card['seller_username']}</b></p>
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
                                    <button className="button button-erase" onClick={() => this.eraseItemFromCart(card['id'])}>ERASE</button>
                                </center>
                            </Col>
                        </Row>
                    </Card>
                    <br/>
                </section>
            );
        } else {
            return (
                <div>
                    <center>
                        <img className="align-content-center" style={{width:'450px', height:'375px'}} src={emptyCart} alt="emptyCart" /><br/>
                        <br/>
                        <p><b>Shop for items now!</b></p>
                    </center>
                    <br/>
                </div>
            );
        }

    }

    continue = e => {
        this.updateStoreInfo();
        this.props.nextStep();

    };

    eraseItemFromCart(id) {
        let new_items_list = []
        for (let idx = 0; idx < this.state.items_to_cart.length; idx++) {
            if (this.state.items_to_cart[idx] !== id) {
                new_items_list.push(this.state.items_to_cart[idx]);
            }
        }
        new_items_list = Array.from(new Set(new_items_list))
        localStorage.setItem('items_to_cart', new_items_list)

        this.props.values.items_to_cart = new_items_list
        this.setState({
            [this.props.values]: this.state
        });
        this.props.setStore(this.props.values)
        this.getCards()
    }

    updateStoreInfo() {
        this.props.values.subtotal = this.state.subtotal
        this.props.values.num_items = this.state.num_items
        this.setState({
            [this.props.values]: this.state
        });
        this.props.setStore(this.props.values)
    }

    normalRender () {
        return (
            <section>
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
            </section>
        );
    }

    noItemsRender() {
        return(
            <section >
                <Container>
                    {this.renderCards()}
                    <br/>
                </Container>
            </section>
        );
    }

    thereAreItems() {
        return this.state.items_to_cart.length > 0
    }

    render() {
        return (
            <div className="checkout">
                {this.thereAreItems() ? (
                    this.normalRender()
                ) : (
                    this.noItemsRender()
                )}
            </div>
        )
    }
}

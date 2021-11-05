import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import Libro1 from './pictures/book1.png'
import Libro2 from './pictures/book2.png'
import Libro3 from './pictures/book3.png'
import Libro4 from './pictures/book4.png'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {
                title: '',
                price: 0,
                image: '',
            },
            cards:  null,
        }

    }
    /*Es una idea de como hacerlo dinamico*/
    createCards () {
        for (let index = 0; index < 5; index++) {
            this.state.card = this.state.cards.get(index);
            return (
                <Card className="card-HomePage">
                    <center>
                        <img src={this.state.card.image} width={220} height={260} alt="img1"/>
                    </center>
                    <h3>{this.state.card.title}</h3>
                    <p>{this.state.card.price}</p>
                </Card>
            )
        }
    }

    render () {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h2>Category</h2>
                            <br/>
                        </Col>
                        <Col>
                            <button className="button button-add-item"><a href='/additem' className="a_color">Add Item</a></button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="card-HomePage">
                                <img className="card-img-top image_100" src={Libro1} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">A cout of mist and fury</h4>
                                    <p>15€</p>
                                    <a href="/cart" className="btn button-add-to-cart button-add-item">Add to cart</a>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="card-HomePage">
                                <img className="card-img-top image_100" src={Libro2} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">The Ballad of Songbirds and Snakes</h4>
                                    <p>16.20€</p>
                                    <a href="/cart" className="btn button-add-to-cart button-add-item">Add to cart</a>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="card-HomePage">
                                <img className="card-img-top image_100" src={Libro3} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">The Hobbit</h4>
                                    <p>10€</p>
                                    <a href="/cart" className="btn button-add-to-cart button-add-item">Add to cart</a>
                                </div>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="card-HomePage">
                                <img className="card-img-top image_100" src={Libro4} alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">A Cruel Prince</h4>
                                    <p>15€</p>
                                    <a href="/cart" className="btn button-add-to-cart button-add-item">Add to cart</a>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                </Container>
            </div>
        );
    }
}

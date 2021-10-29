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
            card : null,
            cards:  null,
        }

    }
    /*Es una idea de como hacerlo dinamico*/
    createCards (){
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
                    <h2>Category</h2>
                    <Row>
                        <Col>
                            <Card className="card-HomePage">
                                <center>
                                    <img src={Libro1} width={220} height={260} alt="img2"/>
                                </center>
                                <h3>A cout of mist and fury</h3>
                                <p>15€</p>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="card-HomePage">
                                <center>
                                    <img src={Libro2} width={220} height={260} alt="img2"/>
                                </center>
                                <h3>The Ballad of Songbirds and Snakes</h3>
                                <p>16.20€</p>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="card-HomePage">
                                <center>
                                    <img src={Libro3} width={220} height={260} alt="img3"/>
                                </center>
                                <h3>The Hobbit</h3>
                                <p>10€</p>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="card-HomePage">
                                <center>
                                    <img src={Libro4} width={220} height={260} alt="img4"/>
                                </center>
                                <h3>A Cruel Prince </h3>
                                <p>15€</p>
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                </Container>
            </div>
        );
    }
}

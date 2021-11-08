import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import Libro1 from './pictures/book1.png'
import Libro2 from './pictures/book2.png'
import Libro3 from './pictures/book3.png'
import Libro4 from './pictures/book4.png'
import axios from "axios";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {
                title: '',
                price: 0,
                image: '',
            },
            cards: [],
        }
        this.getCards = this.getCards.bind(this);

    }

    componentDidMount() {
        this.getCards()
    }

    getCards() {
        axios.get('http://127.0.0.1:8000/api/product/')
            .then((res)=> {
                this.populateCards(res.data)
            })
    };

    populateCards = async data => {
        this.state.cards = []
        let tmp = []
        for (let index = 0; index < data.length; index++) {
            data[index]['images'] = []
            const axiosResult = await axios.get(`http://127.0.0.1:8000/api/image/?id=${data[index]['id']}`);
            data[index]['images'].push(axiosResult.data['image'])
            tmp.push(data[index])

        }
        this.setState({cards: tmp});
        //setState calls render() when used and is an asynchronous function, care headaches!
    }

    renderCards() {
        const allCards = this.state.cards
        return allCards.map(card => (
            <Col>
                <Card className="card-HomePage">
                    <img className="card-img-top image_100" src={`..${card['images']}`} alt="Card image cap"/>
                    <div className="card-body">
                        <h4 className="card-title">{card['title']}</h4>
                        <p>{`${card['price']} €`}</p>
                        <a href="/cart" className="btn button-add-to-cart button-add-item">Add to cart</a>
                    </div>
                </Card>
            </Col>
        ));
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
                            <a href='/additem' className="a_color">
                            <button className="button button-add-item">Add Item</button>
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        {this.renderCards()}
                    </Row>
                    <br/>
                </Container>
            </div>
        );
    }
}

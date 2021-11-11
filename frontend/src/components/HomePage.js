import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import axios from "axios";
import {withRouter} from "react-router-dom";


class HomePage extends Component {
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

    handleClick = () => {
        this.props.history.push('/additem')
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
            await axios.get(`http://127.0.0.1:8000/api/image/?id=${data[index]['id']}`)
                .then((res) => {
                    data[index]['images'].push(res.data['image'])
                })
                .catch((error) => {
                    data[index]['images'] = []
                })
            tmp.push(data[index])

            }
        this.setState({cards: tmp});
        //setState calls render() when used and is an asynchronous function, care headaches!
    }


    renderCards() {
        const allCards = this.state.cards
        console.error('Render')
        return allCards.map(card =>
            <Col>
                <Card className="card-HomePage">

                    <img className="card-img-top image_100"
                         src={`http://127.0.0.1:8000${card['images']}`}
                         alt="Card image cap"/>

                    <div className="card-body">
                        <h4 className="card-title">{card['title']}</h4>
                        <p>{`${card['price']} €`}</p>
                        <a href="/cart" className="btn button-add-to-cart button-add-item" id="addToCartButton">Add to cart</a>
                    </div>
                </Card>
            </Col>
        );
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
                            <button className="button button-add-item" onClick={this.handleClick}>Add Item</button>
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

export default withRouter(HomePage);

import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import axios from "axios";
import {withRouter} from "react-router-dom";
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
import {Grid} from "@mui/material";

const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {
                title: '',
                price: 0,
                image: '',
                username: '',
            },
            cards: [],
        }
        this.getCards = this.getCards.bind(this);

    }
    isOwner (card) {
        let owner = (window.localStorage.getItem('user_id')).toString()
        return (card.seller).toString() === owner;
    }


    handleClick = () => {
        this.props.history.push('/additem')
    }

    handleClickUpdate = (id) => {
        this.props.history.push({
            pathname: `/updateItems/${id}`,
            state: { id: id}
        });
    }
    handleOpen = (id, image) => {
        this.sleep(700).then(() => {
            this.props.history.push({
                pathname: `/OpenItem/${id}`,
                state: { id: id,  image: image}
            });
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    componentDidMount() {
        this.getCards = this.getCards.bind(this);
        this.getCards()
    }
    refreshPage() {
        window.location.reload(false);
    }

    getCards() {
        axios.get(`${url}/api/product/`)
            .then((res)=> {
                this.populateCards(res.data)
            })
    };

    populateCards = async data => {
        this.state.cards = []
        let tmp = []

        for (let index = 0; index < data.length; index++) {
            data[index]['images'] = []
            await axios.get(`${url}/api/image/?id=${data[index]['id']}`)
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
        return allCards.map(card =>
            <Col key={card['id']} onClick={() => this.handleOpen(card['id'], card['images'])}>
                <Card className="card-HomePage">
                    <img className="card-img-top image_100"
                         src={`${url}${card['images']}`}
                         alt="Card image cap"/>
                    <div className="card-text-left">
                        {this.isOwner(card) ? (
                            <button className="btn-delete"><VerifiedSharpIcon/></button>
                        ) : (
                            <button className="btn-delete visually-hidden"><VerifiedSharpIcon/></button>
                        )}
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{card['title']}</h4>
                        <h5 className="text-end"><b>{`${card['price']} €`}</b></h5>
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
                    <Row className="wrapper">
                        {this.renderCards()}
                    </Row>
                    <br/>
                </Container>
            </div>
        );
    }
}

export default withRouter(HomePage);

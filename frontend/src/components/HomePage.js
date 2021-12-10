import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import axios from "axios";
import {withRouter} from "react-router-dom";
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
import StoreIcon from "@mui/icons-material/Store";
import SearchIcon from "@mui/icons-material/Search";

const deploy_url = 'https://booksy-es2021.herokuapp.com/';
const debug_url = 'http://127.0.0.1:8000';
const url = deploy_url;

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
            items_to_cart: [],
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
        localStorage.setItem("items_to_cart", JSON.stringify(this.state.items_to_cart));
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
        this.addToCart = this.addToCart.bind(this);
        this.getCards()
    }

    getCards() {
        if (this.props.location.state) {
            this.state.items_to_cart = JSON.parse(localStorage.getItem("items_to_cart"));
            this.state.items_to_cart.push(this.props.location.state.item_to_cart)
        }
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
            await axios.get(`${url}/api/product/image/?id=${data[index]['id']}`)
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

    addToCart () {
        if (this.state.items_to_cart !== []) {
            localStorage.setItem("items_to_cart", JSON.stringify(this.state.items_to_cart));
        }
        this.props.history.push({
            pathname: '/cart',
            state: { items_to_cart: this.state.items_to_cart}
        });
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
                    <br/>
                    <Row>
                        <Col className="col-sm-2">
                            <h1>All books</h1>
                            <br/>
                        </Col>
                        <Col>
                            <StoreIcon className="position-right" onClick={this.addToCart}/>
                            <button className="button button-add-item" onClick={this.handleClick}>Add Item</button>
                            <a className="navbar-item-right" >
                                <div className="search-box">
                                    <button className="btn-search"><SearchIcon/></button>
                                    <input type="text" className="input-search" id="search_input" placeholder="Type to Search..."/>
                                </div>
                            </a>
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

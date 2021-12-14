import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import './HomePage-Books.css'
import axios from "axios";
import {withRouter} from "react-router-dom";
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
import StoreIcon from "@mui/icons-material/Store";
import SearchIcon from "@mui/icons-material/Search";
import noItems from '../pictures/no-cards.jpg'

const deploy_url = 'https://booksy-es2021.herokuapp.com';
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
            categories:[["Humanidades", "HM"], ['Técnico y Formación', "TF"], ["Métodos de Idiomas", "MI"],
                        ["Literatura", "LI"], ["Comic y Manga", "CM"], ["Juvenil", "JU"], ["Filología", "FI"],
                        ["Artes", "AR"], ["Ocio", "OC"], ["Cocina", "CO"], ["Fantasía", "FA"],
                        ["Misterio y Thriller", "MT"]],
            cards: [],
            items_to_cart: [],
            header: 'All Books',
        }
        this.getCards = this.getCards.bind(this);
        this.showAllBooks = this.showAllBooks.bind(this);
    }



    isOwner (card) {
        if (window.localStorage.getItem('user_id') === null) {
            this.props.history.push('/')
        } else {
            let owner = (window.localStorage.getItem('user_id')).toString()
            return (card.seller).toString() === owner;
        }
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
        let tmp = []

        for (let index = 0; index < data.length; index++) {
            data[index]['images'] = []
            await axios.get(`${url}/api/product/image/?id=${data[index]['id']}`)
                .then((res) => {
                    data[index]['images'].push(res.data['image'])
                })
                .catch((error) => {
                    data[index]['images'] = []
                    console.error(error)
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
        if (allCards.length !== 0) {
            return allCards.map(card =>
                <Col key={card['id']} onClick={() => this.handleOpen(card['id'], card['images'])}>
                    <Card className="card-HomePage">
                        <img className="card-img-top image_100"
                             src={`${url}${card['images']}`}
                             alt="CardNoimage"/>
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
        } else {
            return (
                <div>
                    <center>
                        <img className="align-content-center img-no-items" src={noItems} alt="NoItemsImage" /><br/>
                        <br/><br/>
                    </center>
                    <br/>
                </div>
            );
        }

    }
    renderMenu () {
        return (
            <div className="menu-category">
                <div className="container-fluid">
                    <Row>
                        <Col sm={2}>
                            <br/><br/>
                            <a className="allBooks text-right" onClick={this.showAllBooks}>
                                BOOKS
                            </a>
                        </Col>
                        <Col sm={1}>
                            <div className="vertical-line"/>
                        </Col>
                        <Col lg={3}>
                            <Row className="top-pad">
                                <div>
                                    <a className="menu-options" id="Humanidades" onClick={() => this.handleSearchByCategory("Humanidades")} >Humanidades</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Técnico y Formación" onClick={() => this.handleSearchByCategory("Técnico y Formación")}>Técnico y Formación</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Métodos de Idiomas" onClick={() => this.handleSearchByCategory("Métodos de Idiomas")}>Métodos de Idiomas</a>
                                </div>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Row className="top-pad">
                                <div>
                                    <a className="menu-options" id="Literatura" onClick={() => this.handleSearchByCategory("Literatura")}>Literatura</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Comic y Manga" onClick={() => this.handleSearchByCategory("Comic y Manga")}>Comic y Manga</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Misterio y Thriller" onClick={() => this.handleSearchByCategory("Misterio y Thriller")}>Misterio y Thriller</a>
                                </div>
                            </Row>
                        </Col>
                        <Col className="left-pad">
                            <Row className="top-pad">
                                <div>
                                    <a className="menu-options" id="Artes" onClick={() => this.handleSearchByCategory("Artes")}>Artes</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Filología" onClick={() => this.handleSearchByCategory("Filología")}>Filología</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Juvenil" onClick={() => this.handleSearchByCategory("Juvenil")}>Juvenil</a>
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="top-pad ">
                                <div>
                                    <a className="menu-options" id="Cocina" onClick={() => this.handleSearchByCategory("Cocina")}>Cocina</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Fantasía" onClick={() => this.handleSearchByCategory("Fantasía")}>Fantasía</a>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="menu-options" id="Ocio" onClick={() => this.handleSearchByCategory("Ocio")}>Ocio</a>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    showAllBooks () {
        axios.get(`${url}/api/product/`)
            .then((res)=> {
                this.setState({header: 'All Books'})
                this.populateCards(res.data)
            })
    }

    handleSearch  = event =>  {
        let string_search =  event.target.value
        axios.get(`${url}/api/product/?search=${string_search}`)
            .then((res)=> {
                console.log(localStorage)
                this.populateCards(res.data)
            })
    }

    getCategoryName (description) {
        for(let idx = 0; idx < this.state.categories.length; idx++) {
            if (this.state.categories[idx][0] === description) {
                return this.state.categories[idx][1]
            }
        }
    }

    handleSearchByCategory (category)  {
        let category_search =  this.getCategoryName(category)
        console.log(category_search)
        axios.get(`${url}/api/product/?category=${category_search}`)
            .then((res)=> {
                this.setState({header: category})
                this.populateCards(res.data)
            })
    }


    render () {
        return (
            <section>
                <input type="checkbox" name="toggle" id="toggle" className="toggle-right"/>
                <label htmlFor="toggle"/>
                <Container className="container-menu">
                    <br/>
                    <Row>
                        <Col className="col-sm-2">
                            <h1>{this.state.header}</h1>
                            <br/>
                        </Col>
                        <Col>
                            <StoreIcon className="position-right" onClick={this.addToCart}/>
                            <button className="button button-add-item" onClick={this.handleClick}>Add Item</button>
                            <a className="navbar-item-right" >
                                <div className="search-box">
                                    <button className="btn-search"><SearchIcon/></button>
                                    <input type="text" className="input-search" id="search_input" placeholder="Type to Search..." onChange={this.handleSearch}/>
                                </div>
                            </a>
                        </Col>
                    </Row>
                    <Row className="wrapper">
                        {this.renderCards()}
                    </Row>
                    <br/>
                </Container>
                <div className="message">
                    {this.renderMenu()}
                </div>
            </section>
        );
    }
}

export default withRouter(HomePage);

import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert";
import {Col, Container, Row} from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {withRouter} from "react-router-dom";
import './OpenItem.css'
import {blue} from "@mui/material/colors";
import {Box} from "@material-ui/core";

const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

class OpenItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            title: '',
            price: 0,
            author: '',
            seller: '',
            category: '',
            description: '',
            image: this.props.location.state.image[0],
            card_id: props.id
        }
    }

    componentDidMount() {
        this.getInfoToLoad = this.getInfoToLoad.bind(this);
        this.getInfoToLoad()
        this.getSellerName()
    }


    handleClick = () => {
        this.props.history.push('/cart')
    }

    getSellerName() {
        console.log(window.localStorage.getItem('username'))
        this.state.seller = (window.localStorage.getItem('user_id')).toString()
        this.setState(this.state)
    }

    getInfoToLoad() {
        axios.get(`${url}/api/product/?id=${this.state.id}`)
            .then((res) => {
                this.state.title = res.data[0].title
                this.state.author = res.data[0].author
                this.state.description = res.data[0].description
                this.state.price = res.data[0].price
                this.state.category = res.data[0].category['category_description']
                this.setState(this.state)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render () {
        return (
            <section>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={"auto"}>
                            <br/>
                            <a className="a_color_black" href='/home_page'>
                                <ArrowBackIosNewIcon className="arrowBack"/>
                            </a>
                        </Col>
                        <Col xs lg="5">
                            <br/>
                            <img className="portrait"
                                 src={`${url}${this.state.image}`}
                                 alt="No image"/>
                            <br/><br/>
                        </Col>
                        <Col xs lg={5}>
                            <br/>
                            <Row className="category_part">
                                <Col>
                                    <button className="button button-category">{this.state.category}</button>
                                </Col>
                            </Row>
                            <br/>
                            <Row className="title_and_author_part">
                                <Col>
                                    <h1><b>{this.state.title}</b></h1>
                                    <h3>By {this.state.author}</h3>
                                </Col>
                            </Row>
                            <br/>
                            <Row className="seller_and_price_part">
                                <Col>
                                    <h5 color={blue.A100}>Sold by {this.state.seller}</h5>
                                </Col>
                                <Col>
                                    <h2 className="text-end">{this.state.price}€</h2>
                                </Col>
                            </Row>
                            <br/>
                            <Row className="description_part">
                                <Col>
                                    <p>{this.state.description}</p>
                                </Col>
                            </Row>
                            <br/>
                            <Row className="add_cart_part align-bottom">
                                <Col>
                                    <button className="button button_add_cart" onClick={this.handleClick}><span>ADD TO CART</span></button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}
export default withRouter(OpenItem);

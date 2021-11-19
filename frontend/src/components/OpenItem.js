import React, {Component} from "react";
import axios from "axios";
import swal from "sweetalert";
import {Col, Container, Row} from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {withRouter} from "react-router-dom";
import './OpenItem.css'
import {blue} from "@mui/material/colors";

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
            image: '',
            card_id: props.id
        }
    }

    componentDidMount() {
        this.getInfoToLoad = this.getInfoToLoad.bind(this);
        this.getImageToLoad()
        this.getInfoToLoad()
    }


    handleClick = () => {
        this.props.history.push('/cart')
    }

    getImageToLoad() {
        axios.get(`${url}/api/image/?id=${this.state.id}`)
            .then((res) => {
                this.state.image = res.data[0].image
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getInfoToLoad() {
        axios.get(`${url}/api/product/?id=${this.state.id}`)
            .then((res) => {
                this.state.title = res.data[0].title
                this.state.author = res.data[0].author
                this.state.description = res.data[0].description
                this.state.price = res.data[0].price
                this.state.category = res.data[0].category['category_description']
                this.state.seller = res.data[0].seller
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
                            <img className="card-img-top image_100"
                                 src={this.state.image}
                                 alt="No image"/>
                        </Col>
                        <Col xs lg={5}>
                            <br/>
                            <Row className="category_part">
                                <Col>
                                    <button className="button button-category">{this.state.category}</button>
                                </Col>
                            </Row>
                            <Row className="title_and_author_part">
                                <Col>
                                    <h1><b>{this.state.title}</b></h1>
                                    <h2>By {this.state.author}</h2>
                                </Col>
                            </Row>
                            <Row className="seller_part">
                                <Col>
                                    <h4 color={blue}>Sold by {this.state.seller}</h4>
                                </Col>
                            </Row>
                            <Row className="price_part">
                                <Col>
                                    <h3>{this.state.price}€</h3>
                                </Col>
                            </Row>
                            <Row className="description_part">
                                <Col>
                                    <p>{this.state.description}</p>
                                </Col>
                            </Row>
                            <Row className="add_cart_part">
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

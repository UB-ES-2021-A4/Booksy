import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {withRouter} from "react-router-dom";
import './OpenItem.css'
import swal from "sweetalert";

const deploy_url = 'https://booksy-es2021.herokuapp.com';
//const debug_url = 'http://127.0.0.1:8000';
const url = deploy_url;


class OpenItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            title: '',
            price: 0,
            author: '',
            seller: '',
            seller_id: 0,
            category: '',
            description: '',
            image: this.props.location.state.image[0],
            card_id: props.id,
            items: [],
        }
    }

    componentDidMount() {
        if ([localStorage.getItem('items_to_cart')][0] !== "") {
            let splitted_text = (JSON.stringify(localStorage.getItem('items_to_cart'))).split(",");
            splitted_text[0] = splitted_text[0].substr(1)
            let last_word = splitted_text[splitted_text.length - 1]
            last_word = last_word.substr(0, last_word.length - 1)
            splitted_text[splitted_text.length - 1] = last_word
            this.setState({items : splitted_text})
        }
        this.getInfoToLoad = this.getInfoToLoad.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.getInfoToLoad()
    }

    handleClick = (isOwner) => {
        if (isOwner) {
            this.props.history.push({
                pathname: `/updateItems/${this.state.id}`,
                state: { id: this.state.id}
            });
        } else {
            let items = this.state.items
            items.push((this.state.id).toString())
            items = Array.from(new Set(items))
            localStorage.setItem('items_to_cart',  items)
            this.props.history.push('/homePage');
        }
    }

    getInfoToLoad() {
        axios.get(`${url}/api/product/?id=${this.state.id}`)
            .then((res) => {
                this.setState({title: res.data[0].title})
                this.setState({author: res.data[0].author})
                this.setState({description: res.data[0].description})
                this.setState({price: res.data[0].price})
                this.setState({category: res.data[0].category['category_description']})
                this.setState({seller_id: res.data[0].seller})

                axios.get(`${url}/api/account/login/?id=${res.data[0].seller}`)
                    .then((res) => {
                        this.setState({seller: res.data.username})
                        this.setState(this.state)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    isOwner(){
        if (window.localStorage.getItem('user_id') === null) {
            this.props.history.push('/');
        } else {
            let user_id = (window.localStorage.getItem('user_id')).toString()
            return user_id === (this.state.seller_id).toString()
        }
    }

    handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`${url}/api/product/?id=${id}`,
                        {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
                        .then(() => {
                            swal("Poof! Your item has been deleted!", {
                                icon: "success",
                            });
                            this.refreshPage();
                        }).catch((error) => {
                        console.error(error)
                        swal('Error', 'Item couldn`t be deleted due to some internal errors.', 'error')
                    })

                } else {
                    swal("Success", "Your item is safe!", 'success');
                }
            });
    }

    refreshPage() {
        this.props.history.push({
            pathname: '/homePage',
        });
    }


    render () {
        return (
            <section>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={"auto"}>
                            <br/>
                            <a className="a_color_black" >
                                <ArrowBackIosNewIcon className="arrowBack" onClick={this.refreshPage}/>
                            </a>
                        </Col>
                        <Col xs lg="5">
                            <br/>
                            <img className="portrait"
                                 src={`${url}${this.state.image}`}
                                 alt="NoImage"/>
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
                                    <h5>Sold by {this.state.seller}</h5>
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
                                    {this.isOwner() ? (
                                        <Row>
                                            <Col>
                                                <button className="button button_update_item" onClick={() => this.handleClick(this.isOwner())}><span>UPDATE ITEM</span></button>
                                            </Col>
                                            <Col>
                                                <button className="button button_delete_item" onClick={() => this.handleDelete(this.state.id)}><span>DELETE ITEM</span></button>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <button className="button button_add_cart" onClick={() => this.handleClick(this.isOwner())}><span>ADD TO CART</span></button>
                                    )}
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

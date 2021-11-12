import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import axios from "axios";
import {withRouter} from "react-router-dom";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import swal from "sweetalert";


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
                    axios.delete(`http://127.0.0.1:8000/api/product/?id=${id}`)
                        .then((res) => {
                            swal("Poof! Your item has been deleted!", {
                                icon: "success",
                            });
                        }).catch((error) => {
                        console.error(error)
                        swal('Error', 'Item couldn`t be deleted due to some internal errors.', 'error')
                    })

                } else {
                    swal("Success", "Your item is safe!", 'success');
                }
            });
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
            this.stat = window.localStorage.getItem('user_id')
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

                    <img className="card-img-top image_100 "
                         src={`http://127.0.0.1:8000${card['images']}`}
                         alt="Card image cap"/>
                    <button className="btn-delete"><CancelRoundedIcon onClick={() => this.handleDelete(card['id'])}/></button>
                    <div className="card-body">
                        <h4 className="card-title">{card['title']}</h4>
                        <p>{`${card['price']} €`}</p>
                        {this.isOwner(card) ? (
                            <a className="btn button_update button-add-item" id="updateItemButton" onClick={() => this.handleClickUpdate(card['id'])}>Update item</a>
                        ) : (
                            <a href="/cart" className="btn button-add-to-cart button-add-item" id="addToCartButton">Add to cart</a>
                        )}
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

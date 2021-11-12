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
                    axios.delete(`https://booksy.pythonanywhere.com/api/product/?id=${id}`,
                        {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
                        .then((res) => {
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

    componentDidMount() {
        this.getCards()
    }
    refreshPage() {
        window.location.reload(false);
    }

    getCards() {
        axios.get('https://booksy.pythonanywhere.com/api/product/')
            .then((res)=> {
                this.populateCards(res.data)
            })
    };

    populateCards = async data => {
        this.state.cards = []
        let tmp = []

        for (let index = 0; index < data.length; index++) {
            data[index]['images'] = []
            await axios.get(`https://booksy.pythonanywhere.com/api/image/?id=${data[index]['id']}`)
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
                         src={`https://booksy.pythonanywhere.com${card['images']}`}

                         alt="Card image cap"/>
                    {this.isOwner(card) ? (
                        <button className="btn-delete"><CancelRoundedIcon onClick={() => this.handleDelete(card['id'])}/></button>
                    ) : (
                        <button className="btn-delete visually-hidden"><CancelRoundedIcon onClick={() => this.handleDelete(card['id'])}/></button>
                    )}
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

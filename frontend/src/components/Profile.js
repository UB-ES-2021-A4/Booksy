import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import empty from "./pictures/empty_profile.png";
import './Profile.css'
import 'react-tabs/style/react-tabs.css';

//const deploy_url = 'https://booksy.pythonanywhere.com';
const debug_url = 'http://127.0.0.1:8000';
const url = debug_url;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            card: {
                title: '',
                price: 0,
                image: '',
                username: '',
            },
            name: '',
            surname: '',
            email: '',
            image: '',
            num_items: '',
            cards: [],
            items_to_cart: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getUserInfoToLoad = this.getUserInfoToLoad.bind(this);
        this.getUserInfoToLoad()
        this.getCards = this.getCards.bind(this);
        this.getCards()
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleOpen = (id, image) => {
        this.sleep(700).then(() => {
            this.props.history.push({
                pathname: `/OpenItem/${id}`,
                state: { id: id,  image: image}
            });
        });
    }

    getCards() {
        axios.get(`${url}/api/product/`)
            .then((res)=> {
                this.populateCards(res.data)
            })
    };

    populateCards = async data => {
        let tmp_profileCards = []

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
            tmp_profileCards.push(data[index])

        }
        let num_cards = tmp_profileCards.length
        this.setState({cards: tmp_profileCards});
        this.setState({num_items: num_cards});
    }

    isOwner (card) {
        let owner = (window.localStorage.getItem('user_id')).toString()
        return (card.seller).toString() === owner;
    }

    renderCards() {
        const allCards = this.state.cards
        if (allCards.length > 0){
            return allCards.map(card =>
                <section>
                    <Card className="card border checkout_card">
                        <Row>
                            <Col xs lg={3}>
                                <br/>
                                <center>
                                    <img width={125}
                                         height={200}
                                         src={`${url}${card['images']}`}
                                         alt="NoImage"
                                    />
                                </center>
                                <br/>
                            </Col>
                            <Col xs lg={5}>
                                <body>
                                <br/>
                                <Row>
                                    <h2>{card['title']}</h2>
                                </Row>
                                <br/>
                                <Row>
                                    <h4>Description:</h4>
                                    <p>{card['description']}</p>
                                </Row>
                                </body>
                            </Col>
                            <Col xs lg={3}>
                                <Row>
                                    <Col>
                                        <button className="button button-category-profile">{card['category']['category_description']}</button>
                                    </Col>
                                </Row>
                                <br/>
                                <Row className="item-right">
                                    <Col>
                                        <h2>{card['price']}€</h2>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                    <br/>
                </section>
            );
        } else {
            return (
                <div>
                    <center>
                        <img className="align-content-center" style={{width:'550px', height:'275px'}} src={empty} alt="emptyCart" /><br/>
                        <br/>
                        <b>This user isn't currently selling anything!</b>
                    </center>
                    <br/>
                </div>
            );
        }
    }

    getUserInfoToLoad() {
        console.log(this.state.id)
        axios.get(`${url}/api/account/login/?id=${this.state.id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({name: res.data.first_name})
                this.setState({surname: res.data.last_name})
                this.setState({email: res.data.email})
                this.setState({username: res.data.username})
                this.setState({image: res.data.image})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleChangePhoto = event => {
        this.setState({
            image: event.target.files[0]
        });
        //updateInfoUser();
    }


    render () {
        return (
            <div className="row">
                <div className="container emp-profile">
                    <div className="row bgr_img">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img
                                    src={`${url}${this.state.image}`}
                                    alt=""/>
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" name="file" onChange={this.handleChangePhoto}/>
                                </div>
                                <br/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {this.state.name} {this.state.surname}
                                </h5>
                                <p className="profile-rating">Username : <span>{this.state.username}</span></p>
                                <Tabs className="profile-tabs">
                                    <TabList>
                                        <Tab >User's Items</Tab>
                                        <Tab>History</Tab>
                                        <Tab>Balance</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <h2>Available Items this user is currently selling:</h2>
                                        <br/><br/>
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>Any content 3</h2>
                                        <br/><br/>
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>Any content 4</h2>
                                        <br/><br/>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore"
                                   value="Edit Profile"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="contenedor">
                                <div className="col container_foto ">
                                    <article className="text-left">
                                        <h2>Information about this User</h2>
                                        <h4 className="text-left">All you need to know to contact me<br/></h4>
                                        <br/>
                                        <div className="ver_mas text-height">
                                            <h4><CheckSharpIcon/>Full Name: {this.state.name} {this.state.surname}<br/></h4>
                                            <h4><CheckSharpIcon/> Email: {this.state.email} <br/></h4>
                                            <h4><CheckSharpIcon/> Username: {this.state.username} <br/></h4>
                                            <h4><CheckSharpIcon/> Number of items on sales: {this.state.num_items} <br/></h4>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br/><br/><br/><br/>
                            {this.renderCards()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);


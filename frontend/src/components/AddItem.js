import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import './AddItem.css'
import PaymentIcon from "@mui/icons-material/Payment";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ClassIcon from "@mui/icons-material/Class";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";

export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                title: '',
                price: 0,
                category: '',
                description: '',
            },
            categories: {}
        }
        this.getCategories()
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    handleChangeFile = event => {
        this.setState({
            [event.target.id]: event.target.files[0]
        });
    };

    uploadItem = event => {
        event.preventDefault() //?

        //We are using FormData because the backend needs a form-encoded data (request.POST)
        let formItem = new FormData()
        formItem.append('title',this.state.title)
        formItem.append('price',this.state.price)
        formItem.append('author',this.state.author)
        formItem.append('category', this.state.category)
        formItem.append('description',this.state.description)

        axios.post('http://127.0.0.1:8000/api/product/', formItem,
            {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
            .then((res) => {
                console.error(res.data)
                this.uploadImages(res.data)
            })
            .catch((error) => {
                //this.errorInLogInAlert()
               console.error(error)
            })
    }

    uploadImages(product_id) {
        var imgs = new FormData()
        imgs.append('id', product_id)
        imgs.append('image', this.state.images)
        axios.post('http://127.0.0.1:8000/api/image/', imgs,
            {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
            .then((res)=> {

            })
            .catch((error) => {
            console.error(error)
        })
    }

    getCategories() {
        axios.get('http://127.0.0.1:8000/api/category/')
            .then((res)=> {
                this.populateCategories(res.data)
            })
    }

    populateCategories = data => {
        this.state.categories = {}
        let tmp={}
        for (let index = 0; index < data.length; index++) {
            tmp[data[index]['category_name']] = data[index]['category_description']
        }
        this.setState({categories: tmp});
    }

    renderCategories = () => {
        const newCategories = Object.getOwnPropertyNames(this.state.categories);
        return newCategories.map((cat, i) => (
            <option value={cat}>{this.state.categories[cat]}</option>

        ));
    };

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
                        <Col  xs lg="5">
                            <br/>
                            <h1>¡Pon a la venta tu libro!</h1>
                            <h5>Por favor, rellena todos los campos expuestos.</h5>
                            <br/>
                            <form action="">
                                <div className="input-field">
                                    <input type="text" id="title" onChange={this.handleChange} required/>
                                    <label htmlFor="title">Título del libro u objeto</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input type="text" id="author" onChange={this.handleChange} required/>
                                    <label htmlFor="author">Autor del libro</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input type="number" min="0" id="price" onChange={this.handleChange} required/>
                                    <label htmlFor="price">Precio del objeto</label>
                                </div>
                                <br/>

                                <select className="form-select" id="category" onChange={this.handleChange} >
                                    <option selected>Selecciona una categoría</option>
                                        {this.renderCategories()}
                                </select>
                                <br/>
                            </form>
                            <button className="button_login" id="button_submit" onClick={this.uploadItem}>UPLOAD ITEM</button>
                        </Col>
                        <Col md={"auto"}>
                            <br/><br/>
                            <div className="greenLine"/>
                            <br/><br/>
                        </Col>
                        <Col xs lg={5}>
                            <br/><br/>
                            <h5>Añade 3 fotografías como mínimo y una descripción.</h5>
                            <br/>
                            <form action="">
                                <div className="input-field">
                                    <input multiple type="file" id="images" name="myfile" onChange={this.handleChangeFile} />
                                    <label htmlFor="myfile">Select a file:</label><br/>
                                    <br/>
                                </div>
                                <br/><br/>
                                <div className="input-field">
                                    <textarea name="the-textarea" id="description" maxLength="300" placeholder="Write your description" autoFocus onChange={this.handleChange} required/>
                                    <div id="the-count">
                                        <span id="current">0</span>
                                        <span id="maximum">/ 300</span>
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}
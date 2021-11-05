import React, { Component } from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import './HomePage.css'
import './AddItem.css'
import PaymentIcon from "@mui/icons-material/Payment";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ClassIcon from "@mui/icons-material/Class";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                title: '',
                price: 0,
                images: [],
                username: '',
                category: '',
                description: '',
            },
        }
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
                                    <label htmlFor="author">Autor del libro u objeto</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input type="number" min="0" id="price" onChange={this.handleChange} required/>
                                    <label htmlFor="price">Precio del objeto</label>
                                </div>
                                <br/>
                                <select className="form-select" id="category">
                                    <option selected>Selecciona una categoría</option>
                                    <option value="1">Humanidades</option>
                                    <option value="2">Técnico y formación</option>
                                    <option value="3">Métodos de idiomas</option>
                                    <option value="4">Literatura</option>
                                    <option value="5">Comic y Manga</option>
                                    <option value="6">Juvenil</option>
                                    <option value="7">Artes</option>
                                    <option value="8">Filología</option>
                                    <option value="9">Ocio</option>
                                    <option value="10">Cocina</option>
                                    <option value="11">Thriller y terror</option>
                                    <option value="12">Fantasía</option>
                                </select>
                                <br/>
                            </form>
                            <button className="button_login" id="button_submit" >UPLOAD ITEM</button>
                        </Col>
                        <Col md={"auto"}>
                            <br/><br/>
                            <div className="greenLine"/>
                            <br/><br/>
                        </Col>
                        <Col xs lg={5}>
                            <br/><br/><br/>
                            <h5>Añade 1 fotografía y una descripción.</h5>
                            <br/>
                            <form action="">
                                <div className="input-field">
                                    <input type="file" id="myfile" name="myfile" />
                                    <label htmlFor="myfile">Select a file:</label><br/>
                                    <br/>
                                </div>
                                <br/><br/>
                                <div className="input-field">
                                    <textarea name="the-textarea" id="the-textarea" maxLength="300" placeholder="Write your description" autoFocus onChange={this.handleChange} required/>
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

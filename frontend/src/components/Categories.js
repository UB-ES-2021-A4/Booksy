import React, {Component} from 'react';
import {Col, Container, Row} from "reactstrap";
import Autor from "./pictures/autor.PNG";
import Genero from "./pictures/genero.PNG";
import Rating from "./pictures/rating.jpg";
import Cercania from "./pictures/Cercania.PNG";
import "./Categories.css"

export default class Categories extends Component {

    render () {
        return (
            <section>
                <p className="centered_title"> Categorías </p>
                <Container >
                    <Row>
                        <Col>
                            <img src={Autor} width={175} height={250} alt="img1"/>
                            <p id="text_imgs">Por autores</p>
                        </Col>
                        <Col>
                            <img src={Genero} width={175} height={250} alt="img2"/>
                            <p id="text_imgs">Por generos</p>
                        </Col>
                        <Col>
                            <img src={Rating} width={175} height={250} alt="img3"/>
                            <p id="text_imgs">Por precios</p>
                        </Col>
                        <Col>
                            <img src={Cercania} width={175} height={250} alt="img3"/>
                            <p id="text_imgs">Por distancia</p>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                </Container>
                <section className="centered_bottom">
                    <p className="centered_bottom_text">"Revende los libros que ya no usas y dales una segunda vida."</p>
                </section>
            </section>
        )}
}

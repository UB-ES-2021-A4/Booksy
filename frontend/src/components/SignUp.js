import React, { Component } from "react";
import {Col, Container, Row} from "react-bootstrap";
import './SignUp.css'
import {useHistory} from "react-router-dom";
import Libro_SignUp from "./pictures/theSunAndHerFlowers.jpg";

const Signup = () => {
    const history = useHistory();

    function handleClick() {
        history.push('/home');
    }

    return (
        <section>
            <Container>
                <Row className="justify-content-md-center">
                    <Col  xs lg="5">
                        <br/><br/>
                        <h1>Escribe tus datos de registro</h1>
                        <h5>Rellena todos los campos, por favor.</h5>
                        <br/>
                        <form method="post" action="" style={{paddingTop: 10}}>
                            <div className="input-field">
                                <input type="text" id="name" required/>
                                <label htmlFor="name">Nombre</label>
                            </div>
                            <br/>
                            <div className="input-field" >
                                <input type="text" id="apellidos" required/>
                                <label htmlFor="apellidos">Apellidos</label>
                            </div>
                            <br/>
                            <div className="input-field">
                                <input type="email" id="email" required/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <br/>
                            <div className="input-field">
                                <input type="text" id="username" required/>
                                <label htmlFor="username">Username</label>
                            </div>
                            <br/>
                            <div className="input-field">
                                <input type="password" id="password" required/>
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <br/>
                            <div className="input-field">
                                <input type="password" id="password" required/>
                                <label htmlFor="password">Repetir Contraseña</label>
                            </div>
                        </form>
                        <button className="button_signup" onClick={handleClick}>REGÍSTRATE</button>
                        <br/><br/>
                    </Col>
                    <Col md={"auto"}>
                        <br/><br/>
                        <div className="vl"/>
                        <br/><br/>
                    </Col>
                    <Col xs lg={5}>
                        <br/><br/>
                        <h1>Revende los libros que ya no usas y dales una 2ª vida </h1>
                        <img src={Libro_SignUp} width={450} height={475} alt="img-signup"/>
                    </Col>
                </Row>
            </Container>
        </section>
    );

};

export default Signup;






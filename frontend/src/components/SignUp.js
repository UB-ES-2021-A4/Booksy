import React, { Component } from "react";
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";
import './SignUp.css'
import Libro_SignUp from "./pictures/theSunAndHerFlowers.jpg";
import { withRouter } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            Repeatpassword: '',
            first_name: '',
            last_name: ''
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleClick = () => {
        alert('SUCCESS!')
        this.props.history.push('/home')
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    createUser = (event) => {
        event.preventDefault()

        const user = {
            email: this.state.email,
            name: this.state.username,
            password: this.state.password,
            first_name: this.state.name,
            last_name: this.state.apellidos
        }
        if (this.state.Repeatpassword === this.state.password) {
            axios.post('https://booksy-es2021.herokuapp.com/api/signUpaccount/', user)
                .then((res) => this.handleClick())
                .catch((error) => {
                    console.error(error)
                    alert('FAILED')
                })
        } else {
            alert('PASSWORD DOES NOT MATCH!')
        }
    }

    render() {
        return (
            <section>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="5">
                            <br/><br/>
                            <h1>Escribe tus datos de registro</h1>
                            <h5>Rellena todos los campos, por favor.</h5>
                            <br/>
                            <form method="post" action="">
                                <div className="input-field">
                                    <input onChange={this.handleChange} type="text" id="name" required/>
                                    <label htmlFor="name">Nombre</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input onChange={this.handleChange} type="text" id="apellidos" required/>
                                    <label htmlFor="apellidos">Apellidos</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input
                                        onChange={this.handleChange}
                                        type="email"
                                        id="email"
                                        required/>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input onChange={this.handleChange} type="text" id="username" required/>
                                    <label htmlFor="username">Username</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input onChange={this.handleChange} type="password" id="password" required/>
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input
                                        onChange={this.handleChange}
                                        type="password"
                                        id="Repeatpassword"
                                        required/>
                                    <label htmlFor="Repeatpassword">Repetir Contraseña</label>
                                </div>
                            </form>
                            <button
                                className="button_signup"
                                id="button_signup"
                                onClick={(e) => this.createUser(e)}>REGÍSTRATE
                            </button>
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
        )
    }
};

export default withRouter(Signup);




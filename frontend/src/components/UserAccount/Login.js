import React, {Component} from "react";
import { Col, Row,  Container } from 'react-bootstrap';
import "./Login.css"
import PaymentIcon from '@mui/icons-material/Payment';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ClassIcon from '@mui/icons-material/Class';
import swal from "sweetalert";
import axios from "axios";
import {withRouter} from "react-router-dom";

const deploy_url = 'https://booksy-es2021.herokuapp.com';
//const debug_url = 'http://127.0.0.1:8000';
const url = deploy_url;


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleClick = () => {
        this.props.history.push({
            pathname: '/homePage',
        });
    }
    handleClickSignUp = () => {
        this.props.history.push('/signup')
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    successAlert () {
        // Use sweetalert2
        swal({
            title: "Success",
            text: "You are logged in!",
            icon: "success",
        })
            .then(() => {
                window.location.reload(false);
            });
    };

    errorInLogInAlert () {
        // Use sweetalert2
        swal('Error', 'Username or password incorrect.\n Please Change them.', 'error');
    };

    checkLogin = (event) => {
        event.preventDefault()

        const parameters = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(`${url}/api/account/login/`, parameters)
            .then((res) => {
                // We are saving the token in the localStorage(not very secure), django's token do not expire.
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user_id', res.data.user_id)
                localStorage.setItem('username', this.state.username)

                let items = []
                localStorage.setItem('items_to_cart', items)
                this.handleClick()
                this.successAlert()
            })
            .catch((error) => {
                this.errorInLogInAlert()
                console.error(error)
            })

    };

    render () {
        return (
            <section>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col  xs lg="5">
                            <br/><br/>
                            <h1>¿Ya tienes cuenta?
                                Inicia sesión</h1>
                            <h5>¡Bienvenido de vuelta!</h5>
                            <br/><br/>
                            <form action="">
                                <div className="input-field">
                                    <input type="text" id="username" onChange={this.handleChange} required/>
                                    <label htmlFor="username">Username</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input type="password" id="password" onChange={this.handleChange} required/>
                                    <label htmlFor="password" >Password</label>
                                </div>
                            </form>
                            <button className="button_login" id="button_login" onClick={this.checkLogin}>LOG IN</button>
                        </Col>
                        <Col md={"auto"}>
                            <br/><br/>
                            <div className="vl-login"/>
                            <br/><br/>
                        </Col>
                        <Col xs lg={5}>
                            <br/><br/>
                            <h1>¿No tienes cuenta?
                                Regístrate</h1>
                            <h5>¡Serán 30 segundos!</h5>
                            <br/>
                            <section>
                                <PaymentIcon/> Haz el seguimiento de tus pedidos.
                            </section>
                            <br/>
                            <section>
                                <LocalLibraryIcon/> Encuentra buenos libros a precios increíbles.
                            </section>
                            <br/>
                            <section>
                                <ClassIcon/> Gran variedad de autores para escoger.
                            </section>
                            <br/>
                            <button className="button_signup" type="button" id="button_to_signup" onClick={this.handleClickSignUp}>
                                CRÉATE UNA CUENTA
                            </button>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default withRouter(Login);



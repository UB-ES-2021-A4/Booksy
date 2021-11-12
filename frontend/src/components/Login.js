import React, {Component} from "react";
import { Col, Row,  Container } from 'react-bootstrap';
import "./Login.css"
import PaymentIcon from '@mui/icons-material/Payment';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ClassIcon from '@mui/icons-material/Class';
import swal from "sweetalert";
import axios from "axios";
import {withRouter} from "react-router-dom";

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
        this.props.history.push('/home_page')
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    successAlert () {
        // Use sweetalert2
        swal("Success", "You are logged in!", "success");
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

        axios.post('https://booksy.pythonanywhere.com//api/login/', parameters)
            .then((res) => {
                this.successAlert()
                // We are saving the token in the localStorage(not very secure), django's token do not expire.
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user_id', res.data.user_id)
                this.handleClick()
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
                            <div className="vl"/>
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
                            <button className="button_signup" type="button" id="button_to_signup">
                                <a href="/signup" className="a_color">CRÉATE UNA CUENTA</a>
                            </button>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
};

export default withRouter(Login);



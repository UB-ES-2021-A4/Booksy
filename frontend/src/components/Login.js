import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Row,  Container } from 'react-bootstrap';
import "./Login.css"
import PaymentIcon from '@mui/icons-material/Payment';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ClassIcon from '@mui/icons-material/Class';

const Login = () => {
    const history = useHistory();

    function handleClick() {
        history.push('/signup');
    }

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
                                <input type="text" id="username" required/>
                                <label htmlFor="username">Username</label>
                            </div>
                            <br/>
                            <div className="input-field">
                                <input type="password" id="password" required/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </form>
                        <button className="button_login">LOG IN</button>
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
                        <section style={{fontSize: 20, paddingTop: 10}}>
                            <PaymentIcon style={{fill: "#004B23"}}/> Haz el seguimiento de tus pedidos.
                        </section>
                        <br/>
                        <section style={{fontSize: 20}}>
                            <LocalLibraryIcon style={{fill: "#004B23"}}/> Encuentra buenos libros a precios increíbles.
                        </section>
                        <br/>
                        <section style={{fontSize: 20}}>
                            <ClassIcon style={{fill: "#004B23"}}/> Gran variedad de autores para escoger.
                        </section>
                        <button className="button_signup" type="button" onClick={handleClick}>CRÉATE UNA CUENTA</button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;




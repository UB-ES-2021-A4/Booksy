import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {Container} from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert";
import './EditProfile.css'

const deploy_url = 'https://booksy-es2021.herokuapp.com';
//const debug_url = 'http://127.0.0.1:8000';
const url = deploy_url;


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            first_name: '',
            last_name: '',
        }
        this.editProfile = this.editProfile.bind(this);
    }

    componentDidMount() {
        this.handleChange = this.handleChange.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    editProfile () {
        let formItem = new FormData()
        formItem.append('first_name',this.state.first_name)
        formItem.append('last_name',this.state.last_name)

        if (this.checkFormParams(formItem)) {
            axios.patch(`${url}/api/account/?id=${this.state.id}`, formItem,
                {headers: {'Authorization': `Token ${window.localStorage.getItem('token')}`}})
                .then(() => {
                    this.updateSuccessfulAlert();
                    this.moveToProfile()
                })
                .catch((error) => {
                    this.errorInPostAlert()
                    console.error(error)
                })
        } else {
            this.fillAllParamsAlert();
        }
    }

    checkFormParams (params) {
        return !(params.get('first_name').length === 0 || params.get('last_name').length === 0);

    }

    updateSuccessfulAlert () {
        swal('Success', 'Profile updated correctly!', 'success');
    }

    fillAllParamsAlert () {
        // Use sweetalert2
        swal('Error', 'In order to update the profile,\n all parameters should be filled.', 'error');
    };

    errorInPostAlert () {
        swal('Error', 'Something went wrong while updating. \n Try again later.', 'error');
    }

    moveToProfile () {
        let user_id = localStorage.getItem("user_id").toString()
        this.props.history.push({
            pathname: `/profile/${user_id}`,
            state: { id: user_id}
        });
    }

    render () {
        return (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={3}/>
                        <Col >
                            <br/><br/>
                            <h1>ACTUALIZA TUS DATOS
                            DE USUARIO</h1>
                            <h5>Por favor, rellena todos los campos</h5>
                            <br/><br/>
                            <form action="">
                                <div className="input-field-profile">
                                    <input type="text" id="first_name" onChange={this.handleChange} required/>
                                    <label htmlFor="Name">First Name</label>
                                </div>
                                <br/>
                                <div className="input-field-profile">
                                    <input type="text" id="last_name" onChange={this.handleChange} required/>
                                    <label htmlFor="Surname">Last Name</label>
                                </div>
                            </form>
                            <button className="button_edit_profile" id="button_edit_profile" onClick={this.editProfile}>UPDATE PROFILE</button>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <br/>
                    <br/>
                </Container>
        );
    }

}

export default withRouter(EditProfile);

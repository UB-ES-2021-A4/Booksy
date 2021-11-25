import React, {Component} from "react";
import logo from '../pictures/logo_small.PNG'

import './Footer.css'

export default class Footer extends Component {
    render() {
        return (
            <section className="bgr_color">
                <footer className="footer">
                    <div className="row">
                        <div className="column_big">
                            <img src={logo} width="90" height="90" alt="logo_small"/>
                            <h1 className="footer_title" id="align_left">Booksy</h1>
                        </div>
                        <div className="column_small">
                            <div className="row-title" id="align_right">
                                <b>Contact us</b>
                            </div>
                            <div className="row">
                                <h6 id="align_right">Instagram</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_right">Facebook</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_right">Github</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_right">Discord</h6>
                            </div>

                        </div>
                        <div className="column_small">
                            <div className="row-title" id="align_center">
                                <b>Resouces</b>
                            </div>
                            <div className="row">
                                <h6 id="align_center">Return Policy</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_center">Track an order</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_center">FAQs</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_center">Privacy Policy</h6>
                            </div>
                        </div>
                        <div className="column_small">
                            <div className="row-title" id="align_left">
                                <b>About us</b>
                            </div>
                            <div className="row">
                                <h6 id="align_left">Our Story</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_left">Team</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_left">Code Structure</h6>
                            </div>
                            <div className="row">
                                <h6 id="align_left">Versions</h6>
                            </div>
                        </div>
                        <div className="column_big">
                            <div className="box">
                                <select>
                                    <option value="0">Currency</option>
                                    <option value="1">Euro €</option>
                                    <option value="2">Dollar $</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        )
    }
}

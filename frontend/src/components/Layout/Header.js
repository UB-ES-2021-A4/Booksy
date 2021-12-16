import React, { Component } from 'react';
import NavBar from './NavBar.js';
import './Header.css'
import logo from "../pictures/logo.png";

export default class Header extends Component {
    render() {
        return (
            <div>
                <section className="header">
                    <section className="header-top">
                        <section className="header-top-logo">
                            <img className="img-logo" src={logo} width="50" height="50" alt="logo_small"/>
                            <a href="" className="header-logo">Booksy</a>
                        </section>
                        <section className="header-top__navbar">
                            <NavBar />
                        </section>
                    </section>
                </section>
                <hr className="header-top__seperator"/>
            </div>
        )}
}

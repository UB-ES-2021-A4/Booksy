import React, {Component} from 'react';
import './NavBar.css'
import swal from "sweetalert";
import {withRouter} from "react-router-dom";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {
                title: '',
                price: 0,
                image: '',
                username: '',
            },
            cards: [],
        }

    }

    handleNotLogged = () => {
        swal('Something went wrong', 'You are not logged in the web. Try the Login button first, please.', 'warning');
    }

    isNotLogged () {
        let user = (window.localStorage.getItem('user_id'))
        return user === null;
    }

    handleHomepage = () => {
        console.log(window.localStorage.getItem('items_to_cart'))
        localStorage.setItem("items_to_cart", JSON.parse(localStorage.getItem("items_to_cart")))
        this.props.history.push('/home_page');


    }

    render() {
        return (
            <section className="navbar">
                {this.isNotLogged() ? (
                    <a href="/" className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleNotLogged}>Home page</a>
                ) : (
                    <a href="" className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleHomepage}>Home page</a>
                )}
                <a href="" className="navbar-item" style={{padding: 15}} id="books_link">Books</a>
                <a href="/login" className="navbar-item" style={{padding: 15}} id="login_link">Log In</a>
            </section>
        )}
}

export default withRouter(NavBar);

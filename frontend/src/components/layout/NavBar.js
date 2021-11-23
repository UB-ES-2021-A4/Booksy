import React, {Component} from 'react';
import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
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

    render() {
        return (
            <section className="navbar">
                {this.isNotLogged() ? (
                    <a href="/" className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleNotLogged}>Home page</a>
                ) : (
                    <a href="/home_page" className="navbar-item" style={{padding: 15}} id="home_page_link">Home page</a>
                )}
                <a href="" className="navbar-item" style={{padding: 15}} id="books_link">Books</a>
                <a href="/login" className="navbar-item" style={{padding: 15}} id="login_link">Log In</a>
            </section>
        )}
}

export default withRouter(NavBar);

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

    isLogged () {
        let user = (window.localStorage.getItem('user_id')).toString()
        console.log(user)
        return user === '';
    }

    render() {
        return (
            <section className="navbar">
                {this.isLogged() ? (
                    <a href="/home_page" className="navbar-item" style={{padding: 15}} id="home_page_link">Home page</a>
                ) : (
                    <a href="/" className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleNotLogged}>Home page</a>
                )}
                <a href="/books" className="navbar-item" style={{padding: 15}} id="books_link">Books</a>
                <a href="/login" className="navbar-item" style={{padding: 15}} id="login_link">Log In</a>
                <a href="/cart" className="navbar-item-right" style={{padding: 15}} id="cartnpm_link"><StoreIcon/></a>
                <a className="navbar-item-right" >
                    <div className="search-box">
                        <button className="btn-search"><SearchIcon/></button>
                        <input type="text" className="input-search" id="search_input" placeholder="Type to Search..."/>
                    </div>
                </a>
            </section>
        )}
}

export default withRouter(NavBar);

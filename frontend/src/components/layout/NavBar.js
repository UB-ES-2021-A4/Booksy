import React, {Component} from 'react';
import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';

export default class NavBar extends Component {

    render() {
        return (
            <section className="navbar">
                <a href="/home_page" className="navbar-item" style={{padding: 15}} id="home_page_link">Home page</a>
                <a href="/books" className="navbar-item" style={{padding: 15}} id="books_link">Books</a>
                <a href="/login" className="navbar-item" style={{padding: 15}} id="login_link">Log In</a>
                <a href="/cart" className="navbar-item-right" style={{padding: 15}} id="cart_link"><StoreIcon/></a>
                <a className="navbar-item-right" >
                    <div className="search-box">
                        <button className="btn-search"><SearchIcon/></button>
                        <input type="text" className="input-search" id="search_input" placeholder="Type to Search..."/>
                    </div>
                </a>
            </section>
        )}
}



import React, {Component} from 'react';
import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login';

export default class NavBar extends Component {

    render() {
        return (
            <section className="navbar">
                <a href="/home_page" className="navbar-item" id="padding_top">Home page</a>
                <a href="/books" className="navbar-item" id="padding_top">Books</a>
                <a href="/login" className="navbar-item" id="padding_top">Log In</a>
                <a href="/cart" className="navbar-item-right" id="padding_top"><StoreIcon/></a>
                <a className="navbar-item-right" >
                    <div className="search-box">
                        <button className="btn-search"><SearchIcon/></button>
                        <input type="text" className="input-search" placeholder="Type to Search..."/>
                    </div>
                </a>
            </section>
        )}
}



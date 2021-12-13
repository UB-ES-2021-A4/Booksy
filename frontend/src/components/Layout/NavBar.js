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
        this.sleep(6000).then(() => {
            console.log(window.localStorage.getItem('user_id'))
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    isNotLogged () {
        let user = (window.localStorage.getItem('user_id'))
        return user === null;
    }

    handleHomepage = () => {
        this.props.history.push({
            pathname: '/homePage',
        });
    }

    handleBooksHomepage = () => {
        this.props.history.push({
            pathname: '/homePage',
        });
    }

    handleProfile = () => {
        let user_id = localStorage.getItem("user_id").toString()
        this.props.history.push({
            pathname: `/profile/${user_id}`,
            state: { id: user_id}
        });
    }




    render() {
        return (
            <section className="navbar">
                {this.isNotLogged() ? (
                    <a href="/" className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleNotLogged}>Home page</a>
                ) : (
                    <a href="" className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleHomepage}>Home page</a>
                )}
                {this.isNotLogged() ? (
                    <a href="/login" className="navbar-item" style={{padding: 15}} id="login_link">Log In</a>
                ) : (
                    <a href="" className="navbar-item" style={{padding: 15}} id="profile_link" onClick={this.handleProfile}>Profile</a>
                    )}
                <a href="" className="navbar-item" style={{padding: 15}} id="profile_link" >Log Out</a>
            </section>
        )}
}

export default withRouter(NavBar);
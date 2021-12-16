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
        this.loggedRender = this.loggedRender.bind(this);
        this.notLoggedRender = this.notLoggedRender.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }


    handleNotLogged = () => {
        swal({
            title: "Something went wrong",
            text: 'You are not logged in the web. Try the Login button first, please.',
            icon: "warning",
        })
            .then(() => {
                this.props.history.push('/login',);
                window.location.reload(false);
            });
    }


    isNotLogged () {
        let user = (window.localStorage.getItem('user_id'))
        return user === null;
    }

    handleHomepage = () => {
        this.props.history.push({
            pathname: '/homePage',
        });
        window.location.reload(false);
    }

    handleProfile = () => {
        let user_id = localStorage.getItem("user_id").toString()
        this.props.history.push({
            pathname: `/profile/${user_id}`,
            state: { id: user_id}
        });
        window.location.reload(false);

    }

    handleLogOut () {
        localStorage.clear()
        this.props.history.push('/');
        window.location.reload(false);
    }

    loggedRender () {
        return (
            <section className="navbar">
                <a className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleHomepage}>Home page</a>
                <a className="navbar-item" style={{padding: 15}} id="profile_link" onClick={this.handleProfile}>Profile</a>
                <a className="navbar-item" style={{padding: 15}} id="profile_link" onClick={this.handleLogOut}>Log Out</a>
            </section>
        );
    }

    notLoggedRender () {
        return (
            <section className="navbar">
                <a className="navbar-item" style={{padding: 15}} id="home_page_link" onClick={this.handleNotLogged}>Home page</a>
                <a href="/login" className="navbar-item" style={{padding: 15}} id="login_link">Log In</a>
            </section>
        );
    }


    render() {
        return (
            this.isNotLogged() ? (
                this.notLoggedRender()
            ) : (
                this.loggedRender()
            )
        )}
}

export default withRouter(NavBar);

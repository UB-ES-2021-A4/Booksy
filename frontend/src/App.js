import React from 'react';
import './App.css';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import FirstPage from "./components/Start/FirstPage"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/UserAccount/Login";
import Signup from "./components/UserAccount/SignUp";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage/HomePage";
import AddItem from "./components/HomePage/AddItem";
import UpdateItem from "./components/HomePage/UpdateItem";
import OpenItem from "./components/HomePage/OpenItem";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";


function App() {
  return (
    <div className="App">
        <Header />
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={()=><FirstPage />}/>
                <Route exact path='/login' render={()=><Login />}/>
                <Route path='/signup' component={Signup}/>
                <Route exact path='/homePage' render={()=><HomePage />}/>
                <Route exact path='/additem' render={()=><AddItem />}/>
                <Route path='/updateItems/:id' render={()=><UpdateItem />}/>
                <Route path='/OpenItem/:id' render={()=><OpenItem />}/>
                <Route path='/cart' render={()=><Cart />}/>
                <Route path='/profile/:id' render={()=><Profile />}/>
                <Route path='/editProfile/:id' render={()=><EditProfile />}/>
            </Switch>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;

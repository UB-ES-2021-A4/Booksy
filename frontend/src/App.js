import React from 'react';
import './App.css';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import FirstPage from "./components/FirstPage"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage";
import AddItem from "./components/AddItem";
import UpdateItem from "./components/UpdateItem";
import OpenItem from "./components/OpenItem";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

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

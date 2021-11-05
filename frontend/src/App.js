import React from 'react';
import './App.css';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import First_Page from "./components/First_Page"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Cart from "./components/Cart/Cart";
import HomePage from "./components/HomePage";
import AddItem from "./components/AddItem";

function App() {
  return (
    <div className="App">
        <Header />
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={()=><First_Page />}/>
                <Route exact path='/login' render={()=><Login />}/>
                <Route path='/signup' component={Signup}/>
                <Route exact path='/home_page' render={()=><HomePage />}/>
                <Route exact path='/additem' render={()=><AddItem />}/>
                {/*<Route exact path='/books' render={()=><Books />}/>*/}
                <Route exact path='/cart' render={()=><Cart />}/>
            </Switch>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;

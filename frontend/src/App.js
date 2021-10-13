import logo from './logo.svg';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation title = "Booksy"/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;

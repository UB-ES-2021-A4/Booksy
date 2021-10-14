import React from 'react';

import './App.css';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="App">
        <div className="App-header">
            <Header />
        </div>
        <div className='App-footer'>
            <Footer />
        </div>
    </div>
  );
}

export default App;

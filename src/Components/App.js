import React, { Component } from 'react';
import './../App.scss';
import Header from './Dumb/Header';
import Footer from './Dumb/Footer';
import Stressinator from './Stressinator';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="stressinatorApp">
          <Header />
          <Stressinator />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

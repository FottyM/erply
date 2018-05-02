import React, { Component } from 'react';
import NavBar from './components/main/NavBar';
import Main from './components/main/Main';
import Footer from './components/main/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppProvider from './Provider';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <div>
            <NavBar />
            <Main />
            <Footer />
          </div>
        </Router>
      </AppProvider>
    );
  }
}

export default App;

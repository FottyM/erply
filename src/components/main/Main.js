import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import ShoppingContainer from '../shopping/ShoppingContainer';
import ShoppingItemDetails from '../shopping/ShoppingItemDetails';

class Main extends Component {
  static propTypes = {};

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ShoppingContainer} />
          <Route path="/store/items/:item" component={ShoppingItemDetails} />
          <Route path="/store/items" component={ShoppingContainer} />
          <Route
            path="/about"
            render={({ match }) => (
              <div>
                <h2>About us</h2> <p>{match.path}</p>
              </div>
            )}
          />
          <Route
            path="/contact"
            render={({ match }) => (
              <div>
                <h2>Call me maybe</h2> <p>{match.path}</p>
              </div>
            )}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;

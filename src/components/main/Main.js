import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import chunk from 'lodash/chunk';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import data from '../../data.json';
import ShoppingContainer from '../shopping/ShoppingContainer';
import ShoppingItemDetails from '../shopping/ShoppingItemDetails';
import Basket from '../basket/Basket';
import { AppContext as Context } from '../../Provider';

class Main extends Component {
  state = {
    itemsChunks: [],
    showBasket: false
  };

  closeBasket = () => {
    this.setState({
      showBasket: false
    });
  };

  componentDidMount() {
    this.loadDataFromServer();
  }

  loadDataFromServer = () => {
    axios
      .request({
        method: 'GET',
        url: 'https://erply-challenge.herokuapp.com/list',
        params: {
          AUTH: 'fae7b9f6-6363-45a1-a9c9-3def2dae206d'
        }
      })
      .then(res => {
        const itemsChunks = chunk(res.data, 32);
        this.setState({ itemsChunks });
      })
      .catch(console.log);
  };

  render() {
    return (
      <main>
        <Context.Consumer>
          {context => (
            <button
              className="btn btn-warning"
              style={{
                position: 'fixed',
                right: 10,
                top: 80,
                zIndex: 1,
                borderRadius: 600
              }}
              onClick={() => this.setState({ showBasket: true })}
            >
              Basket{' '}
              <span className="badge badge-danger">
                {context.basket.length}
              </span>
            </button>
          )}
        </Context.Consumer>
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
        <Basket
          showBasket={this.state.showBasket}
          closeBasket={this.closeBasket}
        />
      </main>
    );
  }
}

export default Main;

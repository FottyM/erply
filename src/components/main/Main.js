import React, { Component } from 'react';
import axios from 'axios';
import chunk from 'lodash/chunk';
import { Route, Switch, Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Shopping from '../shopping/';
import ShoppingItemDetails from '../shopping/ShoppingItemDetails';
import Basket from '../basket/Basket';
import { AppContext as Context } from '../../store/Provider';

class Main extends Component {
  state = {
    itemsChunks: [],
    isBasketOpened: false
  };

  toggleBasket = () => {
    this.setState({
      isBasketOpened: false
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
          {({ basket }) => (
            <button
              className="btn btn-warning"
              style={{
                position: 'fixed',
                right: 10,
                top: 80,
                zIndex: 1,
                borderRadius: 600
              }}
              onClick={() => this.setState({ isBasketOpened: true })}
            >
              Basket{' '}
              <span className="badge badge-danger">
                {!isEmpty(basket) ? basket.length : 0}
              </span>
            </button>
          )}
        </Context.Consumer>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/store/items" />;
            }}
          />
          <Route path="/store/items/:item" component={ShoppingItemDetails} />
          <Route path="/store/items" component={Shopping} />
          <Route
            path="/about"
            render={({ match }) => (
              <div className="container">
                <h2>About us</h2> <p>{match.path}</p>
              </div>
            )}
          />
          <Route
            path="/contact"
            render={({ match }) => (
              <div className="container">
                <h2>Call me maybe</h2> <p>{match.path}</p>
              </div>
            )}
          />
        </Switch>
        <Basket
          isOpened={this.state.isBasketOpened}
          toggle={this.toggleBasket}
        />
      </main>
    );
  }
}

export default Main;

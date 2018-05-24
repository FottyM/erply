import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import flattenDeep from 'lodash/flattenDeep';
import isUndefined from 'lodash/isUndefined';
import axios from 'axios/index';

export const AppContext = React.createContext();
const Provider = AppContext.Provider;
export const Consumer = AppContext.Consumer;

class AppProvider extends Component {
  state = {
    itemsChunks: [],
    basket: [],
    isBasketOpened: false
  };

  addToBasket = item => {
    this.setState({
      basket: [...this.state.basket, item]
    });
    const { basket } = this.state;
    console.log(basket, 'calculer');
    localStorage.setItem('basket', JSON.stringify(this.state.basket));
  };

  removeItemFromBasket = item => {
    // this.setState({})
  };

  clearBasket = () => {
    this.setState({ basket: [] });
    const { basket } = this.state;
    localStorage.setItem('basket', JSON.stringify([]));
  };

  toggleBasket = () => {
    this.setState({
      isBasketOpened: !this.state.isBasketOpened
    });
  };

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

  filterItems = terms => {
    const items = flattenDeep(this.state.itemsChunks);
    const itemsCopy = items.slice();

    // if(terms.store !== '') this.setState({ itemsChunks: chunk(filter([...items], terms ), 32) });

    // if(terms.instock !== false ) this.setState({ itemsChunks: chunk(filter([...items], terms ), 32) });
    // else this.setState({ itemsChunks: chunk([...items], 32) });
  };

  componentDidMount() {
    this.loadDataFromServer();

    try {
      const basket = JSON.parse(localStorage.getItem('basket'));
      if (!isUndefined(basket)) {
        this.setState({ basket });
      } else {
        this.setState({ basket: [] });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const state = { ...this.state };
    return (
      <Provider
        value={{
          ...state,
          addToBasket: this.addToBasket,
          removeFromBasket: this.removeFromBasket,
          filterItems: this.filterItems,
          clearBasket: this.clearBasket,
          toggleBasket: this.toggleBasket,
          isBasketOpened: this.state.isBasketOpened
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AppProvider;

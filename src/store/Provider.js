import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import flattenDeep from 'lodash/flattenDeep';
import isNil from 'lodash/isNil';
import axios from 'axios/index';

export const AppContext = React.createContext();
const Provider = AppContext.Provider;
export const Consumer = AppContext.Consumer;

class AppProvider extends Component {
  state = {
    itemsChunks: [],
    basket: []
  };

  addToBasket = item => {
    this.setState({
      basket: [...this.state.basket, item]
    });
    this.updateLocalStorage();
  };

  removeItemFromBasket = item => {
    // this.setState({})
    this.updateLocalStorage();
  };

  clearBasket = () => {
    this.setState({ basket: [] });
    this.updateLocalStorage();
  };

  updateLocalStorage = () => {
    localStorage.setItem('basket', JSON.stringify(this.state.basket));
    console.log(this.state.basket);
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
      if (!isNil(basket)) {
        this.setState({ basket: basket });
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          addToBasket: this.addToBasket,
          removeFromBasket: this.removeFromBasket,
          filterItems: this.filterItems,
          clearBasket: this.clearBasket
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AppProvider;

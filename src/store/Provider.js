import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import isUndefined from 'lodash/isUndefined';
import filter from 'lodash/filter';
import pullAllBy from 'lodash/pullAllBy';
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

  addToBasket = items => {
    this.setState(prevState => {
      const { basket } = prevState;
      if (items.length > 0) {
        localStorage.setItem('basket', JSON.stringify([...basket, ...items]));
        return { basket: [...basket, ...items] };
      }
    });
  };

  removeFromBasket = itemId => {
    this.setState(prevState => {
      const { basket } = prevState;
      const newBasket = [...pullAllBy([...basket], [{ id: itemId }], 'id')];
      localStorage.setItem('basket', JSON.stringify(newBasket));
      return { basket: newBasket };
    });
  };

  clearBasket = () => {
    this.setState(prevState => {
      localStorage.setItem('basket', JSON.stringify([]));
      return { ...prevState, basket: [] };
    });
  };

  toggleBasket = () => {
    this.setState({
      isBasketOpened: !this.state.isBasketOpened
    });
  };

  loadDataFromServer = async function() {
    try {
      return await axios.get('http://localhost:3001/api');
    } catch (e) {
      throw new Error(e);
    }
    // try {
    //   return  data
    //   // return await axios.request({
    //   //   method: 'GET',
    //   //   url: 'https://erply-challenge.herokuapp.com/list',
    //   //   params: {
    //   //     AUTH: 'fae7b9f6-6363-45a1-a9c9-3def2dae206d'
    //   //   }
    //   // });
    // } catch (e) {
    //   throw new Error(e);
    // }
  };

  filterItems = ({ instock, store }) => {
    this.loadDataFromServer().then(res => {
      if (instock === true && store.length > 0) {
        this.setState({
          itemsChunks: chunk(
            filter(res.data, { instock: instock, store: store }),
            32
          )
        });
      }

      if (instock === true && store.length === 0) {
        this.setState({
          itemsChunks: chunk(filter(res.data, { instock: instock }), 32)
        });
      }

      if (instock.length === 0 && store.length > 0) {
        this.setState({
          itemsChunks: chunk(filter(res.data, { store: store }), 32)
        });
      }

      if (instock.length === 0 && store.length === 0) {
        console.log('failing.....');
        this.setState({
          itemsChunks: chunk(res.data, 32)
        });
      }
    });
  };

  componentDidMount() {
    this.loadDataFromServer().then(res => {
      this.setState({
        itemsChunks: chunk(res.data, 32)
      });
    });

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
    return (
      <Provider
        value={{
          ...this.state,
          addToBasket: this.addToBasket,
          removeFromBasket: this.removeFromBasket,
          filterItems: this.filterItems,
          clearBasket: this.clearBasket,
          toggleBasket: this.toggleBasket
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AppProvider;

import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import flattenDeep from 'lodash/flattenDeep';
import filter from 'lodash/filter';
import data from '../data.json';

export const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    itemsChunks: [],
    basket: []
  };

  addToBasket = item => {
    this.setState({
      basket: [...this.state.basket, item]
    });
  };

  removeFromBasket = item => {
    // this.setState()
  };

  filterItems = terms => {
    const items = flattenDeep(this.state.itemsChunks);
    this.setState({
      itemsChunks: chunk(filter(items, { terms }), 32)
    });
  };

  componentDidMount() {
    try {
      let basket = localStorage.getItem('basket');
      basket = JSON.parse(basket);
      this.setState({ basket });
    } catch (error) {
      console.error(error);
    }
    this.setState({
      itemsChunks: chunk(data, 32)
    });
  }

  render() {
    console.log(this.state.basket);
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          addToBasket: this.addToBasket,
          removeFromBasket: this.removeFromBasket,
          filterItems: this.filterItems
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

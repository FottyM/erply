import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import data from './data.json';

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

  componentDidMount() {
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
          removeFromBasket: this.removeFromBasket
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

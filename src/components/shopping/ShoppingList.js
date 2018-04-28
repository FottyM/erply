import React, { Component } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import chunk from 'lodash/chunk';
import isNil from 'lodash/isNil';
import ShoppingItem from './ShoppingItem';
import SearchFilter from './SearchFilters';
import Paginator from './Paginator';
import data from '../../data.json';

class ShoppingList extends Component {
  state = {
    itemsChunks: [],
    current: 0
  };

  componentDidMount() {
    this.loadDateFromServer();
  }

  updateDisplay = current => this.setState({ current });

  loadDateFromServer = () => {
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
    // itemsChunks from state don't forget
    const { current } = this.state;
    const itemsChunks = chunk(data, 32);
    let items =
      !isEmpty(itemsChunks) && !isNil(current) ? itemsChunks[current] : [];
    console.log(items);
    return (
      <div className="row">
        {!isEmpty(items) ? (
          items.map(item => <ShoppingItem {...item} key={item.id} />)
        ) : (
          <h2 className="text-danger text-center">Loading...</h2>
        )}
        <Paginator data={itemsChunks} changeIndex={this.updateDisplay} />
      </div>
    );
  }
}

export default ShoppingList;

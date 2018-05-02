import React, { Component } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import chunk from 'lodash/chunk';
import isNil from 'lodash/isNil';
import snakeCase from 'lodash/snakeCase';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import ShoppingItem from './ShoppingItem';
import SearchFilter from './SearchFilters';
import Paginator from './Paginator';
import ShoppingItemDetail from './ShoppingItemDetails';

class ShoppingList extends Component {
  state = {
    current: 0
  };

  updateDisplay = current => this.setState({ current });

  render() {
    const { current } = this.state;
    const { match, itemsChunks } = this.props;

    let items =
      !isEmpty(itemsChunks) && !isNil(current) ? itemsChunks[current] : [];

    return (
      <div className="row">
        {!isEmpty(items) ? (
          items.map(item => (
            <ShoppingItem {...item} match={match} key={item.id} />
          ))
        ) : (
          <h2 className="text-danger text-center">Loading...</h2>
        )}

        {/* <Paginator data={itemsChunks} changeIndex={this.updateDisplay} /> */}
      </div>
    );
  }
}

export default ShoppingList;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchFilter from './SearchFilters';
import ShoppingList from './ShoppingList';

class ShoppingContainer extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SearchFilter />
          </div>
          <div className="col-10">
            <h2 className="text-center text-primary py-3">Shopping Items</h2>
            <ShoppingList />
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingContainer;

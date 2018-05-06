import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchFilter from './SearchFilters';
import ShoppingList from './ShoppingList';
import { AppContext as Context } from '../../store/Provider';

class ShoppingContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2 d-none d-md-block">
                  <SearchFilter />
                </div>
                <div className="col-12 col-md-10">
                  <h2 className="text-center text-primary py-3">
                    Shopping Items
                  </h2>
                  <ShoppingList match={match} {...context} />
                </div>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default ShoppingContainer;

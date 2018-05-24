import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import ShoppingItem from './ShoppingItem';
import Paginator from '../paginator/Paginator';

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

        <Paginator data={itemsChunks} changeIndex={this.updateDisplay} />
      </div>
    );
  }
}

export default ShoppingList;

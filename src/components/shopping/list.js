import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import ListItem from './list-Item';
import Paginator from '../paginator/paginator';

class List extends Component {
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
          items.map(item => <ListItem {...item} match={match} key={item.id} />)
        ) : (
          <div className="col-12">
            <h1 className="text-danger text-center animated pulse infinite">
              Loading...
            </h1>
          </div>
        )}

        <Paginator data={itemsChunks} changeIndex={this.updateDisplay} />
      </div>
    );
  }
}

export default List;

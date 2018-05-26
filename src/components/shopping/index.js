import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilterSearch from '../seach-filter/search-filters';
import List from './list';
import { Consumer } from '../../provider/Provider';

class Shopping extends Component {
  state = {
    showFilters: false
  };

  updateShowFilter = () => {
    this.setState({
      showFilters: !this.state.showFilters
    });
  };

  render() {
    const { match } = this.props;

    return (
      <Consumer>
        {context => {
          return (
            <div className="container-fluid">
              <div className="row">
                <div
                  className={`p-0 p-md-2 col-md-2 bg-light search-filters ${
                    this.state.showFilters ? 'show' : ''
                  }`}
                  style={{ borderRight: '1px solid grey' }}
                >
                  <FilterSearch
                    updateShowFilter={this.updateShowFilter}
                    filter={this.state.showFilters}
                  />
                </div>
                <div className="col-12 col-md-10">
                  <h2 className="text-center text-primary py-3">
                    Shopping Items
                  </h2>
                  <List match={match} {...context} />
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Shopping.propTypes = {
  match: PropTypes.object.isRequired
};

export default Shopping;

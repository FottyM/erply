import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import data from './data.json';

export const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    itemsChunks: []
  };

  componentDidMount() {
    this.setState({
      itemsChunks: chunk(data, 32)
    });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

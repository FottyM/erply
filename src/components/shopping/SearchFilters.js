import React, { Component } from 'react';
import { Consumer } from '../../store/Provider';

class FilterSearch extends Component {
  storeRef = React.createRef();
  instockRef = React.createRef();

  handleChange = ({ filterItems }) => {
    const instock =
      this.instockRef.current.value.length > 0
        ? JSON.parse(this.instockRef.current.value)
        : this.instockRef.current.value;
    const store = this.storeRef.current.value;
    filterItems({ instock, store });
  };

  render() {
    return (
      <Consumer>
        {context => (
          <div className="position-fixed">
            <div className="py-5">
              <form onChange={() => this.handleChange(context)}>
                <div className="form-group py-2">
                  <label htmlFor="store">Select Store</label>
                  <select
                    className="form-control"
                    id="store"
                    name="store"
                    ref={this.storeRef}
                  >
                    <option value={''}>All</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Finland">Finland</option>
                  </select>
                </div>
                <div className="form-group py-2">
                  <label className="form-check-label" htmlFor="availability">
                    Available
                  </label>
                  <select
                    name="instock"
                    id="availability"
                    className="form-control"
                    ref={this.instockRef}
                  >
                    <option value={''}>All</option>
                    <option value={true}>Available</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default FilterSearch;

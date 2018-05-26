import React, { Component, Fragment } from 'react';
import { Consumer } from '../../provider/Provider';

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
    const { filter, updateShowFilter } = this.props;
    return (
      <Fragment>
        <div className="position-fixed bg-light py-2 px-2">
          <h4 className="text-info">Filter by: </h4>
          <button
            className={`btn ${
              filter ? 'btn-danger' : 'btn-warning'
            } d-inline d-md-inline d-lg-none`}
            style={{
              position: 'absolute',
              right: -42,
              top: 0,
              zIndex: 3
            }}
            onClick={() => {
              updateShowFilter();
            }}
          >
            {' '}
            {filter ? '❮' : '❯'}{' '}
          </button>

          <Consumer>
            {context => (
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
            )}
          </Consumer>
        </div>
      </Fragment>
    );
  }
}

export default FilterSearch;

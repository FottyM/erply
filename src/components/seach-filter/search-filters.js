import React, { Component, Fragment } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
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

  handleClickOutside = () => this.props.closeFiltersPane();

  render() {
    const { isOpened, toggleFilters } = this.props;
    return (
      <div className="position-fixed bg-light mt-1 py-2 px-2">
        <h6 className="text-info">Filter by: </h6>
        <button
          className={`btn ${
            isOpened
              ? 'btn-danger animated rotateIn'
              : 'btn-warning animated flipInX'
          } d-inline d-md-inline d-lg-none drop-shaddow `}
          style={{
            position: 'absolute',
            right: -42,
            top: 0,
            zIndex: 3
          }}
          onClick={() => {
            toggleFilters();
          }}
        >
          {' '}
          {isOpened ? '\u2573' : '❯'}{' '}
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
    );
  }
}

export default enhanceWithClickOutside(FilterSearch);

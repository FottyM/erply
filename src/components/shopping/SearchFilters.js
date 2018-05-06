import React, { Component } from 'react';
import { AppContext } from '../../store/Provider';
const Consumer = AppContext.Consumer;
class SearchFilter extends Component {
  countryRef = React.createRef();
  availabilityRef = React.createRef();

  filterItems = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Consumer>
        {context => {
          return (
            <div className="position-fixed">
              <div className="py-5">
                <form onChange={this.filterItems}>
                  <div className="form-group py-2">
                    <label htmlFor="store">Select Store</label>
                    <select
                      className="form-control"
                      id="store"
                      ref={this.countryRef}
                    >
                      <option> none </option>
                      <option value="estonia">Estonia</option>
                      <option value="finland">Finland</option>
                    </select>
                  </div>
                  <div className="form-check py-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="availability"
                      ref={this.availabilityRef}
                    />
                    <label className="form-check-label" htmlFor="availability">
                      Available
                    </label>
                  </div>
                </form>
              </div>
            </div>
          );
        }}}
      </Consumer>
    );
  }
}

export default SearchFilter;

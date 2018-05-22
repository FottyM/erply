import React, { Component } from 'react';
import { AppContext } from '../../store/Provider';
const Consumer = AppContext.Consumer;

class SearchFilter extends Component {
  countryRef = React.createRef();

  handleChange = (event, { filterItems }) => {
    console.log({ [event.target.name]: event.target.value });
    filterItems(null);

    console.log(event.target.value);
  };

  render() {
    return (
      <Consumer>
        {context => (
          <div className="position-fixed">
            <div className="py-5">
              <form onChange={event => this.handleChange(event, context)}>
                <div className="form-group py-2">
                  <label htmlFor="store">Select Store</label>
                  <select className="form-control" id="store" name="store">
                    <option value="all">All</option>
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
                  >
                    <option value={null}>All</option>
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
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

export default SearchFilter;

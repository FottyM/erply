import React, { Component } from 'react';
import { AppContext as Context } from '../../Provider';
import find from 'lodash/find';
import isNil from 'lodash/isNil';
import flattenDeep from 'lodash/flattenDeep';
import currencyFormatter from 'currency-formatter';

class ShoppingItemDetails extends Component {
  state = {
    item: null,
    quantity: 1
  };

  handleQteChange = e => {
    const number = parseInt(e.target.value);
    this.setState({
      quantity: number
    });
  };

  handleClick = e => {
    e.preventDefault();
    if (this.state.quantity > 0) {
      // add items to the shopping cart
      return;
    }
    return;
  };

  getItem = (itemsChunks = [], id) => {
    itemsChunks = flattenDeep(itemsChunks);
    const item = find(itemsChunks, { id: parseInt(id) });
    // this.setState({ item })
    if (!isNil(item)) {
      return (
        <div>
          <div className="row">
            <div className="col-12 col-md-4 text-center my-5">
              <img src={item.image} className="img-fluid" alt={item.name} />
            </div>
            <div className="col-12 col-md-8 my-5">
              <h2 className="text-primary">{item.name}</h2>
              <h3 className="text-danger">
                {currencyFormatter.format(item.price, { code: item.currency })}
              </h3>
              <ul className="list-group my-3">
                <li className="list-group-item">
                  {' '}
                  Description : {item.description}
                </li>
                <li className="list-group-item">
                  {' '}
                  Product code: {item.productcode}
                </li>
                <li className="list-group-item"> Store : {item.store}</li>
                <li className="list-group-item"> In stock {item.instock}</li>
              </ul>
              <form className="form-inline">
                <label
                  className="sr-only"
                  htmlFor={`inlineFormInputName${item.id}`}
                >
                  Qunatity
                </label>
                <input
                  type="number"
                  className="form-control mb-2 mr-sm-2"
                  id={`inlineFormInputName${item.id}`}
                  onChange={this.handleQteChange}
                  value={this.state.quantity}
                />
                <button
                  typye="submit"
                  className="btn btn-warning mb-2"
                  onClick={this.handleClick}
                >
                  Add to Basket
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique, molestias iure pariatur perferendis magni illo expedita
              dolores veritatis et nisi aspernatur inventore mollitia commodi
              ipsum alias sint quis, asperiores sunt?
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <h3 className="text-danger"> Please try go back</h3>
          <img
            src="http://placekitten.com/g/400/600"
            alt="oopsie"
            className="img-fluid"
          />
        </div>
      );
    }
  };

  render() {
    const { match } = this.props;
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="container">
              {this.getItem(context.itemsChunks, match.params.item)}
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default ShoppingItemDetails;

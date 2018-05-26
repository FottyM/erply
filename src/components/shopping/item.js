import React, { Component, Fragment } from 'react';
import find from 'lodash/find';
import isNil from 'lodash/isNil';
import flattenDeep from 'lodash/flattenDeep';
import currencyFormatter from 'currency-formatter';

import { Consumer } from '../../provider/Provider';

class Item extends Component {
  state = {
    item: {},
    itemCollection: [],
    quantity: 0
  };

  handleQteChange = (e, item) => {
    const number = parseInt(e.target.value);
    const temp = [];
    if (number > 0) {
      for (let i = 0; i < number; i++) {
        temp.push(item);
      }
    }
    this.setState({ quantity: number, itemCollection: temp, item: item });
  };

  getItemById = (itemsChunks = [], id, { addToBasket }) => {
    itemsChunks = flattenDeep(itemsChunks);
    const item = find(itemsChunks, { id: parseInt(id) });

    if (!isNil(item)) {
      return this.renderItem(item, addToBasket);
    } else {
      return this.renderErrorMessage();
    }
  };

  renderItem = (item, addToBasket) => {
    return (
      <Fragment>
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
                <span className="font-weight-bold"> Description </span> :{' '}
                {item.description}
              </li>
              <li className="list-group-item">
                {' '}
                <span className="font-weight-bold"> Department </span> :{' '}
                {item.department}
              </li>
              <li className="list-group-item">
                {' '}
                <span className="font-weight-bold"> Product code </span> :{' '}
                {item.productcode}
              </li>
              <li className="list-group-item">
                {' '}
                <span className="font-weight-bold"> Store </span>: {item.store}
              </li>
              <li className="list-group-item">
                {' '}
                {item.instock ? (
                  <span className="text-success"> In stock </span>
                ) : (
                  <span className="text-danger animated shake">
                    {' '}
                    Out of stock{' '}
                  </span>
                )}
              </li>
            </ul>
            <form className="form-inline">
              <label
                className="sr-only"
                htmlFor={`inlineFormInputName${item.id}`}
              >
                Quantity
              </label>
              <input
                type="number"
                className="form-control mb-2 mr-sm-2"
                id={`inlineFormInputName${item.id}`}
                onChange={e => this.handleQteChange(e, item)}
                value={this.state.quantity}
                disabled={!item.instock}
              />
              <button
                type="submit"
                className="btn btn-warning mb-2"
                onClick={e => {
                  e.preventDefault();
                  addToBasket(this.state.itemCollection);
                }}
                disabled={!item.instock || this.state.quantity < 1}
              >
                Add to Basket
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  };

  renderErrorMessage = () => {
    return (
      <div className="row">
        <div className="col-12">
          <div className="text-center py-5">
            <h3 className="text-danger animated bounce infinite">
              {' '}
              Please try go back
            </h3>
            <img
              src="http://placekitten.com/g/400/600"
              alt="oopsie"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { match } = this.props;
    return (
      <Consumer>
        {context => {
          return (
            <div className="container">
              {this.getItemById(
                context.itemsChunks,
                match.params.item,
                context
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Item;

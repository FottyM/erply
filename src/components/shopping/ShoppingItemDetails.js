import React, { Component, Fragment } from 'react';
import { Consumer } from '../../store/Provider';
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

  getItem = (itemsChunks = [], id, context) => {
    itemsChunks = flattenDeep(itemsChunks);
    const item = find(itemsChunks, { id: parseInt(id) });

    if (!isNil(item)) {
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
                  <span className="font-weight-bold">
                    {' '}
                    Product code{' '}
                  </span> : {item.productcode}
                </li>
                <li className="list-group-item">
                  {' '}
                  <span className="font-weight-bold"> Store </span>:{' '}
                  {item.store}
                </li>
                <li className="list-group-item">
                  {' '}
                  {item.instock ? (
                    <span className="text-success"> In stock </span>
                  ) : (
                    <span className="text-danger"> Out of stock </span>
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
                  onChange={this.handleQteChange}
                  value={this.state.quantity}
                  disabled={!item.instock}
                />
                <button
                  type="submit"
                  className="btn btn-warning mb-2"
                  onClick={e => {
                    e.preventDefault();
                    context.addToBasket({ ...item, qte: this.state.quantity });
                  }}
                  disabled={!item.instock}
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
        </Fragment>
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
      <Consumer>
        {context => {
          return (
            <div className="container">
              {this.getItem(context.itemsChunks, match.params.item, context)}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default ShoppingItemDetails;

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import currencyFormatter from 'currency-formatter';
import pluralize from 'pluralize';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { Consumer } from '../../store/Provider';

class Basket extends React.Component {
  renderBasketItems = ({ basket, removeFromBasket }, total) => {
    const groupedItems = groupBy(basket, 'id');

    if (!isEmpty(basket)) basket.map(item => (total += item.price));

    return (
      <Fragment>
        <div className="col-12">
          {!isEmpty(basket) ? (
            <ul className="pt-3 list-group">
              {map(groupedItems, (items, index) => {
                return (
                  <li key={`${index}`} className="list-group-item bg-darkcyan">
                    <div className="media">
                      <img
                        className="mr-3 img-thumbnail"
                        src={items[0].image}
                        alt={items[0].name}
                        style={{
                          maxHeight: 80,
                          maxWidth: 80
                        }}
                      />
                      <div className="media-body">
                        <h5 className="mt-0 font-weight-light">
                          {items[0].name}
                        </h5>
                        <h6 className="font-weight-bold font-italic">
                          QTY: {items.length}
                        </h6>
                        <h6 className="font-weight-bold font-italic">
                          Price:{' '}
                          {currencyFormatter.format(items[0].price, {
                            code: 'EUR'
                          })}
                        </h6>
                        <button
                          className=" btn btn-danger float-right"
                          onClick={() => removeFromBasket(items[0].id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h4 className="text-danger text-center">Nothing here</h4>
          )}
        </div>
        <div className="col py-2">
          <hr />
          <h4 className="text-center font-italic">
            {pluralize('Item', !isEmpty(basket) ? basket.length : 0, true)}
          </h4>
          <h4 className="text-center font-italic">
            Subtotal: {currencyFormatter.format(total, { code: 'EUR' })}
          </h4>
          <hr />
        </div>
      </Fragment>
    );
  };

  render() {
    const { isOpened } = this.props;
    return (
      <Consumer>
        {context => {
          let total = 0;
          return (
            <div
              className={`basket ${
                isOpened ? 'show' : ''
              } bg-darkcyan text-white py-3`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-danger rounded rounded-circle"
                      onClick={this.props.toggle}
                    >
                      &#9587;
                    </button>
                    <h4 className="text-center">The Basket</h4>
                    <hr className="text-white" />
                  </div>
                </div>
                <div className="row">
                  {this.renderBasketItems(context, total)}
                </div>
                <div className="row">
                  <div className="col-12 align-bottom">
                    <button className="btn btn-success">Check out</button>
                    <button
                      className="btn btn-danger float-right"
                      onClick={this.props.emptyBasket}
                    >
                      Clear basket
                    </button>
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Basket.propTypes = {
  emptyBasket: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Basket;

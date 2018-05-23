import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import currencyFormatter from 'currency-formatter';
import enhanceWithClickOutside from 'react-click-outside';
import pluralize from 'pluralize';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { Consumer } from '../../store/Provider';

class Basket extends React.Component {
  handleClickOutside = () => {
    this.props.toggle();
  };

  renderBasketItems = (basket = [], total) => {
    const groupedItems = groupBy(basket, 'id');

    if (!isEmpty(basket)) basket.map(item => (total += item.price));

    return (
      <Fragment>
        <div className="col-12 pt-5">
          {!isEmpty(basket) ? (
            <ul className="list-unstyled pt-3">
              {map(groupedItems, (items, index) => {
                return (
                  <li key={`${index}`}>
                    {' '}
                    {items.length} {items[0].name} -{' '}
                    {currencyFormatter.format(items[0].price, { code: 'EUR' })}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-info">Nothing here</p>
          )}
        </div>
        <div className="col py-2">
          <hr />
          <h6 className="text-primary">
            {pluralize('Item', !isEmpty(basket) ? basket.length : 0, true)}
          </h6>
          <h6 className="text-primary">
            Total: {currencyFormatter.format(total, { code: 'EUR' })}
          </h6>
        </div>
      </Fragment>
    );
  };

  render() {
    const { isOpened, emptyBasket } = this.props;
    return (
      <Consumer>
        {({ basket }) => {
          let total = 0;
          return (
            <div className={`basket ${isOpened ? 'show' : ''} bg-light`}>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-danger rounded rounded-circle"
                      onClick={this.handleClickOutside}
                      style={{
                        position: 'absolute',
                        left: 5,
                        top: 5,
                        zIndex: 3
                      }}
                    >
                      &times;
                    </button>
                  </div>
                </div>
                <div className="row">
                  {this.renderBasketItems(basket, total)}
                </div>
                <div className="row">
                  <div className="col-12">
                    <button className="btn btn-success">Check out</button>

                    <button
                      className="btn btn-danger float-right"
                      onClick={emptyBasket}
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
  toggle: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired
};

export default enhanceWithClickOutside(Basket);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import pluralize from 'pluralize';
import currencyFormatter from 'currency-formatter';

class BasketSubTotal extends Component {
  render() {
    const { basket, total } = this.props;

    return (
      <div className="col">
        <div className="py-2">
          <hr />
          <h4 className="text-center font-italic">
            {pluralize('Item', !isEmpty(basket) ? basket.length : 0, true)}
          </h4>
          <h4 className="text-center font-italic">
            Subtotal: {currencyFormatter.format(total, { code: 'EUR' })}
          </h4>
          <hr />
        </div>
      </div>
    );
  }
}

BasketSubTotal.propTypes = {
  basket: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
};

export default BasketSubTotal;

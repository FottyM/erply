import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import pluralize from 'pluralize';
import currencyFormatter from 'currency-formatter';

class BasketSubTotal extends Component {
  setTotal = basket => {
    let total = 0;
    if (!isEmpty(basket)) basket.map(item => (total += item.price));
    return total;
  };

  render() {
    const { basket } = this.props;
    return (
      <div className="col-12">
        <div className="py-2">
          <hr />
          <h4 className="text-center font-italic">
            {pluralize('Item', !isEmpty(basket) ? basket.length : 0, true)}
          </h4>
          <h4 className="text-center font-italic">
            Subtotal:{' '}
            {currencyFormatter.format(this.setTotal(basket), { code: 'EUR' })}
          </h4>
          <hr />
        </div>
      </div>
    );
  }
}

BasketSubTotal.propTypes = {
  basket: PropTypes.array.isRequired
};

export default BasketSubTotal;

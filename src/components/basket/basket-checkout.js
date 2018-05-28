import React from 'react';
import PropTypes from 'prop-types';

const BasketCheckout = ({ emptyBasket, validateLabel, clearLabel }) => {
  return (
    <div className="col-12 align-bottom">
      <button className="btn btn-success">
        <span>
          <i className="fas fa-shopping-cart" />{' '}
        </span>
        {validateLabel}
      </button>
      <button className="btn btn-danger float-right" onClick={emptyBasket}>
        <span>
          {' '}
          <i className="fas fa-trash" />{' '}
        </span>
        {clearLabel}
      </button>
      <div className="clearfix" />
    </div>
  );
};

BasketCheckout.propTypes = {
  emptyBasket: PropTypes.func.isRequired,
  validateLabel: PropTypes.string.isRequired,
  clearLabel: PropTypes.string.isRequired
};

export default BasketCheckout;

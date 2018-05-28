import React from 'react';
import PropTypes from 'prop-types';

const BasketCheckout = ({ emptyBasket }) => {
  return (
    <div className="col-12 align-bottom">
      <button className="btn btn-success">
        <span>
          <i className="fas fa-shopping-cart" />{' '}
        </span>
        Checkout
      </button>
      <button className="btn btn-danger float-right" onClick={emptyBasket}>
        <span>
          {' '}
          <i className="fas fa-trash" />{' '}
        </span>
        Empty Basket
      </button>
      <div className="clearfix" />
    </div>
  );
};

BasketCheckout.propTypes = {
  emptyBasket: PropTypes.func.isRequired
};

export default BasketCheckout;

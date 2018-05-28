import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BasketCheckout = ({
  emptyBasket,
  validateLabel,
  clearLabel,
  closeBasket
}) => {
  return (
    <div className="col-12 align-bottom">
      <Link to="/checkout" className="btn btn-success" onClick={closeBasket}>
        <span>
          <i className="fas fa-shopping-cart" />{' '}
        </span>
        {validateLabel}
      </Link>
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

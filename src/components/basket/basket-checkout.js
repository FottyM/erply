import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BasketCheckout = props => {
  return (
    <div className="col-12 align-bottom mb-2">
      <Link
        to="/checkout"
        className="btn btn-success"
        onClick={props.closeBasket}
      >
        <span>
          <i className="fas fa-shopping-cart" />{' '}
        </span>
        {props.validateLabel}
      </Link>
      <button
        className="btn btn-danger float-right"
        onClick={props.emptyBasket}
      >
        <span>
          {' '}
          <i className="fas fa-trash" />{' '}
        </span>
        {props.clearLabel}
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

import PropTypes from 'prop-types';
import React from 'react';
import BasketList from '../basket/basket-list';
import BasketSubTotal from '../basket/basket-subtotal';
import BasketCheckout from '../basket/basket-checkout';
import CheckoutForm from './checkout-form';

const Checkout = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center border-bottom py-3">Checkout</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12 py-5">
          <CheckoutForm />
        </div>
      </div>
      <div className="row">
        <BasketList {...props} />
        <BasketSubTotal {...props} />
        <BasketCheckout
          {...props}
          emptyBasket={props.clearBasket}
          validateLabel="Confirm and Pay"
          clearLabel="Cancel All"
        />
      </div>
    </div>
  );
};

Checkout.propTypes = {
  clearBasket: PropTypes.func.isRequired
};

export default Checkout;

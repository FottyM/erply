import React, { Component } from 'react';
import Basket from '../basket/basket';

class Checkout extends Component {
  render() {
    const {
      isBasketOpened,
      toggleBasket,
      clearBasket,
      closeBasket
    } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-2 offset-2">
            <h1>Checkout</h1>
            <Basket
              isOpened={isBasketOpened}
              toggle={toggleBasket}
              emptyBasket={clearBasket}
              closeBasket={closeBasket}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;

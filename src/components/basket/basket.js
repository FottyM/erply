import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';

import { Consumer } from '../../provider/Provider';
import BasketList from './basket-list';
import BasketSubTotal from './basket-subtotal';
import BasketCheckout from './basket-checkout';

class Basket extends Component {
  renderBasketItems = ({ basket, removeFromBasket, updateBasket }) => {
    return (
      <Fragment>
        <BasketList
          basket={basket}
          removeFromBasket={removeFromBasket}
          updateBasket={updateBasket}
          bgColor="bg-darkcyan"
          txtColor="text-light"
        />
        <BasketSubTotal basket={basket} />
      </Fragment>
    );
  };

  render() {
    const { isOpened, toggle } = this.props;
    return (
      <Consumer>
        {context => {
          return (
            <div
              className={`basket ${
                isOpened ? 'show' : ''
              } bg-darkcyan text-white py-3`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <span
                      className="text-white font-weight-bold"
                      style={{ cursor: 'pointer' }}
                      onClick={toggle}
                    >
                      &#x2573;
                    </span>
                    <h4 className="text-center">The Basket</h4>
                    <hr />
                  </div>
                </div>
                <div className="row">{this.renderBasketItems(context)}</div>
                <div className="row">
                  <BasketCheckout
                    emptyBasket={context.clearBasket}
                    validateLabel="Checkout"
                    clearLabel="Empty Basket"
                  />
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

export default enhanceWithClickOutside(Basket);

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import Shopping from '../shopping/';
import Item from '../shopping/item';
import Basket from '../basket/basket';
import { Consumer } from '../../provider/Provider';
import Checkout from '../checkout/checkout';

const Main = () => {
  return (
    <main>
      <Consumer>
        {({ basket, toggleBasket }) => (
          <div
            className="border border-dark p-2 drop-shaddow bg-white"
            style={{
              position: 'fixed',
              right: 10,
              top: 80,
              zIndex: 1,
              cursor: 'pointer'
            }}
            onClick={toggleBasket}
          >
            <span>
              <i className="fas fa-shopping-basket" />{' '}
            </span>
            <span className="badge badge-danger">
              {!isEmpty(basket) ? basket.length : 0}{' '}
            </span>
          </div>
        )}
      </Consumer>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/store/items" />;
          }}
        />
        <Route path="/store/items/:item" component={Item} />
        <Route path="/store/items" component={Shopping} />
        <Route
          path="/checkout"
          render={() => (
            <Consumer>{context => <Checkout {...context} />}</Consumer>
          )}
        />
      </Switch>
      <Consumer>
        {({ clearBasket, isBasketOpened, toggleBasket, closeBasket }) => (
          <Basket
            isOpened={isBasketOpened}
            toggle={toggleBasket}
            emptyBasket={clearBasket}
            closeBasket={closeBasket}
          />
        )}
      </Consumer>
    </main>
  );
};

export default Main;

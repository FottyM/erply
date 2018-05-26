import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';

import { Consumer } from '../../provider/Provider';
import BasketList from './basket-list';
import BasketSubTotal from './basket-subtotal';

class Basket extends Component {
  renderBasketItems = ({ basket, removeFromBasket, updateBasket }, total) => {
    const groupedItems = groupBy(basket, 'id');

    if (!isEmpty(basket)) basket.map(item => (total += item.price));

    return (
      <Fragment>
        <BasketList
          basket={basket}
          groupedItems={groupedItems}
          removeFromBasket={removeFromBasket}
          updateBasket={updateBasket}
        />

        <BasketSubTotal basket={basket} total={total} />
      </Fragment>
    );
  };

  render() {
    const { isOpened } = this.props;
    return (
      <Consumer>
        {context => {
          let total = 0;
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
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={this.props.toggle}
                      onKeyUp={e => {
                        console.log(e);
                      }}
                    >
                      &#x2573;
                    </span>
                    <h4 className="text-center">The Basket</h4>
                    <hr className="text-white" />
                  </div>
                </div>
                <div className="row">
                  {this.renderBasketItems(context, total)}
                </div>
                <div className="row">
                  <div className="col-12 align-bottom">
                    <button className="btn btn-success">Check out</button>
                    <button
                      className="btn btn-danger float-right"
                      onClick={this.props.emptyBasket}
                    >
                      Clear basket
                    </button>
                    <div className="clearfix" />
                  </div>
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

export default Basket;

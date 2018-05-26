import PropTypes from 'prop-types';
import React, { Component } from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import BasketItem from './basket-list-item';

class BasketList extends Component {
  render() {
    const { basket, groupedItems, removeFromBasket, updateBasket } = this.props;
    return (
      <div className="col-12">
        {!isEmpty(basket) ? (
          <ul className="pt-3 list-group">
            {map(groupedItems, (items, index) => {
              return (
                <li
                  key={`${index}`}
                  className="list-group-item bg-darkcyan animated bounceIn"
                >
                  <BasketItem
                    id={items[0].id}
                    image={items[0].image}
                    name={items[0].name}
                    price={items[0].price}
                    quantity={items.length}
                    removeFromBasket={removeFromBasket}
                    updateBasket={updateBasket}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <h4 className="text-danger text-center animated jackInTheBox ">
            Nothing here
          </h4>
        )}
      </div>
    );
  }
}

BasketList.propTypes = {
  basket: PropTypes.array.isRequired,
  groupedItems: PropTypes.object.isRequired,
  removeFromBasket: PropTypes.func.isRequired
};

export default BasketList;

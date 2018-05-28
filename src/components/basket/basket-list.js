import PropTypes from 'prop-types';
import React, { Component } from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import BasketItem from './basket-list-item';

const BasketList = ({ basket, removeFromBasket, updateBasket }) => {
  const groupedItems = groupBy(basket, 'id');

  return (
    <div className="col-12">
      {!isEmpty(basket) ? (
        <ul
          className="pt-3 list-group"
          style={{
            overflow: 'scroll'
          }}
        >
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
};

BasketList.propTypes = {
  basket: PropTypes.array.isRequired,
  removeFromBasket: PropTypes.func.isRequired
};

export default BasketList;

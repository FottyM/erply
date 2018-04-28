import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import currencyFormatter from 'currency-formatter';

const ShoppingItem = props => {
  const { image, name, price, currency } = props;

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 py-3">
      <LazyLoad height={200}>
        <div className="shopping-item-card m-1 p-2 rounded d-flex flex-column">
          <div className="item-img-container text-center">
            <img className="img-fluid" src={image} alt={name} />
          </div>
          <div className="item-details p-3">
            <h4>{name}</h4>
            <p className="">
              {currencyFormatter.format(price, { code: currency })}
            </p>
          </div>
          <div className="item-actions d-flex justify-content-between">
            <button className="btn btn-outline-info">Show</button>
            <input type="number" name="" id="" defaultValue={1} />
            <button className="btn btn-outline-success">Add</button>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};
export default ShoppingItem;

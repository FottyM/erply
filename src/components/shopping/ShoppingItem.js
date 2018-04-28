import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import currencyFormatter from 'currency-formatter';
import { Link } from 'react-router-dom';
import kebabCase from 'lodash/kebabCase';

const ShoppingItem = props => {
  const { image, name, price, currency, match, id } = props;
  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 py-3">
      <LazyLoad height={200}>
        <div className="shopping-item-card m-1 p-2 rounded d-flex flex-column">
          <div className="item-img-container text-center">
            <img className="img-fluid" src={image} alt={name} />
          </div>
          <div className="item-details py-2 px-1">
            <h5 className="text-primary">{name}</h5>
            <p className="text-danger">
              {currencyFormatter.format(price, { code: currency })}
            </p>
          </div>
          <div className="item-actions d-flex justify-content-between">
            <Link to={`${match.url}/${id}`} className="btn btn-outline-info">
              Show
            </Link>
            <button className="btn btn-outline-success">Add</button>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};
export default ShoppingItem;

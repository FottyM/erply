import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import currencyFormatter from 'currency-formatter';
import { Link } from 'react-router-dom';
import kebabCase from 'lodash/kebabCase';

const ShoppingItem = props => {
  const { image, name, price, currency, match, id, instock, store } = props;
  console.log(props);
  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 py-3">
      <LazyLoad height={200}>
        <div className="shopping-item-card m-1 p-2 rounded d-flex flex-column">
          <Link to={`${match.url}/${id}`} style={{ textDecoration: 'none' }}>
            <div className="item-img-container text-center">
              <img className="img-fluid" src={image} alt={name} />
            </div>
            <div className="item-details py-2 px-1">
              <h4 className="text-dark">{name}</h4>
              <h5 className="text-danger">
                {currencyFormatter.format(price, { code: currency })}
              </h5>
              <p className="text-dark">
                {' '}
                {instock ? 'In stock' : 'Out of stock'}{' '}
                <span className="text-info">({store})</span>{' '}
              </p>
            </div>
          </Link>
          <button className="btn btn-block btn-warning text-light">
            Add to basket
          </button>
        </div>
      </LazyLoad>
    </div>
  );
};
export default ShoppingItem;

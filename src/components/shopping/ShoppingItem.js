import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import currencyFormatter from 'currency-formatter';
import { Link } from 'react-router-dom';
import kebabCase from 'lodash/kebabCase';
import truncate from 'lodash/truncate';
import { AppContext as Context } from '../../Provider';

const ShoppingItem = props => {
  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 py-3">
      <LazyLoad height={200}>
        <div className="shopping-item-card m-1 p-2 rounded d-flex flex-column">
          <Link
            to={`${props.match.url}/${props.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="item-img-container text-center">
              <img className="img-fluid" src={props.image} alt={props.name} />
            </div>
            <div className="item-details py-2 px-1">
              <span
                className="d-inline-block"
                tabIndex="0"
                data-toggle="tooltip"
                title={props.name}
              >
                <h4 className="text-dark">
                  {truncate(props.name, {
                    length: 20,
                    separator: ' ',
                    omission: '...'
                  })}
                </h4>
              </span>
              <h5 className="text-danger">
                {currencyFormatter.format(props.price, {
                  code: props.currency
                })}
              </h5>
              <p className="text-dark">
                {' '}
                {props.instock ? 'In stock' : 'Out of stock'}{' '}
                <span className="text-info">({props.store})</span>{' '}
              </p>
            </div>
          </Link>
          <Context.Consumer>
            {({ addToBasket }) => {
              console.log(props, 'ELON MUSK');
              return (
                <button
                  className="btn btn-block btn-warning text-light"
                  disabled={!props.instock}
                  style={{ cursor: !props.instock ? 'not-allowed' : '' }}
                  onClick={() => addToBasket(props)}
                >
                  Add to basket
                </button>
              );
            }}
          </Context.Consumer>
        </div>
      </LazyLoad>
    </div>
  );
};
export default ShoppingItem;

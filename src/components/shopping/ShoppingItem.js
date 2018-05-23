import React from 'react';
import LazyLoad from 'react-lazyload';
import currencyFormatter from 'currency-formatter';
import { Link } from 'react-router-dom';
import truncate from 'lodash/truncate';
import { Consumer } from '../../store/Provider';

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
                <h5 className="text-dark">
                  {truncate(props.name, {
                    length: 25,
                    separator: ' ',
                    omission: '...'
                  })}
                </h5>
              </span>
              <h5 className="text-danger">
                {currencyFormatter.format(props.price, {
                  code: props.currency
                })}
              </h5>
              <p className="text-dark">
                {' '}
                {props.instock ? 'In stock' : 'Out of stock'}{' '}
                <span className="text-dark">({props.store})</span>{' '}
              </p>
            </div>
          </Link>
          <Consumer>
            {({ addToBasket }) => {
              return (
                <button
                  className="btn btn-block btn-success text-light"
                  disabled={!props.instock}
                  style={{ cursor: !props.instock ? 'not-allowed' : '' }}
                  onClick={() => addToBasket(props)}
                >
                  Add to basket
                </button>
              );
            }}
          </Consumer>
        </div>
      </LazyLoad>
    </div>
  );
};
export default ShoppingItem;

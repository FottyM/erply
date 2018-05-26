import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import currencyFormatter from 'currency-formatter';

class BasketItem extends Component {
  render() {
    const {
      image,
      name,
      price,
      quantity,
      id,
      removeFromBasket,
      updateBasket
    } = this.props;
    return (
      <Fragment>
        <div className="media">
          <img
            className="mr-3 img-thumbnail"
            src={image}
            alt={name}
            style={{
              maxHeight: 80,
              maxWidth: 80
            }}
          />
          <div className="media-body">
            <h5 className="mt-0 font-weight-light">{name}</h5>
            <h6 className="font-weight-bold font-italic">QTY: {quantity}</h6>
            <h6 className="font-weight-bold font-italic">
              Price:{' '}
              {currencyFormatter.format(price, {
                code: 'EUR'
              })}
            </h6>
          </div>
        </div>
        <div className="form-row">
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              value={quantity}
              defaultValue={1}
              onChange={e => {
                const qty = parseInt(e.target.value);
                const update = () => updateBasket(qty, id);
                setTimeout(update, 1500);
              }}
            />
          </div>
          <div className="col-8">
            <button
              className=" btn btn-outline-danger"
              onClick={() => removeFromBasket(id)}
            >
              Remove All
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

BasketItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
  updateBasket: PropTypes.func.isRequired
};
export default BasketItem;

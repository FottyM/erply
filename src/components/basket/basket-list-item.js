import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';

class BasketItem extends Component {
  state = {
    tempQTY: 0
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    return {
      tempQTY: props.quantity
    };
  }

  componentDidMount() {
    this.setState({
      tempQTY: this.props.quantity
    });
  }

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
              value={this.state.tempQTY}
              defaultValue={1}
              onChange={e => {
                const qty = parseInt(e.target.value);
                this.setState({ tempQTY: qty });
              }}
            />
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary"
              onClick={() => updateBasket(this.state.tempQTY, id)}
            >
              Update
            </button>
          </div>

          <div className="col-4">
            <button
              className=" btn btn-outline-danger"
              onClick={() => removeFromBasket(id)}
            >
              Delete
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

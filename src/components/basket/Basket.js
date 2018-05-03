import React, { Component } from 'react';
import { AppContext as Context } from '../../Provider';

class Basket extends Component {
  render() {
    console.log(this.props, 'props====>>>>>>');
    return (
      <Context.Consumer>
        {context => {
          console.log(context, 'context====>>>>>>>');
          return (
            <div
              className={`basket ${
                this.props.showBasket ? 'show' : ''
              } bg-light`}
            >
              <div className="container">
                <div className="row">
                  <button
                    className="btn btn-danger rounded rounded-circle"
                    onClick={this.props.closeBasket}
                    style={{
                      position: 'absolute',
                      right: 5,
                      top: 5,
                      zIndex: 3
                    }}
                  >
                    &times;
                  </button>
                  <div className="col-12 pt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                    autem tempore, a rerum dolor beatae fugit debitis mollitia
                    sint, porro nesciunt esse at odio, praesentium nobis
                    recusandae nemo sequi dolore.
                  </div>
                  <button className="btn btn-block btn-success mx-2">
                    Check out
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Basket;

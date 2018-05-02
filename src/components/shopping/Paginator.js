import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

class Paginator extends Component {
  state = {
    current: 0,
    previous: -1,
    next: 1
  };

  handleNext = () => {
    const { current, next, previous } = this.state;
    const { data } = this.props;
    if (data.length > 0 && current < data.length) {
      this.setState({
        next: next + 1,
        previous: previous + 1,
        current: current + 1
      });
      this.changeIndex();
      this.scrollBy(0, 3);
    }
  };

  handlePrevious = () => {
    const { current, previous, next } = this.state;
    const { data } = this.props;

    if (current === 0) this.setState({ current: 0, previous: -1, next: 1 });

    if (data.length > 0 && current > 0) {
      this.setState({
        next: next - 1,
        previous: previous - 1,
        current: current - 1
      });
      this.changeIndex();
      this.scrollBy(0, 3);
    }
  };

  jumpToPage = index => {
    if (index === 0) {
      this.setState({ current: 0, previous: -1, next: 1 });
      this.changeIndex();
      this.scrollBy(0, 3);
    }

    if (index > 0) {
      let next = index + 1;
      let previous = index - 1;
      let current = index;
      this.setState({ next, previous, current });
      this.changeIndex();
      this.scrollBy(0, 3);
    }
  };

  scrollBy(distance, duration) {
    let initialY = document.body.scrollTop;
    let y = initialY + distance;
    let baseY = (initialY + y) * 0.5;
    let difference = initialY - baseY;
    let startTime = performance.now();

    const step = () => {
      let normalizedTime = (performance.now() - startTime) / duration;
      if (normalizedTime > 1) normalizedTime = 1;

      window.scrollTo(
        0,
        baseY + difference * Math.cos(normalizedTime * Math.PI)
      );
      if (normalizedTime < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  changeIndex = () => this.props.changeIndex(this.state.current);

  render() {
    const { current, previous, next } = this.state;
    const { data } = this.props;

    return (
      <Fragment>
        <div className="w-100 py-5" />
        <div className="col-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${current !== 0 ? '' : 'disabled'}`}>
                <a
                  className="page-link"
                  onClick={this.handlePrevious}
                  tabIndex="-1"
                >
                  Previous
                </a>
              </li>
              {/* { 
                    data.map((containers, index) => 
                    <li className={`page-item ${ current === index ? 'active' : ''}`} key={index}>
                      <a className="page-link" onClick={ () => this.jumpToPage(index)}>{ index + 1 }</a>
                    </li>) 
                  } */}
              <li
                className={`page-item ${
                  current <= data.length || data !== [] ? '' : 'disabled'
                }`}
              >
                <a className="page-link" onClick={this.handleNext}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Fragment>
    );
  }
}

Paginator.propTypes = {
  data: PropTypes.array.isRequired,
  changeIndex: PropTypes.func.isRequired
};

export default Paginator;

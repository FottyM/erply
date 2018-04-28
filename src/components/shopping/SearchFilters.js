import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = props => {
  return (
    <Fragment>
      <div className="position-fixed d-none d-md-block">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Active
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default SearchFilter;
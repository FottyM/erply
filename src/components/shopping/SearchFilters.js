import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = props => {
  return (
    <div className="position-fixed">
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
  );
};

export default SearchFilter;

import React from 'react';

const Footer = () => {
  return (
    <footer className="container-fluid">
      <div className="row">
        <div className="col-12 bg-dark py-5 text-white text-center">
          <p>
            Made with{' '}
            <span className="text-danger">
              <i className="fas fa-heart" />{' '}
            </span>in Tallinn, Estonia, by{' '}
            <a
              href="https://www.linkedin.com/in/fortunat-mutunda-06820a2b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-weight-bold font-italic"
            >
              {' '}
              Fortunat Mutunda{' '}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

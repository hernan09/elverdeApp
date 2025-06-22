import React from "react";
import "./footer.css";
import ReactGA from 'react-ga';

const footer = () => {

  const eventClick = (label) => {
    ReactGA.event({
      category: 'eventClick',
      action: 'click en los iconos del footer',
      label: label
    });
  }

  return (
    <footer className="content-footer">
      <div className="footer-main">
        <a
          className="footer-link"
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/hernan09/"
        >
          © Powered by Hernan Sr
        </a>
      </div>
    </footer>
  );
};

export default footer;

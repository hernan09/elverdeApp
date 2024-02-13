import React from "react";
import "./footer.css";
import LinkediIcon from "../../assets/images/linkedin.png";
import GitIcon from "../../assets/images/github.png";
import ReactGA from 'react-ga';

const footer = () => {

  const eventClick = () => {
    ReactGA.event({
      category: 'eventClick',
      action: 'click en los iconos del footer',
      label: 'para saber si entraron a las redes sociales'
    });
  }

  return (
    <div className="content-footer">
        <a className="footer-link" rel="noopener noreferrer" target="_blank" href="https://github.com/hernan09/">© Powered by Hernan Ssr</a>
      <span className="content-icons">
        <a rel="noopener noreferrer" onClick={eventClick} target="_blank" href="https://www.linkedin.com/in/hern%C3%A1n-gomez/">
          <img className="icon-footer" src={LinkediIcon} alt="" />
        </a>
        <a rel="noopener noreferrer" onClick={eventClick} target="_blank" href="https://github.com/hernan09/">
          <img className="icon-footer git" src={GitIcon} alt="" />
        </a>
      </span>
    </div>
  );
};

export default footer;

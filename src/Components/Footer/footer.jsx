import React from "react";
import "./footer.css";
import LinkediIcon from "../../assets/images/linkedin.png";
import GitIcon from "../../assets/images/git.png";

const footer = () => {
  return (
    <div className="content-footer">
        <a className="footer-link" rel="noopener noreferrer" target="_blank" href="https://github.com/hernan09/">© Powered by Hernan Ssr</a>
      <span className="content-icons">
        <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/hern%C3%A1n-gomez/">
          <img className="icon-footer" src={LinkediIcon} alt="" />
        </a>
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/hernan09/">
          <img className="icon-footer" src={GitIcon} alt="" />
        </a>
      </span>
    </div>
  );
};

export default footer;

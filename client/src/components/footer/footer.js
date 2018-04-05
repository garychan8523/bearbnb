import React from "react";
import { withRouter } from "react-router";

const mainFooter = props => {
  let footerStyle = "";
  let openCloseButton = "";
  let isOpen = false;
  function openClose() {
    if (isOpen) {
      document
        .getElementsByClassName("footer")[0]
        .classList.remove("footer--search__open");
      document.getElementsByClassName(
        "footerOpenCloseBtn--span"
      )[0].textContent =
        "Language and currency";
      document
        .getElementsByClassName("fa-times")[0]
        .classList.add("fa-language");
      document
        .getElementsByClassName("fa-times")[0]
        .classList.remove("fa-times");
      isOpen = false;
    } else {
      document
        .getElementsByClassName("footer")[0]
        .classList.add("footer--search__open");
      document.getElementsByClassName(
        "footerOpenCloseBtn--span"
      )[0].textContent =
        "Close";
      document
        .getElementsByClassName("fa-language")[0]
        .classList.add("fa-times");
      document
        .getElementsByClassName("fa-language")[0]
        .classList.remove("fa-language");
      isOpen = true;
    }
  }
  if (props.location.pathname === "/search") {
    footerStyle = "footer--search";
    openCloseButton = (
      <button className="footerOpenCloseBtn" onClick={openClose}>
        <div className="footerOpenCloseBtn--div">
          <i className="fa fa-language" aria-hidden="true" />
          <span className="footerOpenCloseBtn--span">
            Language and currency
          </span>
        </div>
      </button>
    );
  }
  return (
    <div>
      {openCloseButton}
      <div className={"footer " + footerStyle}>
        <div className="firstFooter">
          <div className="footerSelections-container">
            <div className="footerSelections-container-2">
              <div className="footerSelections--lang">
                <select>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
                <span className="footerSelections__arrow">
                  <svg
                    className="footerSelections__arrow--svg"
                    viewBox="0 0 15.27 8.88"
                  >
                    <polyline points="0.71 0.73 7.35 7.48 14.59 0.73" />
                  </svg>
                </span>
              </div>
              <div className="footerSelections--curr">
                <select>
                  <option value="US Dollar">United States Dollar</option>
                  <option value="Euro">Euros</option>
                </select>
                <span className="footerSelections__arrow">
                  <svg
                    className="footerSelections__arrow--svg"
                    viewBox="0 0 15.27 8.88"
                  >
                    <polyline points="0.71 0.73 7.35 7.48 14.59 0.73" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <ul>
            <li className="boldFootItem">BearBnB</li>
            <li className="footItem">About Us</li>
            <li className="footItem">Careers</li>
            <li className="footItem">Press</li>
            <li className="footItem">Policies</li>
            <li className="footItem">Help</li>
            <li className="footItem">Diversity & Belonging</li>
          </ul>

          <ul className="footer-discover">
            <li className="boldFootItem">Discover</li>
            <li className="footItem">Trust & Safety</li>
            <li className="footItem">Travel Credit</li>
            <li className="footItem">Gift Cards</li>
            <li className="footItem">BearBnB Citizen</li>
            <li className="footItem">Business Travel</li>
            <li className="footItem">Guidebooks</li>
            <li className="footItem">BearBnB Mag</li>
          </ul>

          <ul className="footer-hosting">
            <li className="boldFootItem">Hosting</li>
            <li className="footItem">Why Host</li>
            <li className="footItem">Hospitality</li>
            <li className="footItem">Responsible Hosting</li>
            <li className="footItem">Community Center</li>
          </ul>
        </div>
        <div className="secondFooter">
          <div className="footContainer">
            <h3>BearBnB &copy; 2018</h3>

            <ul>
              <li className="infoItem">Terms</li>
              <li className="infoItem">Privacy</li>
              <li className="infoItem">Site Map</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(mainFooter);

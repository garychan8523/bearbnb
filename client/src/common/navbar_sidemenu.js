import React from "react";

class NavBarSideMenu extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    this.helpForm.reset();
  }

  render() {
    return (
      <div className="navbar-sidemenu">
        <span className="navbar-sidemenu-title">Bearbnb Help</span>
        <button className="xToggleBtn" onClick={this.props.xToggle}>
          X
        </button>
        <div className="navbar-sidemenu-body">
          <form
            onSubmit={this.onSubmit.bind(this)}
            ref={input => (this.helpForm = input)}
          >
            <input
              ref={input => {
                this.textInput = input;
              }}
              onClick={this.handleInputClick}
              type="text"
            />
            <button hidden="true" type="submit" />
          </form>
          <div className="navbar-sidemenu-subtitle">SUGGESTED ARTICLES</div>
          <a href="/">
            <div className="navbar-sidemenu-item">
              <span className="navbar-sidemenu-link">
                Getting Started Guide
              </span>
              <span className="navbar-sidemenu-arrow">></span>
            </div>
          </a>
          <a href="/">
            <div className="navbar-sidemenu-item">
              <span className="navbar-sidemenu-link">
                How do I submit a reservation request?
              </span>
              <span className="navbar-sidemenu-arrow">></span>
            </div>
          </a>
          <a href="/">
            <div className="navbar-sidemenu-item">
              <span className="navbar-sidemenu-link">
                When am I charged for a reservation?
              </span>
              <span className="navbar-sidemenu-arrow">></span>
            </div>
          </a>
          <a href="/">
            <div className="navbar-sidemenu-item">
              <span className="navbar-sidemenu-link">
                What is the Bearbnb cancellation policy?
              </span>
              <span className="navbar-sidemenu-arrow">></span>
            </div>
          </a>
          <a href="/">
            <div className="navbar-sidemenu-item">
              <span className="navbar-sidemenu-link">
                How do I contact a host before booking a reservation?
              </span>
              <span className="navbar-sidemenu-arrow">></span>
            </div>
          </a>
          <a href="/">
            <div className="navbar-sidemenu-item">
              <span className="navbar-sidemenu-link">
                What methods of payment does Bearbnb accept?
              </span>
              <span className="navbar-sidemenu-arrow">></span>
            </div>
          </a>
        </div>
        <div className="navbar-sidemenu-bottom">
          <button>Visit the Help Center</button>
          <a href="">Give feedback</a>
        </div>
      </div>
    );
  }
}

export default NavBarSideMenu;

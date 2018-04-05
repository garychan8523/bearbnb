import React from "react";

const NavBarDDMenu = props => {
  return (
    <div hidden={!props.isDDMenuOpen} className="navbar-dd-menu">
      <div className="navbar-dd-menu-item">
        <a href="/">
          <div className="navbar-dd-menu-title">Host a Home</div>
          <div className="navbar-dd-menu-subtitle">
            Earn up to $345 a week hosting.
          </div>
        </a>
      </div>
      <div className="navbar-dd-menu-item">
        <a href="/">
          <div className="navbar-dd-menu-title">No time to host?</div>
        </a>
      </div>
      <div className="navbar-dd-menu-item">
        <a href="/">
          <div className="navbar-dd-menu-title">Host an experience</div>
        </a>
      </div>
    </div>
  );
};

export default NavBarDDMenu;

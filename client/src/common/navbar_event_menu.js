import React from "react";

const NavBarEventMenu = props => {
  return (
    <div hidden={!props.isEventMenuOpen} className="navbar-dd-menu">
      <div className="navbar-dd-menu-item">
        <a href="../dashboard">
          <div className="navbar-dd-menu-title">Add Event</div>
        </a>
      </div>
      <div className="navbar-dd-menu-item">
        <a href="../dashboard">
          <div className="navbar-dd-menu-title">Edit Event</div>
        </a>
      </div>
      <div className="navbar-dd-menu-item">
        <a href="../dashboard">
          <div className="navbar-dd-menu-title">My Events</div>
        </a>
      </div>
    </div>
  );
};

export default NavBarEventMenu;

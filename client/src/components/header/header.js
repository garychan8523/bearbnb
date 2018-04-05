import React from "react";
import { connect } from "react-redux";
import logo from "../../stylesheets/assets/bearlogo.png";
import NavBarDDMenu from "../../common/navbar_dd_menu";
import NavBarSideMenu from "../../common/navbar_sidemenu";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isDDMenuOpen: false,
      isSideMenuOpen: false,
      windowWidth: 0,
      phone: 320,
      tablet: 768,
      desktop: 1024,
      collapsed: true
    };
    this.renderDDMenu = this.renderDDMenu.bind(this);
    this.renderSideMenu = this.renderSideMenu.bind(this);
    this.handleDDClick = this.handleDDClick.bind(this);
    this.handleDDOutsideClick = this.handleDDOutsideClick.bind(this);
    this.handleSMClick = this.handleSMClick.bind(this);
    this.handleSMOutsideClick = this.handleSMOutsideClick.bind(this);
    this.xToggle = this.xToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleDDClick() {
    if (!this.state.isDDMenuOpen) {
      // attach/remove event handler
      document.addEventListener("click", this.handleDDOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleDDOutsideClick, false);
    }

    this.setState(prevState => ({
      isDDMenuOpen: !prevState.isDDMenuOpen
    }));
  }

  handleDDOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.nodea.contains(e.target)) {
      return;
    }
    this.handleDDClick();
  }

  handleSMClick() {
    if (!this.state.isSideMenuOpen) {
      // attach/remove event handler
      document.addEventListener("click", this.handleSMOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleSMOutsideClick, false);
    }

    this.setState(prevState => ({
      isSideMenuOpen: !prevState.isSideMenuOpen
    }));
  }

  handleSMOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleSMClick();
  }

  renderDDMenu() {
    this.setState(() => {
      return {
        isDDMenuOpen: !this.state.isDDMenuOpen
      };
    });
  }

  renderSideMenu() {
    this.setState(() => {
      return {
        isSideMenuOpen: !this.state.isSideMenuOpen
      };
    });
  }

  xToggle() {
    this.handleSMClick();
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <a href="auth/google" key="1" className="navbar-item">
            Sign Up
          </a>,
          <a href="auth/google" key="2" className="navbar-item">
            Log In
          </a>
        ];
      default:
        return [
          <a href="/dashboard" key="1" className="navbar-item">
            Settings
          </a>,
          <a href="/api/logout" key="2" className="navbar-item">
            Log Out
          </a>
        ];
    }
  }

  handleSearch(e) {
    e.preventDefault();
    const data = document.getElementById("headersearch").value;
    const history = this.props.history;
    history.push("/search?query=" + data);
  }

  getCurrentSearch() {
    let currentSearch = this.props.location.search
      .substr(7)
      .replace(/%20/g, " ")
      .split(" ");
    let capitalized = currentSearch.map(
      word => word.substr(0, 1).toUpperCase() + word.substr(1)
    );
    return capitalized.join(" ");
  }

  renderSearchBar(type) {
    let headerSearchType = "header-search";
    let magnifySVGType = "header-search__magnifying";
    let inputBoxType = "header-search__input";
    let currentSearchTerm = "";
    if (type === "a") {
      currentSearchTerm = this.getCurrentSearch();
    }
    if (type === "b") {
      headerSearchType += " header-search--b";
      magnifySVGType += " header-search__magnifying--b";
      inputBoxType += " header-search__input--b";
    }
    return (
      <div className={headerSearchType}>
        <form className="header-search-form" onSubmit={this.handleSearch}>
          <svg className={magnifySVGType} viewBox="0 0 20.48 20.67">
            <path
              d="M18.74,9.75a8.4,8.4,0,1,1-8.4-8.4A8.36,8.36,0,0,1,18.74,9.75Z"
              transform="translate(-1.44 -0.85)"
            />
            <line x1="20.12" y1="20.32" x2="14.85" y2="14.83" />
          </svg>
          <input
            type="text"
            id="headersearch"
            className={inputBoxType}
            defaultValue={currentSearchTerm}
            placeholder="Search"
          />
        </form>
      </div>
    );
  }

  //----Mobile-responsive----//

  onPhone() {
    return this.state.windowWidth <= this.state.phone;
  }

  onTablet() {
    return this.state.windowWidth <= this.state.tablet;
  }

  toggleCollapsed() {
    var opposite = !this.state.collapsed;
    this.setState({ collapsed: opposite });
  }

  updateWindowWidth() {
    if (window.innerWidth <= this.state.tablet) {
      this.setState({
        isDDMenuOpen: false,
        isSideMenuOpen: false,
        windowWidth: window.innerWidth
      });
    } else {
      this.setState({ windowWidth: window.innerWidth });
    }
  }

  renderHamburger() {
    // includes phone (<=tablet)
    if (this.state.collapsed) {
      return (
        <div className="navbar-right">
          <div className="hamburger" onClick={this.toggleCollapsed.bind(this)}>
            <div className="patty-top" />
            <div className="patty-mid" />
            <div className="patty-bottom" />
          </div>
        </div>
      );
    }
    return (
      <div className="navbar-right">
        <div className="hamburger-x" onClick={this.toggleCollapsed.bind(this)}>
          <div className="patty-top" />
          <div className="patty-mid" />
          <div className="patty-bottom" />
        </div>
      </div>
    );
  }

  renderMobileMenu() {
    var path = this.props.location.pathname;

    return (
      <div className="pseudo-mobile-menu-parent">
        <div
          className={
            path === "/search"
              ? "navbar-mobile-menu--search"
              : "navbar-mobile-menu"
          }
        >
          <span className="navbar-item" onClick={this.handleDDClick}>
            Become a host
          </span>
          <span className="navbar-item" onClick={this.handleSMClick}>
            Help
          </span>
          {this.renderContent()}
          {path === "/" ? "" : this.renderSearchBar("a")}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth.bind(this));
  }

  //----End mobile responsive----//

  render() {
    let renderSearch = this.props.location.pathname;
    let headerClass = "";
    if (renderSearch === "/search") {
      renderSearch = this.renderSearchBar("a");
      headerClass = " navHeader--search";
    } else if (renderSearch !== "/") {
      renderSearch = this.renderSearchBar("b");
      headerClass = " navHeader--other";
    } else {
      renderSearch = "";
    }
    return (
      <header className={"navHeader" + headerClass}>
        <div className="navbar">
          <div className="navbar-left">
            <Link to="/">
              <img src={logo} className="navbar-logo" alt="" />
            </Link>
            {this.onTablet() ? "" : renderSearch}
          </div>
          {this.onTablet() ? (
            this.renderHamburger()
          ) : (
            <div className="navbar-right">
              <span className="navbar-item" onClick={this.handleDDClick}>
                Become a host
              </span>
              <span className="navbar-item" onClick={this.handleSMClick}>
                Help
              </span>
              {this.renderContent()}
            </div>
          )}
        </div>
        {this.onTablet() && !this.state.collapsed
          ? this.renderMobileMenu()
          : ""}
        <div
          ref={node => {
            this.nodea = node;
          }}
        >
          {this.state.isDDMenuOpen && (
            <NavBarDDMenu isDDMenuOpen={this.state.isDDMenuOpen} />
          )}
        </div>
        <div
          ref={node => {
            this.node = node;
          }}
        >
          {this.state.isSideMenuOpen && (
            <NavBarSideMenu
              isSideMenuOpen={this.state.isSideMenuOpen}
              xToggle={this.xToggle}
            />
          )}
        </div>
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default withRouter(connect(mapStateToProps)(Header));

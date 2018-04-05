import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import * as actions from "./actions";
import Footer from "./components/footer/footer";
import Home from "./components/pages/home";
import HomeListing from "./components/pages/homelisting";
import Profile from "./components/pages/profile";
import SearchGallery from "./components/pages/searchgallery";
import Header from "./components/header/header";
import Dashboard from "./components/pages/dashboard";
import ScrollToTop from "./scroll_to_top";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const HomeWithProps = props => {
      return <Home {...props} />;
    };

    return (
      <BrowserRouter>
        <ScrollToTop>
        <div className="App">
          <header>
            <Header />
          </header>
          <main>
            <Switch>
              <Route exact path="/" render={HomeWithProps} />
              <Route exact path="/homes" render={HomeWithProps} />
              <Route path="/homes/:home" component={HomeListing} />
              <Route exact path="/users" component={HomeWithProps} />
              <Route path="/users/:user" component={Profile} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/search" component={SearchGallery} />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);

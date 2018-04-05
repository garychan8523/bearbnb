import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Carousel from "../../common/carousel";
import SearchBox from "../home/home_search-box";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      listings: []
    };
  }

  async componentWillMount() {
    await this.props.fetchAllHomes();
    await this.populateListings();
  }

  populateListings() {
    if (!!this.props.allHomes) {
      let newListings = [];
      Object.keys(this.props.allHomes).map(listing => {
        return newListings.push(this.props.allHomes[listing]);
      });

      newListings = newListings.slice(0, 6);
      this.setState({ listings: newListings });
    }
  }

  render() {
    const history = this.props.history;
    return (
      <div className="homePage">
        <SearchBox history={history} />
        <Carousel listingData={this.state.listings} type="a" title="Homes" />
      </div>
    );
  }
}

function mapStateToProps({ allHomes }) {
  return { allHomes };
}

export default connect(mapStateToProps, actions)(Home);

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { parse } from "qs";
import Listing from "../../common/listing";
import SearchGalleryFilterBar from "../searchgallery/search_gallery_filter_bar";
import SearchGalleryResults from "../searchgallery/searchgallery_results";
import SearchGalleryCrumbs from "../searchgallery/searchgallery_crumbs";
import MapB from "../searchgallery/searchgallery_map";

let markersArray = [];
const emptyData = {
  _id: 0,
  homeinformation: {
    boundary: "",
    title: "",
    price: {
      weekday: 0
    },
    sleeping: {
      nothing: {}
    }
  },
  images: [],
  reviewAvg: {
    avg: 0
  },
  reviews: []
};

class SearchGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      popup: emptyData,
      moveSearch: true,
      filters: { guests: 0 },
      bounds: { f: { f: 0, b: 0 }, b: { f: 0, b: 0 } },
      breadCrumbs: []
    };
  }
  componentDidMount() {
    this.props.fetchAllHomes();
  }
  updateResults(newBounds, newFilters, breadCrumbs) {
    let searchData = [];
    if (!this.state.moveSearch || !newBounds) {
      newBounds = this.state.bounds;
    }
    if (!newFilters) {
      newFilters = this.state.filters;
    }
    if (!breadCrumbs) {
      breadCrumbs = this.state.breadCrumbs;
    }
    for (const home in this.props.allHomes) {
      let indhome = this.props.allHomes[home];
      if (
        indhome.homelocation.lat < newBounds.f.f &&
        indhome.homelocation.lat > newBounds.f.b &&
        (indhome.homelocation.lng < newBounds.b.f &&
          indhome.homelocation.lng > newBounds.b.b)
      ) {
        if (newFilters.guests === 0) {
          searchData.push(indhome);
        } else {
          //let roomType = newFilters.roomType;
          let price = newFilters.price;
          let guests = 0;
          for (let guestType in newFilters.guests) {
            guests += newFilters.guests[guestType];
          }
          if (
            indhome.homeinformation.price.weekday >= price.min &&
            indhome.homeinformation.price.weekday <= price.max &&
            indhome.homeinformation.guestlimit >= guests
          ) {
            searchData.push(indhome);
          }
        }
      }
    }
    this.setState({
      bounds: newBounds,
      filters: newFilters,
      searchData: searchData,
      breadCrumbs: breadCrumbs
    });
  }
  handleMouseEnter(listingId) {
    const icon = {
      path:
        "M19.4,20.6l-2.9,4l-3.2-4H2.1c-1.1,0-2-0.9-2-2V2.1c0-1.1,0.9-2,2-2h28.6c1.1,0,2,0.9,2,2v16.5c0,1.1-0.9,2-2,2H19.4z",
      labelOrigin: new window.google.maps.Point(16, 11),
      anchor: new window.google.maps.Point(20, 15),
      fillColor: "#227B7F",
      fillOpacity: 1,
      scale: 1.5,
      strokeWeight: 0
    };
    markersArray.forEach(marker => {
      if (marker.id === listingId) {
        marker.setIcon(icon);
        marker.setLabel({
          color: "white",
          fontWeight: "700",
          fontSize: "16px",
          text: "$" + marker.price
        });
        marker.setZIndex(999999);
      }
    });
  }
  handleMouseLeave(listingId) {
    const icon = {
      path:
        "M19.4,20.6l-2.9,4l-3.2-4H2.1c-1.1,0-2-0.9-2-2V2.1c0-1.1,0.9-2,2-2h28.6c1.1,0,2,0.9,2,2v16.5c0,1.1-0.9,2-2,2H19.4z",
      labelOrigin: new window.google.maps.Point(16, 11),
      anchor: new window.google.maps.Point(20, 15),
      fillColor: "white",
      fillOpacity: 1,
      scale: 1.5,
      strokeColor: "#ccc",
      strokeWeight: 1
    };
    markersArray.forEach(marker => {
      marker.setIcon(icon);
      marker.setLabel({
        fontWeight: "700",
        fontSize: "16px",
        text: "$" + marker.price
      });
      marker.setZIndex(marker.index + 2);
    });
  }
  receiveMarkers(passedMarkersArray) {
    markersArray = passedMarkersArray;
  }
  setNewPopup(listingData) {
    if (listingData === "empty") {
      listingData = emptyData;
    }
    this.setState({ popup: listingData });
  }
  moveSearch() {
    this.setState({ moveSearch: !this.state.moveSearch });
  }
  clearFilters() {
    this.updateResults(null, { guests: 0 }, null);
    this.filterReset.resetFilters();
  }
  render() {
    const query = parse(this.props.location.search.substr(1));
    if (!this.props.allHomes) {
      return "";
    } else {
      return (
        <div className="search-gallery">
          <div className="search-gallery-header">
            <SearchGalleryFilterBar
              setFilters={newFilters =>
                this.updateResults(null, newFilters, null)
              }
              onReset={ref => (this.filterReset = ref)}
            />
          </div>
          <div className="search-gallery-body">
            <div className="search-gallery-results">
              <SearchGalleryResults
                data={this.state.searchData}
                type="c"
                handleMouseEnter={this.handleMouseEnter.bind(this)}
                handleMouseLeave={this.handleMouseLeave.bind(this)}
                handleClearFilters={this.clearFilters.bind(this)}
              />
              <div className="search-gallery-disclaimer">
                Enter dates to see full pricing. Additional fees apply. Taxes
                may be added.
              </div>
              <div className="search-gallery-footer">
                <SearchGalleryCrumbs crumbs={this.state.breadCrumbs} />
              </div>
            </div>
            <div className="search-gallery-map">
              <div className="search-gallery-map__option">
                <div className="search-gallery-map__option--content">
                  <input
                    type="checkbox"
                    className="search-gallery-map__option--checkbox"
                    defaultChecked
                    onChange={this.moveSearch.bind(this)}
                  />
                  <label className="search-gallery-map__option--label">
                    Search as I move the map
                  </label>
                </div>
              </div>
              <MapB
                data={this.state.searchData}
                query={query}
                setBounds={(newBounds, nothing, breadCrumbs) =>
                  this.updateResults(newBounds, null, breadCrumbs)
                }
                receiveMarkers={this.receiveMarkers.bind(this)}
                setNewPopup={this.setNewPopup.bind(this)}
                activePopup={this.state.popup}
                moveSearch={this.state.moveSearch}
              />
            </div>
            <Listing listingData={this.state.popup} type="d" />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ allHomes }) {
  return { allHomes };
}

export default connect(mapStateToProps, actions)(SearchGallery);

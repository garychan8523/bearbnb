import React, { Component } from "react";
import Listing from "./listing";

class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      clickCounter: 0,
      currentPosition: 0,
      carouselListings: []
    };
  }
  componentDidMount() {
    this.leftButtonDOM = document.getElementsByClassName("navDiv--left")[0];
    this.rightButtonDOM = document.getElementsByClassName("navDiv--right")[0];
    this.listCount = document.getElementsByClassName("listing");
    this.thisCarousel = document.getElementsByClassName("carousel")[0];
    this.buildCarouselData();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.listingData !== nextProps.listingData) {
      this.leftButtonDOM.classList.add("hidden");
      this.rightButtonDOM.classList.remove("hidden");
      this.thisCarousel.style.transform = "translateX(0%)";
      this.buildCarouselData(nextProps);
    }
  }
  buildCarouselData(props = this.props) {
    let carouselListings = [];
    props.listingData.forEach((listing, index) => {
      carouselListings.push(
        <Listing
          key={"Listing #" + listing._id}
          listingData={listing}
          type={this.props.type}
        />
      );
    });
    this.setState({ carouselListings, clickCounter: 0, currentPosition: 0 });
  }
  handleClick(orientation) {
    const listCount = this.listCount.length;
    let clickCounter = this.state.clickCounter;
    let currentPosition = this.state.currentPosition;

    let w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );

    let positionModifier = -100 / listCount;
    let displayTiles = w < 1024 ? 2 : 3;
    let endPoint = listCount - displayTiles;

    if (orientation === "left") {
      currentPosition -= +positionModifier;
      clickCounter--;
    } else {
      currentPosition += +positionModifier;
      clickCounter++;
    }

    this.thisCarousel.style.transform = "translateX(" + currentPosition + "%)";

    clickCounter === 0
      ? this.leftButtonDOM.classList.add("hidden")
      : this.leftButtonDOM.classList.remove("hidden");
    clickCounter === endPoint
      ? this.rightButtonDOM.classList.add("hidden")
      : this.rightButtonDOM.classList.remove("hidden");

    this.setState({ clickCounter, currentPosition });
  }
  render() {
    const seeAll = this.props.type === "a" ? "" : " hidden";
    const bannerMargin =
      this.props.type === "a" ? "" : " carouselBanner_title--b";

    return (
      <div className={"carouselContainer--" + this.props.type}>
        <div className="carouselBanner">
          <h3 className={"carouselBanner_title" + bannerMargin}>
            {this.props.title}
          </h3>
          <a className={"carouselBanner_link" + seeAll}>
            <button className="carouselBanner_link--button">
              <span className="carouselBanner_link--span">See all</span>
              <svg
                className="carouselBanner_link--arrow"
                viewBox="0 0 7.61 9.85"
              >
                <polyline points="0.32 0.41 6.74 4.93 0.29 9.44" />
              </svg>
            </button>
          </a>
        </div>
        <div
          className={"navDiv navDiv--left hidden navDiv--" + this.props.type}
        >
          <span className="navDiv__span">
            <button
              type="button"
              className={"navDiv__button navDiv__button--" + this.props.type}
              onClick={() => this.handleClick("left")}
            >
              <svg
                className={"navDiv__svg navDiv__svg--" + this.props.type}
                viewBox="0 0 11.86 19.79"
              >
                <polyline points="11.11 0.72 1.46 9.91 11.18 19.06" />
              </svg>
            </button>
          </span>
        </div>
        <div className="carouselMask">
          <div className="carousel">{this.state.carouselListings}</div>
        </div>
        <div className={"navDiv navDiv--right navDiv--" + this.props.type}>
          <span className="navDiv__span">
            <button
              type="button"
              className={"navDiv__button navDiv__button--" + this.props.type}
              onClick={() => this.handleClick("right")}
            >
              <svg
                className={"navDiv__svg navDiv__svg--" + this.props.type}
                viewBox="0 0 11.86 19.79"
              >
                <polyline points="0.75 0.72 10.41 9.91 0.69 19.06" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Carousel;

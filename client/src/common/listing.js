import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReviewStars from "./review_stars";

const heart = (
  <div className="heart">
    <svg viewBox="0 0 28.76 26.02">
      <g>
        <path
          className="heart--svg1"
          d="M15,7.44l.9-.89c2.49-2.76,9.49-4.1,12,2,2.94,7.32-7,16.09-12.82,19.66H15C9.17,24.68-.79,15.91,2.15,8.59c2.46-6.14,9.43-4.8,11.92-2Z"
          transform="translate(-0.62 -3.23)"
        />
      </g>
      <g>
        <path
          className="heart--svg2"
          d="M15,7.44l.9-.89c2.49-2.76,9.49-4.1,12,2,2.94,7.32-7,16.09-12.82,19.66H15C9.17,24.68-.79,15.91,2.15,8.59c2.46-6.14,9.43-4.8,11.92-2Z"
          transform="translate(-0.62 -3.23)"
        />
      </g>
    </svg>
  </div>
);

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      currentListing: 0,
      images: [],
      bedCount: 0,
      direction: ""
    };
  }

  makeImgCollection(useData) {
    let collection = [];
    if (useData.listingData.images.length > 0) {
      let images = useData.listingData.images;
      for (let i = 0; i < images.length; i++) {
        let imgsrc = require(`../stylesheets/assets/homeimages/${images[i]}`);
        collection.push(
          <img
            key={useData._id + "img" + i}
            src={imgsrc}
            className={"listing__image listing__image-" + useData.type}
            alt="Rental Property"
          />
        );
      }
    }
    return collection;
  }

  makeImgCarousel() {
    if (this.state.images.length === 0) {
      return "";
    }
    let imgSrc;
    if (!this.state.direction) {
      imgSrc = this.state.images[this.state.currentListing];
    } else if (this.state.direction === "left") {
      let currentListing = this.state.currentListing + 1;
      if (currentListing > this.state.images.length - 1) {
        currentListing = 0;
      }
      imgSrc = (
        <div className="slideMask">
          <div
            key={"img#" + this.state.currentListing}
            className="slider sliderLeft"
          >
            {this.state.images[this.state.currentListing]}
            {this.state.images[currentListing]}
          </div>
        </div>
      );
    } else if (this.state.direction === "right") {
      let currentListing = this.state.currentListing - 1;
      if (currentListing < 0) {
        currentListing = this.state.images.length - 1;
      }
      imgSrc = (
        <div className="slideMask">
          <div
            key={"img#" + this.state.currentListing}
            className="slider sliderRight"
          >
            {this.state.images[currentListing]}
            {this.state.images[this.state.currentListing]}
          </div>
        </div>
      );
    }
    return (
      <div
        className="listing__image--position-c"
        onMouseEnter={this.props.handleMouseEnter.bind(
          this,
          this.props.listingData._id
        )}
        onMouseLeave={this.props.handleMouseLeave.bind(
          this,
          this.props.listingData._id
        )}
      >
        {heart}
        <div className="imgCarouselControls">
          <button
            type="button"
            className="slideshowArrow slideshowArrow--left"
            onClick={() => this.carouselControl("left")}
          >
            <svg className="slideshowArrow--svg" viewBox="0 0 11.86 19.79">
              <polyline points="11.11 0.72 1.46 9.91 11.18 19.06" />
            </svg>
          </button>
          <Link
            to={"/homes/" + this.props.listingData._id}
            className="listing__anchor-c"
          >
            This is a listing
          </Link>
          <button
            type="button"
            className="slideshowArrow slideshowArrow--right"
            onClick={() => this.carouselControl("right")}
          >
            <svg className="slideshowArrow--svg" viewBox="0 0 11.86 19.79">
              <polyline points="0.75 0.72 10.41 9.91 0.69 19.06" />
            </svg>
          </button>
        </div>
        {imgSrc}
      </div>
    );
  }

  carouselControl(direction) {
    let currentListing = this.state.currentListing;
    let images = this.state.images.slice();
    direction === "left" ? currentListing-- : currentListing++;
    if (currentListing >= images.length) {
      currentListing = 0;
    }
    if (currentListing < 0) {
      currentListing = images.length - 1;
    }
    this.setState({ currentListing: currentListing, direction: direction });
  }

  carouselControlB(direction) {
    let currentListing = this.state.currentListing;
    let imageCount = this.state.images.length;
    if (direction === "left") {
      currentListing--;
      if (currentListing < 0) {
        currentListing = imageCount - 1;
      }
    } else if (direction === "right") {
      currentListing++;
      if (currentListing === imageCount) {
        currentListing = 0;
      }
    }
    this.setState({ currentListing: currentListing });
  }

  updateState(useData) {
    const images = this.makeImgCollection(useData);
    let bedCount = 0;
    for (let bedRoom in useData.listingData.homeinformation.sleeping) {
      for (let bed in useData.listingData.homeinformation.sleeping[bedRoom]) {
        bedCount += +useData.listingData.homeinformation.sleeping[bedRoom][bed];
      }
    }
    this.setState({ images: images, bedCount: bedCount });
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listingData._id !== this.props.listingData._id) {
      this.updateState(nextProps);
    }
  }

  render() {
    const overview = this.props.listingData;
    const reviewDivConfig = (
      <div className="listing__text--reviews">
        {
          <ReviewStars
            overview_id={overview._id}
            avg_review={overview.reviewAvg.avg}
            review_count={overview.reviews.length}
          />
        }
      </div>
    );
    const bedPlural = this.state.bedCount > 1 ? "BEDS" : "BED";
    const reviewDiv = overview.reviews.length > 0 ? reviewDivConfig : "";
    const hasHeart = this.props.type === "a" ? "" : heart;

    let displayImg;
    if (this.props.type === "c") {
      displayImg = this.makeImgCarousel();
    } else if (this.props.type === "d") {
      let imgSrc = "";
      if (this.state.images.length > 0) {
        imgSrc = this.state.images[this.state.currentListing];
      }
      displayImg = (
        <div className="listing__image--position-d">
          <div className="imgCarouselControls imgCarouselControls-b">
            <button
              type="button"
              className="slideshowArrow slideshowArrow--left"
              onClick={() => this.carouselControlB("left")}
            >
              <svg className="slideshowArrow--svg" viewBox="0 0 11.86 19.79">
                <polyline points="11.11 0.72 1.46 9.91 11.18 19.06" />
              </svg>
            </button>
            <Link
              to={"/homes/" + this.props.listingData._id}
              className="listing__anchor-c"
            >
              This is a listing
            </Link>
            <button
              type="button"
              className="slideshowArrow slideshowArrow--right"
              onClick={() => this.carouselControlB("right")}
            >
              <svg className="slideshowArrow--svg" viewBox="0 0 11.86 19.79">
                <polyline points="0.75 0.72 10.41 9.91 0.69 19.06" />
              </svg>
            </button>
          </div>
          {imgSrc}
        </div>
      );
    } else {
      displayImg = (
        <div className="listing__image--position">
          {hasHeart}
          <Link to={"/homes/" + overview._id} className="listing__anchor">
            <img
              src={require(`../stylesheets/assets/homeimages/${
                this.props.listingData.images[0]
              }`)}
              className="listing__image"
              alt="listing description"
            />
          </Link>
        </div>
      );
    }
    let popupClass = this.props.type === "d" ? " popupListing" : "";
    let typeDTextClass = this.props.type === "d" ? "listing__text--d" : "";
    return (
      <div className={"listing listing-" + this.props.type + popupClass}>
        {displayImg}
        <Link to={"/homes/" + overview._id} className="listing__anchor">
          <div className={"listing__text " + typeDTextClass}>
            <div className="listing__text--descriptor">
              {overview.homeinformation.boundary.toUpperCase()} •{" "}
              {this.state.bedCount} {bedPlural}
            </div>
            <div className="listing__text--title">
              {overview.homeinformation.title}
            </div>
            <div className="listing__text--rate">
              ${overview.homeinformation.price.weekday} per night
            </div>
            {reviewDiv}
          </div>
        </Link>
      </div>
    );
  }
}

export default Listing;

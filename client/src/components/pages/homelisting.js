import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Album from "../homelisting/viewAlbum";
import ImageAlbum from "../homelisting/imageAlbum";
import HomeOverview from "../homelisting/home_overview";
import Carousel from "../../common/carousel";
import HomeMap from "../homelisting/home_map";
import HostDisplay from "../homelisting/host_display";
import BookingDisplay from "../homelisting/booking.js";
import LargeReviewStars from "../../common/large_review_stars";
import { formatDate } from "../../helpers";

function toggleImageAlbum(toggle) {
  var album = document.getElementsByClassName("homeImageAlbum")[0];
  if (toggle) {
    album.classList.add("albumShow");
    album.classList.remove("albumHide");
  } else {
    album.classList.remove("albumShow");
    album.classList.add("albumHide");
  }
}

class HomeListing extends Component {
  constructor() {
    super();
    this.state = {
      listings: []
    };
  }

  async componentWillMount() {
    await this.props.fetchHome(this.props.match.params.home);
    await this.props.fetchProfile(this.props.home.hostid);
    await this.props.fetchAllReviews();
    await this.props.fetchAllUsers();
    await this.props.fetchAllHomes();
    //await this.populateListings();
  }

  populateListings() {

    if (!!this.props.allHomes) {
      const allHomes = Object.values(this.props.allHomes);
      const l = allHomes.length;
      const newListings = [];
      for (let i = 0; i < 6; i++) {
        let j = Math.floor(Math.random() * (l - 1));
        if (
          allHomes[j]._id === this.props.home.id ||
          newListings.includes(allHomes[j])
        ) {
          i--;
        } else {
          newListings.push(allHomes[j]);
        }
      }
      this.setState({ listings: newListings });
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.match.url !== this.props.match.url) {
      await nextProps.fetchHome(nextProps.match.params.home);
      await nextProps.fetchProfile(nextProps.home.hostid);
      await nextProps.fetchAllReviews();
      await nextProps.fetchAllUsers();
      await nextProps.fetchAllHomes();
      await this.populateListings();
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (
      !this.props.home ||
      !this.props.profile ||
      !this.props.allHomes ||
      !this.props.allReviews ||
      !this.props.allUsers
    ) {
      return "";
    } else {
      return (
        <div className="homelisting">
          <ImageAlbum
            data={this.props.home.images}
            handleClick={toggleImageAlbum}
          />
          <Album
            handleClick={toggleImageAlbum}
            featImage={this.props.home.images[0]}
          />
          <div className="homenav">
            <a href="#overview">Overview</a>
            <a href="#reviews">Reviews</a>
            <a href="#host">The Host</a>
            <a href="#location">Location</a>
          </div>
          <div className="homelisting-body">
            <div className="homelisting-top">
              <div className="homelisting-left" id="overview">
                <HomeOverview homes={this.props.home} />
                {(this.props.profile.reviews.length>0) ? (
                <div className="review-list" id="reviews">
                  <div className="review-list-header">
                    <LargeReviewStars
                      overview_id={this.props.home._id}
                      reviewCount={this.props.home.reviewAvg.avg}
                      size="1"
                    /> {"  "} from {this.props.profile.reviews.length} Reviews for this event :
                  </div>

                  {Object.keys(this.props.profile.reviews).map(key => {
                    let reviewNum = this.props.profile.reviews[key];
                    let review = this.props.allReviews[reviewNum];
                    let reviewerNum = review.reviewerId;
                    let reviewer = this.props.allUsers[reviewerNum];
                    return (
                      <div className="indreview" key={key}>
                        <div className="review-header">
                          <a href={`/users/${reviewerNum}`}>
                            <img
                              src={require(`../../stylesheets/assets/images/${
                                reviewer.image
                              }`)}
                              alt=""
                            />
                          </a>
                          <span>
                            <div>{review.firstName}</div>
                            <div>{formatDate(review.reviewdate)}</div>
                          </span>
                        </div>
                        <div className="review-content">{review.content}</div>
                        <div className="divider" />
                      </div>
                    );
                  })}
                </div>
              ) : ( "There are no review yet.") }
              <div><a href="../dashboard">Add Review</a></div>
                <div id="host">
                  <HostDisplay
                    home={this.props.home}
                    profile={this.props.profile}
                  />
                </div>
              </div>
              <div className="homelisting-right">
                <BookingDisplay data={this.props.home} />
              </div>
            </div>
            <div className="home-listing-bottom" id="location">
              <HomeMap homes={this.props.home} profile={this.props.profile} />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ home, profile, allHomes, allReviews, allUsers }) {
  return { home, profile, allHomes, allReviews, allUsers };
}



export default connect(mapStateToProps, actions)(HomeListing);

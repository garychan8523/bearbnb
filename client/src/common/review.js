import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { formatDate } from "../helpers";

class Review extends Component {
  render() {
    if (!!this.props.allReviews && !!this.props.allUsers) {
      let currentReview = this.props.allReviews[this.props.reviewId];
      let reviewdate = new Date(currentReview.reviewdate);
      reviewdate = reviewdate.toISOString();
      reviewdate = reviewdate.slice(0, 10) + " " + reviewdate.slice(11, 11+8);
      return (
        <div className="guest-review">
          <div className="guest-review-thumbnail">
            <a href={`/users/${currentReview.reviewerId}`}>
              <img
                className="profile-img"
                src={require(`../stylesheets/assets/images/${
                  this.props.allUsers[currentReview.reviewerId].image
                }`)}
                alt=""
              />
              <p>{currentReview.firstName}</p>
            </a>
          </div>
          <div className="guest-review-content">
            <p className="guest-review-review">{currentReview.content}</p>
            <p className="guest-review-details">
              From{" "}
              {currentReview.location.city + " " + currentReview.location.state}{" "}
              - {"reviewed on: " + reviewdate}
            </p>
            <hr />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps({ allUsers, allReviews }) {
  return { allUsers, allReviews };
}

export default connect(mapStateToProps, actions)(Review);

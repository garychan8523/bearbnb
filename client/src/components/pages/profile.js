import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ProfileLeftbox from "../profile/profile_leftbox";
import ProfileOverview from "../profile/profile_overview";
import Review from "../../common/review";
import Reference from "../../common/reference";

class Profile extends Component {
  async componentWillMount() {
    await this.props.fetchAllUsers();
    await this.props.fetchAllHomes();
    await this.props.fetchAllReviews();
    await this.props.fetchAllReferences();
    await this.props.fetchProfile(this.props.match.params.user);
  }

  render() {
    const user = this.props.match.params.user;
    if (!!this.props.profile === false) {
      return null;
    } else {
      return (
        <div className="profile">
          <div className="profile-container">
            <div className="profile-left">
              <ProfileLeftbox homes={this.props.allHomes} />
            </div>
            <div className="profile-right">
              <ProfileOverview
                user={user}
                reviewsNum={this.props.profile.reviews.length}
              />
              {this.props.profile.reviews &&
              this.props.profile.reviews.length > 0 ? (
                <div className="review-list">
                  <h2>Reviews ({this.props.profile.reviews.length})</h2>
                  <h4>Reviews from Guests</h4>
                  {Object.keys(this.props.profile.reviews).map(key => {
                    return (
                      <Review
                        key={key}
                        reviewId={this.props.profile.reviews[key]}
                      />
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              {this.props.profile.references &&
              this.props.profile.references.length > 0 ? (
                <div className="review-list">
                  <h2>References ({this.props.profile.references.length})</h2>
                  {Object.keys(this.props.profile.references).map(key => {
                    return (
                      <Reference
                        key={key}
                        referenceId={this.props.profile.references[key]}
                      />
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ profile, allHomes }) {
  return { profile, allHomes };
}

export default connect(mapStateToProps, actions)(Profile);

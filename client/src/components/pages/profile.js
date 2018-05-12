import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ProfileLeftbox from "../profile/profile_leftbox";
import ProfileOverview from "../profile/profile_overview";
import Review from "../../common/review";
import Reference from "../../common/reference";
import Booked from "../../common/booked";

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
    //console.log(this.props.profile);
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
              <div className="divider" />
              {this.props.profile.reviews &&
              this.props.profile.reviews.length > 0 ? (
                <div className="review-list">
                  <h2>Event Reviews ({this.props.profile.reviews.length})</h2>
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
                  <h2>Personal References ({this.props.profile.references.length})</h2>
                    <div><a href="../dashboard">Add Reference</a></div>
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


              {this.props.profile.booked &&
              this.props.profile.booked.length > 0 ? (
                <div className="review-list">
                  <h2>Reserved Events ({this.props.profile.booked.length})</h2>

                  {Object.keys(this.props.profile.references).map(key => {
                    return (
                      <Booked
                        key={key}
                        bookedId={this.props.profile.booked[key]}
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

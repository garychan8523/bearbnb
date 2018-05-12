import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { formatDate } from "../helpers";

class Booked extends Component {
  render() {
      var currentHome = this.props.allHomes[this.props.bookedId];
      console.log(this.props.bookedId);
      return (
        <div className="guest-review">
          <div className="guest-review-thumbnail">
          <a href={`/homes/${currentHome._id}`}>
            <img
              className="profile-img"
              src={require(`../stylesheets/assets/homeimages/${
                currentHome.images[0]
              }`)}
              alt=""
            />
            <p>{currentHome.homeinformation.title}</p>
          </a>
          </div>
          <div className="guest-review-content">
            <p className="guest-review-review">{currentHome.homeinformation.description}</p>
            </div>
          

          </div>
      );

  }
}

function mapStateToProps({ allUsers, allHomes }) {
  return { allUsers, allHomes };
}

export default connect(mapStateToProps, actions)(Booked);

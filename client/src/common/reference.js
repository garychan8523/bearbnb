import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { formatDate } from "../helpers";

class Reference extends Component {
  render() {
    if (!!this.props.allReferences && !!this.props.allUsers) {
      let currentReference = this.props.allReferences[this.props.referenceId];
      let referencedate = new Date(currentReference.referencedate);
      referencedate = referencedate.toISOString();
      referencedate = referencedate.slice(0, 10) + " " + referencedate.slice(11, 11+8);
      return (
        <div className="guest-review">
          <div className="guest-review-thumbnail">
            <a href={`/users/${currentReference.referenceerId}`}>
              <img
                className="profile-img"
                src={require(`../stylesheets/assets/images/${
                  this.props.allUsers[currentReference.referenceerId].image
                }`)}
                alt=""
              />
              <p>{currentReference.firstName}</p>
            </a>
          </div>
          <div className="guest-review-content">
            <p className="guest-review-review">{currentReference.content}</p>
            <p className="guest-review-details">
              From{" "}
              {currentReference.location.city +
                " " +
                currentReference.location.state}{" "}
              - {"referenced on: " + referencedate}
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

function mapStateToProps({ allUsers, allReferences }) {
  return { allUsers, allReferences };
}

export default connect(mapStateToProps, actions)(Reference);

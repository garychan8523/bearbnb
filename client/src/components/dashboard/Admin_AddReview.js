//An ugly bit of code to help input the dummy data into the reviews database for the site.

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AddReviewForm extends Component {
  handleOnSubmit(e) {
    e.preventDefault();
    const review = {
      homeid: this.homeid.value,
      stars: this.stars.value,
      content: this.content.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      location: {
        city: this.city.value,
        state: this.usstate.value
      }
    };
    this.props.newReview(review);
    alert("Review Added!");
    window.location.href = "../";
  }
  render() {
    return (
      <form
        className="add-review-form"
        ref={input => (this.addReviewForm = input)}
        onSubmit={e => this.handleOnSubmit(e)}
      >
        <input
          type="text"
          placeholder="Home Id"
          name="homeid"
          required
          ref={input => (this.homeid = input)}
        />
        <input
          type="text"
          placeholder="Stars"
          name="stars"
          ref={input => (this.stars = input)}
        />
        <textarea
          placeholder="content"
          name="content"
          ref={input => (this.content = input)}
        />
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          ref={input => (this.firstName = input)}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          ref={input => (this.lastName = input)}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          ref={input => (this.city = input)}
        />
        <input
          type="text"
          placeholder="State"
          name="usstate"
          ref={input => (this.usstate = input)}
        />
        <input type="submit" />
      </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(AddReviewForm);

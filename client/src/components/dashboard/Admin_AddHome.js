//An ugly bit of code to help input the dummy data into the homes database for the site.

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ChooseLocation from "../homelisting/chooseLocation";

class AddHomeForm extends Component {
  handleOnSubmit(e) {
    e.preventDefault();
    var coord = this.coords.value.split(",");
    const home = {
      hostid: this.props.auth._id,
      homelocation: {
        address: this.address.value,
        city: this.city.value,
        state: this.usstate.value,
        zipcode: this.zipcode.value,
        lat: coord[0],
        lng: coord[1]
      },
      homeinformation: {
        title: this.title.value,
        price: this.price.value,
        guestlimit: this.guestlimit.value,
        description: this.description.value,
        othernotes: this.othernotes.value
      },
      startTime: this.starttime.value,
      endTime: this.endtime.value,
      images: this.images.value,
      reviewAvg: {
        avg: this.avg.value,
      },
      reviews: this.reviews.value,
      booking: this.booking.value
    };
    this.props.newHome(home);
    alert("Home Added");
    window.location.href= "../";
  }

  render() {
    const coords = {
      lat: 22.290922,
      lng: 114.176237
    };

    return (
      <div>
      <div className="googleMap">
        <ChooseLocation coords={coords} />
      </div>
      <form
        className="add-review-form"
        ref={input => (this.addHomeForm = input)}
        onSubmit={e => this.handleOnSubmit(e)}
      >
      <h4>Location Information</h4>
       <input
          type="text"
          placeholder="Address"
          name="address"
          required
          ref={input => (this.address = input)}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          required
          ref={input => (this.city = input)}
        />
        <input
          type="text"
          placeholder="State"
          name="usstate"
          ref={input => (this.usstate = input)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          name="zipcode"
          ref={input => (this.zipcode = input)}
        />
        <input
          type="text"
          placeholder="Coordinate (Paste from clipboard)"
          name="coords"
          required
          ref={input => (this.coords = input)}
        />
        <h4>Event Details</h4>
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          ref={input => (this.title = input)}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          required
          ref={input => (this.price = input)}
        />
        <input
          type="text"
          placeholder="Guest Limit"
          name="guestlimit"
          ref={input => (this.guestlimit = input)}
        />
        <textarea
          placeholder="Description"
          name="description"
          ref={input => (this.description = input)}
        />
        <textarea
          placeholder="Other Notes"
          name="othernotes"
          ref={input => (this.othernotes = input)}
        />
        <textarea
          placeholder="Start Time"
          name="starttime"
          ref={input => (this.starttime = input)}
        />
        <textarea
          placeholder="End Time"
          name="endtime"
          ref={input => (this.endtime = input)}
        />

        <input
          type="text"
          placeholder="Image Names - Separate by Commas (,)"
          name="images"
          required
          ref={input => (this.images = input)}
        />

        <h4>Review Averages - Dummy Data for now</h4>

        <input
          type="text"
          placeholder="Star Average"
          name="avg"
          ref={input => (this.avg = input)}
        />
        <input
          type="text"
          placeholder="Review Ids - Separate by Commas (,)"
          name="reviews"
          ref={input => (this.reviews = input)}
        />
        <input
          type="text"
          placeholder="Booking Ids - Separate by Commas (,)"
          name="booking"
          ref={input => (this.booking = input)}
        />

        <input type="submit" />
      </form>
      </div>
    );
  }
}

function mapStateToProps({ home,auth }) {
  return { home,auth };
}

export default connect(mapStateToProps, actions)(AddHomeForm);

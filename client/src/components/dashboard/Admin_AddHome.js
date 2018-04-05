//An ugly bit of code to help input the dummy data into the homes database for the site.

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AddHomeForm extends Component {
  handleOnSubmit(e) {
    e.preventDefault();
    const home = {
      hostid: this.hostid.value,
      homelocation: {
        address: this.address.value,
        city: this.city.value,
        state: this.usstate.value,
        zipcode: this.zipcode.value,
        lat: this.lat.value,
        lng: this.lng.value
      },
      homeinformation: {
        title: this.title.value,
        boundary: this.boundary.value,
        price: {
          weekday: this.weekday.value,
          weekend: this.weekend.value,
          extra: this.extra.value,
          extraminguest: this.extraminguest.value,
          cleaning: this.cleaning.value
        },
        guestlimit: this.guestlimit.value,
        bedrooms: this.bedrooms.value,
        sleeping: {
          bedroom1: {
            twin: this.bed1twin.value,
            queen: this.bed1queen.value,
            king: this.bed1king.value,
            couch: this.bed1couch.value,
            airmattress: this.bed1air.value
          },
          bedroom2: {
            twin: this.bed2twin.value,
            queen: this.bed2queen.value,
            king: this.bed2king.value,
            couch: this.bed2couch.value,
            airmattress: this.bed2air.value
          },
          bedroom3: {
            twin: this.bed3twin.value,
            queen: this.bed3queen.value,
            king: this.bed3king.value,
            couch: this.bed3couch.value,
            airmattress: this.bed3air.value
          },
          bedroom4: {
            twin: this.bed4twin.value,
            queen: this.bed4queen.value,
            king: this.bed4king.value,
            couch: this.bed4couch.value,
            airmattress: this.bed4air.value
          },
          bedroom5: {
            twin: this.bed5twin.value,
            queen: this.bed5queen.value,
            king: this.bed5king.value,
            couch: this.bed5couch.value,
            airmattress: this.bed5air.value
          },
          common: {
            twin: this.commontwin.value,
            queen: this.commonqueen.value,
            king: this.commonking.value,
            couch: this.commoncouch.value,
            airmattress: this.commonair.value
          }
        },
        bathrooms: this.bathrooms.value,
        rules: {
          smoking: this.smoking.value,
          pets: this.petsallowed.value,
          parties: this.parties.value,
          checkin: this.checkin.value,
          checkout: this.checkout.value,
          selfcheckin: this.selfcheckin.value,
          comments: this.comments.value
        },
        minimumstay: this.minimumstay.value,
        cancellation: this.cancellation.value,
        description: this.description.value,
        homespace: this.homespace.value,
        guestaccess: this.guestaccess.value,
        interaction: this.interaction.value,
        othernotes: this.othernotes.value,
        amenities: {
          pets: this.petfriendly.value,
          elevator: this.elevator.value,
          doorman: this.doorman.value,
          kids: this.kidfriendly.value,
          smoking: this.smoking.value,
          kitchen: this.kitchen.value,
          intercom: this.intercom.value,
          internet: this.internet.value,
          events: this.events.value,
          parking: this.parking.value,
          hottub: this.hottub.value,
          wheelchair: this.wheelchair.value,
          cable: this.cable.value,
          gym: this.gym.value,
          breakfast: this.breakfast.value,
          fireplace: this.fireplace.value,
          dryer: this.dryer.value,
          laptop: this.laptop.value,
          pool: this.pool.value,
          washer: this.washer.value,
          tv: this.tv.value,
          iron: this.iron.value,
          hangers: this.hangers.value,
          essentials: this.essentials.value,
          hairdryer: this.hairdryer.value,
          ac: this.ac.value,
          shampoo: this.shampoo.value,
          heating: this.heating.value,
          streetparking: this.streetparking.value,
          privent: this.privent.value,
          ethernet: this.ethernet.value,
          paidparking: this.paidparking.value
        },
        familyamenities: {
          babybath: this.babybath.value,
          babymonitor: this.babymonitor.value,
          babysitter: this.babysitter.value,
          changingtable: this.changingtable.value,
          toys: this.toys.value,
          dinnerware: this.dinnerware.value,
          crib: this.crib.value,
          fireplaceguards: this.fireplaceguards.value,
          gameconsole: this.gameconsole.value,
          highchair: this.highchair.value,
          outletcovers: this.outletcovers.value,
          packnplay: this.packnplay.value,
          shades: this.shades.value,
          stairgate: this.stairgate.value,
          tablecorners: this.tablecorners.value,
          windowguards: this.windowguards.value
        },
        safetyfeatures: {
          smoke: this.smoke.value,
          firstaid: this.firstaid.value,
          fire: this.fire.value
        }
      },
      images: this.images.value,
      reviewAvg: {
        avg: this.avg.value,
        accuracy: this.accuracy.value,
        communication: this.communication.value,
        cleanliness: this.cleanliness.value,
        location: this.location.value,
        checkin: this.checkinavg.value,
        value: this.valueavg.value
      },
      reviews: this.reviews.value,
      booking: this.booking.value
    };
    this.props.newHome(home);
  }

  render() {
    return (
      <form
        className="add-review-form"
        ref={input => (this.addHomeForm = input)}
        onSubmit={e => this.handleOnSubmit(e)}
      >
        <input
          type="text"
          placeholder="Host Id"
          name="hostid"
          ref={input => (this.hostid = input)}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          ref={input => (this.address = input)}
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
        <input
          type="text"
          placeholder="Zip Code"
          name="zipcode"
          ref={input => (this.zipcode = input)}
        />
        <input
          type="text"
          placeholder="Latitude"
          name="lat"
          ref={input => (this.lat = input)}
        />
        <input
          type="text"
          placeholder="Longitude"
          name="lng"
          ref={input => (this.lng = input)}
        />
        <input
          type="text"
          placeholder="Title"
          name="title"
          ref={input => (this.title = input)}
        />
        <input
          type="text"
          placeholder="Boundary"
          name="boundary"
          ref={input => (this.boundary = input)}
        />
        <h4>Price</h4>
        <input
          type="text"
          placeholder="Weekday"
          name="weekday"
          ref={input => (this.weekday = input)}
        />
        <input
          type="text"
          placeholder="Weekend"
          name="weekend"
          ref={input => (this.weekend = input)}
        />
        <input
          type="text"
          placeholder="Fee for Each Extra Guest"
          name="extra"
          ref={input => (this.extra = input)}
        />
        <input
          type="text"
          placeholder="Min Guest for Extra Charge"
          name="extraminguest"
          ref={input => (this.extraminguest = input)}
        />
        <input
          type="text"
          placeholder="Cleaning Fee"
          name="cleaning"
          ref={input => (this.cleaning = input)}
        />

        <h4>Home Info</h4>
        <input
          type="text"
          placeholder="Guest Limit"
          name="guestlimit"
          ref={input => (this.guestlimit = input)}
        />
        <input
          type="text"
          placeholder="Number of Bedrooms"
          name="bedrooms"
          ref={input => (this.bedrooms = input)}
        />

        <h4>Sleeping - Number of Beds</h4>
        <h5>Bedroom 1</h5>
        <select
          className="bed-select"
          name="bed1twin"
          id="bed1twin"
          ref={input => (this.bed1twin = input)}
        >
          <option value="0">Twin</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed1queen"
          id="bed1queen"
          ref={input => (this.bed1queen = input)}
        >
          <option value="0">Queen</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed1king"
          id="bed1king"
          ref={input => (this.bed1king = input)}
        >
          <option value="0">King</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed1couch"
          id="bed1couch"
          ref={input => (this.bed1couch = input)}
        >
          <option value="0">Couches</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed1air"
          id="bed1air"
          ref={input => (this.bed1air = input)}
        >
          <option value="0">Air Mattresses</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <h5>Bedroom 2</h5>
        <select
          className="bed-select"
          name="bed2twin"
          id="bed2twin"
          ref={input => (this.bed2twin = input)}
        >
          <option value="0">Twin</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed2queen"
          id="bed2queen"
          ref={input => (this.bed2queen = input)}
        >
          <option value="0">Queen</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed2king"
          id="bed2king"
          ref={input => (this.bed2king = input)}
        >
          <option value="0">King</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed2couch"
          id="bed2couch"
          ref={input => (this.bed2couch = input)}
        >
          <option value="0">Couches</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed2air"
          id="bed2air"
          ref={input => (this.bed2air = input)}
        >
          <option value="0">Air Mattresses</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <h5>Bedroom 3</h5>
        <select
          className="bed-select"
          name="bed3twin"
          id="bed3twin"
          ref={input => (this.bed3twin = input)}
        >
          <option value="0">Twin</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed3queen"
          id="bed3queen"
          ref={input => (this.bed3queen = input)}
        >
          <option value="0">Queen</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed3king"
          id="bed3king"
          ref={input => (this.bed3king = input)}
        >
          <option value="0">King</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed3couch"
          id="bed3couch"
          ref={input => (this.bed3couch = input)}
        >
          <option value="0">Couches</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed3air"
          id="bed3air"
          ref={input => (this.bed3air = input)}
        >
          <option value="0">Air Mattresses</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <h5>Bedroom 4</h5>
        <select
          className="bed-select"
          name="bed4twin"
          id="bed4twin"
          ref={input => (this.bed4twin = input)}
        >
          <option value="0">Twin</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed4queen"
          id="bed4queen"
          ref={input => (this.bed4queen = input)}
        >
          <option value="0">Queen</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed4king"
          id="bed4king"
          ref={input => (this.bed4king = input)}
        >
          <option value="0">King</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed4couch"
          id="bed4couch"
          ref={input => (this.bed4couch = input)}
        >
          <option value="0">Couches</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed4air"
          id="bed4air"
          ref={input => (this.bed4air = input)}
        >
          <option value="0">Air Mattresses</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <h5>Bedroom 5</h5>
        <select
          className="bed-select"
          name="bed5twin"
          id="bed5twin"
          ref={input => (this.bed5twin = input)}
        >
          <option value="0">Twin</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed5queen"
          id="bed5queen"
          ref={input => (this.bed5queen = input)}
        >
          <option value="0">Queen</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed5king"
          id="bed5king"
          ref={input => (this.bed5king = input)}
        >
          <option value="0">King</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed5couch"
          id="bed5couch"
          ref={input => (this.bed5couch = input)}
        >
          <option value="0">Couches</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="bed5air"
          id="bed5air"
          ref={input => (this.bed5air = input)}
        >
          <option value="0">Air Mattresses</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <h5>Common</h5>
        <select
          className="bed-select"
          name="commontwin"
          id="commontwin"
          ref={input => (this.commontwin = input)}
        >
          <option value="0">Twin</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="commonqueen"
          id="commonqueen"
          ref={input => (this.commonqueen = input)}
        >
          <option value="0">Queen</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="commonking"
          id="commonking"
          ref={input => (this.commonking = input)}
        >
          <option value="0">King</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="commoncouch"
          id="commoncouch"
          ref={input => (this.commoncouch = input)}
        >
          <option value="0">Couches</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select
          className="bed-select"
          name="commonair"
          id="commonair"
          ref={input => (this.commonair = input)}
        >
          <option value="0">Air Mattresses</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <input
          type="text"
          placeholder="Number of Bathrooms"
          name="bathrooms"
          ref={input => (this.bathrooms = input)}
        />

        <h4>Rules</h4>
        <label htmlFor="smoking">Smoking Allowed?</label>
        <select
          name="smoking"
          id="smoking"
          ref={input => (this.smoking = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="petsallowed">Pets Allowed?</label>
        <select
          name="petsallowed"
          id="petsallowed"
          ref={input => (this.petsallowed = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="parties">Parties Allowed?</label>
        <select
          name="parties"
          id="parties"
          ref={input => (this.parties = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <input
          type="text"
          placeholder="Checkin Time"
          name="checkin"
          ref={input => (this.checkin = input)}
        />
        <input
          type="text"
          placeholder="Checkout Time"
          name="checkout"
          ref={input => (this.checkout = input)}
        />

        <label htmlFor="selfcheckin">Selfcheckin Allowed?</label>
        <select
          name="selfcheckin"
          id="selfcheckin"
          ref={input => (this.selfcheckin = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>

        <textarea
          placeholder="Comments"
          name="comments"
          ref={input => (this.comments = input)}
        />

        <input
          type="text"
          placeholder="Minimum Number of Days Stay"
          name="minimumstay"
          ref={input => (this.minimumstay = input)}
        />
        <textarea
          placeholder="Cancellation Policy"
          name="cancellation"
          ref={input => (this.cancellation = input)}
        />
        <textarea
          placeholder="Description"
          name="description"
          ref={input => (this.description = input)}
        />
        <textarea
          placeholder="Homespace"
          name="homespace"
          ref={input => (this.homespace = input)}
        />
        <textarea
          placeholder="Guest Access to the Location"
          name="guestaccess"
          ref={input => (this.guestaccess = input)}
        />
        <textarea
          placeholder="Level of Interaction with Host"
          name="interaction"
          ref={input => (this.interaction = input)}
        />
        <textarea
          placeholder="Other Notes"
          name="othernotes"
          ref={input => (this.othernotes = input)}
        />

        <h4>Amenities</h4>
        <label htmlFor="petfriendly">Petfriendly?</label>
        <select
          name="petfriendly"
          id="petfriendly"
          ref={input => (this.petfriendly = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="elevator">Elevator?</label>
        <select
          name="elevator"
          id="elevator"
          ref={input => (this.elevator = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="doorman">Doorman?</label>
        <select
          name="doorman"
          id="doorman"
          ref={input => (this.doorman = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="kidfriendly">Kid Friendly?</label>
        <select
          name="kidfriendly"
          id="kidfriendly"
          ref={input => (this.kidfriendly = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="smoking">smoking?</label>
        <select
          name="smoking"
          id="smoking"
          ref={input => (this.smoking = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="kitchen">kitchen?</label>
        <select
          name="kitchen"
          id="kitchen"
          ref={input => (this.kitchen = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="intercom">intercom?</label>
        <select
          name="intercom"
          id="intercom"
          ref={input => (this.intercom = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="internet">internet?</label>
        <select
          name="internet"
          id="internet"
          ref={input => (this.internet = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="events">events?</label>
        <select name="events" id="events" ref={input => (this.events = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="parking">parking?</label>
        <select
          name="parking"
          id="parking"
          ref={input => (this.parking = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="hottub">hottub?</label>
        <select name="hottub" id="hottub" ref={input => (this.hottub = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="wheelchair">wheelchair?</label>
        <select
          name="wheelchair"
          id="wheelchair"
          ref={input => (this.wheelchair = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="cable">cable?</label>
        <select name="cable" id="cable" ref={input => (this.cable = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="gym">gym?</label>
        <select name="gym" id="gym" ref={input => (this.gym = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="breakfast">breakfast?</label>
        <select
          name="breakfast"
          id="breakfast"
          ref={input => (this.breakfast = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="fireplace">fireplace?</label>
        <select
          name="fireplace"
          id="fireplace"
          ref={input => (this.fireplace = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="dryer">dryer?</label>
        <select name="dryer" id="dryer" ref={input => (this.dryer = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="laptop">laptop?</label>
        <select name="laptop" id="laptop" ref={input => (this.laptop = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="pool">pool?</label>
        <select name="pool" id="pool" ref={input => (this.pool = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="washer">washer?</label>
        <select name="washer" id="washer" ref={input => (this.washer = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="tv">tv?</label>
        <select name="tv" id="tv" ref={input => (this.tv = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="iron">iron?</label>
        <select name="iron" id="iron" ref={input => (this.iron = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="hangers">hangers?</label>
        <select
          name="hangers"
          id="hangers"
          ref={input => (this.hangers = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="essentials">essentials?</label>
        <select
          name="essentials"
          id="essentials"
          ref={input => (this.essentials = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="hairdryer">hairdryer?</label>
        <select
          name="hairdryer"
          id="hairdryer"
          ref={input => (this.hairdryer = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="ac">ac?</label>
        <select name="ac" id="ac" ref={input => (this.ac = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="shampoo">shampoo?</label>
        <select
          name="shampoo"
          id="shampoo"
          ref={input => (this.shampoo = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="heating">heating?</label>
        <select
          name="heating"
          id="heating"
          ref={input => (this.heating = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="streetparking">streetparking?</label>
        <select
          name="streetparking"
          id="streetparking"
          ref={input => (this.streetparking = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="privent">privent?</label>
        <select
          name="privent"
          id="privent"
          ref={input => (this.privent = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="ethernet">ethernet?</label>
        <select
          name="ethernet"
          id="ethernet"
          ref={input => (this.ethernet = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="paidparking">paidparking?</label>
        <select
          name="paidparking"
          id="paidparking"
          ref={input => (this.paidparking = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>

        <h4>Family Amenities</h4>
        <label htmlFor="babybath">babybath?</label>
        <select
          name="babybath"
          id="babybath"
          ref={input => (this.babybath = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="babymonitor">babymonitor?</label>
        <select
          name="babymonitor"
          id="babymonitor"
          ref={input => (this.babymonitor = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="babysitter">babysitter?</label>
        <select
          name="babysitter"
          id="babysitter"
          ref={input => (this.babysitter = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="changingtable">changingtable?</label>
        <select
          name="changingtable"
          id="changingtable"
          ref={input => (this.changingtable = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="toys">toys?</label>
        <select name="toys" id="toys" ref={input => (this.toys = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="dinnerware">dinnerware?</label>
        <select
          name="dinnerware"
          id="dinnerware"
          ref={input => (this.dinnerware = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="crib">crib?</label>
        <select name="crib" id="crib" ref={input => (this.crib = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="fireplaceguards">fireplaceguards?</label>
        <select
          name="fireplaceguards"
          id="fireplaceguards"
          ref={input => (this.fireplaceguards = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="gameconsole">gameconsole?</label>
        <select
          name="gameconsole"
          id="gameconsole"
          ref={input => (this.gameconsole = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="highchair">highchair?</label>
        <select
          name="highchair"
          id="highchair"
          ref={input => (this.highchair = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="outletcovers">outletcovers?</label>
        <select
          name="outletcovers"
          id="outletcovers"
          ref={input => (this.outletcovers = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="packnplay">packnplay?</label>
        <select
          name="packnplay"
          id="packnplay"
          ref={input => (this.packnplay = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="shades">shades?</label>
        <select name="shades" id="shades" ref={input => (this.shades = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="stairgate">stairgate?</label>
        <select
          name="stairgate"
          id="stairgate"
          ref={input => (this.stairgate = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="tablecorners">tablecorners?</label>
        <select
          name="tablecorners"
          id="tablecorners"
          ref={input => (this.tablecorners = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="windowguards">windowguards?</label>
        <select
          name="windowguards"
          id="windowguards"
          ref={input => (this.windowguards = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>

        <h4>Safety</h4>
        <label htmlFor="v">smoke alarms?</label>
        <select name="smoke" id="smoke" ref={input => (this.smoke = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="v">firstaid?</label>
        <select
          name="firstaid"
          id="firstaid"
          ref={input => (this.firstaid = input)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="v">fire extinguisher?</label>
        <select name="fire" id="fire" ref={input => (this.fire = input)}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>

        <input
          type="text"
          placeholder="Image Names - Separate by Commas (,)"
          name="images"
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
          placeholder="Accuracy Average"
          name="accuracy"
          ref={input => (this.accuracy = input)}
        />
        <input
          type="text"
          placeholder="Communication Average"
          name="communication"
          ref={input => (this.communication = input)}
        />
        <input
          type="text"
          placeholder="Cleanliness Average"
          name="cleanliness"
          ref={input => (this.cleanliness = input)}
        />
        <input
          type="text"
          placeholder="Location Average"
          name="location"
          ref={input => (this.location = input)}
        />
        <input
          type="text"
          placeholder="Checkin Average"
          name="checkinavg"
          ref={input => (this.checkinavg = input)}
        />
        <input
          type="text"
          placeholder="Value Average"
          name="valueavg"
          ref={input => (this.valueavg = input)}
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
    );
  }
}

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps, actions)(AddHomeForm);

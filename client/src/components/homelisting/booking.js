import React, { Component } from "react";
import ReviewStar from "../../common/review_stars"; //This is for the review stars on the booking component
import { connect } from "react-redux";
import * as actions from "../../actions";

class bookingComponent extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      toggleCounter: false,
      toggleClass: "toggleFalse",
      windowWidth: 0,
      phone: 320,
      tablet: 768,
      desktop: 1024,
      collapsed: true,
      bookToggle: "toggleFalse",
      bookedDays: [],
      reserved: false
    };
  }

  handleChange(e) {
    const user = this.state.user;
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value
    };
    this.setState({
      user: updatedUser
    });
  }

  updateBooking(bookingData) {
    let currentHomeData = this.props.data;
    let currentBookingData = this.props.data.booking.slice(0); //We need to make a deep copy of the booking array.
    let newData = this.state.bookedDays;
    if (newData.length !== 0) {
      for (let x = 0; x < newData.length; x++) {
        currentBookingData.push(newData[x]);
      }
      currentHomeData.booking = currentBookingData.slice(0);
      this.props.updateHome(currentHomeData, currentHomeData.id);
    }
    let user = this.props.auth;
    user.bookedHomes.push(this.props.data.id);
    this.props.updateUser(user, user._id);
  }

  toggleCount() {
    if (this.state.toggleCounter) {
      this.setState({ toggleCounter: false, toggleClass: "toggleFalse" });
    } else {
      this.setState({ toggleCounter: true, toggleClass: "toggleTrue" });
    }
  }

  toggleCollapsed() {
    var opposite = !this.state.collapsed;
    this.setState({ collapsed: opposite });
  }

  // onPhone() {
  //   return this.state.windowWidth <= this.state.phone;
  // }

  onTablet() {
    return this.state.windowWidth <= this.state.tablet;
  }

  // updateScroll() {
  //   var calendar = document.getElementById("booking-calendar-initial");
  //   var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  //   var calendarTop = calendar.scrollHeight + height;
  //   var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  //   if(calendarTop < scrollTop && !this.onTablet()) {
  //     this.setState({calendarFixed: true});
  //   } else {
  //     this.setState({calendarFixed: false});
  //   }

  // }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth.bind(this));
    // window.addEventListener("scroll", this.updateScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth.bind(this));
    // window.removeEventListener("scroll", this.updateScroll.bind(this));
  }

  updateWindowWidth() {
    this.setState({ windowWidth: window.innerWidth });
  }

  bookRequest(book, collapse) {
    this.state.success = true;
    book();
    collapse();
  }

  render() {
    let homeid = this.props.data.id;
    let userRecord = this.props.auth.bookedHomes;
    this.state.reserved = userRecord.indexOf(homeid);
    if(this.state.reserved != -1){
      this.state.reserved = true;
    } else {
      this.state.reserved = false;
    }
    return (
      <div className="bookingContainer">
        <div className="bookingContent">
          <div className="headerPrice">
            Join the event now.
          </div>

            <div className="bookRequestContainer">
              <div className="bookRequestContainer-2">
                {this.state.success || this.state.reserved ? (
                  <button disabled className="bookRequest big-green-success"
                  onClick={this.bookRequest.bind(
                    this,
                    this.updateBooking.bind(this),
                    this.toggleCollapsed.bind(this)
                  )} > Reserved </button>
                ) : (
                  <button className="bookRequest"
                  onClick={this.bookRequest.bind(
                    this,
                    this.updateBooking.bind(this),
                    this.toggleCollapsed.bind(this)
                  )} > Reserve </button>
                )}
              </div>
            </div>

          </div>
        </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(bookingComponent);

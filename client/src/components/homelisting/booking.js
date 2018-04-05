import React, { Component } from "react";
import ReviewStar from "../../common/review_stars"; //This is for the review stars on the booking component
import Calendar from "../../common/calendar";
import { connect } from "react-redux";
import * as actions from "../../actions";

class bookingComponent extends Component {
  constructor() {
    super();
    this.state = {
      adultAmount: 1,
      childAmount: 0,
      infantAmount: 0,
      toggleCounter: false,
      toggleClass: "toggleFalse",
      windowWidth: 0,
      phone: 320,
      tablet: 768,
      desktop: 1024,
      collapsed: true,
      bookToggle: "toggleFalse",
      bookedDays: [],
      calendarComplete: false,
      // calendarFixed: false,
      calendarInitial: 0
    };
    this.gatherCalendar = this.gatherCalendar.bind(this);
  }

  gatherCalendar(dayArray, bookedYear) {
    let bookedArray = [];
    for (let x = 0; x < dayArray.length; x++) {
      let newBookedDate = {
        dateID: dayArray[x],
        yearID: bookedYear,
        user: this.props.auth._id,
        adults: this.state.adultAmount,
        children: this.state.childAmount,
        infants: this.state.infantAmount
      };
      bookedArray.push(newBookedDate);
    }
    this.setState({ bookedDays: bookedArray, bookToggle: "toggleTrue" });
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

  amountCounter(guestType, plusOrMinus) {
    if (plusOrMinus) {
      switch (guestType) { //The 'adult' and 'child' cases check to see if the number exceeds the guestlimit.
        case "adult":
          if (
            this.state.adultAmount + this.state.childAmount <
            this.props.data.homeinformation.guestlimit
          ) {
            this.setState({ adultAmount: this.state.adultAmount + 1 });
          }
          break;

        case "child":
          if (
            this.state.adultAmount + this.state.childAmount <
            this.props.data.homeinformation.guestlimit
          ) {
            this.setState({ childAmount: this.state.childAmount + 1 });
          }
          break;

        case "infant":
          this.setState({ infantAmount: this.state.infantAmount + 1 });
          break;

        default:
          break;
      }
    } else {
      switch (guestType) {
        case "adult":
          if (1 < this.state.adultAmount) {
            this.setState({ adultAmount: this.state.adultAmount - 1 });
          }
          break;

        case "child":
          if (1 <= this.state.childAmount) {
            this.setState({ childAmount: this.state.childAmount - 1 });
          }
          break;

        case "infant":
          if (1 <= this.state.infantAmount) {
            this.setState({ infantAmount: this.state.infantAmount - 1 });
          }
          break;

        default:
          break;
      }
    }
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
    book();
    collapse();
  }

  render() {
    return (
      <div className="bookingContainer">
        <div
          className="bookingContent"
          /*style={
            this.state.collapsed && this.onTablet() ? { display: "none" } : {}
          }*/
        >
          {" "}
          {/*Collapsable content start*/}
          <div className="headerPrice">
            <h2>
              <span>${this.props.data.homeinformation.price.weekday}</span> per
              night
            </h2>
            <p className="reviewCounter">
              <ReviewStar
                avg_review={this.props.data.reviewAvg.avg}
                overview_id={56}
              />
              {this.props.data.reviews}
            </p>
          </div>
          <div className="bookingInput">
            <div className="bookingInputTabletLeft">
              {/*<div id="booking-calendar-initial" />*/}
              <div className="bookingSection bookingCalendar">
                <Calendar
                  data={this.props.data}
                  gatherInfo={this.gatherCalendar}
                  /*calendarStyling={
                    this.state.calendarFixed
                      ? { position: "fixed", top: "80px", zIndex: "401" }
                      : { position: "static" }}*/
                />
              </div>

              <div className="bookingSection bookingGuest">
                <p className="guestTitle inputTitle">Guests:</p>
                <p
                  onClick={this.toggleCount.bind(this)}
                  className="guestAmount inputSection"
                >
                  {this.state.adultAmount + this.state.childAmount} Guest
                </p>

                <div
                  id="guestInput"
                  className={this.state.toggleClass + " guestNumber"}
                >
                  <div className="guestCounter guestAdult">
                    <h2>Adults</h2>

                    <div className="personCounter">
                      <span
                        onClick={this.amountCounter.bind(this, "adult", false)}
                        className="counterSymbol inactiveCounter"
                      >
                        -
                      </span>
                      <span className="currentNumber">
                        {this.state.adultAmount}
                      </span>
                      <span
                        onClick={this.amountCounter.bind(this, "adult", true)}
                        className="counterSymbol activeCounter"
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <div className="guestCounter guestChild">
                    <h2>Children</h2>

                    <div className="personCounter">
                      <span
                        onClick={this.amountCounter.bind(this, "child", false)}
                        className="counterSymbol inactiveCounter"
                      >
                        -
                      </span>
                      <span className="currentNumber">
                        {this.state.childAmount}
                      </span>
                      <span
                        onClick={this.amountCounter.bind(this, "child", true)}
                        className="counterSymbol activeCounter"
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <div className="guestCounter guestInfant">
                    <h2>Infants</h2>

                    <div className="personCounter">
                      <span
                        onClick={this.amountCounter.bind(this, "infant", false)}
                        className="counterSymbol inactiveCounter"
                      >
                        -
                      </span>
                      <span className="currentNumber">
                        {this.state.infantAmount}
                      </span>
                      <span
                        onClick={this.amountCounter.bind(this, "infant", true)}
                        className="counterSymbol activeCounter"
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <p className="guestMax">
                    {this.props.data.homeinformation.guestlimit} Guests maximum.
                    Infants don’t count toward the number of guests.
                  </p>
                  <p
                    onClick={this.toggleCount.bind(this)}
                    className="guestClose"
                  >
                    Close
                  </p>
                </div>
              </div>
            </div>

            {
              (this.state.bookToggle === "toggleTrue") ? 
              <div className='bookedCostTotal'>
                <div className='bookedCostContainer'> 
                  <p className='costName costItem'>${this.props.data.homeinformation.price.weekday} x {this.state.bookedDays.length}</p>
                  <p className='costValue costItem'>${this.props.data.homeinformation.price.weekday * this.state.bookedDays.length}</p>
                </div>

                <div className='bookedCostContainer'> 
                  <p className='costName costItem'>Service fee:</p>
                  <p className='costValue costItem'>${this.props.data.homeinformation.price.cleaning}</p>
                </div>

                 <div className='bookedCostContainer boldCost'> 
                  <p className='costName costItem'>Total:</p>
                  <p className='costValue costItem'>${this.props.data.homeinformation.price.cleaning + this.props.data.homeinformation.price.weekday * this.state.bookedDays.length}</p>
                </div>
              </div> : <div></div>
            }

            <div className="bookRequestContainer">
              <div className="bookRequestContainer-2">
                <button
                  className="bookRequest"
                  onClick={this.bookRequest.bind(
                    this,
                    this.updateBooking.bind(this),
                    this.toggleCollapsed.bind(this)
                  )}
                >
                  Request To Book
                </button>
                <p className="bookingFooter">You wont be charged yet</p>
              </div>
            </div>
          </div>
        </div>
        {/*Collapsable content end*/}
        {/*{this.onTablet() && this.state.collapsed ? (
          <button
            className="bookRequest"
            onClick={this.bookRequest.bind(
              this,
              this.updateBooking.bind(this),
              this.toggleCollapsed.bind(this)
            )}
          >
            Request To Book
          </button>
        ) : (
          ""
        )}*/}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(bookingComponent);

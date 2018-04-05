import React from "react";

export default class SearchGalleryFilterBar extends React.Component {
  defaultState = {
    overlay: false,
    activeComponent: "", // "dates", "guests", "roomType", "price", "instantBook", or "moreFilters"
    filter: {
      dates: [], // [start, end], {year, month, day}
      guests: {
        // Children are 2 - 12, infants are Under 2
        adults: 1,
        children: 0,
        infants: 0
      },
      roomType: {
        entirePlace: false,
        privateRoom: false,
        sharedRoom: false
      },
      price: {
        // In USD
        min: 10,
        max: 1000,
        average: 77
      },
      instantBook: false,
      moreFilters: {
        superhost: false,
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        amenities: {
          kitchen: false,
          shampoo: false,
          heating: false,
          airConditioning: false,
          washer: false,
          dryer: false,
          wirelessInternet: false,
          breakfast: false,
          familyFriendly: false,
          indoorFireplace: false,
          wirelessIntercom: false,
          doorman: false,
          hangers: false,
          iron: false,
          hairDryer: false,
          friendlyWorkspace: false,
          lockOnBedroomDoor: false,
          selfCheckIn: false,
          tv: false
        },
        facilities: {
          elevator: false,
          freeParking: false,
          gym: false,
          hotTub: false,
          pool: false,
          wheelChairAccessible: false
        },
        hostRules: {
          suitableForEvents: false,
          pets: false,
          smoking: false
        },
        neighborhoods: [], // To be implimented
        hostLanguage: {} // To be implimented
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.props.onReset(this);
  }

  // Updates the filter given a key, value pair
  updateFilter(key, value) {
    var temp = { ...this.state.filter };
    temp[key] = value;
    this.props.setFilters(temp);
    this.setState({ filter: temp });
  }

  // toggles a component off/on and handles the overlay
  toggleComponent(component) {
    if (component !== this.state.activeComponent) {
      this.setState({ activeComponent: component, overlay: true });
    } else {
      this.setState({ activeComponent: "", overlay: false });
    }
  }

  setActiveComponent(component) {
    this.setState({ activeComponent: component });
  }

  resetFilters() {
    this.setState(this.defaultState);
  }

  componentWillUnmount() {
    this.props.onReset(this);
  }

  render() {
    return (
      <div>
        <div className="filter-bar">
          <Dates
            dates={this.state.filter.dates}
            updateFilter={this.updateFilter.bind(this)}
            toggleComponent={this.toggleComponent.bind(this)}
            activeComponent={this.state.activeComponent}
          />
          <Guests
            guests={this.state.filter.guests}
            updateFilter={this.updateFilter.bind(this)}
            toggleComponent={this.toggleComponent.bind(this)}
            activeComponent={this.state.activeComponent}
          />
          <RoomType
            roomType={this.state.filter.roomType}
            updateFilter={this.updateFilter.bind(this)}
            toggleComponent={this.toggleComponent.bind(this)}
            activeComponent={this.state.activeComponent}
          />
          <Price
            price={this.state.filter.price}
            updateFilter={this.updateFilter.bind(this)}
            toggleComponent={this.toggleComponent.bind(this)}
            activeComponent={this.state.activeComponent}
          />
          <InstantBook
            instantBook={this.state.filter.instantBook}
            updateFilter={this.updateFilter.bind(this)}
            toggleComponent={this.toggleComponent.bind(this)}
            activeComponent={this.state.activeComponent}
          />
          <MoreFilters /> {/* only visual for now*/}
        </div>
        <div
          className={this.state.overlay ? "filter-overlay" : ""}
          onClick={() => {
            this.toggleComponent(this.state.activeComponent);
          }}
        />
      </div>
    );
  }
}

// Main Classes

class Dates extends React.Component {
  constructor(props) {
    super(props);
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    this.state = {
      months: [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      today: date,
      viewMonth: date.getMonth(),
      viewYear: date.getFullYear(),
      dateRange: [false, false], // start, end
      startDate: true, // when the user clicks a date, it toggles between which date (start OR end) is set
      appliedDateRange: false
    };
  }

  // returns the number of days in a given month
  getMonthDays(year, month) {
    let leapYear =
      year % 4 === 0 &&
      (year % 100 !== 0 || (year % 100 === 0 && year % 400 === 0))
        ? true
        : false;
    if (leapYear && month === 1) {
      return this.state.monthDays[month] + 1; // add 1 day to Feburary
    }
    return this.state.monthDays[month];
  }

  // returns number of "filler" days
  getFillerDays(year, month) {
    return new Date(year, month, 1).getDay();
  }

  // returns true if the given day is valid (in the current view month and year)
  validDay(day) {
    day++; // needed to include current date
    var today = this.state.today;
    var viewDate = new Date(this.state.viewYear, this.state.viewMonth, day);

    if (today.getTime() >= viewDate.getTime()) {
      return false;
    }
    return true;
  }

  monthForward() {
    if (this.state.viewMonth + 1 > 11) {
      this.setState({
        viewMonth: 0,
        viewYear: this.state.viewYear + 1
      });
    } else {
      this.setState({ viewMonth: this.state.viewMonth + 1 });
    }
  }

  monthBackward() {
    if (this.state.viewMonth - 1 < 0) {
      this.setState({
        viewMonth: 11,
        viewYear: this.state.viewYear - 1
      });
    } else {
      this.setState({ viewMonth: this.state.viewMonth - 1 });
    }
  }

  // Month num is 0 to 11 inclusive
  monthToString(monthNum) {
    return this.state.months[monthNum];
  }

  // returns true if between start, end dates
  inRange(year, month, day) {
    var range = this.state.dateRange;

    if (range[0] && range[1]) {
      var start = new Date(range[0].year, range[0].month, range[0].day);
      var end = new Date(range[1].year, range[1].month, range[1].day);
      var target = new Date(year, month, day);

      if (
        start.getTime() < target.getTime() &&
        target.getTime() < end.getTime()
      ) {
        return true;
      }
    }
    return false;
  }

  // returns true if date IS the start or end date
  rangeEndpoint(year, month, day) {
    var range = this.state.dateRange;
    if (range[0] || range[1]) {
      if (
        year === range[0].year &&
        month === range[0].month &&
        day === range[0].day
      ) {
        return true;
      }
      if (
        year === range[1].year &&
        month === range[1].month &&
        day === range[1].day
      ) {
        return true;
      }
    }
    return false;
  }

  // Handles date click (only for VALID dates!)
  handleClick(year, month, day) {
    var range = this.state.dateRange;
    var flipStartDate = !this.state.startDate;

    if (this.state.startDate) {
      if (range[1]) {
        var start = new Date(year, month, day);
        var end = new Date(range[1].year, range[1].month, range[1].day);

        if (start.getTime() >= end.getTime()) {
          range[1] = false;
        }
      }
      range[0] = { year: year, month: month, day: day };
      this.setState({ dateRange: range, startDate: flipStartDate });
    } else {
      range[1] = { year: year, month: month, day: day };

      if (range[0]) {
        var last = new Date(year, month, day);
        var first = new Date(range[0].year, range[0].month, range[0].day);

        if (last.getTime() <= first.getTime()) {
          range[0] = { year: year, month: month, day: day };
          range[1] = false;
          flipStartDate = !flipStartDate;
        }
      }

      this.setState({ dateRange: range, startDate: flipStartDate });
    }
  }

  clearCalender() {
    this.setState({
      dateRange: [false, false],
      appliedDateRange: false,
      startDate: true
    });
  }

  applyCalender() {
    var range = this.state.dateRange;
    if (range[0] && range[1]) {
      this.props.updateFilter("dates", range.slice());
      this.setState({ appliedDateRange: range.slice() });
    }
  }

  displayDateRange() {
    var range = this.state.appliedDateRange;
    if (range[0] && range[1]) {
      return (
        "" +
        this.monthToString(range[0].month).substring(0, 3) +
        " " +
        range[0].day +
        "-" +
        this.monthToString(range[1].month).substring(0, 3) +
        " " +
        range[1].day
      );
    }
    return "Dates";
  }

  // returns a given day's jsx
  dayToJSX(year, month, week, day) {
    var days = this.getMonthDays(year, month);

    if (day > 0 && day <= days) {
      if (this.validDay(day)) {
        if (this.rangeEndpoint(year, month, day)) {
          return (
            <div
              className="calender-day-endpoint"
              onClick={() => {
                this.handleClick(year, month, day);
              }}
              key={"" + week + day}
            >
              {day}
            </div>
          );
        } else if (this.inRange(year, month, day)) {
          return (
            <div
              className="calender-day-active"
              onClick={() => {
                this.handleClick(year, month, day);
              }}
              key={"" + week + day}
            >
              {day}
            </div>
          );
        } else {
          return (
            <div
              className="calender-day"
              onClick={() => {
                this.handleClick(year, month, day);
              }}
              key={"" + week + day}
            >
              {day}
            </div>
          );
        }
      } else {
        return (
          <div className="calender-day-inactive" key={"" + week + day}>
            {day}
          </div>
        );
      }
    }
    return "";
  }

  // returns calender data as JSX
  viewToJSX() {
    var jsx = [];
    var year = this.state.viewYear;
    var month = this.state.viewMonth;
    var monthDays = this.getMonthDays(
      this.state.viewYear,
      this.state.viewMonth
    );
    var fillerDays = this.getFillerDays(
      this.state.viewYear,
      this.state.viewMonth
    );
    // a "week" is a row in the calender
    var weeks = Math.ceil((monthDays + fillerDays) / 7);

    for (let w = 0; w < weeks; w++) {
      var week = [];

      for (let d = w * 7 + 1; d <= (w + 1) * 7; d++) {
        let day = d - fillerDays;
        week.push(this.dayToJSX(year, month, w, day));
      }

      if (w === 0) {
        jsx.push(
          <div className="calender-week-filler" key={"w-" + w}>
            {week}
          </div>
        );
      } else {
        jsx.push(
          <div className="calender-week" key={"w-" + w}>
            {week}
          </div>
        );
      }
    }

    return <div>{jsx}</div>;
  }

  render() {
    return (
      <div className="filter-btn-container">
        <button
          className={
            this.state.appliedDateRange ? "filter-btn-active" : "filter-btn"
          }
          onClick={() => {
            this.props.toggleComponent("Dates");
          }}
        >
          {this.displayDateRange()}
        </button>
        <div className="filter-pseudo-parent">
          {this.props.activeComponent === "Dates" ? (
            <div className="filter-container dates-container">
              <div className="calender-header">
                <button
                  className="calender-arrow-left"
                  onClick={this.monthBackward.bind(this)}
                >
                  {"<-"}
                </button>
                {this.monthToString(this.state.viewMonth) +
                  " " +
                  this.state.viewYear}
                <button
                  className="calender-arrow-right"
                  onClick={this.monthForward.bind(this)}
                >
                  {"->"}
                </button>
              </div>
              <div className="calender-body">
                <div className="calender-axis">
                  <div className="calender-axis-day">Su</div>
                  <div className="calender-axis-day">Mo</div>
                  <div className="calender-axis-day">Tu</div>
                  <div className="calender-axis-day">We</div>
                  <div className="calender-axis-day">Th</div>
                  <div className="calender-axis-day">Fr</div>
                  <div className="calender-axis-day">Sa</div>
                </div>
                {this.viewToJSX()}
              </div>
              <div>
                {this.state.dateRange[0] || this.state.dateRange[1] ? (
                  <button
                    className="filter_clear-btn"
                    onClick={this.clearCalender.bind(this)}
                  >
                    Clear
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="filter_apply-btn"
                  onClick={this.applyCalender.bind(this)}
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

class Guests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: { ...props.guests },
      totalGuests: "",
      active: false
    };
  }

  updateGuestFilter() {
    this.props.updateFilter("guests", this.state.guests);
  }

  addGuest(type) {
    var guests = this.state.guests;
    if (type === "adult" && guests.adults < 16) {
      guests.adults++;
    } else if (type === "child" && guests.children < 5) {
      guests.children++;
    } else if (type === "infant" && guests.infants < 5) {
      guests.infants++;
    }
    this.setState({ guests: guests });
  }

  minusGuest(type) {
    var guests = this.state.guests;
    if (type === "adult" && guests.adults > 1) {
      guests.adults--;
    } else if (type === "child" && guests.children > 0) {
      guests.children--;
    } else if (type === "infant" && guests.infants > 0) {
      guests.infants--;
    }
    this.setState({ guests: guests }, () => {
      if (
        this.state.guests.adults === 1 &&
        this.state.guests.children === 0 &&
        this.state.guests.infants === 0
      ) {
        this.setState({ active: false });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.guests.adults !== nextProps.guests.adults ||
      this.state.guests.children !== nextProps.guests.children ||
      this.state.guests.infants !== nextProps.guests.infants
    ) {
      this.clearFilter();
    }
  }

  clearFilter() {
    this.setState(
      {
        guests: { adults: 1, children: 0, infants: 0 },
        totalGuests: "",
        active: false
      },
      () => {
        this.updateGuestFilter();
      }
    );
  }

  applyFilter() {
    var total =
      this.state.guests.adults +
      this.state.guests.children +
      this.state.guests.infants;
    this.setState({ active: true, totalGuests: total });
    this.updateGuestFilter();
  }

  render() {
    // let guests = this.props.guests;
    return (
      <div className="filter-btn-container">
        <button
          className={this.state.active ? "filter-btn-active" : "filter-btn"}
          onClick={() => {
            this.props.toggleComponent("Guests");
          }}
        >
          {this.state.totalGuests} Guests
        </button>
        <div className="filter-pseudo-parent">
          {this.props.activeComponent === "Guests" ? (
            <div className="filter-container guest-container">
              <div className="guest-row">
                <div className="guest-label">
                  <p className="guest-label">Adults</p>
                </div>
                <div className="guest-operator">
                  <AddSubtract
                    num={this.state.guests.adults}
                    onAdd={() => {
                      this.addGuest("adult");
                    }}
                    onMinus={() => {
                      this.minusGuest("adult");
                    }}
                  />
                </div>
              </div>
              <div className="guest-row">
                <div className="guest-label">
                  <p className="guest-label">Children</p>
                  <small>Ages 2 - 12</small>
                </div>
                <div className="guest-operator">
                  <AddSubtract
                    num={this.state.guests.children}
                    onAdd={() => {
                      this.addGuest("child");
                    }}
                    onMinus={() => {
                      this.minusGuest("child");
                    }}
                  />
                </div>
              </div>
              <div className="guest-row">
                <div className="guest-label">
                  <p>Infants</p>
                  <small>Under 2</small>
                </div>
                <div className="guest-operator">
                  <AddSubtract
                    num={this.state.guests.infants}
                    onAdd={() => {
                      this.addGuest("infant");
                    }}
                    onMinus={() => {
                      this.minusGuest("infant");
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  className="filter_clear-btn"
                  onClick={this.clearFilter.bind(this)}
                >
                  Clear
                </button>
                <button
                  className="filter_apply-btn"
                  onClick={this.applyFilter.bind(this)}
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

class RoomType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomType: {
        entirePlace: props.roomType.entirePlace,
        privateRoom: props.roomType.privateRoom,
        sharedRoom: props.roomType.sharedRoom
      },
      active: false
    };
  }

  toggleEntire() {
    var tmp = this.state.roomType;
    tmp.entirePlace = !tmp.entirePlace;
    this.setState({ roomType: tmp });
  }

  togglePrivate() {
    var roomType = this.state.roomType;
    roomType.privateRoom = !this.state.roomType.privateRoom;
    this.setState({ roomType: roomType });
  }

  toggleShared() {
    var roomType = this.state.roomType;
    roomType.sharedRoom = !this.state.roomType.sharedRoom;
    this.setState({ roomType: roomType });
  }

  applyChanges() {
    this.props.updateFilter("roomType", this.state.roomType);
    this.setState({ active: true });
  }

  clearFilter() {
    this.setState(
      {
        roomType: {
          entirePlace: false,
          privateRoom: false,
          sharedRoom: false
        },
        active: false
      },
      () => {
        this.props.updateFilter("roomType", this.state.roomType);
      }
    );
  }

  getButtonText() {
    if (!this.state.active) {
      return "Home type";
    }

    var type = this.state.roomType;

    var countKeys = () => {
      var keys = Object.keys(type);
      var count = 0;
      for (let i = 0; i < keys.length; i++) {
        if (type[keys[i]]) {
          count++;
        }
      }
      return count;
    };

    if (type.entirePlace && !type.privateRoom && !type.sharedRoom) {
      return "Entire place";
    } else if (!type.entirePlace && !type.privateRoom && type.sharedRoom) {
      return "Shared room";
    } else if (!type.entirePlace && type.privateRoom && !type.sharedRoom) {
      return "Private room";
    } else if (countKeys() > 1) {
      return "Home type - " + countKeys();
    }
    return "Home type";
  }

  render() {
    return (
      <div className="filter-btn-container">
        <button
          className={
            this.state.active
              ? "filter-btn-active filter-btn-mobile-hide"
              : "filter-btn filter-btn-mobile-hide"
          }
          onClick={() => {
            this.props.toggleComponent("RoomType");
          }}
        >
          {this.getButtonText()}
        </button>
        <div className="filter-pseudo-parent">
          {this.props.activeComponent === "RoomType" ? (
            <div className="filter-container">
              <div className="room-type-row">
                <button
                  className={
                    this.state.roomType.entirePlace
                      ? "room-type-btn-active"
                      : "room-type-btn"
                  }
                  onClick={this.toggleEntire.bind(this)}
                />
                <div className="room-type-details">
                  <h4>Entire Place</h4>
                  <p>Have a place to yourself</p>
                </div>
              </div>
              <div className="room-type-row">
                <button
                  className={
                    this.state.roomType.privateRoom
                      ? "room-type-btn-active"
                      : "room-type-btn"
                  }
                  onClick={this.togglePrivate.bind(this)}
                />
                <div className="room-type-details">
                  <h4>Private room</h4>
                  <p>Have your own room and share some common spaces</p>
                </div>
              </div>
              <div className="room-type-row">
                <button
                  className={
                    this.state.roomType.sharedRoom
                      ? "room-type-btn-active"
                      : "room-type-btn"
                  }
                  onClick={this.toggleShared.bind(this)}
                />
                <div className="room-type-details">
                  <h4>Shared room</h4>
                  <p>Stay in a shared space, like a common room</p>
                </div>
              </div>

              <div>
                <button
                  className="filter_clear-btn"
                  onClick={this.clearFilter.bind(this)}
                >
                  Clear
                </button>
                <button
                  className="filter_apply-btn"
                  onClick={this.applyChanges.bind(this)}
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

class Price extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.price,
      appliedMin: 10,
      appliedMax: 1000
    };
  }

  handleMinChange(e) {
    this.setState({ min: e.target.value });
  }

  handleMaxChange(e) {
    this.setState({ max: e.target.value });
  }

  applyChanges() {
    var min = this.state.min;
    var max = this.state.max;

    if (min < 10) {
      min = 10;
    }
    if (max > 1000) {
      max = 1000;
    }
    if (min > max) {
      min = max - 1;
    }

    this.setState(
      {
        min: min,
        max: max,
        appliedMin: min,
        appliedMax: max
      },
      () => {
        this.props.updateFilter("price", {
          min: this.state.appliedMin,
          max: this.state.appliedMax
        });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.price && nextProps.price.min) {
      if (
        this.state.min !== nextProps.price.min ||
        this.state.max !== nextProps.price.max
      ) {
        this.clearChanges();
      }
    }
  }

  clearChanges() {
    this.setState(
      {
        min: 10,
        max: 1000,
        appliedMin: 10,
        appliedMax: 1000
      },
      () => {
        this.props.updateFilter("price", {
          min: 10,
          max: 1000
        });
      }
    );
  }

  render() {
    return (
      <div className="filter-btn-container">
        <button
          className="filter-btn filter-btn-mobile-hide"
          onClick={() => {
            this.props.toggleComponent("Price");
          }}
        >
          {this.state.appliedMin !== 10 || this.state.appliedMax !== 1000
            ? "$" + this.state.appliedMin + " - $" + this.state.appliedMax
            : "Price"}
        </button>
        <div className="filter-pseudo-parent">
          {this.props.activeComponent === "Price" ? (
            <div className="filter-container price-container">
              <h3 className="price-range">
                ${this.state.appliedMin} - ${this.state.appliedMax}
              </h3>
              <p>The average nightly price is $77</p>
              <div className="price-row">
                <div>
                  Min
                  <input
                    className="price-input"
                    value={this.state.min}
                    onChange={e => {
                      this.handleMinChange(e);
                    }}
                  />
                </div>
                <div>
                  Max
                  <input
                    className="price-input"
                    value={this.state.max}
                    onChange={e => {
                      this.handleMaxChange(e);
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  className="filter_clear-btn"
                  onClick={this.clearChanges.bind(this)}
                >
                  Clear
                </button>
                <button
                  className="filter_apply-btn"
                  onClick={this.applyChanges.bind(this)}
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

class InstantBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appliedBook: false,
      instantBook: false
    };
  }

  toggleInstantBook() {
    var tmp = !this.state.instantBook;
    this.setState({ instantBook: tmp });
  }

  applyChanges() {
    this.setState({ appliedBook: this.state.instantBook });
    this.props.updateFilter("instantBook", this.state.instantBook);
  }

  clearChanges() {
    this.setState({ instantBook: false, appliedBook: false });
    this.props.updateFilter("instantBook", false);
  }

  render() {
    return (
      <div className="filter-btn-container">
        <button
          className={
            this.state.appliedBook
              ? "filter-btn-active filter-btn-mobile-hide"
              : "filter-btn filter-btn-mobile-hide"
          }
          onClick={() => {
            this.props.toggleComponent("InstantBook");
          }}
        >
          Instant Book
        </button>
        <div className="filter-pseudo-parent">
          {this.props.activeComponent === "InstantBook" ? (
            <div className="filter-container">
              <div className="instant-book-row">
                <div className="instant-book-details">
                  <h4>Instant Book</h4>
                  <p>Book without waiting for the host to respond.</p>
                </div>
                <div
                  className="instant-book-btn-container"
                  onClick={this.toggleInstantBook.bind(this)}
                >
                  <div
                    className={
                      this.state.instantBook
                        ? "instant-book-slider-active"
                        : "instant-book-slider"
                    }
                  />
                  <div
                    className={
                      this.state.instantBook
                        ? "instant-book-btn-active"
                        : "instant-book-btn"
                    }
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={this.clearChanges.bind(this)}
                  className="filter_clear-btn"
                >
                  Clear
                </button>
                <button
                  onClick={this.applyChanges.bind(this)}
                  className="filter_apply-btn"
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

class MoreFilters extends React.Component {
  render() {
    return (
      <div className="filter-btn-container">
        <button className="filter-btn">More filters</button>
        <div className="filter-psuedo-parent" />
      </div>
    );
  }
}

// Misc Components

// class Overlay extends React.Component {
//   render() {
//     return(<div></div>);
//   }
// }

// Displays an add-subtract component.
// takes num, onSubtract(), and onAdd() as props
class AddSubtract extends React.Component {
  render() {
    return (
      <div className="add-subtract">
        <button
          className="add-subtract_minus"
          onClick={this.props.onMinus.bind(this)}
        >
          -
        </button>
        <span className="add-subtract_num">{this.props.num}+</span>
        <button
          className="add-subtract_plus"
          onClick={this.props.onAdd.bind(this)}
        >
          +
        </button>
      </div>
    );
  }
}

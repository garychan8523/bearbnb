import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Button from "../../common/button";

class EditProfile extends Component {
  state = {
    user: this.props.auth
  };

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

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state.user;
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value
    };
    this.setState({
      user: updatedUser
    });
    this.props.updateUser(updatedUser, this.props.auth._id);
    this.editForm.reset();
  }

  renderDays() {
    var days = [];
    for (var i = 0; i < 31; i++) {
      days[i] = (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    return days.map(day => {
      return day;
    });
  }

  renderYears() {
    var years = [];
    for (var i = 1917; i < 2000; i++) {
      years[i] = (
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    years.reverse();
    return years.map(year => {
      return year;
    });
  }

  render() {
    return (
      <div className="edit-profile">
        <div className="edit-profile-section">
          <div className="edit-profile-header">Required</div>
          <form
            ref={input => (this.editForm = input)}
            className="edit-profile-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <div className="form-item">
              <span className="form-label">First Name </span>
              <span className="form-inputs">
                <input
                  className="long-input"
                  type="text"
                  name="firstName"
                  value={this.state.user.firstName}
                  placeholder="First Name"
                  onChange={e => this.handleChange(e)}
                  required
                />
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">Last Name </span>
              <span className="form-inputs">
                <input
                  className="long-input"
                  type="text"
                  name="lastName"
                  value={this.state.user.lastName}
                  placeholder="Last Name"
                  onChange={e => this.handleChange(e)}
                  required
                />
                <div className="dashboard-disclaimer">
                  Your public profile only shows your first name. When you
                  request a booking, your host will see your first and last
                  name.
                </div>
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">I Am </span>
              <span className="form-inputs">
                <select
                  className="small-input"
                  name="gender"
                  value={this.state.user.gender}
                  onChange={e => this.handleSubmit(e)}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="dashboard-disclaimer">
                  We use this data for analysis and never share it with other
                  users.
                </div>
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">Birth Date </span>
              <span className="form-inputs">
                <select
                  className="small-input"
                  name="birthmonth"
                  value={this.state.user.birthmonth}
                  onChange={e => this.handleSubmit(e)}
                  required
                >
                  <option value="0">Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  className="small-input"
                  name="birthday"
                  value={this.state.user.birthday}
                  onChange={e => this.handleSubmit(e)}
                  required
                >
                  <option value="0">Day</option>
                  {this.renderDays()}
                </select>
                <select
                  className="small-input"
                  name="birthyear"
                  value={this.state.user.birthyear}
                  onChange={e => this.handleSubmit(e)}
                  required
                >
                  <option value="0">Year</option>
                  {this.renderYears()}
                </select>
                <div className="dashboard-disclaimer">
                  The magical day you were dropped from the sky by a stork. We
                  use this data for analysis and never share it with other
                  users.
                </div>
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">Email </span>
              <span className="form-inputs">
                <input
                  className="long-input"
                  type="email"
                  name="email"
                  value={this.state.user.email}
                  placeholder="Email"
                  onChange={e => this.handleChange(e)}
                  required
                />
                <div className="dashboard-disclaimer">
                  We won’t share your private email address with other Bearbnb
                  users.
                </div>
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">Where You Live </span>
              <span className="form-inputs">
                <input
                  className="small-input"
                  type="text"
                  name="city"
                  value={this.state.user.city}
                  placeholder="City"
                  onChange={e => this.handleChange(e)}
                  required
                />
                <input
                  className="small-input"
                  type="text"
                  name="state"
                  value={this.state.user.state}
                  placeholder="State"
                  onChange={e => this.handleChange(e)}
                  required
                />
                <input
                  className="small-input"
                  type="text"
                  name="zipcode"
                  value={this.state.user.zipcode}
                  placeholder="Zip"
                  onChange={e => this.handleChange(e)}
                />
                <input
                  className="small-input"
                  type="text"
                  name="country"
                  value={this.state.user.country}
                  placeholder="Country"
                  onChange={e => this.handleChange(e)}
                  required
                />
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">Describe Yourself </span>
              <span className="form-inputs">
                <textarea
                  className="tall-input"
                  name="intro"
                  value={this.state.user.intro}
                  placeholder="Tell us a little about yourself."
                  onChange={e => this.handleChange(e)}
                  required
                />
                <div className="dashboard-disclaimer">
                  Bearbnb is built on relationships. Help others get to know
                  you.
                </div>
                <div className="dashboard-disclaimer">
                  Tell them about the things you like: What are 5 things you
                  can’t live without? Share your favorite travel destinations,
                  books, movies, shows, music, food. Do you have a life motto?
                  What is your favorite species of bear?
                </div>
              </span>
            </div>
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
        <div className="edit-profile-section">
          <div className="edit-profile-header">Optional</div>
          <form
            ref={input => (this.editForm = input)}
            className="edit-profile-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <div className="form-item">
              <span className="form-label">Schools </span>
              <span className="form-inputs">
                <input
                  className="long-input"
                  type="text"
                  name="school"
                  value={this.state.user.school}
                  placeholder="Schools - separate with commas(,)"
                  onChange={e => this.handleChange(e)}
                />
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">Work </span>
              <span className="form-inputs">
                <input
                  className="long-input"
                  type="text"
                  name="work"
                  value={this.state.user.work}
                  placeholder="Work - separate with commas(,)"
                  onChange={e => this.handleChange(e)}
                />
              </span>
            </div>
            <div className="form-item">
              <span className="form-label">Languages </span>
              <span className="form-inputs">
                <input
                  className="long-input"
                  type="text"
                  name="languages"
                  value={this.state.user.languages}
                  placeholder="Languages - separate with commas(,)"
                  onChange={e => this.handleChange(e)}
                />
              </span>
            </div>
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
        <span>
          <Button
            btnType="submit"
            onClick={e => this.handleSubmit(e)}
            btnClass="big-red"
            btnText="Save"
          />
        </span>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(EditProfile);

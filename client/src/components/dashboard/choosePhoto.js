import React, { Component } from "react";
import { connect } from "react-redux";
import * as images from "../../stylesheets/assets/images";
import * as actions from "../../actions";

class ChoosePhoto extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const user = this.props.auth;
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value
    };
    this.props.updateUser(updatedUser, this.props.auth._id);
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    return (
      <div className="change-photo">
        <h2>Choose your Avatar</h2>
        <div className="change-photo-body">
          <div className="change-photo-image-set">
            <img src={images.bear1} alt="bear1" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear1"
                value="bear1.jpg"
                checked={this.props.auth.image === "bear1.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear1">Bear 1</label>
            </div>
          </div>
          <div className="change-photo-image-set">
            <img src={images.bear2} alt="bear2" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear2"
                value="bear2.jpg"
                checked={this.props.auth.image === "bear2.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear2">Bear 2</label>
            </div>
          </div>
          <div className="change-photo-image-set">
            <img src={images.bear3} alt="bear2" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear3"
                value="bear3.jpg"
                checked={this.props.auth.image === "bear3.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear3">Bear 3</label>
            </div>
          </div>
          <div className="change-photo-image-set">
            <img src={images.bear4} alt="bear2" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear4"
                value="bear4.jpg"
                checked={this.props.auth.image === "bear4.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear4">Bear 4</label>
            </div>
          </div>
          <div className="change-photo-image-set">
            <img src={images.bear5} alt="bear2" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear5"
                value="bear5.jpg"
                checked={this.props.auth.image === "bear5.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear5">Bear 5</label>
            </div>
          </div>
          <div className="change-photo-image-set">
            <img src={images.bear6} alt="bear2" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear6"
                value="bear6.jpg"
                checked={this.props.auth.image === "bear6.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear6">Bear 6</label>
            </div>
          </div>
          <div className="change-photo-image-set">
            <img src={images.bear7} alt="bear2" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear7"
                value="bear7.jpg"
                checked={this.props.auth.image === "bear7.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear7">Bear 7</label>
            </div>
          </div>
          <div className="change-photo-image-set">
            <img src={images.bear8} alt="bear2" className="avatar" />
            <div className="input-wrapper">
              <input
                type="radio"
                name="image"
                id="bear8"
                value="bear8.jpg"
                checked={this.props.auth.image === "bear8.jpg"}
                onChange={this.handleOnChange}
              />
              <label htmlFor="bear8">Bear 8</label>
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

export default connect(mapStateToProps, actions)(ChoosePhoto);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditProfile from "../dashboard/editProfile";
import ChoosePhoto from "../dashboard/choosePhoto";
import AddReview from "../dashboard/Admin_AddReview";
import AddHome from "../dashboard/Admin_AddHome";
import AddReference from "../dashboard/Admin_AddReference";

class Dashboard extends Component {
  constructor() {
    var lasturl= document.referrer;
    console.log(document.referrer);
    super();
    this.state = {
      activeMenu: "editProfile"
    };

    if (lasturl.search("homes")!=-1){
      this.state = {
      activeMenu: "addReview"
      };
      var pos = lasturl.search("homes");
      var homeid = lasturl.substring(pos+6);
      console.log(homeid);
    }
  }

  changeMenu(newOption) {
    this.setState({
      activeMenu: newOption
    });
  }

  renderDashRight() {
    if (!this.state.activeMenu) {
      return "";
    } else if (this.state.activeMenu === "editProfile") {
      return <EditProfile />;
    } else if (this.state.activeMenu === "changePhoto") {
      return <ChoosePhoto checkedImage={this.props.auth.image} />;
    } else if (this.state.activeMenu === "addReview") {
      return <AddReview />;
    } else if (this.state.activeMenu === "addReference") {
      return <AddReference />;
    } else if (this.state.activeMenu === "addHome") {
      return <AddHome />;
    }
  }

  renderDashboard() {
    return (
      <div className="dashboard">
        <div className="dashboard-left">
          {this.state.activeMenu === "editProfile" ? (
            <h4 class="nav-selected" onClick={() => this.changeMenu("editProfile")}>Edit Profile</h4>
          ) : (
            <h4 onClick={() => this.changeMenu("editProfile")}>Edit Profile</h4>
          )}

          {this.state.activeMenu === "changePhoto" ? (
            <h4 class="nav-selected" onClick={() => this.changeMenu("changePhoto")}>Change Photo</h4>
          ) : (
            <h4 onClick={() => this.changeMenu("changePhoto")}>Change Photo</h4>
          )}

          {this.state.activeMenu === "addReview" ? (
            <h4 class="nav-selected" hidden={!this.props.auth.admin}
            onClick={() => this.changeMenu("addReview")}
          >Add Review</h4>
          ) : (
            <h4 hidden={!this.props.auth.admin}
            onClick={() => this.changeMenu("addReview")}
          >Add Review</h4>
          )}

          {this.state.activeMenu === "addReference" ? (
            <h4 class="nav-selected" hidden={!this.props.auth.admin}
            onClick={() => this.changeMenu("addReference")}
          >Add Reference</h4>
          ) : (
            <h4 hidden={!this.props.auth.admin}
            onClick={() => this.changeMenu("addReference")}
          >Add Reference</h4>
          )}

          {this.state.activeMenu === "addHome" ? (
          <h4 class="nav-selected" hidden={!this.props.auth.admin}
            onClick={() => this.changeMenu("addHome")}
          >Add Home</h4>
          ) : (
          <h4 hidden={!this.props.auth.admin}
            onClick={() => this.changeMenu("addHome")}
          >Add Home</h4>
          )}

          <h4>
            <a href={`/users/${this.props.auth._id}`}>View Profile</a>
          </h4>
        </div>
        <div className="dashboard-right">{this.renderDashRight()}</div>
      </div>
    );
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return this.renderDashboard();
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);

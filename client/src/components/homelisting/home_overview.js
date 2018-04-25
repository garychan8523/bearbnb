import React from "react";
import Button from "../../common/button";
import IconItem from "../../common/icon_item";
import { capitalizeFirstLetter, calcBedrooms } from "../../helpers";

const HomeOverview = props => {
  const homes = props.homes;

  return (
    <div className="home-overview">
      <div className="home-overview-header">
        <span className="home-overview-header left">
          <div className="home-overview-title">
            <h1>{homes.homeinformation.title}</h1>
          </div>
          <div className="home-overview-subtitle">
            in {homes.homelocation.city}
          </div>
          <div className="home-overview-iconpreview">
            <i className="fas fa-users" />
            <span className="home-overview-iconpreview-item">
              {(homes.homeinformation.guestlimit>0) ? (
                homes.homeinformation.guestlimit
              ) : ( "Unlimited") }
            </span>

            <i className="far fa-clock" />
            <span className="home-overview-iconpreview-item">
              {homes.startTime}
            </span>

            <i className="fas fa-dollar-sign" />
            <span className="home-overview-iconpreview-item">
              {(homes.homeinformation.price>0) ? (
                homes.homeinformation.price
              ) : ( "Free") }
            </span>

            <a href={`/users/${homes.hostid}`}>
              <span className="home-overview-iconpreview-item">
                Contact Host
              </span>
            </a>

          </div>
        </span>
        <span className="home-overview-header right">
          <div className="host-image" />
        </span>
      </div>
      <div className="home-overview-body">
        <div className="home-overview-body-desc">
          {homes.homeinformation.description}
        </div>
        <h4 class="sidenote">Other things to note</h4>
        <div className="home-overview-body-notes">
          {homes.homeinformation.othernotes ? (
            homes.homeinformation.othernotes
          ) : ("Nothing else to note.")
          }
        </div>
        
      </div>

      <div className="divider" />

    </div>
  );
};

export default HomeOverview;

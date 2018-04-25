import React from "react";
import Button from "../../common/button";
import VerifiedIcon from "../../common/verifiedIcon";
import { formatDate } from "../../helpers";

/* Displays Host information. */

const HostDisplay = props => {
  const host = props.profile;
  return (
    <div className="host-display">
      <div className="host-display-header">
        <div className="host-display-headline">
          <div className="host-display-title">This event is hosted by: {host.firstName}</div>
          <div className="host-display-joindate">
            from {host.city + ", " + host.state}
            , our member since {formatDate(host.joindate)}
          </div>
          <div className="host-display-intro">{host.intro}</div>
        </div>
        <a href={`/users/${props.profile.id}`}>
          <img
            className="host-display-img"
            src={require(`../../stylesheets/assets/images/${host.image}`)}
            alt=""
          />
        </a>
      </div>
      
      <a href={`/users/${props.profile.id}`}></a>
      <div className="divider" />
    </div>
  );
};

export default HostDisplay;

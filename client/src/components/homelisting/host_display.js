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
          <div className="host-display-title">Hosted By {host.firstName}</div>
          <div className="host-display-joindate">
            {host.city + ", " + host.state}
            - Joined {formatDate(host.joindate)}
          </div>
          <div className="host-display-iconbar">
            <div className="icon-set">
              <Button
                btnType="button"
                btnClass="btn-yellow"
                btnText={host.reviews.length}
              />
              <span className="icon-label">Reviews</span>
            </div>
            <div className="icon-set">
              <Button
                btnType="button"
                btnClass="btn-yellow"
                btnText={host.references.length}
              />
              <span className="icon-label">References</span>
            </div>
            {host.verified.id ? (
              <div className="icon-set">
                <VerifiedIcon />
                <span className="icon-label">Verified</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <a href={`/users/${props.profile.id}`}>
          <img
            className="host-display-img"
            src={require(`../../stylesheets/assets/images/${host.image}`)}
            alt=""
          />
        </a>
      </div>
      <div className="host-display-intro">{host.intro}</div>
      <a href={`/users/${props.profile.id}`}>
        <Button
          btnType="button"
          btnClass="accent-outline"
          btnText="Contact host"
        />
      </a>
      <ul>
        <li>
          Languages: <span>{host.languages}</span>
        </li>
        <li>
          Response Rate: <span>100%</span>
        </li>
        <li>
          Response Time: <span>1 hour</span>
        </li>
      </ul>
    </div>
  );
};

export default HostDisplay;

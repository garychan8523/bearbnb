import React from "react";
import { connect } from "react-redux";
import Button from "../../common/button";
import VerifiedIcon from "../../common/verifiedIcon";
import SuperHost from "../../common/superhost";
import { capitalizeFirstLetter, formatDate } from "../../helpers";

const ProfileOverview = props => {
  if (!props.profile) {
    return "";
  } else {
    let joindate = new Date(props.profile.joindate);
    joindate = joindate.toISOString();
    joindate = joindate.slice(0, 4);
    return (
      <div className="profile-overview">
        <div className="profile-overview-header">
          <div className="profile-overview-title">
            Hey, I'm {capitalizeFirstLetter(props.profile.firstName)}!
          </div>
          <div className="profile-overview-subtitle">
            from {" "}{props.profile.city}, {props.profile.state} · our member since{" "}
            {joindate}
          </div>
        </div>
        <div className="profile-overview-body">
          {/*Add ability to new line.  DB saves a \n when added in the textbox.*/}
          <div className="profile-overview-desc">{props.profile.intro}</div>
        </div>
        <div className="profile-overview-iconbar">
          {props.profile.superuser ? (
            <div className="icon-set">
              <SuperHost />
              <span className="icon-label">SuperHost</span>
            </div>
          ) : (
            ""
          )}

          {!props.profile.reviews || props.profile.reviews.length <= 0 ? (
            ""
          ) : (
            <div className="icon-set">
              <Button
                btnType="button"
                btnClass="btn-yellow"
                btnText={props.profile.reviews.length}
              />
              <span className="icon-label">Reviews</span>
            </div>
          )}

          {!props.profile.references || props.profile.references.length <= 0 ? (
            ""
          ) : (
            <div className="icon-set">
              <Button
                btnType="button"
                btnClass="btn-yellow"
                btnText={props.profile.references.length}
              />
              <span className="icon-label">References</span>
            </div>
          )}

          {props.profile.verified.id ? (
            <div className="icon-set">
              <VerifiedIcon />
              <span className="icon-label">Verified user</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
};

function mapStateToProps({ profile }) {
  return { profile };
}

export default connect(mapStateToProps)(ProfileOverview);

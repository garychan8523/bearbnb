import React from "react";
import Button from "../../common/button";
import IconItem from "../../common/icon_item";
import { capitalizeFirstLetter, calcBedrooms } from "../../helpers";

const HomeOverview = props => {
  const homes = props.homes;

  function renderRooms(room) {
    if (room === "common") {
      return (
        <div key={room} className="home-overview-sleeping-item">
          <div>
            <i className="fas fa-bed fa-3x" />
            <div className="home-overview-sleeping-title">Common Spaces</div>
            {Object.keys(homes.homeinformation.sleeping[room]).map(key => {
              if (homes.homeinformation.sleeping[room][key] > 0) {
                return renderBeds(
                  key,
                  homes.homeinformation.sleeping[room][key]
                );
              } else return "";
            })}
          </div>
        </div>
      );
    } else if (room.indexOf("bedroom") === 0) {
      return (
        <div key={room} className="home-overview-sleeping-item">
          {room.slice(-1) <= homes.homeinformation.bedrooms ? (
            <div>
              <i className="fas fa-bed fa-3x" />
              <div className="home-overview-sleeping-title">
                Bedroom {room.slice(-1)}:
              </div>
            </div>
          ) : (
            ""
          )}
          {Object.keys(homes.homeinformation.sleeping[room]).map(key => {
            if (homes.homeinformation.sleeping[room][key] > 0) {
              return renderBeds(key, homes.homeinformation.sleeping[room][key]);
            } else return "";
          })}
        </div>
      );
    }
  }

  function renderBeds(beds, number) {
    let bedName = "";
    if (beds === "airmattress") {
      bedName = "air mattress";
    } else {
      bedName = beds;
    }
    return (
      <div key={beds}>
        {number} {bedName} {number === 1 ? "bed" : "beds"}
      </div>
    );
  }

  return (
    <div className="home-overview">
      <div className="home-overview-header">
        <span className="home-overview-header left">
          <div className="home-overview-title">
            <h1>{homes.homeinformation.title}</h1>
          </div>
          <div className="home-overview-subtitle">
            {homes.homeinformation.boundary} · {homes.homelocation.city}
          </div>
          <div className="home-overview-iconpreview">
            <i className="fas fa-users" />
            <span className="home-overview-iconpreview-item">
              {homes.homeinformation.guestlimit +
                (homes.homeinformation.guestlimit === 1 ? " guest" : " guests")}
            </span>
            <i className="far fa-square" />
            <span className="home-overview-iconpreview-item">
              {calcBedrooms(homes.homeinformation.bedrooms)}
            </span>
            <i className="fas fa-bed" />
            <span className="home-overview-iconpreview-item">
              {homes.homeinformation.bedrooms + " bed"}
            </span>
            <i className="fas fa-bath" />
            <span className="home-overview-iconpreview-item">
              {homes.homeinformation.bathrooms + " bath"}
            </span>
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
        <h4>The space</h4>
        <div className="home-overview-body-space">
          {homes.homeinformation.homespace}
        </div>
        <h4>Guest access</h4>
        <div className="home-overview-body-access">
          {homes.homeinformation.guestaccess}
        </div>
        <h4>Interaction with guests</h4>
        <div className="home-overview-body-interaction">
          {homes.homeinformation.interaction}
        </div>
        <h4>Other things to note</h4>
        <div className="home-overview-body-notes">
          {homes.homeinformation.othernotes}
        </div>
        <a href={`/users/${homes.hostid}`}>
          <Button
            btnType="button"
            btnText="Contact host"
            btnClass="linkbutton padding"
          />
        </a>
      </div>
      <div className="divider" />

      <h4>Amenities</h4>
      <div className="home-overview-amenities">
        <div className="home-overview-amenities-left">
          <IconItem
            text="Elevator"
            iconName="fas fa-address-book"
            item={homes.homeinformation.amenities.elevator}
          />
          <IconItem
            text="Pets allowed"
            iconName="fas fa-paw"
            item={homes.homeinformation.amenities.pets}
          />
          <IconItem
            text="Family/kid friendly"
            iconName="fas fa-user"
            item={homes.homeinformation.amenities.kids}
          />
          <IconItem
            text="Suitable for events"
            iconName="fas fa-heart"
            item={homes.homeinformation.amenities.events}
          />
          <IconItem
            text="Breakfast"
            iconName="fab fa-apple"
            item={homes.homeinformation.amenities.breakfast}
          />
          <IconItem
            text="Kitchen"
            iconName="fas fa-utensils"
            item={homes.homeinformation.amenities.kitchen}
          />
          <IconItem
            text="Smoking allowed"
            iconName="fas fa-check"
            item={homes.homeinformation.amenities.smoking}
          />
          <IconItem
            text="Buzzer/wireless intercom"
            iconName="fas fa-spinner"
            item={homes.homeinformation.amenities.intercom}
          />
          <IconItem
            text="Wireless Internet"
            iconName="fas fa-wifi"
            item={homes.homeinformation.amenities.internet}
          />
          <IconItem
            text="Wheelchair accessible"
            iconName="fas fa-wheelchair"
            item={homes.homeinformation.amenities.wheelchair}
          />
          <IconItem
            text="Free parking on premises"
            iconName="fas fa-car"
            item={homes.homeinformation.amenities.parking}
          />
          <IconItem
            text="Pool"
            iconName="far fa-sun"
            item={homes.homeinformation.amenities.pool}
          />
          <IconItem
            text="Hot tub"
            iconName="fas fa-fire"
            item={homes.homeinformation.amenities.hottub}
          />
          <IconItem
            text="Gym"
            iconName="fas fa-building"
            item={homes.homeinformation.amenities.gym}
          />
          <IconItem
            text="Laptop friendly workspace"
            iconName="fas fa-laptop"
            item={homes.homeinformation.amenities.laptop}
          />
          <IconItem
            text="Air conditioning"
            iconName="far fa-snowflake"
            item={homes.homeinformation.amenities.ac}
          />
        </div>
        <div className="home-overview-amenities-right">
          <IconItem
            text="Cable TV"
            iconName="fas fa-tv"
            item={homes.homeinformation.amenities.cable}
          />
          <IconItem
            text="Hangers"
            iconName="fas fa-unlink"
            item={homes.homeinformation.amenities.hangers}
          />
          <IconItem
            text="Indoor Fireplace"
            iconName="fas fa-fire"
            item={homes.homeinformation.amenities.fireplace}
          />
          <IconItem
            text="Essentials"
            iconName="fas fa-suitcase"
            item={homes.homeinformation.amenities.essentials}
          />
          <IconItem
            text="Iron"
            iconName="fas fa-location-arrow"
            item={homes.homeinformation.amenities.iron}
          />
          <IconItem
            text="Dryer"
            iconName="fas fa-globe"
            item={homes.homeinformation.amenities.dryer}
          />
          <IconItem
            text="Washer"
            iconName="fab fa-dashcube"
            item={homes.homeinformation.amenities.washer}
          />
          <IconItem
            text="TV"
            iconName="fas fa-tv"
            item={homes.homeinformation.amenities.tv}
          />
          <IconItem
            text="Hair dryer"
            iconName="fas fa-bullhorn"
            item={homes.homeinformation.amenities.hairdryer}
          />
          <IconItem
            text="Shampoo"
            iconName="fas fa-columns"
            item={homes.homeinformation.amenities.shampoo}
          />
          <IconItem
            text="Heating"
            iconName="fas fa-fire"
            item={homes.homeinformation.amenities.heating}
          />
          <IconItem
            text="Paid parking off premises"
            iconName="fas fa-car"
            item={homes.homeinformation.amenities.paidparking}
          />
          <IconItem
            text="Free parking on street"
            iconName="fas fa-car"
            item={homes.homeinformation.amenities.streetparking}
          />
          <IconItem
            text="Private entrance"
            iconName="fas fa-street-view"
            item={homes.homeinformation.amenities.privent}
          />
          <IconItem
            text="Ethernet connection"
            iconName="fas fa-laptop"
            item={homes.homeinformation.amenities.ethernet}
          />
          <IconItem
            text="Doorman"
            iconName="fas fa-male"
            item={homes.homeinformation.amenities.doorman}
          />
        </div>
      </div>
      <h4>Family amenities</h4>
      <div className="home-overview-amenities">
        <div className="home-overview-amenities-left">
          <IconItem
            text="Baby bath"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.babybath}
          />
          <IconItem
            text="Baby monitor"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.babymonitor}
          />
          <IconItem
            text="Babysitter recommendations"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.babysitter}
          />
          <IconItem
            text="Changing table"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.changingtable}
          />
          <IconItem
            text="Children's books and toys"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.toys}
          />
          <IconItem
            text="Children's dinnerware"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.dinnerware}
          />
          <IconItem
            text="Crib"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.crib}
          />
          <IconItem
            text="Fireplace guards"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.fireplaceguards}
          />
        </div>
        <div className="home-overview-amenities-right">
          <IconItem
            text="Game console"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.gameconsole}
          />
          <IconItem
            text="High chair"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.highchair}
          />
          <IconItem
            text="Outlet covers"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.outletcovers}
          />
          <IconItem
            text="Pack 'n Play/travel crib"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.packnplay}
          />
          <IconItem
            text="Room darkening shades"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.shades}
          />
          <IconItem
            text="Stair gates"
            iconName="far fa-circler"
            item={homes.homeinformation.familyamenities.stairgate}
          />
          <IconItem
            text="Table corner guards"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.tablecorners}
          />
          <IconItem
            text="Window guards"
            iconName="far fa-circle"
            item={homes.homeinformation.familyamenities.windowguards}
          />
        </div>
      </div>
      <div className="divider" />

      <h4>Pricing</h4>
      <div className="home-overview-pricing">
        {homes.homeinformation.price.extra ? (
          <div className="home-overview-pricing-item">
            <span>Extra people </span>
            <span className="bold-text">
              {"$" +
                homes.homeinformation.price.extra +
                " / night after " +
                homes.homeinformation.price.extraminguest +
                (homes.homeinformation.price.extraminguest === 1
                  ? " guest"
                  : " guests")}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="home-overview-pricing-item">
          <span>Cleaning Fee </span>
          <span className="bold-text">
            {"$" + homes.homeinformation.price.cleaning}
          </span>
        </div>
        <div className="home-overview-pricing-disclaimer">
          <div className="home-overview-pricing-disclaimer-header bold-text">
            Always communicate through Bearbnb
          </div>
          <div className="home-overview-pricing-disclaimer-subheader">
            To protect your payment, never transfer money or communicate outside
            of the Airbnb website or app.
          </div>
          <a>
            <Button
              btnType="button"
              btnText="Learn More"
              btnClass="linkbutton"
            />
          </a>
        </div>
      </div>
      <div className="divider" />

      <h4>Sleeping arrangements</h4>
      <div className="home-overview-sleeping">
        {Object.keys(homes.homeinformation.sleeping).map(key => {
          return renderRooms(key);
        })}
      </div>
      <div className="divider" />

      <h4>House Rules</h4>
      <div className="home-overview-rules">
        <div className="home-overview-rules-item">
          {homes.homeinformation.rules.smoking
            ? "Smoking allowed"
            : "No smoking"}
        </div>
        <div className="home-overview-rules-item">
          {homes.homeinformation.rules.pets
            ? "Pets allowed"
            : "Not suitable for pets"}
        </div>
        <div className="home-overview-rules-item">
          {homes.homeinformation.rules.events
            ? "Events allowed"
            : "No parties or events"}
        </div>
        <div className="home-overview-rules-item">
          {"Check-in is anytime after " + homes.homeinformation.rules.checkin}
        </div>
        <div className="home-overview-rules-item">
          {"Check-out by " + homes.homeinformation.rules.checkout}
        </div>
        <div className="home-overview-rules-item">
          {homes.homeinformation.rules.selfcheckin
            ? "Self check-in with lockbox"
            : "No self check-in"}
        </div>
        {homes.homeinformation.rules.comments ? (
          <div className="home-overview-rules-item">
            <div className="small-divider" />
            {homes.homeinformation.rules.comments}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="divider" />

      <h4>Cancellations</h4>
      <div className="home-overview-cancellations">
        <div className="home-overview-cancellations-item">
          {capitalizeFirstLetter(homes.homeinformation.cancellation)}
        </div>
        {/* Insert Cancellation policy wording */}
        Policy:
      </div>
      <div className="divider" />

      <h4>Safety Features</h4>
      <div className="home-overview-safety">
        <div
          className={
            homes.homeinformation.safetyfeatures.smoke
              ? "home-overview-safety-item"
              : " home-overview-safety-item crossout"
          }
        >
          Smoke detector
        </div>
        <div
          className={
            homes.homeinformation.safetyfeatures.fire
              ? "home-overview-safety-item"
              : " home-overview-safety-item crossout"
          }
        >
          Fire extinguisher
        </div>
        <div
          className={
            homes.homeinformation.safetyfeatures.firstaid
              ? "home-overview-safety-item"
              : " home-overview-safety-item crossout"
          }
        >
          First aid kit
        </div>
      </div>
      <div className="divider" />

      <h4>Availability</h4>
      <div className="home-overview-availability">
        <span className="bold-text">
          {homes.homeinformation.minimumstay +
            (homes.homeinformation.minimumstay === 1 ? " night " : " nights ")}
        </span>
        <span>minimum stay</span>
      </div>
    </div>
  );
};

export default HomeOverview;

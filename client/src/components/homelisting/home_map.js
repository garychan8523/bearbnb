import React from "react";
import Map from "./map";

const HomeMap = props => {
  const coords = {
    lat: props.homes.homelocation.lat,
    lng: props.homes.homelocation.lng
  };

  return (
    <div className="home-map">
      <div className="descriptionBox">
        <h4 className="descriptionBox__neighborhood">The neighborhood</h4>
        <div className="descriptionBox__location">
          {props.profile.firstName}'s home is located in{" "}
          {props.homes.homelocation.city}, {props.homes.homelocation.state}
        </div>
        <div className="descriptionBox__description">
          {props.homes.homeinformation.description}
        </div>
      </div>
      <div className="googleMap">
        <Map coords={coords} />
      </div>
      <span className="locationAside">
        Exact location information is provided after a booking is confirmed.
      </span>
    </div>
  );
};

export default HomeMap;

import React, { Component } from "react";

let map, popup, Popup;
let markersArray = [];

class MapB extends Component {
  findCenter() {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: this.props.query.query
      },
      (response, status) => {
        if (status === "OK") {
          let bounds = null;
          if (response[0].types.includes("political")) {
            bounds = response[0].geometry.bounds;
            map.fitBounds(bounds);
          } else {
            map.setCenter(response[0].geometry.location);
            bounds = map.getBounds();
          }
          if (map.getZoom() < 11) {
            map.setZoom(map.getZoom() + 2);
          }
          this.props.setBounds(bounds, null, response[0].address_components);
        }
      }
    );
  }
  componentDidMount() {
    if (window.google) {
      definePopupClass();
      map = new window.google.maps.Map(this.refs.map, {
        center: { lat: 0, lng: 0 },
        zoom: 11,
        minZoom: 2,
        maxZoom: 18,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.TOP_LEFT
        }
      });
      this.findCenter();
      map.addListener("dragend", () => {
        this.props.setBounds(map.getBounds());
      });
      map.addListener("zoom_changed", () => {
        this.props.setBounds(map.getBounds());
      });
      let moveFlag = 0;
      this.refs.map.addEventListener(
        "mousedown",
        e => {
          moveFlag = 0;
        },
        false
      );
      this.refs.map.addEventListener(
        "mousemove",
        e => {
          moveFlag = 1;
        },
        false
      );
      this.refs.map.addEventListener(
        "mouseup",
        e => {
          if (moveFlag === 0 && e.target.nodeName === "DIV" && popup) {
            popup.hide();
            this.props.setNewPopup("empty");
          }
        },
        false
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    markersArray.forEach(marker => {
      marker.setMap(null);
    });
    markersArray = [];
    const icon = {
      path:
        "M19.4,20.6l-2.9,4l-3.2-4H2.1c-1.1,0-2-0.9-2-2V2.1c0-1.1,0.9-2,2-2h28.6c1.1,0,2,0.9,2,2v16.5c0,1.1-0.9,2-2,2H19.4z",
      labelOrigin: new window.google.maps.Point(16, 11),
      anchor: new window.google.maps.Point(20, 15),
      fillColor: "white",
      fillOpacity: 1,
      scale: 1.5,
      strokeColor: "#ccc",
      strokeWeight: 1
    };
    nextProps.data.forEach((home, index) => {
      if (nextProps.activePopup !== home) {
        let homeCoordinates = {
          lat: home.homelocation.lat,
          lng: home.homelocation.lng
        };
        let newMarker = new window.google.maps.Marker({
          position: homeCoordinates,
          label: {
            fontWeight: "700",
            fontSize: "16px",
            text: "$" + home.homeinformation.price.weekday
          },
          icon: icon,
          map: map,
          zIndex: index + 2
        });
        newMarker.setValues({
          id: home._id,
          index: index,
          price: home.homeinformation.price.weekday
        });
        newMarker.addListener("click", () => {
          popup = new Popup(
            new window.google.maps.LatLng(
              homeCoordinates.lat,
              homeCoordinates.lng
            ),
            document.getElementsByClassName("popupListing")[0]
          );
          popup.setMap(map);
          popup.cleanup();
          map.panTo(newMarker.getPosition());
          this.props.setNewPopup(home);
        });
        markersArray.push(newMarker);
      }
    });
    this.props.receiveMarkers(markersArray);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query.query !== this.props.query.query) {
      this.findCenter();
    }
  }
  render() {
    const mapStyle = {
      width: "100%",
      height: "100%"
    };
    return (
      <div ref="map" className="searchMapMap" style={mapStyle}>
        I should be a map!
      </div>
    );
  }
}

export default MapB;

function definePopupClass() {
  Popup = function(position, content) {
    this.position = position;

    content.classList.add("popup-bubble-content");

    var pixelOffset = document.createElement("div");
    pixelOffset.classList.add("popup-bubble-anchor");
    pixelOffset.appendChild(content);

    this.anchor = document.createElement("div");
    this.anchor.classList.add("popup-tip-anchor");
    this.anchor.appendChild(pixelOffset);

    this.stopEventPropagation();
  };
  Popup.prototype = Object.create(window.google.maps.OverlayView.prototype);
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.anchor);
  };
  Popup.prototype.onRemove = function() {
    if (this.anchor.parentElement) {
      this.anchor.parentElement.removeChild(this.anchor);
    }
  };
  Popup.prototype.hide = function() {
    if (this.anchor) {
      this.anchor.style.display = "none";
    }
  };
  Popup.prototype.cleanup = function() {
    let dirt = document.getElementsByClassName("popup-tip-anchor");
    while (dirt.length > 0) {
      dirt[0].remove();
    }
  };
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    this.anchor.style.left = divPosition.x + "px";
    this.anchor.style.top = divPosition.y + "px";
  };
  Popup.prototype.stopEventPropagation = function() {
    var anchor = this.anchor;
    anchor.style.cursor = "auto";

    [
      "click",
      "dblclick",
      "contextmenu",
      "wheel",
      "mousedown",
      "touchstart",
      "pointerdown"
    ].forEach(function(event) {
      anchor.addEventListener(event, function(e) {
        if (
          event !== "click" ||
          !e.target.classList.contains("slideshowArrow")
        ) {
          e.stopPropagation();
        }
      });
    });
  };
}

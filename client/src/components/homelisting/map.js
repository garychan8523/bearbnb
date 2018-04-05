import React, { Component } from "react";

class Map extends Component {
  componentDidMount() {
    if (window.google) {
      this.map = new window.google.maps.Map(this.refs.map, {
        center: this.props.coords,
        zoom: 14,
        minZoom: 2,
        maxZoom: 16,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.TOP_RIGHT
        }
      });

      this.mapCircle = new window.google.maps.Circle({
        fillColor: "lightseagreen",
        fillOpacity: 0.4,
        strokeColor: "lightseagreen",
        strokeWeight: 1,
        map: this.map,
        center: this.props.coords,
        radius: 1000
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.coords !== nextProps.coords) {
      this.map.setCenter(nextProps.coords);
      this.map.setZoom(14);
      this.mapCircle.setCenter(nextProps.coords);
    }
  }
  render() {
    const mapStyle = {
      width: "100%",
      height: "100%"
    };
    return (
      <div ref="map" style={mapStyle}>
        I should be a map!
      </div>
    );
  }
}

export default Map;

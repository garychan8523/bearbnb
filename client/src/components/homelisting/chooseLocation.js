import React, { Component } from "react";

class ChooseLocation extends Component {
  componentDidMount() {
    console.log(this.refs.map);
    console.log(this.props.coords);
      var map = new window.google.maps.Map(this.refs.map, {
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
      var marker = new window.google.maps.Marker({
        position: this.props.coords,
        map: map
      });

      map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
      });

      function placeMarker(latLng, map){
        marker.setMap(null);
        var lat =latLng.lat();
        var lng =  latLng.lng();
        console.log(map);
        marker = new window.google.maps.Marker({
          position: latLng,
          map: map
        });
        map.panTo(latLng);
        var coord = lat + "," + lng;
        const el = document.createElement('textarea');
        el.value = coord;
        document.body.appendChild(el);
        el.select();
        document.execCommand("Copy");
      }

  }


  componentWillReceiveProps(nextProps) {
    if (this.props.coords !== nextProps.coords) {
      console.log("pass");
      this.map.setCenter(nextProps.coords);
      this.map.setZoom(14);
    }
  }
  render() {
    const mapStyle = {
      width: "400px",
      height: "400px"
    };
    return (
      <div>
      <h3>Select Location</h3>
      <div ref="map" style={mapStyle} ref="map">
        I should be a map!
      </div>
      </div>
    );

  }
}

export default ChooseLocation;

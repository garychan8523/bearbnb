import React from "react";
import Button from "../../common/button";

const Album = props => {
  const image = props.featImage;
  let background = {
    background: `url(${require(`../../stylesheets/assets/homeimages/${image}`)})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  return (
    <div
      onClick={props.handleClick.bind(this, true)}
      className="listingAlbum"
      style={background}
    >
      <Button
        onClick={props.handleClick.bind(this, true)}
        btnType="button"
        btnClass="grey-outline"
        btnText="View Photos"
      />
    </div>
  );
};

export default Album;

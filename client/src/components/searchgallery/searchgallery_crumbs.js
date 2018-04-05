import React from "react";
import { Link } from "react-router-dom";

const SearchGalleryCrumbs = props => {
  let crumbLinks = [];
  props.crumbs
    .slice()
    .reverse()
    .forEach((crumb, index) => {
      if (
        crumb.types[0] === "locality" ||
        crumb.types[0] === "administrative_area_level_1" ||
        crumb.types[0] === "country"
      ) {
        if (crumbLinks.length > 0) {
          crumbLinks.push(<span key={"crumbSpan" + index}> > </span>);
        }
        crumbLinks.push(
          <Link
            to={"/search?query=" + crumb.long_name}
            key={"crumb" + index}
            className="crumb"
          >
            {crumb.long_name}
          </Link>
        );
      }
    });
  return <div>{crumbLinks}</div>;
};

export default SearchGalleryCrumbs;

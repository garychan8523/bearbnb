import React from "react";
import Listing from "../../common/listing";

const SearchGalleryResults = props => {
  let searchResults = [];
  function handleMouseEnter(id) {
    props.handleMouseEnter(id);
  }
  function handleMouseLeave(id) {
    props.handleMouseLeave(id);
  }
  Object.keys(props.data).map(listing => {
    return searchResults.push(
      <Listing
        key={"result" + listing}
        listingData={props.data[listing]}
        type={props.type}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    );
  });
  let results = (
    <div>
      <div className="search-gallery-results__body">{searchResults}</div>
    </div>
  );
  let noResults = (
    <div className="search-gallery-noresults__container">
      <h1 className="search-gallery-noresults__container--header">
        No results
      </h1>
      <span>Try adjusting your search. Here are some ideas:</span>
      <ul className="search-gallery-noresults__container--list">
        <li>Change your filters or dates</li>
        <li>Zoom out on the map</li>
        <li>Search for a specific city, address, or landmark</li>
      </ul>
      <button
        type="button"
        className="search-gallery-noresults__container--button" 
        onClick={props.handleClearFilters}
      >
        Remove all filters
      </button>
    </div>
  );
  let display = searchResults.length === 0 ? noResults : results;
  return <div>{display}</div>;
};

export default SearchGalleryResults;

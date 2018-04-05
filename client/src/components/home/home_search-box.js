import React from "react";

const SearchBox = props => {
  function formHandler(e) {
    e.preventDefault();
    const data = document.getElementById("searchbox").value;
    const history = props.history;
    history.push("/search?query=" + data);
  }
  return (
    <div className="searchboxContainer">
      <div className="searchbox">
        <div className="searchbox-banner-container">
          <div className="searchbox-banner">
            <span className="searchbox-banner__airbnb">Bearbnb</span>
            <br />
            <span className="searchbox-banner__subtitle">
              Book unique homes and experience a city like a local.
            </span>
          </div>
        </div>
        <div className="searchbox-search">
          <form className="searchbox-search-form" onSubmit={formHandler}>
            <svg
              className="searchbox-search__magnifying"
              viewBox="0 0 20.48 20.67"
            >
              <path
                d="M18.74,9.75a8.4,8.4,0,1,1-8.4-8.4A8.36,8.36,0,0,1,18.74,9.75Z"
                transform="translate(-1.44 -0.85)"
              />
              <line x1="20.12" y1="20.32" x2="14.85" y2="14.83" />
            </svg>
            <input
              type="text"
              id="searchbox"
              className="searchbox-search__input"
              placeholder="Try &quot;Dallas or Seattle&quot;"
            />
            <button className="searchbox-search__button">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

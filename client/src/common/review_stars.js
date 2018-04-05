import React from "react";

const ReviewStars = props => {
  function wholeStar(passedKey, type) {
    const wholeStar = (
      <span className="stars__starContainer" key={passedKey}>
        <svg className={type} viewBox="0 0 8.5 8.5">
          <polygon points="4.25 0 5.56 2.8 8.5 3.25 6.38 5.42 6.88 8.5 4.25 7.05 1.62 8.5 2.13 5.42 0 3.25 2.94 2.8 4.25 0" />
        </svg>
      </span>
    );
    return wholeStar;
  }

  function halfStar(passedKey) {
    const halfStar = (
      <span className="stars__starContainer" key={passedKey}>
        <svg className="stars__star" viewBox="0 0 8.5 8.5">
          <polygon
            className="stars__star--halfA"
            points="4.25 0 5.56 2.8 8.5 3.25 6.38 5.42 6.88 8.5 4.25 7.05 4.25 0"
          />
          <polygon
            className="stars__star--halfB"
            points="4.25 0 2.94 2.8 0 3.25 2.13 5.42 1.62 8.5 4.25 7.05 4.25 0"
          />
        </svg>
      </span>
    );
    return halfStar;
  }

  let starCollection = [];
  for (let i = 0; i < 5; i++) {
    let key = props.overview_id + i.toString();
    if (i + 1 <= props.avg_review) {
      starCollection.push(wholeStar(key, "stars__star stars__star--full"));
    } else if (i + 1 > props.avg_review && i < props.avg_review) {
      starCollection.push(halfStar(key));
    } else {
      starCollection.push(wholeStar(key, "stars__star stars__star--empty"));
    }
  }

  return (
    <span className="reviewStars">
      <span className="stars" role="img">
        {starCollection}
      </span>
      <span className="reviewCount">{props.review_count}</span>
    </span>
  );
};

export default ReviewStars;

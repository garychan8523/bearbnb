import React from "react";

const ReviewStars = props => {
  let starCollection = [];
  for (let i = 0; i < 5; i++) {
    let key = props.overview_id + i.toString();
    if (i + 1 <= props.reviewCount) {
      starCollection.push(
        <i key={key} className={`fas fa-star fa-${props.size}x`} />
      );
    } else if (i + 1 > props.reviewCount && i < props.reviewCount) {
      starCollection.push(
        <i key={key} className={`fas fa-star-half fa-${props.size}x`} />
      );
    } else {
      starCollection.push(
        <i key={key} className={`far fa-star fa-${props.size}x`} />
      );
    }
  }

  return <span className="large-stars">{starCollection}</span>;
};

export default ReviewStars;

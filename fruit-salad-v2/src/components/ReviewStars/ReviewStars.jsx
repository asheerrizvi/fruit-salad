import React from "react";
import getStarIcon from "../../utils/getStarIcon";

// Component for rendering a list of stars denoting a review rating.
function ReviewStars({ rating }) {
  return [...Array(5).keys()].map((starIndex, index) => {
    return (
      <img
        key={index}
        src={getStarIcon(starIndex, rating)}
        className="star"
        alt="Star"
      />
    );
  });
}

export default ReviewStars;

import React from "react";
import getStarIcon from "../../utils/getStarIcon";

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

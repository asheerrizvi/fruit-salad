import React from "react";
import filledStarIcon from "../../img/filled-star.svg";
import unfilledStarIcon from "../../img/unfilled-star.svg";

function ReviewStars({ rating }) {
  return [...Array(5).keys()].map((starIndex, index) => (
    <img
      key={index}
      src={starIndex + 1 <= rating ? filledStarIcon : unfilledStarIcon}
      className="star"
      alt="Star"
    />
  ));
}

export default ReviewStars;

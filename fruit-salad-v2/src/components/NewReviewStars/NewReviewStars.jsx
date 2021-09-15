import React from "react";
import filledStarIcon from "../../img/filled-star.svg";
import unfilledStarIcon from "../../img/unfilled-star.svg";
import "./NewReviewStars.css";

function NewReviewStars({ handleStarClick, rating }) {
  return (
    <div id="review-modal-stars">
      {[...Array(5).keys()].map((starIndex, index) => (
        <button
          key={index}
          className="star-button"
          onClick={(e) => handleStarClick(e, index)}
        >
          <img
            key={index}
            src={starIndex <= rating ? filledStarIcon : unfilledStarIcon}
            className="star"
            alt="Star"
          />
        </button>
      ))}
    </div>
  );
}

export default NewReviewStars;

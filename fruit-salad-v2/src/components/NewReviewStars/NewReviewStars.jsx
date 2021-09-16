import React, { useEffect, useState } from "react";
import filledStarIcon from "../../img/filled-star.svg";
import halfStarIcon from "../../img/halffilled-star.svg";
import unfilledStarIcon from "../../img/unfilled-star.svg";
import "./NewReviewStars.css";

function NewReviewStars({ handleReviewRatingChange }) {
  const [rating, setRating] = useState(0);
  const [starIcons, setStarIcons] = useState(null);
  const [tempStarIcons, setTempStarIcons] = useState(null);

  useEffect(() => {
    setTempStarIcons([...new Array(5)].map(() => unfilledStarIcon));

    if (rating === 0) {
      setStarIcons([...new Array(5)].map(() => unfilledStarIcon));
    } else {
      const ratingCeil = Math.ceil(rating);
      const ratingFloor = Math.floor(rating);
      const ceilEqualsFloor = ratingCeil === ratingFloor;

      const updatedStarIcons = starIcons.map((icon, index) => {
        if (ceilEqualsFloor) {
          return index < ratingCeil ? filledStarIcon : unfilledStarIcon;
        }

        if (!ceilEqualsFloor) {
          return index < ratingFloor
            ? filledStarIcon
            : index === ratingFloor
            ? halfStarIcon
            : unfilledStarIcon;
        }
      });
      setStarIcons(updatedStarIcons);
      setTempStarIcons(updatedStarIcons);
    }
  }, [rating]);

  function resetTempStarIcons() {
    setTempStarIcons(starIcons);
  }

  function handleHalfStarClick(index) {
    const updatedRating = index + 0.5;
    setRating(updatedRating);
    handleReviewRatingChange(updatedRating);
  }

  function handleHalfStarMouseOver(index) {
    const updatedStarIcons = tempStarIcons.map((icon, iconIndex) => {
      if (iconIndex < index) {
        return filledStarIcon;
      } else if (iconIndex === index) {
        return halfStarIcon;
      } else {
        return unfilledStarIcon;
      }
    });
    setTempStarIcons(updatedStarIcons);
  }

  function handleFullStarClick(index) {
    const updatedRating = index + 1;
    setRating(updatedRating);
    handleReviewRatingChange(updatedRating);
  }

  function handleFullStarMouseOver(index) {
    const updatedStarIcons = tempStarIcons.map((icon, iconIndex) => {
      if (iconIndex <= index) {
        return filledStarIcon;
      } else {
        return unfilledStarIcon;
      }
    });
    setTempStarIcons(updatedStarIcons);
  }

  if (!starIcons) return null;
  return (
    <div id="review-modal-stars" onMouseOut={resetTempStarIcons}>
      {[...Array(5).keys()].map((starIndex, index) => (
        <div className="review__star" key={index}>
          <img src={tempStarIcons[index]} className="star" alt="Star" />
          <button
            className="review__star-button review__star-half"
            onClick={() => handleHalfStarClick(index)}
            onMouseOver={() => handleHalfStarMouseOver(index)}
          ></button>
          <button
            className="review__star-button review__star-full"
            onClick={() => handleFullStarClick(index)}
            onMouseOver={() => handleFullStarMouseOver(index)}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default NewReviewStars;

import React, { useEffect, useState } from "react";
import filledStarIcon from "../../img/filled-star.svg";
import halfStarIcon from "../../img/halffilled-star.svg";
import unfilledStarIcon from "../../img/unfilled-star.svg";
import "./NewReviewStars.css";

// A component for specifying a review rating through
// the add new review modal.
function NewReviewStars({ handleReviewRatingChange }) {
  // rating: Determines what star the user clicked on
  // this is the rating which the user is giving to a particular product.
  // ====================================================================
  // starIcons: Determines what star icons to show depending,
  // on the rating state variable.
  // ====================================================================
  // tempStarIcons: Shows temporary star icons on top of starIcons when
  // a user is hovering over the list of star icons.
  const [rating, setRating] = useState(0);
  const [starIcons, setStarIcons] = useState(null);
  const [tempStarIcons, setTempStarIcons] = useState(null);

  // This effect changes the starIcons and tempStarIcons depending on
  // the change in rating.
  useEffect(() => {
    setTempStarIcons([...new Array(5)].map(() => unfilledStarIcon));

    if (rating === 0) {
      setStarIcons([...new Array(5)].map(() => unfilledStarIcon));
    } else {
      const ratingCeil = Math.ceil(rating);
      const ratingFloor = Math.floor(rating);
      // If the floor and the ceil of rating is equal,
      // that means that the rating is non decimal.
      const ceilEqualsFloor = ratingCeil === ratingFloor;

      const updatedStarIcons = starIcons.map((icon, index) => {
        if (ceilEqualsFloor) {
          return index < ratingCeil ? filledStarIcon : unfilledStarIcon;
        }

        // The floor of the rating determines the index at which halfStarIcon
        // needs to be shown, the indexes below it are filled and the ones
        // above it are unfilled.
        if (!ceilEqualsFloor) {
          return index < ratingFloor
            ? filledStarIcon
            : index === ratingFloor
            ? halfStarIcon
            : unfilledStarIcon;
        }
      });
      // Updates starIcons and tempStarIcons state variables.
      setStarIcons(updatedStarIcons);
      setTempStarIcons(updatedStarIcons);
    }
  }, [rating]);

  // Resets the tempStarIcons state variable on hover out.
  function resetTempStarIcons() {
    setTempStarIcons(starIcons);
  }

  // Handles half star rating clicks.
  function handleHalfStarClick(index) {
    const updatedRating = index + 0.5;
    setRating(updatedRating);
    handleReviewRatingChange(updatedRating);
  }

  // Renders full star icons from 0 to index - 1,
  // shows a half star at index and unfilled stars from
  // index + 1 to the end.
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

  // Handles full star rating clicks.
  function handleFullStarClick(index) {
    const updatedRating = index + 1;
    setRating(updatedRating);
    handleReviewRatingChange(updatedRating);
  }

  // Renders full star icons from 0 to index,
  // and unfilled stars from index + 1 to the end.
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

import filledStarIcon from "../img/filled-star.svg";
import halfStarIcon from "../img/halffilled-star.svg";
import unfilledStarIcon from "../img/unfilled-star.svg";

// From the index and rating, find the star which needs to be
// displayed at each position.
export default function getStarIcon(index, rating) {
  const starPosition = index + 1;
  const starPositionMinusRating = (starPosition - rating).toFixed(1);

  if (
    starPosition <= rating ||
    (starPositionMinusRating < 0.5 && starPositionMinusRating >= 0.1)
  ) {
    return filledStarIcon;
  }

  if (starPositionMinusRating >= 0.5 && starPositionMinusRating <= 0.9) {
    return halfStarIcon;
  }

  return unfilledStarIcon;
}

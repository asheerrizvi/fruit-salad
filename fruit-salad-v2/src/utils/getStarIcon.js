import filledStarIcon from "../img/filled-star.svg";
import halfStarIcon from "../img/halffilled-star.svg";
import unfilledStarIcon from "../img/unfilled-star.svg";

export default function getStarIcon(index, rating) {
  const starPosition = index + 1;

  if (starPosition <= rating) {
    return filledStarIcon;
  }

  if (starPosition - rating >= 0.5 && starPosition - rating <= 0.9) {
    return halfStarIcon;
  }

  if (starPosition - rating < 0.5 && starPosition - rating >= 0.1) {
    return filledStarIcon;
  }

  return unfilledStarIcon;
}

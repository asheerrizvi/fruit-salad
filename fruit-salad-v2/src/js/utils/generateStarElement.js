import filledStarIcon from "../../img/filled-star.svg";
import unfilledStarIcon from "../../img/unfilled-star.svg";

export default function generateStarElement(type) {
  const starImg = document.createElement("img");
  starImg.src = type === "filled" ? filledStarIcon : unfilledStarIcon;
  starImg.classList.add("star");
  starImg.alt = "Star";

  return starImg;
}

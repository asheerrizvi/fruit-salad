import filledStarIcon from "../img/filled-star.svg";
import unfilledStarIcon from "../img/unfilled-star.svg";

function handleModalStarClick(modalRatingStars, index) {
  modalRatingStars.forEach((star, starIndex) => {
    star.src = starIndex <= index ? filledStarIcon : unfilledStarIcon;
  });
}

function resetReviewModal() {
  const modalRatingStarsContainer =
    document.getElementById("modal-rating-stars");
  const modalRatingStars = [...modalRatingStarsContainer.children];
  const modalReviewInput = document.getElementById("modal-review-input");

  modalRatingStars.forEach((starEl) => {
    starEl.src = unfilledStarIcon;
  });
  modalReviewInput.value = "";
}

function setupReviewModal() {
  const modalRatingStarsContainer =
    document.getElementById("modal-rating-stars");
  const modalRatingStars = [...modalRatingStarsContainer.children];
  modalRatingStars.forEach((starEl, index) => {
    starEl.addEventListener("click", () =>
      handleModalStarClick(modalRatingStars, index)
    );
  });
}

export { resetReviewModal, setupReviewModal };

import MicroModal from "micromodal";
import filledStarIcon from "../img/filled-star.svg";
import unfilledStarIcon from "../img/unfilled-star.svg";
import { addReview } from "./client";
import { addReviewToReviews } from "./product";

// Shows the review modal.
function showReviewModal() {
  MicroModal.show("review-modal");
}

// Closes the review modal.
function closeReviewModal() {
  resetReviewModal();
  MicroModal.close("review-modal");
}

// Resets the review modal to it's initial state
// by resetting the rating and the review text.
function resetReviewModal() {
  const reviewStarsEl = document.getElementById("review-modal-stars");
  const reviewStars = [...reviewStarsEl.children];
  const reviewInputEl = document.getElementById("review-modal__input");

  reviewStars.forEach((starEl) => {
    starEl.src = unfilledStarIcon;
  });
  reviewInputEl.value = "";
}

// Determines the rating which the user is giving
// for a product when a star in review modal is clicked.
function handleModalStarClick(modalRatingStars, index) {
  modalRatingStars.forEach((star, starIndex) => {
    const isStarFilled = starIndex <= index;
    star.src = isStarFilled ? filledStarIcon : unfilledStarIcon;
    star.classList.add(isStarFilled ? "star-filled" : "star-unfilled");
  });
}

// Saves a new review and adds it to the reviews list.
async function handleSubmitReview() {
  const productEl = document.querySelector(".product");
  const reviewStarsEl = document.getElementById("review-modal-stars");
  const productId = productEl.id;
  const rating = reviewStarsEl.querySelectorAll(".star-filled").length;
  const reviewText = document
    .getElementById("review-modal__input")
    .value.trim();

  const review = await addReview(productId, rating, reviewText);
  addReviewToReviews(review);
  closeReviewModal();
}

// Sets up the add review modal.
function setupReviewModal() {
  const reviewStarsEl = document.getElementById("review-modal-stars");
  const submitReviewBtn = document.getElementById("review-modal-submit-btn");
  const reviewStars = [...reviewStarsEl.children];

  reviewStars.forEach((starEl, index) => {
    starEl.addEventListener("click", () =>
      handleModalStarClick(reviewStars, index)
    );
  });
  submitReviewBtn.addEventListener("click", handleSubmitReview);
}

export { setupReviewModal, showReviewModal };

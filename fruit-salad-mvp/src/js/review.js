import MicroModal from "micromodal";
import filledStarIcon from "../img/filled-star.svg";
import unfilledStarIcon from "../img/unfilled-star.svg";
import supabase from "./client";
import { generateProductReviewElement } from "./product";

function handleModalStarClick(modalRatingStars, index) {
  modalRatingStars.forEach((star, starIndex) => {
    const isStarFilled = starIndex <= index;
    star.src = isStarFilled ? filledStarIcon : unfilledStarIcon;
    star.classList.add(isStarFilled ? "star-filled" : "star-unfilled");
  });
}

function resetReviewModal() {
  const modalRatingStarsContainer =
    document.getElementById("review-modal-stars");
  const modalRatingStars = [...modalRatingStarsContainer.children];
  const modalReviewInput = document.getElementById("review-modal__input");

  modalRatingStars.forEach((starEl) => {
    starEl.src = unfilledStarIcon;
  });
  modalReviewInput.value = "";
}

async function handleReviewSubmit() {
  const productArticle = document.querySelector(".product");
  const modalRatingStarsContainer =
    document.getElementById("review-modal-stars");
  const rating =
    modalRatingStarsContainer.querySelectorAll(".star-filled").length;
  const review_text = document
    .getElementById("review-modal__input")
    .value.trim();
  const productReviewsList = productArticle.querySelector(
    ".product__all-reviews-list"
  );
  const product_id = productArticle.id;

  const { data: review, error } = await supabase
    .from("reviews")
    .insert([{ product_id, rating, review_text }]);
  productReviewsList.append(generateProductReviewElement(review[0]));
  MicroModal.close("review-modal");
}

function setupReviewModal() {
  const modalRatingStarsContainer =
    document.getElementById("review-modal-stars");
  const submitReviewButton = document.getElementById("review-modal-submit-btn");
  const modalRatingStars = [...modalRatingStarsContainer.children];

  modalRatingStars.forEach((starEl, index) => {
    starEl.addEventListener("click", () =>
      handleModalStarClick(modalRatingStars, index)
    );
  });
  submitReviewButton.addEventListener("click", handleReviewSubmit);
}

export { resetReviewModal, setupReviewModal };

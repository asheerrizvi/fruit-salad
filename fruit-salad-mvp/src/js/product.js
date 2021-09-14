import MicroModal from "micromodal";
import "../css/productRating.css";
import "../css/modalStyles.css";
import filledStarIcon from "../img/filled-star.svg";
import unfilledStarIcon from "../img/unfilled-star.svg";
import supabase from "./client";
import { resetReviewModal } from "./review";

function generateStarElement(type) {
  const starImg = document.createElement("img");
  starImg.src = type === "filled" ? filledStarIcon : unfilledStarIcon;
  starImg.classList.add("star");
  starImg.alt = "Star";

  return starImg;
}

function generateProductReviewElement(review) {
  const reviewItem = document.createElement("li");
  const reviewItemStars = document.createElement("div");
  const reviewItemRating = document.createElement("span");
  const reviewItemText = document.createElement("span");

  reviewItem.classList.add("product__all-reviews-list-item");
  reviewItemStars.classList.add("list-item-stars");
  reviewItemRating.classList.add("list-item-rating");
  reviewItemText.classList.add("list-item-text");

  [...Array(5).keys()].forEach((starIndex) => {
    const starElement =
      starIndex + 1 <= review.rating
        ? generateStarElement("filled")
        : generateStarElement("unfilled");

    reviewItemStars.append(starElement);
  });
  reviewItemRating.textContent = review.rating;
  reviewItemText.textContent = review.review_text;

  reviewItem.append(reviewItemStars);
  reviewItem.append(reviewItemRating);
  reviewItem.append(reviewItemText);

  return reviewItem;
}

function handleAddReviewBtnClick() {
  resetReviewModal();
  MicroModal.show("review-modal");
}

async function fetchProductReviews(productId) {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("rating, review_text")
    .eq("product_id", productId);

  return reviews;
}

async function showProductRating(product) {
  const productReviews = await fetchProductReviews(product.id);
  const totalProductRatings = productReviews.reduce((total, currentReview) => {
    total += currentReview.rating;
    return total;
  }, 0);
  const averageProductRating = (
    totalProductRatings / productReviews.length
  ).toFixed(1);
  const roundedAverageProductRating = Math.round(averageProductRating);

  const productArticle = document.querySelector(".product");
  const productName = productArticle.querySelector(".product__name");
  const productAvgRating = productArticle.querySelector(".product__average-rating");
  const productAvgRatingStars = productArticle.querySelector(
    ".product__average-stars"
  );
  const addReviewButton = document.getElementById("new-review-button");
  const productReviewsList = productArticle.querySelector(
    ".product__all-reviews-list"
  );

  productArticle.id = product.id;
  productName.textContent = product.product_name;
  productAvgRating.textContent = averageProductRating;

  [...Array(5).keys()].forEach((arrEl) => {
    const starElement =
      arrEl <= roundedAverageProductRating
        ? generateStarElement("filled")
        : generateStarElement("unfilled");

    productAvgRatingStars.append(starElement);
  });

  productReviews.forEach((review) => {
    productReviewsList.append(generateProductReviewElement(review));
  });

  addReviewButton.addEventListener("click", handleAddReviewBtnClick);
}

export { generateProductReviewElement, showProductRating };

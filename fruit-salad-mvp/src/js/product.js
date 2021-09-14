import { getReviews } from "./client";
import { setupReviewModal, showReviewModal } from "./review";
import generateStarElement from "./utils/generateStarElement";
import generateProductReviewElement from "./utils/generateProductReviewElement";
import calculateProductRating from "./utils/calculateProductRating";

// Shows average product rating in the form of stars.
function showAvgProductRating(roundedAvgRating) {
  const avgRatingStarsEl = document.querySelector(".product__average-stars");

  [...Array(5).keys()].forEach((starIndex) => {
    const starElement =
      starIndex <= roundedAvgRating
        ? generateStarElement("filled")
        : generateStarElement("unfilled");

    avgRatingStarsEl.append(starElement);
  });
}

// Adds a single review to reviews list.
function addReviewToReviews(review) {
  const reviewsListEl = document.querySelector(".product__all-reviews-list");
  reviewsListEl.append(generateProductReviewElement(review));
}

// Shows a list of all product reviews.
function showProductReviews(reviews) {
  reviews.forEach((review) => {
    addReviewToReviews(review);
  });
}

// Shows information about a particular product
// by showing it's average rating and reviews.
async function showProduct(product) {
  setupReviewModal();
  const { id: productId, product_name: productName } = product;
  const reviews = await getReviews(productId);
  const { avgRating, roundedAvgRating } = calculateProductRating(reviews);

  const productEl = document.querySelector(".product");
  const nameEl = productEl.querySelector(".product__name");
  const avgRatingEl = productEl.querySelector(".product__average-rating");
  const newReviewBtn = document.getElementById("new-review-button");

  productEl.id = productId;
  nameEl.textContent = productName;
  avgRatingEl.textContent = avgRating;

  showAvgProductRating(roundedAvgRating);
  showProductReviews(reviews);

  newReviewBtn.addEventListener("click", showReviewModal);
}

export { addReviewToReviews, showProduct };

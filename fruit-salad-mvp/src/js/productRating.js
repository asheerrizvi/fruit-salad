import MicroModal from "micromodal";
import "../css/productRating.css";
import "../css/modalStyles.css";
import filledStarIcon from "../img/filled-star.svg";
import unfilledStarIcon from "../img/unfilled-star.svg";
import supabase from "./client";
MicroModal.init();

function generateStar(type) {
  if (type === "filled") {
    return `<img src="${filledStarIcon}" alt="Star" class="star" />`;
  } else {
    return `<img src="${unfilledStarIcon}" alt="Star" class="star" />`;
  }
}

function generateProductReview(review) {
  return `
    <li class="product-reviews-list-item">
      <div class="list-item-stars">
        <img src="${
          1 <= review.rating ? filledStarIcon : unfilledStarIcon
        }" alt="Star" class="star" />
        <img src="${
          2 <= review.rating ? filledStarIcon : unfilledStarIcon
        }" alt="Star" class="star" />
        <img src="${
          3 <= review.rating ? filledStarIcon : unfilledStarIcon
        }" alt="Star" class="star" />
        <img src="${
          4 <= review.rating ? filledStarIcon : unfilledStarIcon
        }" alt="Star" class="star" />
        <img
          src="${5 <= review.rating ? filledStarIcon : unfilledStarIcon}"
          alt="Star"
          class="star"
        />
      </div>
      <span class="list-item-rating">${review.rating},</span>
      <span class="list-item-text">${review.review_text}</span>
    </li>
  `;
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
  const productName = productArticle.querySelector(".product-name");
  const productAvgRating = productArticle.querySelector(".average-rating");
  const productAvgRatingStars = productArticle.querySelector(
    ".average-rating-stars"
  );
  const productReviewsList = productArticle.querySelector(
    ".product-reviews-list"
  );

  productName.textContent = product.product_name;
  productAvgRating.textContent = averageProductRating;

  [...Array(5).keys()].forEach((arrEl) => {
    if (arrEl <= roundedAverageProductRating) {
      productAvgRatingStars.innerHTML += generateStar("filled");
    } else {
      productAvgRatingStars.innerHTML += generateStar("unfilled");
    }
  });

  productReviews.forEach((productReview) => {
    productReviewsList.innerHTML += generateProductReview(productReview);
  });
}

export { showProductRating };

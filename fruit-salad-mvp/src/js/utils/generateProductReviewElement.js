import generateStarElement from "./generateStarElement";

export default function generateProductReviewElement(review) {
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

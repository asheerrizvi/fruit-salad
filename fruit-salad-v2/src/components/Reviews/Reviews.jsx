import React from "react";
import ReviewStars from "../ReviewStars/ReviewStars";

// Component which renders a list of all reviews
// for a particular product.
function Reviews({ reviews }) {
  return (
    <ul className="product__all-reviews-list">
      {reviews.map((review) => {
        return (
          <li key={review.id} className="product__all-reviews-list-item">
            <div className="list-item-stars">
              <ReviewStars rating={review.rating} />
            </div>
            <span className="list-item-rating">{review.rating},</span>
            <span className="list-item-text">{review.review_text}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default Reviews;

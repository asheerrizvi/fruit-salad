import React, { useState } from "react";
import ReactModal from "react-modal";
import NewReviewStars from "../NewReviewStars/NewReviewStars";
import "./NewReviewModal.css";

// A component for adding a new review to a particular product.
function NewReviewModal({ closeReviewModal, handleSubmitReview, showModal }) {
  // State variables for new review rating and text.
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Handles the change of rating through the new review modal.
  function handleReviewRatingChange(newRating) {
    setReviewRating(newRating);
  }

  // Handles the change of text through the new review modal.
  function handleReviewTextChange(e) {
    setReviewText(e.target.value);
  }

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={closeReviewModal}
      className="modal__container"
      overlayClassName="modal__overlay"
      shouldCloseOnOverlayClick={true}
    >
      <header className="modal__header">
        <h1 id="review-modal-title">What's your rating</h1>
      </header>
      <main className="modal__content" id="review-modal-content">
        <section className="review-modal__section">
          <span className="review-modal__section-title">Rating</span>
          <NewReviewStars handleReviewRatingChange={handleReviewRatingChange} />
        </section>
        <section className="review-modal__section">
          <span className="review-modal__section-title">Review</span>
          <input
            type="text"
            id="review-modal__input"
            placeholder="Start typing..."
            value={reviewText}
            onChange={handleReviewTextChange}
          />
        </section>
        <button
          className="button button__normal"
          id="review-modal-submit-btn"
          onClick={() => handleSubmitReview(reviewRating, reviewText)}
        >
          Submit Review
        </button>
      </main>
    </ReactModal>
  );
}

export default NewReviewModal;

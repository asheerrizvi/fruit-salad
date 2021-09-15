import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Reviews from "../Reviews/Reviews";
import ReviewStars from "../ReviewStars/ReviewStars";

import { getProducts, getReviews } from "../../client";
import calculateProductRating from "../../utils/calculateProductRating";
import "./Product.css";
import "../../css/modalStyles.css";
import NewReviewStars from "../NewReviewStars/NewReviewStars";

function Product() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    async function getProductsData() {
      // Gets the list of all products.
      const products = await getProducts();

      // Choose a random product from the products array
      // and display it's rating.
      if (products) {
        const randomProduct =
          products[Math.floor(Math.random() * products.length)];
        const productReviews = await getReviews(randomProduct.id);
        const { avgRating } = calculateProductRating(productReviews);

        setProduct(randomProduct);
        setReviews(productReviews);
        setAverageRating(avgRating);
      }
    }

    getProductsData();
  }, []);

  function showReviewModal() {
    ReactModal.setAppElement("#root");
    setShowModal(true);
  }

  function closeReviewModal() {
    setShowModal(false);
  }

  function handleReviewTextChange(e) {
    const value = e.target.value.trim();
    setReviewText(value);
  }

  if (!product) return null;
  return (
    <>
      <section className="product">
        <header className="product__header">
          <h1 className="product__name">{product.product_name}</h1>
          <div className="product__info">
            <span className="product__average-rating">{averageRating}</span>
            <article className="product__add-new-review">
              <div className="product__average-stars">
                <ReviewStars rating={Math.round(averageRating)}></ReviewStars>
              </div>
              <button
                id="new-review-button"
                className="button button__normal"
                onClick={showReviewModal}
              >
                Add review
              </button>
            </article>
          </div>
        </header>
        <section className="product__all-reviews">
          <h2>Reviews</h2>
          <Reviews reviews={reviews}></Reviews>
        </section>
      </section>

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
            <NewReviewStars rating={-1} />
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
          >
            Submit Review
          </button>
        </main>
      </ReactModal>
    </>
  );
}

export default Product;

import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Reviews from "../Reviews/Reviews";
import ReviewStars from "../ReviewStars/ReviewStars";
import NewReviewModal from "../NewReviewModal/NewReviewModal";

import { supabase, addReview, getProducts, getReviews } from "../../client";
import calculateProductRating from "../../utils/calculateProductRating";
import "./Product.css";

function Product() {
  // Setup variables and state variables for subscription
  // product and reviews.
  let reviewsSubscription = null;
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);

  // This effect fetches the list of products and
  // chooses a random product from that list,
  // it then fetches the reviews for that product
  // and sets up a subscription for new review event.
  useEffect(() => {
    async function getProductsData() {
      // Gets the list of all products.
      // and choose a random product from that list.
      const products = await getProducts();
      const productObj = products[Math.floor(Math.random() * products.length)];

      await getInitialReviews(productObj.id);
      setupReviewsSubscription(productObj.id);
      setProduct(productObj);
    }

    getProductsData();

    // Removes new review subscription on unmount.
    return () => {
      supabase.removeSubscription(reviewsSubscription);
    };
  }, []);

  // State variables for average product rating and
  // new review modal visibility state.
  const [averageRating, setAverageRating] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // This hooks runs when reviews change and re-calculates
  // the average rating for the product.
  useEffect(() => {
    if (reviews) {
      const { avgRating } = calculateProductRating(reviews);
      setAverageRating(avgRating || 0.0);
    }
  }, [reviews]);

  // Handles a new review event, checks to see if the new review
  // is already present in state. If not updates the state
  // with the new review.
  function handleReviewEvent(newReview) {
    setReviews((prevReviews) => {
      const isNewReviewPresent = prevReviews.find(
        (review) => review.id === newReview.id
      );

      return isNewReviewPresent ? prevReviews : [newReview, ...prevReviews];
    });
  }

  // Sets up reviews subscription for a particular product.
  async function setupReviewsSubscription(productId) {
    if (!reviewsSubscription) {
      reviewsSubscription = supabase
        .from(`reviews:product_id=eq.${productId}`)
        .on("INSERT", (payload) => {
          handleReviewEvent(payload.new);
        })
        .subscribe();
    }
  }

  // Gets the reviews associated with a particular product.
  async function getInitialReviews(productId) {
    const productReviews = await getReviews(productId);
    setReviews(productReviews);
  }

  // Updates the reviews state with updated reviews.
  function updateReviews(updatedReviews) {
    setReviews(updatedReviews);
  }

  // Shows add new review modal.
  function showReviewModal() {
    ReactModal.setAppElement("#root");
    setShowModal(true);
  }

  // Hides add new review modal.
  function closeReviewModal() {
    setShowModal(false);
  }

  // Saves a new review to the list of product reviews,
  // and updates the local state.
  async function handleSubmitReview(reviewRating, reviewText) {
    const review = await addReview(product.id, reviewRating, reviewText);
    updateReviews([review, ...reviews]);
    closeReviewModal();
  }

  if (!product || !reviews) return "Loading...";
  return (
    <>
      <section className="product">
        <header className="product__header">
          <h1 className="product__name">{product.product_name}</h1>
          <div className="product__info">
            <span className="product__average-rating">{averageRating}</span>
            <article className="product__add-new-review">
              <div className="product__average-stars">
                <ReviewStars rating={averageRating}></ReviewStars>
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

      {showModal && (
        <NewReviewModal
          closeReviewModal={closeReviewModal}
          handleSubmitReview={handleSubmitReview}
          showModal={showModal}
        ></NewReviewModal>
      )}
    </>
  );
}

export default Product;

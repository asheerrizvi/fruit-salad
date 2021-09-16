import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Reviews from "../Reviews/Reviews";
import ReviewStars from "../ReviewStars/ReviewStars";
import NewReviewModal from "../NewReviewModal/NewReviewModal";

import { supabase, addReview, getProducts, getReviews } from "../../client";
import calculateProductRating from "../../utils/calculateProductRating";
import "./Product.css";

function Product() {
  let reviewsSubscription = null;
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    setupReviewsSubscription();

    async function getProductsData() {
      // Gets the list of all products.
      const products = await getProducts();
      const productObj = products[0];
      // const productObj =
      //   products[Math.floor(Math.random() * products.length)];

      await getInitialReviews(productObj.id);
      setProduct(productObj);
    }

    getProductsData();

    return () => {
      supabase.removeSubscription(reviewsSubscription);
    };
  }, []);

  const [averageRating, setAverageRating] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleReviewEvent(newReview) {
    setReviews((prevReviews) => {
      const isNewReviewPresent = prevReviews.find(
        (review) => review.id === newReview.id
      );

      return isNewReviewPresent ? prevReviews : [newReview, ...prevReviews];
    });
  }

  async function setupReviewsSubscription() {
    if (!reviewsSubscription) {
      reviewsSubscription = supabase
        .from("reviews")
        .on("INSERT", (payload) => {
          handleReviewEvent(payload.new);
        })
        .subscribe();
    }
  }

  async function getInitialReviews(productId) {
    const productReviews = await getReviews(productId);
    const { avgRating } = calculateProductRating(productReviews);

    setReviews(productReviews);
    setAverageRating(avgRating || 0.0);
  }

  function updateReviews(updatedReviews) {
    setReviews(updatedReviews);
  }

  function showReviewModal() {
    ReactModal.setAppElement("#root");
    setShowModal(true);
  }

  function closeReviewModal() {
    setShowModal(false);
  }

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

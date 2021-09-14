import React, { useEffect, useState } from "react";
import Reviews from "../Reviews/Reviews";
import ReviewStars from "../ReviewStars/ReviewStars";

import { getProducts, getReviews } from "../../client";
import calculateProductRating from "../../utils/calculateProductRating";
import "./Product.css";

function Product() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

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

  if (!product) return null;
  return (
    <section className="product">
      <header className="product__header">
        <h1 className="product__name">{product.product_name}</h1>
        <div className="product__info">
          <span className="product__average-rating">{averageRating}</span>
          <article className="product__add-new-review">
            <div className="product__average-stars">
              <ReviewStars rating={Math.round(averageRating)}></ReviewStars>
            </div>
            <button className="button button__normal" id="new-review-button">
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
  );
}

export default Product;

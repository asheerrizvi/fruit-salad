import { createClient } from "@supabase/supabase-js";

// Initialize the supabase client and add it as a default export.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get's a list of all products.
async function getProducts() {
  const { data: products, error } = await supabase.from("products").select("*");
  return products;
}

// Get's a list of all product reviews.
async function getReviews(productId) {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("rating, review_text")
    .eq("product_id", productId);
  return reviews;
}

// Adds a new review to a particular product.
async function addReview(productId, reviewRating, reviewText) {
  const { data: review, error } = await supabase
    .from("reviews")
    .insert([
      { product_id: productId, rating: reviewRating, review_text: reviewText },
    ]);
  return review[0];
}

export { getProducts, getReviews, addReview };

import supabase from "./src/js/client";
import { showProductRating } from "./src/js/productRating";
import "./style.css";

// Fetches an array of all products from the backend.
async function fetchProducts() {
  // Get the list of all products from the backend.
  let { data: products, error } = await supabase.from("products").select("*");

  // Choose a random product from the products array
  // and display it's rating.
  if (products) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    console.log(randomProduct);
    showProductRating(randomProduct);
  }
}

fetchProducts();

import supabase from "./src/js/initSupabase";
import { showAllProducts } from "./src/js/products";
import "./style.css";

async function fetchProducts() {
  // Get the list of all products from the backend.
  let { data: products, error } = await supabase.from("products").select("*");

  // Show a list of all products.
  if (products) {
    showAllProducts(products);
  }
}

fetchProducts();

import MicroModal from "micromodal";
import { getProducts } from "./src/js/client";
import { showProduct } from "./src/js/product";
import "./style.css";
import "./src/css/product.css";
import "./src/css/modal.css";

MicroModal.init();

// Fetches an array of all products from the backend,
// and shows a randomly selected product from that list.
async function init() {
  // Gets the list of all products.
  const products = await getProducts();

  // Choose a random product from the products array
  // and display it's rating.
  if (products) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    showProduct(randomProduct);
  }
}

init();

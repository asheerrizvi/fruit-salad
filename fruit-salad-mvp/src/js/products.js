import DOMPurify from "dompurify";
import productStyles from "../css/products.module.css";

function generateProduct(product) {
  return `
    <article class="${productStyles.productCard}" id="${product.id}">
      <h2 class="${productStyles.productName}">${product.product_name}</h2>
      <p class="${productStyles.productDescription}">${product.product_description}</p>
    </article>
  `;
}

function showAllProducts(products) {
  console.log(products);
  const productsList = document.getElementById("products-list");
  products.forEach((product) => {
    productsList.innerHTML += DOMPurify.sanitize(generateProduct(product));
  });
}

export { showAllProducts };

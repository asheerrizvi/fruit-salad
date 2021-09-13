import "../css/productRating.css";

function showProductRating(product) {
  const productArticle = document.querySelector('.product');
  const productName = productArticle.querySelector('.product-name');

  productName.textContent = product.product_name;
}

export { showProductRating };

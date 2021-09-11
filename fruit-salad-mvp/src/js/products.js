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
  const parser = new DOMParser();
  const productsList = document.getElementById("products-list");
  products.forEach((product) => {
    const productCard = generateProduct(product);
    const productCardElement = parser.parseFromString(productCard, "text/html").documentElement;

    productsList.append(productCardElement);
    productCardElement.addEventListener("click", () => console.log("here!"));
  });
}

export { showAllProducts };

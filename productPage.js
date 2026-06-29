import { cartsProduct, addToCart } from "../data/carts.js";
import { FormatPriceCent } from "./utils/money.js";

// Fetch products dynamically from your PHP API
async function loadProducts() {
  try {
    const response = await fetch("get_products.php");
    const products = await response.json();

    renderProductsGrid(products);
    setupEventListeners();
  } catch (error) {
    console.error("Error loading products from database:", error);
  }
}

function renderProductsGrid(products) {
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}" />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${FormatPriceCent(product.priceCents)}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" /> Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-card-button"
                  data-products-id="${product.id}">Add to Cart</button>
        </div>`;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;
}

function updateCartQuantity() {
  let totalQuantity = 0;
  if (cartsProduct) {
    cartsProduct.forEach((cartItem) => {
      totalQuantity += cartItem.Quantity || 0;
    });
  }
  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

function setupEventListeners() {
  document.querySelectorAll(".js-add-to-card-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productsId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}

// Initialize the app
loadProducts();

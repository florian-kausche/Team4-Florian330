// cart.js - Handles rendering the shopping cart contents on the cart page
// Imports utility for accessing local storage
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./headerFooter.js";

// Renders the cart items from local storage to the page
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Retrieve cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item)); // Generate HTML for each item
  const list = document.querySelector(".product-list");
  if (list) list.innerHTML = htmlItems.join(""); // Insert into DOM
  addRemoveListeners();
}

// Returns HTML template for a single cart item
function cartItemTemplate(item) {
  const discounted = item.FinalPrice < item.SuggestedRetailPrice;
  let discountPercent = 0;
  if (item.SuggestedRetailPrice > 0) {
    discountPercent = Math.round(100 * (item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice);
  }
  const qty = item.quantity || 1;
  const totalFinal = (item.FinalPrice * qty).toFixed(2);
  const totalOriginal = (item.SuggestedRetailPrice * qty).toFixed(2);
  const totalSaved = ((item.SuggestedRetailPrice - item.FinalPrice) * qty).toFixed(2);
  let priceHTML = discounted
    ? `<span class="original-price">$${item.SuggestedRetailPrice.toFixed(2)}</span> <span class="final-price">$${item.FinalPrice.toFixed(2)}</span> <span class="discount-badge">${discountPercent}% OFF</span> <span class="discount-amount">(You save $${(item.SuggestedRetailPrice - item.FinalPrice).toFixed(2)} per item)</span>`
    : `$${item.FinalPrice.toFixed(2)}`;
  return `<li class="cart-card divider" data-id="${item.Id}">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${qty}</p>
  <p class="cart-card__price">${priceHTML}</p>
  <p class="cart-card__total">Total: <span class="final-price">$${totalFinal}</span>${discounted ? ` <span class="original-price">$${totalOriginal}</span> <span class="discount-amount">(You save $${totalSaved})</span>` : ""}</p>
  <button class="remove-from-cart" style="background:#e53935;color:#fff;border:none;padding:0.4em 1em;border-radius:5px;cursor:pointer;margin-top:0.5em;">Remove</button>
</li>`;
}

function addRemoveListeners() {
  document.querySelectorAll(".remove-from-cart").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const li = btn.closest(".cart-card");
      const id = li.getAttribute("data-id");
      let cartItems = getLocalStorage("so-cart") || [];
      cartItems = cartItems.filter(item => String(item.Id) !== String(id));
      setLocalStorage("so-cart", cartItems);
      li.remove();
      updateCartCount();
    });
  });
}

// Initialize cart rendering on page load
loadHeaderFooter();
updateCartCount();
renderCartContents();

// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Only show products with detail pages
  const allowedIds = ["880RR", "985RF", "985PR", "344YJ"];
  if (!allowedIds.includes(product.Id)) return "";
  // Fix image path for index.html context
  const imgSrc = product.Image.replace("../images/", "src/images/");
  // Correct detail page URL to match your project structure
  // Instead of always using index.html, use a specific product page if it exists
  let detailUrl;
  switch (product.Id) {
    case "880RR":
      detailUrl = "src/product_pages/marmot-ajax-3.html";
      break;
    case "985RF":
      detailUrl = "src/product_pages/northface-talus-4.html";
      break;
    case "985PR":
      detailUrl = "src/product_pages/northface-alpine-3.html";
      break;
    case "344YJ":
      detailUrl = "src/product_pages/cedar-ridge-rimrock-2.html";
      break;
    default:
      detailUrl = `src/product_pages/index.html?product=${product.Id}`;
  }
  // Calculate discount percent and final price
  let discountPercent = 0;
  if (product.SuggestedRetailPrice > 0) {
    discountPercent = Math.round(100 * (product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice);
  }
  const discounted = product.FinalPrice < product.SuggestedRetailPrice;
  const priceHTML = discounted
    ? `<span class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span> <span class="final-price">$${product.FinalPrice.toFixed(2)}</span> <span class="discount-badge">${discountPercent}% OFF</span> <span class="discount-amount">(You save $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)})</span>`
    : `$${product.FinalPrice.toFixed(2)}`;
  return `<li class="product-card">
    <a href="${detailUrl}">
      <img src="${imgSrc}" alt="${product.NameWithoutBrand}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${priceHTML}</p>
    </a>
    <button class="add-to-cart-btn" data-id="${product.Id}">Add to Cart</button>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    // Add event listeners for Add to Cart buttons
    this.listElement.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");
        // Store product in cart (localStorage)
        const product = list.find(p => String(p.Id) === String(id));
        if (product) {
          let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
          const existing = cart.find(item => String(item.Id) === String(product.Id));
          if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }
          localStorage.setItem("so-cart", JSON.stringify(cart));
        }
        // Redirect to add.html in the cart folder
        window.location.href = "src/cart/add.html";
      });
    });
  }
}

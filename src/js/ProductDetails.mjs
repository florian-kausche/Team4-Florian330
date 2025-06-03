import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./headerFooter.js";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    // Check if product already in cart
    const existing = cartItems.find(item => item.Id === this.product.Id);
    if (existing) {
      // If found, increment quantity
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      // If not found, add with quantity 1
      const productToAdd = { ...this.product, quantity: 1 };
      cartItems.push(productToAdd);
    }
    setLocalStorage("so-cart", cartItems);
    // Update cart count in header
    updateCartCount();
    // Redirect to add-to-cart page
    window.location.href = "/src/cart/add.html";
  }

  showAddToCartMessage() {
    let msg = document.getElementById("addToCartMsg");
    if (!msg) {
      msg = document.createElement("div");
      msg.id = "addToCartMsg";
      msg.style.color = "green";
      msg.style.marginTop = "1em";
      document.querySelector(".product-detail__add").appendChild(msg);
    }
    msg.textContent = "Added to cart!";
    msg.style.display = "block";
    setTimeout(() => { msg.style.display = "none"; }, 1500);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  // Show price and discount badge if discounted, except for Rimrock Tent (ID: 344YJ)
  const priceElem = document.getElementById("productPrice");
  let priceHTML = `$${product.FinalPrice}`;
  if (
    product.FinalPrice < product.SuggestedRetailPrice &&
    String(product.Id) !== "344YJ"
  ) {
    const percent = Math.round(100 - (product.FinalPrice / product.SuggestedRetailPrice) * 100);
    priceHTML += ` <span class="discount-badge">${percent}% OFF</span>`;
  }
  priceElem.innerHTML = priceHTML;

  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

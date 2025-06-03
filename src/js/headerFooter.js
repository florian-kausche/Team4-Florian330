// This file dynamically injects header and footer into the page
// Exported function to inject header and footer into the DOM
export function injectHeaderFooter() {
  // HTML template for the site header, including logo and cart link
  const headerHTML = `
    <header class="divider">
      <div class="logo">
        <img src="/src/images/noun_Tent_2517.svg" alt="tent image for logo" />
        <a href="/index.html"> Sleep<span class="highlight">Outside</span></a>
      </div>
      <div class="cart" style="position:relative;">
        <a href="/src/cart/add.html">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <!-- Cart icon SVG -->
            <path d="M18.9 32.6c1.1 2.4 2.5 3.3 5.4 3.3 1.6 0 3.6-0.3 5.9-0.6 3.2-0.5 6.9-1 11.2-1 2.1 0 4.3 0.1 6.4 0.3 2.1 0.1 4.2 0.3 6.1 0.3 3.2 0 5.2-0.4 5.9-1.2 2.7-2.7 2.8-8.8 2.9-14.6 0.1-6.7 0.2-14.5 4.6-18.7 -0.5 0-1 0-1.6 0 -14.2 0-37.5 0-41.1 0C15.6 6.2 14.9 23.6 18.9 32.6z"/>
            <path d="M90.1 29.7c1-3.3 1.5-7.3 1.5-11.2 0-9-2.7-18.8-8.6-18.8 -0.1 0-0.2 0-0.3 0L77.8-0.1c-0.3 0.2-0.8 0.3-1.1 0.4 0 0 0 0 0 0 -0.2 0-0.3 0-0.4 0 -4.5 0.1-7 1.8-8.4 4.9l8.9-0.1c-1.6 3.6-2.4 8.7-2.4 13.5 0 4.9 0.8 9.9 2.5 13.6l-12.3 0c-0.2 0.4-0.4 0.8-0.6 1.2 -0.2 0.4-0.4 0.7-0.6 1.1 -0.1 0.1-0.1 0.2-0.2 0.3 -0.3 0.4-0.5 0.7-0.9 1.1 0 0 0 0 0 0 0 0-0.1 0.1-0.1 0.1 -0.1 0.1-0.2 0.2-0.4 0.3 -0.2 0.1-0.4 0.3-0.6 0.4 0 0 0 0 0 0 -0.4 0.2-0.9 0.4-1.4 0.6 -1.3 0.4-2.9 0.6-4.9 0.7 -0.5 1.5-1.1 4.1 0 5.5l3.1 3.9 0 0.8c0 2.8-2.3 4.8-2.8 5.2l-3-3.8c0.3-0.2 0.5-0.5 0.7-0.8l-1.8-2.3c-2.2-2.7-1.8-6.3-1.2-8.7 -0.7 0-1.4-0.1-2-0.1 -2.1-0.1-4.3-0.3-6.2-0.3 -4.1 0-7.7 0.5-10.8 1 -1 0.2-2 0.3-3 0.4 -0.5 1.5-1.2 4.4-0.1 5.9l3.1 4 0 0.8c0 2.8-2.3 4.8-2.8 5.2l-3.1-3.8c0.3-0.2 0.6-0.6 0.7-0.9l-1.8-2.4c-2.1-2.8-1.8-6.3-1.2-8.7 -1.6-0.2-2.9-0.8-4-1.7h0c-0.8-0.6-1.4-1.4-2-2.4 -0.1-0.1-0.2-0.3-0.2-0.5 -0.1-0.2-0.2-0.4-0.3-0.6 -0.3-0.6-0.5-1.2-0.7-1.8l-5.6 0c-1-0.3-3.5-4.8-3.5-13.2 0-8.1 3.7-13.1 4.9-13.2L16.4 5.6c0.9-1.9 2-3.7 3.4-5.2L11.2 0.5c-5.4 0-10.1 8.6-10.1 18.4 0 8.9 2.7 18.4 8.6 18.4h2.4c-1.8 10.7-6.6 43 0.4 56.5 0.7 1.4 4.3 3.4 12.2 4.6 20.2 3.1 49.8-0.5 54.6-5.3 0.7-0.7 1.3-1.7 1.8-2.9 2-0.3 8.2-1.7 12.4-8.4C100.1 71.5 98.9 53.9 90.1 29.7z"/>
            <path d="M24.7 71v5h-5.2v-5.4c-1.4-0.3-2.7-0.6-3.7-0.9 -0.9 6.8-1.1 13.3-0.3 14.5 0.4 0.3 2.9 1.1 8 1.1h0c5 0 8.8-0.7 9.7-1.3 0.8-1.3 0.6-7.7-0.4-14.4C30.7 70.1 27.5 70.8 24.7 71z"/>
            <path d="M58.8 68.9c2.9-0.1 6.4-0.9 8.3-1.4 0.1-0.8 0.3-2.8-0.7-3.5 -0.5-0.2-2.5-0.4-5.9-0.4 -4.9 0-8.6 0.4-9.5 0.7 -0.3 0.5-0.5 1.9-0.5 3.3C52.5 68.1 56 69 58.8 68.9z"/>
            <path d="M24.3 68.4c2.9-0.1 6.4-0.9 8.3-1.4 0.1-0.8 0.3-2.8-0.7-3.5 -0.5-0.2-2.5-0.4-5.9-0.4 -4.9 0-8.6 0.4-9.5 0.7 -0.3 0.5-0.5 1.9-0.5 3.3C18 67.7 21.5 68.6 24.3 68.4z"/>
            <path d="M60.1 71.4v3.3h-5.2v-3.4c-1.7-0.3-3.3-0.7-4.6-1 -0.9 6.8-1.1 13.3-0.3 14.5 0.4 0.3 2.9 1.1 8 1.1h0c5 0 8.8-0.7 9.7-1.3 0.8-1.3 0.6-7.7-0.4-14.4C65.5 70.5 62.7 71.1 60.1 71.4z"/>
          </svg>
          <span id="cart-count" style="position:absolute;top:0;right:0;background:#e53935;color:#fff;font-size:0.8em;padding:2px 7px;border-radius:50%;min-width:22px;text-align:center;display:inline-block;">0</span>
        </a>
      </div>
    </header>
  `;
  // HTML template for the site footer, using flexbox for layout
  const footerHTML = `
     <footer class="site-footer">
      <div class="footer-content" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
        <p style="margin: 0;">&copy; 2025 Sleep Outside. All rights reserved.</p>
        <p style="margin: 0; text-align: right;">Designed by Florian Adu Kausche</p>
      </div>
    </footer>
  `;
  // Find and replace or insert the header
  const header = document.querySelector("header");
  if (header) header.outerHTML = headerHTML;
  else document.body.insertAdjacentHTML("afterbegin", headerHTML);
  // Find and replace or insert the footer
  const footer = document.querySelector("footer");
  if (footer) footer.outerHTML = footerHTML;
  else document.body.insertAdjacentHTML("beforeend", footerHTML);
  // Update cart count after header is in DOM
  setTimeout(updateCartCount, 0);
}

// Update the cart count badge in the header
export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  // Sum all quantities, but ensure each item only counts its quantity once
  const count = cartItems.reduce((sum, item) => sum + (typeof item.quantity === "number" ? item.quantity : 1), 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

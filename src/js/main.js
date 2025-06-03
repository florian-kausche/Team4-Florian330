// main.js - Handles dynamic rendering of product listing with discount indicator
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Only run on the home page
if (document.querySelector(".product-list")) {
  loadHeaderFooter();
  // Get category from query string
  const category = getParam("category") || "tents";
  // Set category title
  const titleMap = {
    "tents": "Tents",
    "backpacks": "Backpacks",
    "sleeping-bags": "Sleeping Bags",
    "hammocks": "Hammocks"
  };
  const titleElem = document.getElementById("category-title");
  if (titleElem && titleMap[category]) titleElem.textContent = titleMap[category];
  // Use ProductData and ProductList for the selected category
  const dataSource = new ProductData(category);
  const listElement = document.querySelector(".product-list");
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
}

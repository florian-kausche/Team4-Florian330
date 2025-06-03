import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const datasource = new ProductData("tents");
const product = new ProductDetails(productId, datasource);
product.init();
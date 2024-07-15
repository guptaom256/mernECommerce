const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticated, isAuthorized } = require("../middleware/auth.js");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticated, isAuthorized("admin"), getAdminProducts);
router.route("/admin/product/new").post(isAuthenticated, isAuthorized("admin"), createProduct);
router.route("/admin/product/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateProduct)
  .delete(isAuthenticated, isAuthorized("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router.route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);


module.exports = router;

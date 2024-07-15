const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth.js");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController.js");

router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);

module.exports = router;

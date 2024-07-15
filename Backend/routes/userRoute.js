const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controllers/userController.js");
const { isAuthenticated, isAuthorized } = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/admin/users").get(isAuthenticated, isAuthorized("admin"), getAllUsers);
router.route("/admin/user/:id")
  .get(isAuthenticated, isAuthorized("admin"), getSingleUser)
  .put(isAuthenticated, isAuthorized("admin"), updateRole)
  .delete(isAuthenticated, isAuthorized("admin"), deleteUser);

module.exports = router;
// external import
const express = require("express");
// internal import
const {
  getUsers,
  addUser,
  removeUser,
  updateUser,
} = require("../controller/usersController");
const { checkLogin, requireRole } = require("../middleware/common/checkLogin");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidators");
// router
const router = express.Router();
// user page
router.get(
  "/",
  decorateHtmlResponse("users"),
  checkLogin,
  // requireRole(["admin"]),
  getUsers
);
// add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
// update user
router.put("/:id", checkLogin, requireRole(["admin"], updateUser)); // incomple edit
// remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);
// export part
module.exports = router;

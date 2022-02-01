// external import
const express = require("express");
// internal import
const { getLogin, login, logout } = require("../controller/loginController");
const { redirectLoggedIn } = require("../middleware/common/checkLogin");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationhandler,
} = require("../middleware/login/loginValidators");
// router
const router = express.Router();

// set page title
const page_title = "Login";
// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationhandler,
  login
);
// process logout
router.delete("/", logout);
// export part
module.exports = router;

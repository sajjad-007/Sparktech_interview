const express = require("express");
const _ = express.Router();
const { registrationController } = require("../controller/auth/authController");
_.route("/registration").post(registrationController);

module.exports = _;

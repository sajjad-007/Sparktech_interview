const express = require("express");
const route = express.Router();
const registrationRoute = require("./auth.apiRoute");
route.use("/api/v1/auth", registrationRoute);

module.exports = { route };

const express = require("express");
const app = express();
const { route } = require("./src/routes/index");
const allRoutes = route;

//Without this middleware, req.body will be undefined for JSON payloads.
app.use(express.json());
//my all routes
app.use(allRoutes);

module.exports = { app };

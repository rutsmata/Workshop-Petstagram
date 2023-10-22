const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { auth } = require("../middlewares/authMiddleware");

function expressConfig(app) {
  app.use(express.static(path.resolve(__dirname, "../public"))); // resources should be in public folder
  app.use(express.urlencoded({ extended: false })); // body parser, upon read data from form, using req.body
  app.use(cookieParser());
  app.use(auth); // auth should be after cookieParser as it will use data from it
}

module.exports = expressConfig;

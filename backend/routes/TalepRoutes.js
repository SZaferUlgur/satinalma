"use strict";
const express = require("express");
const {
  getById,
  addData,
  deleteById,
} = require("../controllers/tblTalep.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
    .post(auth, addData);

router
  .route("/:id")
  .get(auth, getById)
  .delete(auth, deleteById)

module.exports = {
  routes: router,
};

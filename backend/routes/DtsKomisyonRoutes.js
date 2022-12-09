"use strict";
const express = require("express");
const {
  getById,
  addData,
  deleteById,
  updateById
} = require("../controllers/tblDTSKomisyon.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
    .post(auth, addData);
router
  .route("/:id")
  .patch(auth, updateById)
  .delete(auth, deleteById)
  .get(auth, getById)

router
.route("/guncelle")
.patch(auth, updateById)

module.exports = {
  routes: router,
};

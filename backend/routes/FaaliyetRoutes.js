"use strict";
const express = require("express");
const {
  getAll,
  getById,
  addData,
  updateById,
  deleteById,
  getAdi,
} = require("../controllers/tblFaaliyet.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router.route("/").get(auth, getAll).post(auth, addData);
router.route("/faaladi").patch(auth, getAdi)

router
  .route("/:id")
  .get(auth, getById)
  .delete(auth, deleteById)
  .put(auth, updateById);
  
module.exports = {
  routes: router,
};

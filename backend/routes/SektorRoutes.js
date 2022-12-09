"use strict";
const express = require("express");
const {
  getAll,
  getById,
  addData,
  updateById,
  deleteById,
} = require("../controllers/tblSektor.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router.route("/").get(auth, getAll).post(auth, addData);
router
  .route("/:id")
  .patch(auth, getById)
  .delete(auth, deleteById)
  .put(auth, updateById);
  
module.exports = {
  routes: router,
};

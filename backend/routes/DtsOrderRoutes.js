"use strict";
const express = require("express");
const {
  getAll,
  getById,
  addData,
  updateById,
  deleteById,
} = require("../controllers/tblDTSOrder.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
    .get(auth, getAll)
    .post(auth, addData);
router
  .route("/:id")
  .delete(auth, deleteById)
  .put(auth, updateById);

router.route("/:id").patch(auth, getById)

module.exports = {
  routes: router,
};

"use strict";
const express = require("express");
const {
  getAll,
  getById,
  addData,
  updateById,
  deleteById,
  getUser,
  putPicture,
  getUzman,
} = require("../controllers/tblPersonel.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router.route("/").get(auth, getAll).post(auth, addData);
router.route("/user").patch(auth, getUser)
router.route("/uzman").get(auth, getUzman)

router
  .route("/:id")
  .get(auth, getById)
  .delete(auth, deleteById)
  .put(auth, updateById);

router.route("/upload/:id").patch(auth, putPicture)


module.exports = {
  routes: router,
};

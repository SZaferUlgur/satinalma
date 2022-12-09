"use strict";
const express = require("express");
const {
  getAll,
  getById,
  addData,
  updateById,
  deleteById,
  getUserFiltre,
  putPDFPath,
  putFaturaPDFPath,
  putDtsYmcUpdate,
  getAllView,
  newDTSInfo,
  putEvrakPath,
  delPDFPath
} = require("../controllers/tblDTS.controller");
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

router.route("/viewall").post(auth, getAllView)
router.route("/newdtsinfo/:id").get(auth, newDTSInfo)
router.route("/userfiltre/:id").get(auth, getUserFiltre)
router.route("/dtspdfpath/:id").patch(auth, putPDFPath)
router.route("/dtsevrakpath/:id").patch(auth, putEvrakPath)
router.route("/dtsfaturapdfpath/:id").patch(auth, putFaturaPDFPath)
router.route("/dtsymcupdate/:id").patch(auth, putDtsYmcUpdate)
router.route("/deldtspdfpath/:id").patch(auth, delPDFPath)
router.route("/:id").get(auth, getById)

module.exports = {
  routes: router,
};

"use strict";
const express = require("express");
const { sorDTSYetki, setKomisyonUyelik } = require("../controllers/tblYetki.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router.route("/").post(auth, sorDTSYetki);

router.route("/komisyonuyelik").post(auth, setKomisyonUyelik);

module.exports = {
  routes: router,
};

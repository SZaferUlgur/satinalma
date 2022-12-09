"use strict";
const express = require("express");
const {
  getNormalById,
  addData,
  deleteById,
  PFARaporByDtsId,
  kazananFirmaById,
  istekUrunById,
  firmaTeklifById,
  urunListeByFirma,
  ortalamaFiyatById,
  ymcOrtalama,
  getSozluById,
  getTekKaynakById,
  addSozluBir,
  addSozluIki,
  addSozluUc,
  sozluYaklasikMaliyetById,
  PFAFaturaByDtsId
} = require("../controllers/tblPfaYmc.controller");
const auth = require("./middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(auth, addData)
  .get(async (req, res) => res.send("Bu APİ Çalışmaz.."));
router
  .route("/:id")
  .delete(auth, deleteById)
  
  router.route("/sozlubir").post(auth, addSozluBir);
  router.route("/sozluiki").post(auth, addSozluIki);
  router.route("/sozluuc").post(auth, addSozluUc);


  router.route("/normal/:id").get(auth, getNormalById);
  router.route("/sozlu/:id").get(auth, getSozluById);
  router.route("/tekkaynak/:id").get(auth, getTekKaynakById);
  router.route("/sozluymc/:id").get(auth, sozluYaklasikMaliyetById);

  router.route("/rapor/:id").get(auth, PFARaporByDtsId);
  router.route("/pfafatura/:id").get(auth, PFAFaturaByDtsId);
  router.route("/kazanan/:id").get(auth, kazananFirmaById);
  router.route("/istekurun/:id").get(auth, istekUrunById);
  router.route("/ortalamafiyat/:id").get(auth, ortalamaFiyatById);
  router.route("/firmateklif/:id").get(auth, firmaTeklifById);
  router.route("/urunlistefirma/:id").get(auth, urunListeByFirma);
  router.route("/ymcortalama/:id").get(auth, ymcOrtalama);

module.exports = {
  routes: router,
};
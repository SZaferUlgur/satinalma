const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const connectionConfig = require("../../database/dbConfig");
const sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config();

// GET Api/Register

router.post(
  "/",
  [
    check("username", "Bu Alan Gereklidir..").not().isEmpty(),
    check("password", "Bu Alan Gereklidir..").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //console.log(req.body)
      // kullanıcı varmı kontrol etmiyor..
      async function kayitVarmi() {
        try {
          let pool = await sql.connect(connectionConfig);
          const searchUser = await pool
            .request()
            .input("username", sql.VarChar(50), req.body.username)
            .query("SELECT * FROM tblPersonel WHERE username=@username");
            //console.log(searchUser.recordset.length)
            //const adKontrol = searchUser.recordset[0].id
            if (searchUser.recordset.length > 0) {
              return 1
          } else 
          return searchUser.recordsets;
         
        } catch (error) {
          console.log(error);
        }
      }
      // Var ise mesaj ver ve çıkışa git yok ise devam et..
    let varMi = await kayitVarmi(); 
     if (varMi === 1) {
         res.json({message: "Kullanıcı Kaydı Var"})
     } else {

    // bcrpyt jspassword
      const salt = await bcrpyt.genSalt(10);
      const hashpassword = await bcrpyt.hash(req.body.password, salt);

      // Kullanıcı Kaydı..
      async function kayitEkle() {
        try {
          let pool = await sql.connect(connectionConfig);
          const insertUser = await pool
            .request()
            .input("username", sql.NVarChar(50), req.body.username)
            .input("password", sql.NVarChar(150), hashpassword)
            .query(
              "EXEC addUserSP @username=@username, @password=@password"
            );
          return insertUser.recordsets;
        } catch (error) {
          console.log(error);
        }
      }
      kayitEkle();
      // return jsonwebtoken
      const payload = {
        user: {
          username: req.body.username,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: '2 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
    } catch {
      res.status(500).send("Sunucu Hatası");
    }
  }
);

module.exports = router;

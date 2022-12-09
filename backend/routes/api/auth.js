const express = require("express");
const { check, validationResult } = require("express-validator")
const sql = require('mssql');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bcrpyt = require("bcryptjs")
const auth  = require("../middleware/authMiddleware")
const connectionConfig = require('../../database/dbConfig');
const router = express.Router();

dotenv.config();
// GET Api/Auth

router.get("/", auth, async (req, res) => {
    try {
       // console.log(req.body)
            let pool = await sql.connect(connectionConfig);
            let user = await pool.request()
                .query("SELECT id, username, [password] FROM tblPersonel WHERE username='" + req.body.username + "'");
                res.json(user.recordsets);
    } catch (err) {
        console.log("hata :", err.message);
        res.status(500).send("Sunucu Hatası")
    };
});

// GET Api/Auth 
// @description Authenticate user & get token
// @access Public

router.post("/", [
    check("username", "Bu Alan Gereklidir..").not().isEmpty(),
    check("password", "Bu Alan Gereklidir..").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    };

try {
    // kullanıcı varmı kontrol
        let pool = await sql.connect(connectionConfig);
            let user = await pool.request()
                .query("SELECT id, username, [password], isMod, photoURL, adiSoyadi  FROM tblPersonel WHERE username='" + req.body.username + "'");
                if(!user.recordset[0].username) {
            return res.status(400).json({ errors: [{ msg: "Hatalı Kullanıcı Kimliği" }]});
        }
//console.log(req.body.password)
let gelenPassword = req.body.password
let mevcutPassword = user.recordset[0].password    
// Şifre karşılaştırma
        const isMatch = await bcrpyt.compare(gelenPassword, mevcutPassword);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Hatalı Kullanıcı Şifresi" }]});
        }
     
    // Diğer işlemler
    const payload = {
        user: {
            username: req.body.username
    }}

    const uName = user.recordset[0].username
    const uMod = user.recordset[0].isMod
    const uID = user.recordset[0].id
    const sclNo = user.recordset[0].photoURL
    const perName = user.recordset[0].adiSoyadi

    jwt.sign(
        payload, 
        process.env.JWTSECRET,
        { expiresIn: '2 days' }, 
        (err, token) => {
            if (err) throw err;
            res.json({ token, uName, perName, uMod, uID, sclNo });
        });

} catch {
    res
    .status(500)
}
})

module.exports = router;
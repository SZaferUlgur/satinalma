const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
    // get token from header
    //console.log(req.headers)
    const token = req.get('token');
    // check if not token
    if (!token) {
        return res.status(401).json({ msg: "Token Bulunamadı, Erişim Engellendi" });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        req.user = decoded.user;
        next()
    } catch {
        res.status(401).json({ msg: "Token Geçerli Değil" })
    }
} 
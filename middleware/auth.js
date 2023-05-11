// menghubungkan ke file .env
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

// fungsi autorisasi
function auth(req, res, next) {
  // deteksi token
  const token = req.header("Authorization");
  // jika token tidak ada
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  // jika token ada
  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    console.log(user.id);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = auth;

// import dependensi
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const { CustomError } = require("../middleware/error");
const { valUser, validator } = require("../middleware/valid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;

// registrasi user baru
router.post("/register", valUser, validator, async (req, res, next) => {
  // mengambil data request post
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    // jika email sudah terdaftar
    if (user) {
      let err = new CustomError(400, "Email already registered.");
      return next(err);
    }
    // enkripsi password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // simpan sebagai user baru
    user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    // jika error tampilkan pesan
    let err = new CustomError(500, "An error occurred while registering user.");
    return next(err);
  }
});

// login user & generate token
router.post("/login", valUser, validator, async (req, res, next) => {
  // mengambil data request post
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    // jika email belum terdaftar
    if (!user) {
      let err = new CustomError(400, "Invalid email.");
      return next(err);
    }
    // ferifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      let err = new CustomError(400, "Invalid password.");
      return next(err);
    }
    // generate token
    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    // jika error tampilkan pesan
    console.error(error);
    let err = new CustomError(500, "An error occurred while logging in.");
    return next(err);
  }
});

// menampilkan semua user
router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// menambah user baru
router.post("/", valUser, validator, auth, async (req, res) => {
  // mengambil data request post
  const { name, email, password } = req.body;
  // mengambil data request post
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // simpan data di collection
  let user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  user = await user.save();
  res.send(user);
});

// menampilkan data berdasarkan id
router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// meng-update data user
router.put("/:id", valUser, validator, auth, async (req, res, next) => {
  // mengambil data request post
  const { name, email, password } = req.body;
  // membuat encrypsi untuk password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // cek jika data eksis & data user yang sedang aktif
  const own = await User.findById(req.params.id);
  if (own && own.user_id == req.user.id) {
    // update data
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        email: email,
        password: hashedPassword,
      },
      { new: true }
    );
    res.send(user);
  } else {
    // jika data tidak eksis atau bukan data ybs, kembalikan pesan error
    let err = new CustomError(400, "No data! You can modify your own only.");
    return next(err);
  }
});

// delete data di collection
router.delete("/:id", auth, async (req, res, next) => {
  // cek jika data eksis & data user yang sedang aktif
  const own = await User.findById(req.params.id);
  if (own && own.user_id == req.user.id) {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "You data has been deleted." });
  } else {
    // jika data tidak eksis atau bukan data ybs, kembalikan pesan error
    let err = new CustomError(400, "No data! You can delete your own only.");
    return next(err);
  }
});

module.exports = router;

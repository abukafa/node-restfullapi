// import dependensi
const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const { CustomError } = require("../middleware/error");
const { valJobs, validator } = require("../middleware/valid");

// menampilkan semua project
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

// menambah project baru
router.post("/", valJobs, validator, async (req, res) => {
  // mengambil data request post
  const { name, description, due_date, user_id } = req.body;
  // simpan data di collection
  let project = new Project({
    name: name,
    description: description,
    due_date: due_date,
    user_id: req.user.id, // hanya bisa input dengan id user yang sedang aktif
  });
  project = await project.save();
  res.send(project);
});

// menampilkan data berdasarkan id
router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.send(project);
});

// meng-update data project
router.put("/:id", valJobs, validator, async (req, res, next) => {
  // mengambil data request post
  const { name, description, due_date, user_id } = req.body;
  // cek jika data eksis & data project milik user yang sedang aktif
  const own = await Project.findById(req.params.id);
  if (own && own.user_id == req.user.id) {
    // update data
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        description: description,
        due_date: due_date,
      },
      { new: true }
    );
    res.send(project);
  } else {
    // jika data tidak eksis atau bukan data ybs, kembalikan pesan error
    let error = new CustomError(400, "No data! You can modify your own only.");
    next(error);
  }
});

// delete data di collection
router.delete("/:id", async (req, res, next) => {
  // cek jika data eksis & data project milik user yang sedang aktif
  const own = await Project.findById(req.params.id);
  if (own && own.user_id == req.user.id) {
    await Project.findByIdAndRemove(req.params.id);
    res.json({ message: "Your data has been deleted." });
  } else {
    // jika data tidak eksis atau bukan data ybs, kembalikan pesan error
    let error = new CustomError(400, "No data! You can delete your own only.");
    next(error);
  }
});

module.exports = router;

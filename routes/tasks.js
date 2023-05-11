// import dependensi
const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { CustomError } = require("../middleware/error");
const { valJobs, validator } = require("../middleware/valid");

// menampilkan semua task
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// menambah task baru
router.post("/", valJobs, validator, async (req, res) => {
  // mengambil data request post
  const { name, description, due_date, user_id, project_id } = req.body;
  // simpan data di collection
  let task = new Task({
    name: name,
    description: description,
    due_date: due_date,
    user_id: req.user.id, // hanya bisa input dengan id user yang sedang aktif
    project_id: project_id,
  });
  task = await task.save();
  res.send(task);
});

// menampilkan data berdasarkan id
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.send(task);
});

// meng-update data task
router.put("/:id", valJobs, validator, async (req, res, next) => {
  // mengambil data request post
  const { name, description, due_date, user_id, project_id } = req.body;
  // cek jika data eksis & data task milik user yang sedang aktif
  const own = await Task.findById(req.params.id);
  if (own && own.user_id == req.user.id) {
    // update data
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        description: description,
        due_date: due_date,
        project_id: project_id,
      },
      { new: true }
    );
    res.send(task);
  } else {
    // jika data tidak eksis atau bukan data ybs, kembalikan pesan error
    let error = new CustomError(400, "No data! You can modify your own only.");
    next(error);
  }
});

// delete data di collection
router.delete("/:id", async (req, res, next) => {
  // cek jika data eksis & data task milik user yang sedang aktif
  const own = await Task.findById(req.params.id);
  if (own && own.user_id == req.user.id) {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ message: "Your data has been deleted." });
  } else {
    // jika data tidak eksis atau bukan data ybs, kembalikan pesan error
    let error = new CustomError(400, "No data! You can delete your own only.");
    next(error);
  }
});

module.exports = router;

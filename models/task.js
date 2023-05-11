// membuat collection
const mongoose = require("mongoose");
// skema data
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

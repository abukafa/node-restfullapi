// membuat collection
const mongoose = require("mongoose");
// skema data
const projectSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  due_date: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

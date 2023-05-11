// import library
const express = require("express");
const bodyParser = require("body-parser");
// import database
const db = require("./models/db");
// import routes controller
const users = require("./routes/users");
const projects = require("./routes/projects");
const tasks = require("./routes/tasks");
// import middleware
const auth = require("./middleware/auth");
const { errorHandler } = require("./middleware/error");

const app = express();
// detail route & controller di folder routes
app.use(bodyParser.json());
app.use("/users", users);
app.use("/projects", auth, projects);
app.use("/tasks", auth, tasks);

// error handling di folder middleware
app.use(errorHandler);

// menghubungkan server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));

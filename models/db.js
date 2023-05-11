// koneksi database dengan library mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    // Pilih database mongoDB local atau cluster
    "mongodb+srv://hikamabukafa:vdW7dla0qdflmsZj@cluster0.ehhodhg.mongodb.net/myapp",
    // "mongodb://localhost:27017/myapp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB : " + err));

module.exports = mongoose;

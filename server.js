const express = require("express");
const logger = require("./util/logger");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const multer

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const movieRoutes = require("./route/movieRoute");
const Grid = require("gridfs-stream");
// const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 8000;
let gfs;

const upload = require("./middleware/multerConfiguration");
const Image = require("./model/imageModel");

async function connectDB() {
  return await mongoose.connect(process.env.LOCALHOST_MONGO_URI);
}

connectDB();

const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

app.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.file;
    console.log(name);
    console.log(image);

    const imageBuffer = Buffer.from(image.buffer, "base64");

    await Image.create({ data: imageBuffer })
      .then(() => {
        res.status(201);
        res.send("Image stored");
      })
      .catch((err) => {
        res.status(400);
        res.send("Cannot store image");
      });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send("Something went wrong");
  }
  res.send({ file: req.file, body: req.body });
});

app.use("/api/movies", movieRoutes);
app.use("/data/images", express.static("data/images"));

// // app.use()

// startServer();

app.listen(PORT, () => {
  logger.info("server running");
});

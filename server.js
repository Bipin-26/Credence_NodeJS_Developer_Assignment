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

const upload = require("./middleware/multerConfiguration");
const Image = require("./model/imageModel");

async function connectDB() {
  return await mongoose.connect(process.env.LOCALHOST_MONGO_URI);
}

connectDB().then(() => console.log("Database initialized"));

app.get("/upload", async (req, res) => {
  await Image.find({})
    .then((result) => {
      logger.info("Images retrieved", result);
      res.status(200);
      return res.send({ Result: result });
    })
    .catch((err) => {
      logger.error("Error", err);
    });
});

app.get("/upload/:id", async (req, res) => {
  const id = req.params.id;
  Image.findById(id)
    .then((result) => {
      let imgData = new Blob(result.buffer, {
        type: "application/octet-binary",
      });
      let imgLink = URL.createObjectURL(imgData);
      logger.info({ message: "Image found", imgLink });
      res.status(200);
      return res.send(result.data);
    })
    .catch((err) => {
      logger.error({ message: "Somethign went wrong", err });
      res.status(400);
      return res.send({ message: "something went wrong", err });
    });
});

app.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.file;
    console.log(name);
    console.log(image);

    const imageBuffer = Buffer.from(image.buffer, "base64");

    await Image.create({ data: imageBuffer })
      .then((result) => {
        res.status(201);
        return res.send(result);
      })
      .catch((err) => {
        res.status(400);
        return res.send("Cannot store image");
      });
  } catch (err) {
    console.log(err);
    res.status(400);
    return res.send("Something went wrong");
  }
  // res.send({ file: req.file, body: req.body });
});

app.use("/api/movies", movieRoutes);
app.use("/data/images", express.static("data/images"));

// // app.use()

// startServer();

app.listen(PORT, () => {
  logger.info("server running");
});

const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const movieRoutes = require("./route/movieRoute");
const winston = require("winston");
const logger = require("./util/logger");
const initializeDatabase = require("./util/initializeDatabase");
const multer = require("multer");
const storage = require("./middleware/multerConfig");
const fs = require("fs");
const createUploadsFolder = require("./util/uploadFolderGenerator");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup the database connection
connectDB();

createUploadsFolder();
// initialize the database with the moviesList.json
initializeDatabase();

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

app.use("/api/movies", movieRoutes);
app.use("/data/images", express.static("data/images"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

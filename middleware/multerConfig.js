const multer = require("multer");
const fs = require("fs");
const logger = require("../util/logger");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "data/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB is the default max file size
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/jpeg") {
      callback(null, true);
    } else {
      logger.error({
        message: "Please upload .jpeg format images only...!!!!",
      });
      callback(null, false);
    }
  },
});

module.exports = upload;

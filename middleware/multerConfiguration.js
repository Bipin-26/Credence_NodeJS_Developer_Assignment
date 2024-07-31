const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const logger = require("../util/logger");

// const storage = new GridFsStorage({
//   url: process.env.LOCALHOST_MONGO_URI,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-any-name-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-any-name-${file.originalname}`,
//     };
//   },
// });

const storage = multer.memoryStorage({});

module.exports = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
    } else {
      logger.error({ message: "Invalid image type" });
      callback(null, false);
    }
  },
});

const fs = require("fs");
const logger = require("./logger");

const createUploadsFolder = () => {
  if (!fs.existsSync("data/images")) {
    console.log(fs.existsSync("/uploads"));
    fs.mkdir("data\\images", (err) => {
      if (err) {
        logger.error({ message: "Cannot create uploads folder", err: err });
      } else {
        logger.info({ message: "Images folder created" });
      }
    });
  }
};

module.exports = createUploadsFolder;

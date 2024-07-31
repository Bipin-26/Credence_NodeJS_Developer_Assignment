const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  data: {
    type: Buffer,
  },
});

const Image = mongoose.model("Image", imageSchema, "images");

module.exports = Image;

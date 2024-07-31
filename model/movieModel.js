const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  summary: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: Object,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

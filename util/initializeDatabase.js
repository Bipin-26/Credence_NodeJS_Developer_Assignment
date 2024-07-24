const mongoose = require("mongoose");
const Movie = require("../model/movieModel");
const moviesList = require("../data/moviesList.json");
const logger = require("./logger");

const initializeDatabase = async () => {
  try {
    await Movie.deleteMany({});
    await Movie.insertMany(moviesList);
    logger.info("Database initialized with moviesList.json file");
  } catch (err) {
    logger.error(err);
  }
};

module.exports = initializeDatabase;

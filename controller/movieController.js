const Movie = require("../model/movieModel");
const logger = require("../util/logger");

// controller function to view all the movies list from db.
const viewMovie = async (req, res) => {
  try {
    const movieList = await Movie.find();
    if (movieList.length === 0) {
      logger.info("No movies found");
      res.status(404).send("No movies found");
    } else {
      logger.info("Movies fetched successfully!!");
      res
        .status(200)
        .send({ message: "Movies fetched successfully", movieList });
    }
  } catch (err) {
    logger.error(err);
    res.status(400).send("Something went wrong");
  }
};

// controller function to add new movie to db
const addMovie = async (req, res) => {
  const { name, img, summary } = req.body;
  const movieExists = await Movie.findOne({ name: name });
  if (movieExists) {
    logger.info("Movie already exists");
    res.status(400);
    res.send("Movie already exists");
  } else {
    try {
      const movie = await Movie.create({ name, img, summary });
      logger.info({ message: "Movie added successfully", movie });
      res.status(201);
      res.send({ message: "Movie added successfully", movie });
    } catch (err) {
      logger.error(err);
      res.status(400).send("Something went wrong");
    }
  }
};

// controller function to update a movie based on the id passed as param, and updated body values.
const updateMovie = async (req, res) => {
  const id = req.query.id;
  const { name, img, summary } = req.body;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      movie.name = name || movie.name;
      movie.img = img || movie.img;
      movie.summary = summary || movie.summary;
      const updatedMovie = await movie.save();
      logger.info({
        message: "Movie updated successfully!!",
        movie: updatedMovie,
      });
      res
        .status(200)
        .send({ message: "Movie updated successfully!!", movie: updatedMovie });
    } else {
      logger.error("Movie not found");
      res.status(404);
      res.send("Movie not found");
    }
  } catch (err) {
    logger.error(err);
    res.status(400).send("Something went wrong");
  }
};

// controller function to delete a movie based on the id passed as param
const deleteMovie = async (req, res) => {
  const id = req.query.id;
  try {
    const movieExists = await Movie.findById(id);
    if (movieExists) {
      await Movie.deleteOne({ _id: id });
      logger.info({ message: `Movie ${id} deleted successfully!!` });
      res.status(200).send({ message: `Movie ${id} deleted successfully!!` });
    } else {
      logger.error("Movie not found");
      res.status(404);
      res.send("Movie not found");
    }
  } catch (err) {
    logger.error(err);
    res.status(400).send("Something went wrong");
  }
};

module.exports = {
  viewMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};

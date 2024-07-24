const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const movieRoutes = require("./route/movieRoute");
const winston = require("winston");
const logger = require("./util/logger");
const initializeDatabase = require("./util/initializeDatabase");

const port = process.env.PORT || 8000;
const app = express();
// setup the database connection
connectDB();

// initialize the database with the moviesList.json
initializeDatabase();

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/movies", movieRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

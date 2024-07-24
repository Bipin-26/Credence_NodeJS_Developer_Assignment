const express = require("express");
const router = express.Router();
// imported all the controller function
const {
  viewMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movieController");

// wrapped all the CRUD operation in single endpoint '/' and passed the controller function based on the CRUD operation to be performed
router
  .route("/")
  .get(viewMovie)
  .post(addMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;

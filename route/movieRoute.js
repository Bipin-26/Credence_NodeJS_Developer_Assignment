const express = require("express");
const router = express.Router();
// imported all the controller function
const {
  viewMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movieController");
const upload = require("../middleware/multerConfiguration");

// wrapped all the CRUD operation in single endpoint '/' and passed the controller function based on the CRUD operation to be performed
router
  .route("/")
  .get(viewMovie)
  .post(upload.single("img"), addMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;

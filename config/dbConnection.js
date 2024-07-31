const mongoose = require("mongoose");
const logger = require("../util/logger");

const connectDB = async () => {
  // const conn = await mongoose.connect(process.env.LOCALHOST_MONGO_URI);
  const conn = await mongoose.connect(process.env.LOCALHOST_MONGO_URI);
  // if the below given connection string doesn't work then make sure to use above localhost uri
  return conn;
};

// const connectDB = new Promise((resolve, reject) => {
//   const conn = mongoose.connect(process.env.MONGO_URI);
//   if (conn) {
//     // logger.info("Database connected");
//     resolve(conn);
//   } else {
//     logger.error();
//     reject("Database connection failed");
//   }
// });

module.exports = connectDB;

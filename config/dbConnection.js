const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connection successful: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Something went wrong: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
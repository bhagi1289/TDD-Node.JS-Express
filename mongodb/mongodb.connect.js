const MONGO_URL =
  "mongodb+srv://ramsai:123@cluster0.ufef7.mongodb.net/tdd?retryWrites=true&w=majority";
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(MONGO_URL), { userNewUrlParser: true };
  } catch (error) {
    console.error(error);
    console.error("Connecting to Mongo");
  }
}

module.exports = { connect };

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectingToDB =  async () => {
  try {
    console.log("Before connecting to DB");
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
    console.log("Database is connecting");

  } catch (error) {
     console.log(error);
  }

}

module.exports = connectingToDB;

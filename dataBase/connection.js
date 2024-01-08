const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/music_app");
    console.log("currently connected to music_app data base");
  } catch (error) {
    console.log(error);
    throw new Error("Impossible to conenct to music_app database");
  }
};

module.exports = connection;

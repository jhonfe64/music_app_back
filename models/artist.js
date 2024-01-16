const { Schema, model } = require("mongoose");

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  artisticName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default.png",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "artist",
  },
});

module.exports = model("Artist", ArtistSchema, "artists");

const { Schema, model } = require("mongoose");

const AlbumSchema = new Schema({
  artist: {
    type: Schema.ObjectId,
    ref: "Artist",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  gendre: {
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
});

module.exports = model("Album", AlbumSchema, "albums");

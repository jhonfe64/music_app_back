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
    type: string,
    required: true,
  },
  year: {
    type: string,
    required: true,
  },
  image: {
    type: String,
    default: "default.png",
  },
  releaseYear: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Album", AlbumSchema, "albums");

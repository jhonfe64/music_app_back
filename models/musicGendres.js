const { Schema, model } = require("mongoose");

const MusicGendreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model("MusicGendre", MusicGendreSchema, "musicGendres");

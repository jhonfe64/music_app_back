const MusicGendres = require("../models/musicGendres");

const test = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Controlador de album",
  });
};

const musicGendre = async (req, res) => {
  try {
    const gendres = await MusicGendres.find();
    if (!gendres && gendres.length <= 0) {
      return res.status(400).json({
        status: "error",
        message: "No existen generos musicales",
      });
    }
    return res.status(200).json({
      status: "success",
      gendres: gendres,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: "error " + error,
    });
  }
};

const upload = (req, res) => {
  body = req.body;
  return res.status(200).json({
    status: "success",
    message: "SE VA A SUBIR UN ALBUM",
    album: body,
  });
};

module.exports = {
  test,
  upload,
  musicGendre,
};

const MusicGendres = require("../models/musicGendres");
const formatSimpleBody = require("../helpers/formatSimpleBody");
const validateLong = require("../helpers/validateLong");
const Album = require("../models/album");

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
      message: "error ",
    });
  }
};

const upload = async (req, res) => {
  //validar que el nombre del album ya no exista en la base de datos
  body = req.body;
  const { id } = req.user; //id del artista que inicia sesion

  const formattedBody = formatSimpleBody(body);
  const isEmpty = validateLong(formattedBody);

  if (isEmpty) {
    return res.status(400).json({
      status: "Bad request",
      message: "Hay campos vacios",
    });
  }

  try {
    const album = await Album.find({ title: formattedBody.title });

    existing_album = false;

    album.map((album) => {
      if (
        album.artist._id.valueOf() === id &&
        album.title === formattedBody.title
      ) {
        existing_album = true;
      }
    });

    if (existing_album == true) {
      return res.status(500).json({
        status: "error",
        message: "ya tienes otro album con este nombre",
      });
    }

    const newAlbum = new Album(formattedBody);
    const albumSaved = (await newAlbum.save()).toObject();

    if (albumSaved) {
      return res.status(200).json({
        status: "success",
        newAlbum,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "hay un error con la peticion" + error,
    });
  }
};
module.exports = {
  test,
  upload,
  musicGendre,
};

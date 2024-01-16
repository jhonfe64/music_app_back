const formatSimpleBody = require("../helpers/formatSimpleBody");
const validateEmail = require("../helpers/validateEmail");
const validateLong = require("../helpers/validateLong");
const Artist = require("../models/artist");
const bcrypt = require("bcrypt");

const test = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "controlador de artista",
  });
};

const signUp = async (req, res) => {
  const body = req.body;

  const formattedBody = formatSimpleBody(body);

  const isEmpty = validateLong(formattedBody);

  if (isEmpty) {
    return res.status(400).json({
      status: "Bad request",
      message: "Alguno de los campos esta vacio",
    });
  }

  const isEmail = validateEmail(formattedBody?.email);

  if (!isEmail) {
    return res.status(400).json({
      status: "Bad request",
      message: "La direccion de email no es valida",
    });
  }

  const newArtist = new Artist(formattedBody);

  try {
    const user = await Artist.findOne({
      $or: [
        { email: formattedBody.email },
        { artisticName: formattedBody.artisticName },
      ],
    });

    if (user?.artisticName === formattedBody.artisticName) {
      return res.status(409).json({
        status: "Conflict",
        message: "El nombre de artista ya esta registrado",
      });
    }
    if (user?.email === formattedBody.email) {
      return res.status(409).json({
        status: "Conflict",
        message: "El correo ya esta registrado",
      });
    }

    const hash = bcrypt.hashSync(newArtist.password, 12);
    newArtist.password = hash;

    const artistSaved = (await newArtist.save()).toObject();
    delete artistSaved.password;

    return res.status(200).json({
      status: "success",
      artist: artistSaved,
    });

  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: "hay un error" + error,
      error,
    });
  }
};

module.exports = {
  test,
  signUp,
};

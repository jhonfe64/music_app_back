const formatSimpleBody = require("../helpers/formatSimpleBody");
const validateEmail = require("../helpers/validateEmail");
const validateLong = require("../helpers/validateLong");
const Artist = require("../models/artist");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/jwt");

const test = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "controlador de artista",
  });
};

//registrar nuevo artista
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
    //verificar que ni exista el usuario
    const artist = await Artist.findOne({
      $or: [
        { email: formattedBody.email },
        { artisticName: formattedBody.artisticName },
      ],
    });

    if (artist?.artisticName === formattedBody.artisticName) {
      return res.status(409).json({
        status: "Conflict",
        message: "El nombre de artista ya esta registrado",
      });
    }
    if (artist?.email === formattedBody.email) {
      return res.status(409).json({
        status: "Conflict",
        message: "El correo ya esta registrado",
      });
    }

    const user = await User.findOne({
      $or: [
        { email: formattedBody.email },
        { nick: formattedBody.artisticName },
      ],
    });

    if (user && user._id) {
      return res.status(400).json({
        status: "bad request",
        message:
          "Ya tienes una cuenta de usuario, utiliza un correo y/o nombre artistico diferentes para registrarte como artista",
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

//logear artista
const login = async (req, res) => {
  const body = req.body;

  const formattedBody = formatSimpleBody(body);

  const isEmail = validateEmail(formattedBody.email);

  if (!isEmail) {
    return res.status(400).json({
      status: "Bad request",
      message: "La direccion de email no es valida",
    });
  }

  const isEmpty = validateLong(formattedBody);

  if (isEmpty) {
    return res.status(400).json({
      status: "Bad request",
      message: "Uno de los capos esta vacio",
    });
  }

  try {
    const artist = await Artist.findOne({ email: formattedBody.email }).select(
      "+password"
    );

    if (!artist && !artist?._id) {
      return res.status(404).json({
        status: "error",
        message: "Email incorrecto",
      });
    }

    const pwdStatus = bcrypt.compareSync(
      formattedBody.password,
      artist.password
    );
    if (!pwdStatus) {
      return res.status(401).json({
        status: "unAuthorized",
        message: "Contraseña incorrecta",
      });
    }

    //crear el token y enviarlo al objeto req
    const token = createToken(artist);

    return res.status(200).json({
      status: "success",
      id: artist._id,
      name: artist.name,
      artisticName: artist.artisticName,
      email: artist.email,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      status: "not found",
      message: "No se ha encontrado el artista",
    });
  }
};

//traer un usuario por id el id se saca de las cabeceras al iniciar sesion
const single = async (req, res) => {
  const { id } = req.user;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({
        status: "Not found",
        message: "No se enncontro el artista",
      });
    }
    return res.status(200).json({
      status: "success",
      artist,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Not found",
      message: "No se encontro el artista",
    });
  }
};

//actualizar info de artista
const update = async (req, res) => {
  const { id } = req.user;
  const body = req.body;

  const formattedBody = formatSimpleBody(body);
  const isEmpty = validateLong(formattedBody);

  if (isEmpty) {
    return res.status(400).json({
      status: "Bad request",
      message: "Hay campos vacios",
    });
  }

  try {
    const updatedArtist = await Artist.findOneAndUpdate(
      { _id: id },
      formattedBody,
      { new: true }
    );
    if (!updatedArtist) {
      return res.status(404).json({
        status: "Not found",
        message: "No se actualizó  el perfil",
      });
    }
    return res.status(200).json({
      status: "success",
      updatedArtist,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Not found",
      message: "No se encontro el artista",
    });
  }
};

//actualizar password de artista
const password = async (req, res) => {
  const { password } = req.body;
  const { id } = req.user;

  try {
    const hash = bcrypt.hashSync(password, 12);

    const updatedArtist = await Artist.findOneAndUpdate(
      { _id: id },
      { password: hash },
      { new: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({
        status: "Not found",
        message: "No se encontro el artista",
      });
    }

    return res.status(200).json({
      status: "success",
      artist: updatedArtist,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Not found",
      message: "No se pudo actualizar la contraseña",
    });
  }
};

module.exports = {
  test,
  signUp,
  login,
  single,
  update,
  password,
};

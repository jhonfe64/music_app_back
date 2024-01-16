const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateLong = require("../helpers/validateLong");
const validateEmail = require("../helpers/validateEmail");
const formatSimpleBody = require("../helpers/formatSimpleBody");
const jwt = require("jwt-simple");
const { createToken, secret } = require("../services/jwt");

const test = (req, res) => {
  return res.status(200).send({
    status: "sucess",
    message: "Controlador de prueba USER",
  });
};

const home = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Controlador del home de usuario",
  });
};

//registrar usuario
const signUp = async (req, res) => {
  const body = req.body;

  //formatear el body
  const formatedBody = formatSimpleBody(body);

  //validar long del body formateado
  const isEmpty = validateLong(formatedBody);

  if (isEmpty) {
    return res.status(400).json({
      status: "error",
      message: "Alguno de los campos esta vacio",
    });
  }
  //verificar que sea un email
  isEmail = validateEmail(formatedBody.email);
  if (!isEmail) {
    return res.status(400).json({
      status: "error",
      message: "La direccion de email no es valida",
    });
  }
  //crear el objeto usuario
  const newUser = new User(formatedBody);
  try {
    //verificar que el usuario no exista ya
    const user = await User.find({
      $or: [{ email: newUser.email }, { nick: newUser.nick }],
    });
    if (user && user.length >= 1) {
      return res.status(409).send({
        status: "error",
        message: "El correo o el nick ya estan registrados",
      });
    }
    //encriptar la contaseña
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    //Guardar el objeto
    const userSaved = (await newUser.save()).toObject();
    delete userSaved.password;
    if (userSaved) {
      return res.status(200).json({
        status: "success",
        user: userSaved,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "No se pudo guardar el usuario" + error,
    });
  }
};

//logear el usuario

const login = async (req, res) => {
  const body = req.body;

  const isEmpty = validateLong(body);

  if (isEmpty) {
    return res.status(400).json({
      status: "error",
      message: "Alguno de los campos esta vacio",
    });
  }

  const isEmail = validateEmail(body.email);

  if (!isEmail) {
    return res.status(400).json({
      status: "error",
      message: "La direccion de email no es valida",
    });
  }

  //Body formaateado
  const formatedBody = formatSimpleBody(body);

  try {
    const user = await User.findOne({ email: formatedBody?.email }).select(
      "+password"
    );
    if (!user && !user?._id) {
      return res.status(404).json({
        status: "error",
        message: "Email incorrecto",
      });
    }
    const pwdStatus = bcrypt.compareSync(formatedBody.password, user.password);
    if (!pwdStatus) {
      return res.status(401).json({
        status: "unAuthorized",
        message: "Contraseña incorrecta",
      });
    }

    //crear el token y enviarlo al objeto req
    const token = createToken(user);

    return res.status(200).json({
      status: "succes",
      name: user.name,
      nick: user.nick,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: "No se ha encontrado el usuario" + error,
    });
  }
};

module.exports = {
  test,
  home,
  signUp,
  login,
};

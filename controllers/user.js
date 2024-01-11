const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateLong = require("../helpers/validateLong");
const validateEmail = require("../helpers/validateEmail");

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
  //validar long del body
  const isEmpty = validateLong(body);
  if (isEmpty) {
    return res.status(400).json({
      status: "error",
      message: "Alguno de los campos esta vacio",
    });
  }
  //verificar que sea un email
  isEmail = validateEmail(body.email);
  if (!isEmail) {
    return res.status(400).json({
      status: "error",
      message: "La direccion de email no es valida",
    });
  }
  //crear el objeto usuario
  const newUser = new User(body);
  try {
    //verificar que el usuario no exista ya
    const user = await User.find({
      $or: [{ email: newUser.email }, { nick: newUser.nick }],
    });
    if (user && user.length >= 1) {
      return res.status(409).json({
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

module.exports = {
  test,
  home,
  signUp,
};

//se recibe el token en la cabercera en el objeto req
const { secret } = require("../services/jwt");
const jwt = require("jwt-simple");

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).json({
      status: "error",
      message: "La cabecera no tiene token de autorizaciòn" + error,
    });
  }

  let token = req.headers.authorization
    ? req.headers.authorization.replace(/["']+/g, "")
    : null;

  try {
    const payload = jwt.decode(token, secret);

    if (payload) {
      req.user = payload;
    }
  } catch (error) {
    return res.status(404).json({
      status: "Unauthorized",
      message: "Token invalido" + error,
    });
  }
  next();
};

module.exports = auth;

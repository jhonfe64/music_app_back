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

module.exports = {
  test,
  home,
};

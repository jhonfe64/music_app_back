const testUser = (req, res) => {
  return res.status(200).send({
    status: "sucess",
    message: "Controlador de prueba USER",
  });
};

module.exports = {
  testUser,
};

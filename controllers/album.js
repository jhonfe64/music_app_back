const test = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Controlador de album",
  });
};

module.exports = {
  test,
};

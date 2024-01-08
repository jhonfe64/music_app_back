const test = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "controlador de artista",
  });
};

module.exports = {
  test,
};

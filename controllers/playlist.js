const test = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "ccontrolador de playlist",
  });
};

module.exports = {
  test,
};

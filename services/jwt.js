const crypto = require("crypto");
const secret = crypto.randomBytes(32);
const jwt = require("jwt-simple");

const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    nick: user.nick,
    email: user.email,
    rol: user.role,
    image: user.image,
  };
  return jwt.encode(payload, secret);
};

module.exports = {
  createToken,
  secret,
};

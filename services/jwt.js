const crypto = require("crypto");
const secret =
  "a02efb8b6b2f32942bd9c55e5038bfc981285176cfe503d0b05c58dbfb250b50";
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

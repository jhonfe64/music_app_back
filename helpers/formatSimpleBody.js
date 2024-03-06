//Este helper capitaliza strings que esten dentro un objeto menos las keys que se llamen email y password
//la key email se transforma a lowercase
//el resto de keys y valores se pasan sin transformar
//se usa solo para transformar valores del body que vienen del USER (front)

const capitalize = require("capitalize");

const formatSimpleBody = (body) => {
  const formatedBody = {};

  for (key in body) {
    if (
      key !== "email" &&
      key !== "password" &&
      typeof body[key] === "string" &&
      key !== "artist"
    ) {
      formatedBody[key] = capitalize.words(body[key]);
    } else if (key === "email") {
      formatedBody[key] = body[key].toLowerCase();
    } else {
      formatedBody[key] = body[key];
    }
  }

  return formatedBody;
};

module.exports = formatSimpleBody;

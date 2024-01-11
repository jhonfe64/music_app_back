//validar que los elementos de un objeto no vengan vacios (solo valida strings)
const validator = require("validator");

const validateLong = (data) => {
  const values = Object.values(data);
  //true => alguna propiedad esta vacia
  //false => ninguna propiedad esta vacia
  return values.some((valor) => validator.isEmpty(valor) === true);
};

module.exports = validateLong;

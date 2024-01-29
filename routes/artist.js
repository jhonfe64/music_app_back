const express = require("express");
const router = express.Router();
const {
  test,
  signUp,
  login,
  single,
  update,
  password,
} = require("../controllers/artist");
const auth = require("../middlewares/auth");

router.get("/test", test);
//registrar artistas
router.post("/sign-up", signUp);
//logear artistas
router.post("/login", login);
//traer un artista
router.get("/single", auth, single);
//Editar usuario
router.put("/update", auth, update);
//actualizar password
router.put("/password", auth, password);

module.exports = router;

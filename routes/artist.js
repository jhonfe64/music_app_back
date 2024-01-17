const express = require("express");
const router = express.Router();
const { test, signUp, login, single } = require("../controllers/artist");
const auth = require("../middlewares/auth");

router.get("/test", test);
//registrar artistas
router.post("/sign-up", signUp);
//logear artistas
router.post("/login", login);
//info de un artista
router.get("/single/:id", single);

module.exports = router;

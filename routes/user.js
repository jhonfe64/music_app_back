const express = require("express");
const router = express.Router();

const { test, home, signUp } = require("../controllers/user");

router.get("/test", test);
//esta ruta entregara los ultimos artistas agregados o las ultimas canciones
router.get("/home", home);
//registro de usaurio
router.post("/sign-up", signUp);

module.exports = router;

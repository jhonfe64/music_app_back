const express = require("express");
const router = express.Router();
const { test, signUp, login } = require("../controllers/artist");
const auth = require("../middlewares/auth");

router.get("/test", test);
router.post("/sign-up", signUp);
router.post("/login", login);

module.exports = router;

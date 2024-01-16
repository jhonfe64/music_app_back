const express = require("express");
const router = express.Router();
const { test, signUp } = require("../controllers/artist");

router.get("/test", test);
router.post("/sign-up", signUp);

module.exports = router;

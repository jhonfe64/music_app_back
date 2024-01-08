const express = require("express");
const router = express.Router();
const { test } = require("../controllers/playlist");

router.get("/test", test);

module.exports = router;

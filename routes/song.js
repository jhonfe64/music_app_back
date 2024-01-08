const express = require("express");
const router = express.Router();
const { test } = require("../controllers/song");

router.get("/test", test);

module.exports = test;

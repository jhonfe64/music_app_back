const express = require("express");
const router = express.Router();

const { test, home } = require("../controllers/user");

router.get("/test", test);
router.get("/home", home);

module.exports = router;

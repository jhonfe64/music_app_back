const express = require("express");
const router = express.Router();
const { test, upload, musicGendre } = require("../controllers/album");
const auth = require("../middlewares/auth");

router.get("/test", test);
router.post("/upload", auth, upload);
router.get("/music-gendres", auth, musicGendre);

module.exports = router;

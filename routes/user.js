const express = require("express");
const router = express.Router();

const { testUser } = require("../controllers/user");

router.get("/test", testUser);

module.exports = router;

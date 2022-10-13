const express = require("express");
const { route } = require("../app");
const router = express.Router();

const userControler = require("../controlers/user.controler");

router.post("/signup", userControler.signup);

module.exports = router;

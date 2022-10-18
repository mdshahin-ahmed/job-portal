const express = require("express");
const { route } = require("../app");
const router = express.Router();

const userControler = require("../controlers/user.controler");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", userControler.signup);
router.post("/login", userControler.login);
router.get("/me", verifyToken, userControler.getMe);
router.get(
  "/allUsers",
  verifyToken,
  authorization("admin"),
  userControler.allUsers
);
router.patch(
  "/:id",
  verifyToken,
  authorization("admin"),
  userControler.updateUser
);

module.exports = router;

const express = require("express");
const router = express.Router();

const applyControler = require("../controlers/apply.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/apply")
  .get(
    verifyToken,
    authorization("hiring-manager", "admin"),
    applyControler.getAllApply
  );

router.route("/:id/apply").post(applyControler.createApply);

module.exports = router;

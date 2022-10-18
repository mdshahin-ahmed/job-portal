const express = require("express");
const router = express.Router();
const jobControler = require("../controlers/job.controler");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/jobs")
  .post(
    verifyToken,
    authorization("hiring-manager", "admin"),
    jobControler.createJob
  )
  .get(jobControler.getJob);
router
  .route("/manager/jobs")
  .get(
    verifyToken,
    authorization("hiring-manager", "admin"),
    jobControler.getManagerJob
  );
router.route("/jobs/:id").get(jobControler.getJobById);

router
  .route("/manager/jobs/:id")
  .get(
    verifyToken,
    authorization("hiring-manager", "admin"),
    jobControler.getManagerJobById
  );
router
  .route("/jobs/:id")
  .patch(
    verifyToken,
    authorization("hiring-manager", "admin"),
    jobControler.updateJobById
  );

module.exports = router;

const express = require("express");
const router = express.Router();
const jobControler = require("../controlers/job.controler");

router.route("/job").post(jobControler.createJob).get(jobControler.getJob);

module.exports = router;

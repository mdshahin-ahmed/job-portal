const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// routes
const jobRoute = require("./routs/job.route");
const userRoute = require("./routs/user.route");
const applyRoute = require("./routs/apply.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to detabase
app.use("/api/v1", jobRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/jobs", applyRoute);

module.exports = app;

/**
 * role done*******
 *
 * manager role==========
 * post job done***********
 * get manager all job done**********
 * get manager job id with apply details done **********
 * update job Done*********
 *
 * candidate role ===========
 * get all job done*********
 * get job by id with detais with hiring manager done****************
 * apply job done ****************
 *
 * if already apply can't apply again done *************
 * if date over can't apply
 *
 * auth route done *********
 * signup Done *********
 * login done **********
 * me done ***********
 *
 * must be able to filter jobs by location, job type, salary range(BONUS) done **************
 * Must be able to sort jobs(BONUS) done ******************
 *
 * 7-05
 */

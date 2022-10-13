const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// routes
const jobRoute = require("./routs/job.route");
const userRoute = require("./routs/user.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to detabase
app.use("/api/v1", jobRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;

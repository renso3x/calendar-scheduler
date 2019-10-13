const express = require("express");

const errors = require("../middleware/error");
const isAuth = require("../middleware/is-auth");
const userRouter = require("../routes/user.router");
const authRouter = require("../routes/auth.router");
const scheduleRouter = require("../routes/schedule.router");

module.exports = function(app) {
  app.use(express.json());
  app.use(isAuth);

  app.use("/api/user", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/schedule", scheduleRouter);

  app.use(errors);
};

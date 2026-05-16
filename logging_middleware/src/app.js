const express = require("express");

const requestLogger = require("./middleware/requestLogger");
const errorLogger = require("./middleware/errorLogger");

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/health", (req, res) => {

  res.status(200).json({
    success: true,
    message: "server is running"
  });

});

app.get("/error", (req, res) => {

  throw new Error("test route error");

});

app.use(errorLogger);

module.exports = app;
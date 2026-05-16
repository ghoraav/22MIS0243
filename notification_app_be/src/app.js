const express = require("express");

const notificationRoutes =
  require("./routes/notificationRoutes");

const requestLogger =
  require("./middleware/requestLogger");

const errorLogger =
  require("./middleware/errorLogger");

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/health", (req, res) => {

  res.status(200).json({
    success: true,
    service: "notification service",
    status: "running"
  });

});

app.use(
  "/notifications",
  notificationRoutes
);

app.use(errorLogger);

module.exports = app;
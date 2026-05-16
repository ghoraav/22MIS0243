const express = require("express");

const schedulerRoutes = require("./routes/schedulerRoutes");

const requestLogger = require("./middleware/requestLogger");
const errorLogger = require("./middleware/errorLogger");

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/schedule", schedulerRoutes);

app.use(errorLogger);

module.exports = app;
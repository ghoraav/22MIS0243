const Log = require("../logger");
const formatMessage = require("../utils/formatMessage");

async function requestLogger(req, res, next) {

  const startTime = Date.now();

  res.on("finish", async () => {

    const responseTime = Date.now() - startTime;

    const message = formatMessage(req, responseTime);

    await Log(
      "backend",
      "info",
      "middleware",
      message
    );

  });

  next();
}

module.exports = requestLogger;
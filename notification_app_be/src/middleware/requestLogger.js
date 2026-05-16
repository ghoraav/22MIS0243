const Log = require(
  "../../../logging_middleware/src/logger"
);

async function requestLogger(req, res, next) {

  const startTime = Date.now();

  res.on("finish", async () => {

    const responseTime =
      Date.now() - startTime;

    const message =
      `${req.method} ${req.originalUrl} | ` +
      `Status: ${res.statusCode} | ` +
      `${responseTime}ms`;

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
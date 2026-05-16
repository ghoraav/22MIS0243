const Log = require("../logger");

async function errorLogger(err, req, res, next) {

  await Log(
    "backend",
    "error",
    "middleware",
    err.message
  );

  res.status(500).json({
    success: false,
    error: err.message
  });
}

module.exports = errorLogger;
function formatMessage(req, resTime) {

  return `${req.method} ${req.originalUrl} | Status: ${req.statusCode} | ${resTime}ms`;

}

module.exports = formatMessage;
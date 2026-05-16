const getAuthToken = require("../services/authService");

let token = null;

async function initializeToken() {

  if (!token) {
    token = await getAuthToken();
  }

  return token;
}

module.exports = initializeToken;
const axios = require("axios");

let cachedToken = null;

async function getAuthToken() {

  if (cachedToken) {
    return cachedToken;
  }

  const response = await axios.post(
    `${process.env.BASE_URL}/evaluation-service/auth`,
    {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }
  );

  cachedToken = response.data.access_token;

  return cachedToken;
}

module.exports = getAuthToken;
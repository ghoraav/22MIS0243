const sendLog = require("./services/logService");

const {
  STACKS,
  LEVELS,
  BACKEND_PACKAGES
} = require("./utils/constants");

async function Log(stack, level, packageName, message) {

  try {

    if (!STACKS.includes(stack)) {
      throw new Error("Invalid stack value");
    }

    if (!LEVELS.includes(level)) {
      throw new Error("Invalid level value");
    }

    if (!BACKEND_PACKAGES.includes(packageName)) {
      throw new Error("Invalid package value");
    }

    const payload = {
      stack,
      level,
      package: packageName,
      message
    };

    return await sendLog(payload);

  } catch (error) {

    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = Log;
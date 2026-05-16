const express = require("express");

const getPriorityNotifications =
  require("../services/priorityService");

const router = express.Router();

router.get("/", async (req, res, next) => {

  try {

    const notifications =
      await getPriorityNotifications();

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications
    });

  } catch (error) {

    next(error);

  }
});

module.exports = router;
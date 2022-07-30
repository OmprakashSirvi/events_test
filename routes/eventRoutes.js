const express = require("express");
const eventController = require("../controller/eventController");

const router = express.Router();

router
  .route("/")
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route("/:id")
  .get(eventController.getEventById)
  .put(eventController.updateEvent)
  .delete(eventController.delteEvent);

module.exports = router;

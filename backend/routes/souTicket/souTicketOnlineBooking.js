const express = require("express");
const router = express.Router();
const controller = require("../../controller/souTicket/souTicketOnlineBooking.controller");

router.get("/", controller.getAllBookings);
router.post("/", controller.insertBooking);
router.put("/:id", controller.updateBooking);
router.delete("/:id", controller.deleteBooking);
router.patch("/restore/:id", controller.restoreBooking);
router.get("/data/:id", controller.getBookingById);
router.get("/trashed", controller.getTrashedBookings);

module.exports = router;

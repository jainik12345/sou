const express = require("express");
const router = express.Router();
const controller = require("../../controller/souTicket/souTicketInsideEventPrice.controller");

router.get("/", controller.getAllTicketPrices);
router.post("/", controller.insertTicketPrice);
router.put("/:id", controller.updateTicketPrice);
router.delete("/:id", controller.deleteTicketPrice);
router.patch("/restore/:id", controller.restoreTicketPrice);
router.get("/data/:id", controller.getTicketPriceById);
router.get("/trashed", controller.getTrashedTicketPrices);

module.exports = router;
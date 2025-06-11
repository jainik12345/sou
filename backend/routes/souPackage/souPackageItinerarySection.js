const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageItinerarySection.controller");

router.get("/", controller.getAllItinerarySections);
router.post("/", controller.insertItinerarySection);
router.put("/:id", controller.updateItinerarySection);
router.delete("/:id", controller.deleteItinerarySection);
router.patch("/restore/:id", controller.restoreItinerarySection);
router.get("/itinerary/:itineraryId", controller.getItinerarySectionsByItineraryId);
router.get(
  "/trashed/itinerary/:itineraryId",
  controller.getTrashedItinerarySectionsByItineraryId
);
router.get("/data/:id", controller.getItinerarySectionById);

module.exports = router;
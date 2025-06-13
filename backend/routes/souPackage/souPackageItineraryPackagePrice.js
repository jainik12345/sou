const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageItineraryPackagePrice.controller");

router.get("/", controller.getAllItineraryPackagePrices);
router.post("/", controller.insertItineraryPackagePrice);
router.put("/:id", controller.updateItineraryPackagePrice);
router.delete("/:id", controller.deleteItineraryPackagePrice);
router.patch("/restore/:id", controller.restoreItineraryPackagePrice);
router.get(
  "/itinerary/:itineraryId",
  controller.getItineraryPackagePricesByItineraryId
);
router.get(
  "/trashed/itinerary/:itineraryId",
  controller.getTrashedItineraryPackagePricesByItineraryId
);
router.get("/data/:id", controller.getItineraryPackagePriceById);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageItineraryName.controller");

router.get("/", controller.getAllItineraryNames);
router.post("/", controller.insertItineraryName);
router.put("/:id", controller.updateItineraryName);
router.delete("/:id", controller.deleteItineraryName);
router.patch("/restore/:id", controller.restoreItineraryName);
router.get("/package/:packageId", controller.getItineraryNamesByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedItineraryNamesByPackageId
);
router.get("/data/:id", controller.getItineraryNameById);

module.exports = router;

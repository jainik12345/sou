const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageAmenities.controller");

router.get("/", controller.getAllAmenities);
router.post("/", controller.insertAmenity);
router.put("/:id", controller.updateAmenity);
router.delete("/:id", controller.deleteAmenity);
router.patch("/restore/:id", controller.restoreAmenity);
router.get("/package/:packageId", controller.getAmenitiesByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedAmenitiesByPackageId
);
router.get("/data/:id", controller.getAmenityById);

module.exports = router;
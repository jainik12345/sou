const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageBookLayer.controller");

router.get("/", controller.getAllPackageBookLayers);
router.post("/", controller.insertPackageBookLayer);
router.put("/:id", controller.updatePackageBookLayer);
router.delete("/:id", controller.deletePackageBookLayer);
router.patch("/restore/:id", controller.restorePackageBookLayer);
router.get("/package/:packageId", controller.getPackageBookLayersByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedPackageBookLayersByPackageId
);
router.get("/data/:id", controller.getPackageBookLayerById);

module.exports = router;

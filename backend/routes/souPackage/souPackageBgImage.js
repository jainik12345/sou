const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageBgImage.controller");

router.get("/", controller.getAllPackageBgImages);
router.post("/", controller.insertPackageBgImage);
router.put("/:id", controller.updatePackageBgImage);
router.delete("/:id", controller.deletePackageBgImage);
router.patch("/restore/:id", controller.restorePackageBgImage);
router.get("/package/:packageId", controller.getPackageBgImagesByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedPackageBgImagesByPackageId
);
router.get("/data/:id", controller.getPackageBgImageById);

module.exports = router;

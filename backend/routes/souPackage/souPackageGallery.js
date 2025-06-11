const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageGallery.controller");

router.get("/", controller.getAllPackageGalleries);
router.post("/", controller.insertPackageGallery);
router.put("/:id", controller.updatePackageGallery);
router.delete("/:id", controller.deletePackageGallery);
router.patch("/restore/:id", controller.restorePackageGallery);
router.get("/package/:packageId", controller.getPackageGalleriesByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedPackageGalleriesByPackageId
);
router.get("/data/:id", controller.getPackageGalleryById);

module.exports = router;

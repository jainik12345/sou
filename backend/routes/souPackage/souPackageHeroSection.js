const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageHeroSection.controller");

router.get("/", controller.getAllHeroSections);
router.post("/", controller.insertHeroSection);
router.put("/:id", controller.updateHeroSection);
router.delete("/:id", controller.deleteHeroSection);
router.patch("/restore/:id", controller.restoreHeroSection);
router.get("/package/:packageId", controller.getHeroSectionsByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedHeroSectionsByPackageId
);
router.get("/data/:id", controller.getHeroSectionById);

module.exports = router;
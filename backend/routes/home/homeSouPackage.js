const express = require("express");
const router = express.Router();
const controller = require("../../controller/home/homeSouPackage.controller");

router.get("/", controller.getAllHomeSouPackages);
router.post("/", controller.insertHomeSouPackage);
router.put("/:id", controller.updateHomeSouPackage);
router.delete("/:id", controller.deleteHomeSouPackage);
router.patch("/restore/:id", controller.restoreHomeSouPackage);
router.get("/package/:packageId", controller.getHomeSouPackagesByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedHomeSouPackagesByPackageId
);
router.get("/data/:id", controller.getHomeSouPackageById);

module.exports = router;
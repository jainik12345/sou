const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageLakeView.controller");

router.get("/", controller.getAllLakeViews);
router.post("/", controller.insertLakeView);
router.put("/:id", controller.updateLakeView);
router.delete("/:id", controller.deleteLakeView);
router.patch("/restore/:id", controller.restoreLakeView);
router.get("/package/:packageId", controller.getLakeViewsByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedLakeViewsByPackageId
);
router.get("/data/:id", controller.getLakeViewById);
router.get("/distinct/week", controller.getDistinctWeeks);

module.exports = router;

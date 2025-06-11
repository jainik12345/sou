const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageResort.controller");

router.get("/", controller.getAllResorts);
router.post("/", controller.insertResort);
router.put("/:id", controller.updateResort);
router.delete("/:id", controller.deleteResort);
router.patch("/restore/:id", controller.restoreResort);
router.get("/package/:packageId", controller.getResortsByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedResortsByPackageId
);
router.get("/data/:id", controller.getResortById);

module.exports = router;

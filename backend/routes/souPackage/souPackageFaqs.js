const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageFaqs.controller");

router.get("/", controller.getAllFaqs);
router.post("/", controller.insertFaq);
router.put("/:id", controller.updateFaq);
router.delete("/:id", controller.deleteFaq);
router.patch("/restore/:id", controller.restoreFaq);
router.get("/package/:packageId", controller.getFaqsByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedFaqsByPackageId
);
router.get("/data/:id", controller.getFaqById);

module.exports = router;
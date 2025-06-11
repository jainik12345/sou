const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageParagraph.controller");

router.get("/", controller.getAllParagraphs);
router.post("/", controller.insertParagraph);
router.put("/:id", controller.updateParagraph);
router.delete("/:id", controller.deleteParagraph);
router.patch("/restore/:id", controller.restoreParagraph);
router.get("/package/:packageId", controller.getParagraphsByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedParagraphsByPackageId
);
router.get("/data/:id", controller.getParagraphById);

module.exports = router;
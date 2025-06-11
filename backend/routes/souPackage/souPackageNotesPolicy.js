const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageNotesPolicy.controller");

router.get("/", controller.getAllNotesPolicies);
router.post("/", controller.insertNotesPolicy);
router.put("/:id", controller.updateNotesPolicy);
router.delete("/:id", controller.deleteNotesPolicy);
router.patch("/restore/:id", controller.restoreNotesPolicy);
router.get("/package/:packageId", controller.getNotesPoliciesByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedNotesPoliciesByPackageId
);
router.get("/data/:id", controller.getNotesPolicyById);

module.exports = router;

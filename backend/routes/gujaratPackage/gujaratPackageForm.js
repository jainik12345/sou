const router = require("express").Router();
const Controller = require("../../controller/gujaratPackage/gujaratPackageForm.controller");

router.get("/", Controller.getGujaratPackageForm);
router.post("/", Controller.insertGujaratPackageForm);
router.post("/reply", Controller.replyToGujaratPackageForm);
router.get("/trashed", Controller.getTrashedGujaratPackageForm);
router.delete("/:id", Controller.deleteGujaratPackageForm);
router.patch("/restore/:id", Controller.restoreGujaratPackageForm);

module.exports = router;
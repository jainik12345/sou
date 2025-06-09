const router = require("express").Router();
const gujaratPackageController = require("../../controller/gujaratPackage/gujaratPackage.controller");

router.get("/", gujaratPackageController.getGujaratPackages);
router.post("/", gujaratPackageController.insertGujaratPackage);
router.put("/:id", gujaratPackageController.updateGujaratPackage);
router.delete("/:id", gujaratPackageController.deleteGujaratPackage);
router.get("/trashed", gujaratPackageController.getTrashedGujaratPackages);
router.patch("/restore/:id", gujaratPackageController.restoreGujaratPackage);

module.exports = router;
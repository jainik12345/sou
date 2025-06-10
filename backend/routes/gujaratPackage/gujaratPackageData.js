const router = require("express").Router();
const controller = require("../../controller/gujaratPackage/gujaratPackageData.controller");

router.get("/", controller.getGujaratPackageData);
router.get("/trashed", controller.getTrashedGujaratPackageData);
router.get("/data/:id", controller.getGujaratPackageDataById);
router.post("/", controller.insertGujaratPackageData);
router.put("/:id", controller.updateGujaratPackageData);
router.delete("/:id", controller.deleteGujaratPackageData);
router.patch("/restore/:id", controller.restoreGujaratPackageData);

router.get("/by-package/:id", controller.getPackageDataByPackageId);


module.exports = router;
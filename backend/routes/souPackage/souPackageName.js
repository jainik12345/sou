const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageName.controller");

router.get("/", controller.getSouPackages);
router.get("/:id", controller.getSouPackageById);
router.post("/", controller.insertSouPackage);
router.put("/:id", controller.updateSouPackage);
router.delete("/:id", controller.deleteSouPackage);
router.get("/trashed/list", controller.getTrashedSouPackages);
router.patch("/restore/:id", controller.restoreSouPackage);

 

module.exports = router;

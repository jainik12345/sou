const express = require("express");
const router = express.Router();
const controller = require("../../controller/souTicket/souTicketTourPackage.controller");

router.get("/", controller.getAllTourPackages);
router.post("/", controller.insertTourPackage);
router.put("/:id", controller.updateTourPackage);
router.delete("/:id", controller.deleteTourPackage);
router.patch("/restore/:id", controller.restoreTourPackage);
router.get("/package/:packageId", controller.getTourPackagesByPackageId);
router.get("/trashed", controller.getTrashedTourPackages);
router.get("/trashed/package/:packageId", controller.getTrashedTourPackagesByPackageId);
router.get("/data/:id", controller.getTourPackageById);

module.exports = router;
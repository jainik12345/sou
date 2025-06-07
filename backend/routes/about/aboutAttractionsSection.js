const router = require("express").Router();
const controller = require("../../controller/about/aboutAttractionsSection.controller");

router.get("/", controller.getAboutAttractions);
router.get("/trashed", controller.getTrashedAboutAttractions);
router.get("/:id", controller.getAboutAttractionsById);
router.post("/", controller.insertAboutAttractions);
router.put("/:id", controller.updateAboutAttractions);
router.delete("/:id", controller.deleteAboutAttractions);
router.patch("/restore/:id", controller.restoreAboutAttractions);

module.exports = router;
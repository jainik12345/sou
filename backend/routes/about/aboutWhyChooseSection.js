const router = require("express").Router();
const controller = require("../../controller/about/aboutWhyChooseSection.controller");

router.get("/", controller.getAboutWhyChoose);
router.get("/trashed", controller.getTrashedAboutWhyChoose);
router.get("/:id", controller.getAboutWhyChooseById);
router.post("/", controller.insertAboutWhyChoose);
router.put("/:id", controller.updateAboutWhyChoose);
router.delete("/:id", controller.deleteAboutWhyChoose);
router.patch("/restore/:id", controller.restoreAboutWhyChoose);

module.exports = router;
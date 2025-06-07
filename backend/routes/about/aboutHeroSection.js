const router = require("express").Router();
const controller = require("../../controller/about/aboutHeroSection.controller");

router.get("/", controller.getAboutHero);
router.get("/trashed", controller.getTrashedAboutHero);
router.get("/:id", controller.getAboutHeroById);
router.post("/", controller.insertAboutHero);
router.put("/:id", controller.updateAboutHero);
router.delete("/:id", controller.deleteAboutHero);
router.patch("/restore/:id", controller.restoreAboutHero);

module.exports = router;
const router = require("express").Router();
const controller = require("../../controller/about/aboutActivitiesSection.controller");

router.get("/", controller.getAboutActivities);
router.get("/trashed", controller.getTrashedAboutActivities);
router.get("/:id", controller.getAboutActivitiesById);
router.post("/", controller.insertAboutActivities);
router.put("/:id", controller.updateAboutActivities);
router.delete("/:id", controller.deleteAboutActivities);
router.patch("/restore/:id", controller.restoreAboutActivities);

module.exports = router;
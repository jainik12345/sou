const router = require("express").Router();
const controller = require("../../controller/home/homeNearAttractions.controller");

router.get("/", controller.getHomeNearAttractions);
router.get("/trashed", controller.getTrashedHomeNearAttractions);
router.get("/:id", controller.getHomeNearAttractionsById);
router.post("/", controller.insertHomeNearAttractions);
router.put("/:id", controller.updateHomeNearAttractions);
router.delete("/:id", controller.deleteHomeNearAttractions);
router.patch("/restore/:id", controller.restoreHomeNearAttractions);

module.exports = router;
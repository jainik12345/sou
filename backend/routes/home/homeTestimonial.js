const router = require("express").Router();
const controller = require("../../controller/home/homeTestimonial.controller");

router.get("/", controller.getHomeTestimonial);
router.get("/trashed", controller.getTrashedHomeTestimonial);
router.get("/:id", controller.getHomeTestimonialById);
router.post("/", controller.insertHomeTestimonial);
router.put("/:id", controller.updateHomeTestimonial);
router.delete("/:id", controller.deleteHomeTestimonial);
router.patch("/restore/:id", controller.restoreHomeTestimonial);

module.exports = router;
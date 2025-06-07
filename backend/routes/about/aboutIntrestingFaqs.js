const router = require("express").Router();
const controller = require("../../controller/about/aboutIntrestingFaqs.controller");

router.get("/", controller.getAboutIntrestingFaqs);
router.get("/trashed", controller.getTrashedAboutIntrestingFaqs);
router.get("/:id", controller.getAboutIntrestingFaqsById);
router.post("/", controller.insertAboutIntrestingFaqs);
router.put("/:id", controller.updateAboutIntrestingFaqs);
router.delete("/:id", controller.deleteAboutIntrestingFaqs);
router.patch("/restore/:id", controller.restoreAboutIntrestingFaqs);

module.exports = router;
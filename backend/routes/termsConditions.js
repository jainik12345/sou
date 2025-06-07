const router = require("express").Router();
const controller = require("../controller/termsConditions.controller");

router.route("/").get(controller.getTermsConditions);
router.post("/", controller.insertTermsConditions);
router.put("/:id", controller.updateTermsConditions);
router.delete("/:id", controller.deleteTermsConditions);
router.get("/trashed", controller.getTrashedTermsConditions);
router.patch("/restore/:id", controller.restoreTermsConditions);

module.exports = router;

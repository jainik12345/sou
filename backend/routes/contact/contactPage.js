const router = require("express").Router();
const controller = require("../../controller/contact/contactPage.controller");

router.get("/", controller.getContactPages);
router.get("/trashed", controller.getTrashedContactPages);
router.get("/:id", controller.getContactPageById);
router.post("/", controller.insertContactPage);
router.put("/:id", controller.updateContactPage);
router.delete("/:id", controller.deleteContactPage);
router.patch("/restore/:id", controller.restoreContactPage);

module.exports = router;

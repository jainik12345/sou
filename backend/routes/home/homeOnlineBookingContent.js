const router = require("express").Router();
const homeOnlineBookingContentController = require("../../controller/home/homeOnlineBookingContent.controller");

router.get("/", homeOnlineBookingContentController.getHomeOnlineBookingContents);
router.post("/", homeOnlineBookingContentController.insertHomeOnlineBookingContent);
router.put("/:id", homeOnlineBookingContentController.updateHomeOnlineBookingContent);
router.delete("/:id", homeOnlineBookingContentController.deleteHomeOnlineBookingContent);
router.get("/trashed", homeOnlineBookingContentController.getTrashedHomeOnlineBookingContents);
router.patch("/restore/:id", homeOnlineBookingContentController.restoreHomeOnlineBookingContent);

module.exports = router;
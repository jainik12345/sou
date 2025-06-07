const router = require("express").Router();
const privatePolicyController = require("../controller/privatePolicy.controller");

router.get("/", privatePolicyController.getPrivatePolicies);
router.post("/", privatePolicyController.insertPrivatePolicy);
router.put("/:id", privatePolicyController.updatePrivatePolicy);
router.delete("/:id", privatePolicyController.deletePrivatePolicy);
router.get("/trashed", privatePolicyController.getTrashedPrivatePolicies);
router.patch("/restore/:id", privatePolicyController.restorePrivatePolicy);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controller/souPackage/souPackageMealPlan.controller");

router.get("/", controller.getAllMealPlans);
router.post("/", controller.insertMealPlan);
router.put("/:id", controller.updateMealPlan);
router.delete("/:id", controller.deleteMealPlan);
router.patch("/restore/:id", controller.restoreMealPlan);
router.get("/package/:packageId", controller.getMealPlansByPackageId);
router.get(
  "/trashed/package/:packageId",
  controller.getTrashedMealPlansByPackageId
);
router.get("/data/:id", controller.getMealPlanById);

// New endpoints for distinct fields
router.get("/distinct/food_plans", controller.getDistinctFoodPlans);
router.get("/distinct/week", controller.getDistinctWeeks);

module.exports = router;

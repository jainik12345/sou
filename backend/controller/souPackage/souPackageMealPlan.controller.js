const db = require("../../config/db");

// Get all meal plans
exports.getAllMealPlans = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_meal_plan WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert meal plan
exports.insertMealPlan = (req, res) => {
  const { sou_package_id, week, food_plans, data } = req.body;

  if (!sou_package_id || !week || !food_plans || !data) {
    return res
      .status(400)
      .json({ error: "Package ID, Week, Food Plans, and Data are required" });
  }

  db.query(
    "INSERT INTO sou_package_meal_plan (sou_package_id, week, food_plans, data) VALUES (?, ?, ?, ?)",
    [sou_package_id, week, food_plans, JSON.stringify(data)],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Inserted",
        insertId: result.insertId,
      });
    }
  );
};

// Update meal plan
exports.updateMealPlan = (req, res) => {
  const { id } = req.params;
  const { sou_package_id, week, food_plans, data } = req.body;

  if (!sou_package_id || !week || !food_plans || !data) {
    return res
      .status(400)
      .json({ error: "Package ID, Week, Food Plans, and Data are required" });
  }

  db.query(
    "UPDATE sou_package_meal_plan SET sou_package_id = ?, week = ?, food_plans = ?, data = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_id, week, food_plans, JSON.stringify(data), id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteMealPlan = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_meal_plan SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreMealPlan = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_meal_plan SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getMealPlansByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_meal_plan WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedMealPlansByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_meal_plan WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get meal plan by ID
exports.getMealPlanById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_meal_plan WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get distinct food_plans
exports.getDistinctFoodPlans = (req, res) => {
  db.query(
    "SELECT DISTINCT food_plans FROM sou_package_meal_plan WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get distinct week
exports.getDistinctWeeks = (req, res) => {
  db.query(
    "SELECT DISTINCT week FROM sou_package_meal_plan WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

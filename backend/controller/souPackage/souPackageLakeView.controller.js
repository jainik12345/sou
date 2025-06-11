const db = require("../../config/db");

// Get all lake views
exports.getAllLakeViews = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_lake_view WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert lake view
exports.insertLakeView = (req, res) => {
  const { sou_package_id, week, data } = req.body;

  if (!sou_package_id || !week || !data) {
    return res
      .status(400)
      .json({ error: "Package ID, Week, and Data are required" });
  }

  db.query(
    "INSERT INTO sou_package_lake_view (sou_package_id, week, data) VALUES (?, ?, ?)",
    [sou_package_id, week, JSON.stringify(data)],
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

// Update lake view
exports.updateLakeView = (req, res) => {
  const { id } = req.params;
  const { sou_package_id, week, data } = req.body;

  if (!sou_package_id || !week || !data) {
    return res
      .status(400)
      .json({ error: "Package ID, Week, and Data are required" });
  }

  db.query(
    "UPDATE sou_package_lake_view SET sou_package_id = ?, week = ?, data = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_id, week, JSON.stringify(data), id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteLakeView = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_lake_view SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreLakeView = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_lake_view SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getLakeViewsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_lake_view WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedLakeViewsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_lake_view WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get lake view by ID
exports.getLakeViewById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_lake_view WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get distinct week
exports.getDistinctWeeks = (req, res) => {
  db.query(
    "SELECT DISTINCT week FROM sou_package_lake_view WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

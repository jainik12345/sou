const db = require("../../config/db");

// GET: Fetch all non-deleted SOU packages
exports.getSouPackages = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET: Fetch SOU package by ID
exports.getSouPackageById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_name WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST: Insert a new SOU package
exports.insertSouPackage = (req, res) => {
  const { sou_package_name } = req.body;

  if (!sou_package_name) {
    return res.status(400).json({ error: "sou_package_name is required" });
  }

  db.query(
    "INSERT INTO sou_package_name (sou_package_name) VALUES (?)",
    [sou_package_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "SOU package inserted",
        insertedId: result.insertId,
      });
    }
  );
};

// PUT: Update SOU package by ID
exports.updateSouPackage = (req, res) => {
  const { id } = req.params;
  const { sou_package_name } = req.body;

  if (!sou_package_name) {
    return res.status(400).json({ error: "sou_package_name is required" });
  }

  db.query(
    "UPDATE sou_package_name SET sou_package_name = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "SOU package updated" });
    }
  );
};

// DELETE: Soft delete SOU package
exports.deleteSouPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "SOU package soft deleted" });
    }
  );
};

// GET: Fetch soft-deleted SOU packages
exports.getTrashedSouPackages = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_name WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH: Restore soft-deleted SOU package
exports.restoreSouPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "SOU package restored" });
    }
  );
};

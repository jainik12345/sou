const db = require("../../config/db");

// GET: Only fetch non-deleted records
module.exports.getGujaratPackages = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// INSERT: Add new package
module.exports.insertGujaratPackage = (req, res) => {
  const { Nights, Days } = req.body;

  if (Nights == null || Days == null) {
    return res.status(400).json({
      error: "Nights and Days are required",
    });
  }

  const query = `INSERT INTO gujarat_package (Nights, Days) VALUES (?, ?)`;

  db.query(query, [Nights, Days], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(201)
      .json({ status: "success", message: "Package inserted", data: results });
  });
};

// UPDATE: Update package by ID
module.exports.updateGujaratPackage = (req, res) => {
  const { id } = req.params;
  const { Nights, Days } = req.body;

  if (Nights == null || Days == null) {
    return res.status(400).json({
      error: "Nights and Days are required",
    });
  }

  const query = `UPDATE gujarat_package SET Nights = ?, Days = ? WHERE id = ?`;

  db.query(query, [Nights, Days, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(200)
      .json({ status: "success", message: "Package updated", data: results });
  });
};

// DELETE: Soft delete by setting deleted_at = 1
module.exports.deleteGujaratPackage = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE gujarat_package SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Package deleted (soft)",
      data: results,
    });
  });
};

// GET: Fetch only soft-deleted records
module.exports.getTrashedGujaratPackages = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// PATCH: Restore soft-deleted package
module.exports.restoreGujaratPackage = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE gujarat_package SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Package restored",
      data: results,
    });
  });
};

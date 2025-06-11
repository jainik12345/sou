const db = require("../../config/db");

// Get all notes/policy
exports.getAllNotesPolicies = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_notes_policy WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert notes/policy
exports.insertNotesPolicy = (req, res) => {
  const { sou_package_id, notes, refund_policy } = req.body;

  if (!sou_package_id) {
    return res.status(400).json({ error: "Package ID is required" });
  }

  db.query(
    "INSERT INTO sou_package_notes_policy (sou_package_id, notes, refund_policy) VALUES (?, ?, ?)",
    [sou_package_id, notes || null, refund_policy || null],
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

// Update notes/policy
exports.updateNotesPolicy = (req, res) => {
  const { id } = req.params;
  const { sou_package_id, notes, refund_policy } = req.body;

  if (!sou_package_id) {
    return res.status(400).json({ error: "Package ID is required" });
  }

  db.query(
    "UPDATE sou_package_notes_policy SET sou_package_id = ?, notes = ?, refund_policy = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_id, notes || null, refund_policy || null, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteNotesPolicy = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_notes_policy SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreNotesPolicy = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_notes_policy SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getNotesPoliciesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_notes_policy WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedNotesPoliciesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_notes_policy WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get by ID
exports.getNotesPolicyById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_notes_policy WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

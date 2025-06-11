const db = require("../../config/db");

// Get all paragraphs
exports.getAllParagraphs = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_paragraph WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert paragraph
exports.insertParagraph = (req, res) => {
  const { sou_package_id, heading, description } = req.body;

  if (!sou_package_id || !heading || !description) {
    return res
      .status(400)
      .json({ error: "Package ID, Heading and Description are required" });
  }

  db.query(
    "INSERT INTO sou_package_paragraph (sou_package_id, heading, description) VALUES (?, ?, ?)",
    [sou_package_id, heading, description],
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

// Update paragraph
exports.updateParagraph = (req, res) => {
  const { id } = req.params;
  const { sou_package_id, heading, description } = req.body;

  if (!sou_package_id || !heading || !description) {
    return res
      .status(400)
      .json({ error: "Package ID, Heading and Description are required" });
  }

  db.query(
    "UPDATE sou_package_paragraph SET sou_package_id = ?, heading = ?, description = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_id, heading, description, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteParagraph = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_paragraph SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreParagraph = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_paragraph SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getParagraphsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_paragraph WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedParagraphsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_paragraph WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get paragraph by ID
exports.getParagraphById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_paragraph WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
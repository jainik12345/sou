const db = require("../../config/db");

// Get all FAQs
exports.getAllFaqs = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_faqs WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert FAQ
exports.insertFaq = (req, res) => {
  const { sou_package_id, question, answer } = req.body;

  if (!sou_package_id || !question || !answer) {
    return res
      .status(400)
      .json({ error: "Package ID, Question and Answer are required" });
  }

  db.query(
    "INSERT INTO sou_package_faqs (sou_package_id, question, answer) VALUES (?, ?, ?)",
    [sou_package_id, question, answer],
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

// Update FAQ
exports.updateFaq = (req, res) => {
  const { id } = req.params;
  const { sou_package_id, question, answer } = req.body;

  if (!sou_package_id || !question || !answer) {
    return res
      .status(400)
      .json({ error: "Package ID, Question and Answer are required" });
  }

  db.query(
    "UPDATE sou_package_faqs SET sou_package_id = ?, question = ?, answer = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_id, question, answer, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteFaq = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_faqs SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreFaq = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_faqs SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getFaqsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_faqs WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedFaqsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_faqs WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get FAQ by ID
exports.getFaqById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_faqs WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

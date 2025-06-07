const db = require("../config/db");

// ✅ GET: Fetch only non-deleted terms
module.exports.getTermsConditions = (req, res) => {
  db.query(
    "SELECT * FROM terms_conditions WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// ✅ INSERT: Add new terms
module.exports.insertTermsConditions = (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const query = `INSERT INTO terms_conditions (text) VALUES (?)`;
  db.query(query, [text], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(201)
      .json({ status: "success", message: "Terms inserted", data: results });
  });
};

// ✅ UPDATE: Modify existing terms
module.exports.updateTermsConditions = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const query = `UPDATE terms_conditions SET text = ? WHERE id = ?`;
  db.query(query, [text, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res
      .status(200)
      .json({ status: "success", message: "Terms updated", data: results });
  });
};

// ✅ DELETE: Soft delete (set deleted_at = 1)
module.exports.deleteTermsConditions = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE terms_conditions SET deleted_at = 1 WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({
      status: "success",
      message: "Terms deleted (soft)",
      data: results,
    });
  });
};

// Get only soft-deleted rows
module.exports.getTrashedTermsConditions = (req, res) => {
  db.query(
    "SELECT * FROM terms_conditions WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// Restore soft-deleted row
module.exports.restoreTermsConditions = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE terms_conditions SET deleted_at = 0 WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({
      status: "success",
      message: "Terms restored",
      data: results,
    });
  });
};

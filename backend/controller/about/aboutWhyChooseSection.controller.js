const db = require("../../config/db");

// GET all active
exports.getAboutWhyChoose = (req, res) => {
  db.query(
    "SELECT * FROM about_why_choose_section WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET by ID
exports.getAboutWhyChooseById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM about_why_choose_section WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert
exports.insertAboutWhyChoose = (req, res) => {
  const { heading, title } = req.body;

  db.query(
    "INSERT INTO about_why_choose_section (heading, title) VALUES (?, ?)",
    [heading || null, title || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Inserted",
        insertedId: result.insertId,
      });
    }
  );
};

exports.updateAboutWhyChoose = (req, res) => {
  const { id } = req.params;
  const { heading, title } = req.body;

  db.query(
    "UPDATE about_why_choose_section SET heading = ?, title = ? WHERE id = ? AND deleted_at = 0",
    [heading || null, title || null, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// DELETE soft
exports.deleteAboutWhyChoose = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_why_choose_section SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedAboutWhyChoose = (req, res) => {
  db.query(
    "SELECT * FROM about_why_choose_section WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH restore
exports.restoreAboutWhyChoose = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_why_choose_section SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

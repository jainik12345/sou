const db = require("../../config/db");

// GET all active contact page entries
exports.getContactPages = (req, res) => {
  db.query(
    "SELECT * FROM contact_page WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET contact page by ID
exports.getContactPageById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM contact_page WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert new contact page entry
exports.insertContactPage = (req, res) => {
  const { address, email, phone_number, map_link } = req.body;

  db.query(
    "INSERT INTO contact_page (address, email, phone_number, map_link, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, NOW(), NOW(), 0)",
    [address || null, email || null, phone_number || null, map_link || null],
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

// PUT update contact page entry
exports.updateContactPage = (req, res) => {
  const { id } = req.params;
  const { address, email, phone_number, map_link } = req.body;

  db.query(
    "UPDATE contact_page SET address = ?, email = ?, phone_number = ?, map_link = ?, updated_at = NOW() WHERE id = ? AND deleted_at = 0",
    [
      address || null,
      email || null,
      phone_number || null,
      map_link || null,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// DELETE soft delete contact page entry
exports.deleteContactPage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE contact_page SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed contact pages
exports.getTrashedContactPages = (req, res) => {
  db.query(
    "SELECT * FROM contact_page WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH restore soft-deleted contact page entry
exports.restoreContactPage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE contact_page SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

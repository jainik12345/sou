const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Get all book layers
exports.getAllPackageBookLayers = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_book_layer WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert book layer
exports.insertPackageBookLayer = (req, res) => {
  const { sou_package_id, title } = req.body;
  if (!sou_package_id) {
    return res.status(400).json({ error: "Package ID is required" });
  }

  db.query(
    "INSERT INTO sou_package_book_layer (sou_package_id, title) VALUES (?, ?)",
    [sou_package_id, title],
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

// Update book layer
exports.updatePackageBookLayer = (req, res) => {
  const { id } = req.params;
  const { sou_package_id, title } = req.body;

  if (!sou_package_id) {
    return res.status(400).json({ error: "Package ID is required" });
  }

  db.query(
    "UPDATE sou_package_book_layer SET sou_package_id = ?, title = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_id, title, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deletePackageBookLayer = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_book_layer SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restorePackageBookLayer = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_book_layer SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getPackageBookLayersByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_book_layer WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedPackageBookLayersByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_book_layer WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get book layer by ID
exports.getPackageBookLayerById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_book_layer WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

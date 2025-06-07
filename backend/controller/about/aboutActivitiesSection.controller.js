const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/AboutImages/Activities");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single("image");

// GET all active
exports.getAboutActivities = (req, res) => {
  db.query(
    "SELECT * FROM about_activities_section WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET by ID
exports.getAboutActivitiesById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM about_activities_section WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert
exports.insertAboutActivities = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const { heading, description } = req.body;
    const image = req.file.filename;

    db.query(
      "INSERT INTO about_activities_section (image, heading, description) VALUES (?, ?, ?)",
      [image, heading || null, description || null],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          status: "success",
          message: "Inserted",
          insertedId: result.insertId,
        });
      }
    );
  });
};

exports.updateAboutActivities = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { heading, description, existingImage } = req.body;
    const newImage = req.file?.filename || existingImage;

    db.query(
      "UPDATE about_activities_section SET heading = ?, description = ?, image = ? WHERE id = ? AND deleted_at = 0",
      [heading || null, description || null, newImage, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft
exports.deleteAboutActivities = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_activities_section SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedAboutActivities = (req, res) => {
  db.query(
    "SELECT * FROM about_activities_section WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH restore
exports.restoreAboutActivities = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_activities_section SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};
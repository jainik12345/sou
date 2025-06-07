const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/AboutImages/Hero");
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
exports.getAboutHero = (req, res) => {
  db.query(
    "SELECT * FROM about_hero_section WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET by ID
exports.getAboutHeroById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM about_hero_section WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert
exports.insertAboutHero = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const { description, improvement } = req.body;
    const image = req.file.filename;
    // improvement expects a JSON string from frontend
    let improvementJson = null;
    try {
      improvementJson = improvement ? JSON.parse(improvement) : null;
    } catch (e) {
      return res.status(400).json({ error: "Invalid improvement JSON" });
    }

    db.query(
      "INSERT INTO about_hero_section (image, description, improvement) VALUES (?, ?, ?)",
      [image, description || null, improvementJson ? JSON.stringify(improvementJson) : null],
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

exports.updateAboutHero = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { description, improvement, existingImage } = req.body;
    const newImage = req.file?.filename || existingImage;

    let improvementJson = null;
    try {
      improvementJson = improvement ? JSON.parse(improvement) : null;
    } catch (e) {
      return res.status(400).json({ error: "Invalid improvement JSON" });
    }

    db.query(
      "UPDATE about_hero_section SET description = ?, improvement = ?, image = ? WHERE id = ? AND deleted_at = 0",
      [
        description || null,
        improvementJson ? JSON.stringify(improvementJson) : null,
        newImage,
        id,
      ],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// DELETE soft
exports.deleteAboutHero = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_hero_section SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedAboutHero = (req, res) => {
  db.query(
    "SELECT * FROM about_hero_section WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH restore
exports.restoreAboutHero = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE about_hero_section SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};
const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for hero section images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/SouPackage/SouPackageHeroSection"
    );
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

// Get all hero sections
exports.getAllHeroSections = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_hero_section WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert hero section
exports.insertHeroSection = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { sou_package_id, heading, description } = req.body;
    const image = req.file?.filename || null;

    if (!sou_package_id || !heading || !description || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    db.query(
      "INSERT INTO sou_package_hero_section (sou_package_id, image, heading, description) VALUES (?, ?, ?, ?)",
      [sou_package_id, image, heading, description],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          status: "success",
          message: "Inserted",
          insertId: result.insertId,
        });
      }
    );
  });
};

// Update hero section
exports.updateHeroSection = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { sou_package_id, heading, description, existingImage } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!sou_package_id || !heading || !description || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    db.query(
      "UPDATE sou_package_hero_section SET sou_package_id = ?, image = ?, heading = ?, description = ? WHERE id = ? AND deleted_at = 0",
      [sou_package_id, image, heading, description, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deleteHeroSection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_hero_section SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreHeroSection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_hero_section SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getHeroSectionsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_hero_section WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedHeroSectionsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_hero_section WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get hero section by ID
exports.getHeroSectionById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_hero_section WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
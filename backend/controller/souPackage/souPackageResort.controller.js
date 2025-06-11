const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for resort images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/SouPackage/SouPackageResortImages"
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

// Get all resorts
exports.getAllResorts = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_resort WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert resort
exports.insertResort = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { sou_package_id, type_room_name, week, food_plans, per_couple } =
      req.body;
    const image = req.file?.filename || null;

    if (!sou_package_id || !image) {
      return res
        .status(400)
        .json({ error: "Package ID and Image are required" });
    }

    db.query(
      "INSERT INTO sou_package_resort (sou_package_id, image, type_room_name, week, food_plans, per_couple) VALUES (?, ?, ?, ?, ?, ?)",
      [sou_package_id, image, type_room_name, week, food_plans, per_couple],
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

// Update resort
exports.updateResort = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const {
      sou_package_id,
      type_room_name,
      week,
      food_plans,
      per_couple,
      existingImage,
    } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!sou_package_id || !image) {
      return res
        .status(400)
        .json({ error: "Package ID and Image are required" });
    }

    db.query(
      "UPDATE sou_package_resort SET sou_package_id = ?, image = ?, type_room_name = ?, week = ?, food_plans = ?, per_couple = ? WHERE id = ? AND deleted_at = 0",
      [sou_package_id, image, type_room_name, week, food_plans, per_couple, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deleteResort = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_resort SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreResort = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_resort SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getResortsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_resort WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedResortsByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_resort WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get resort by ID
exports.getResortById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_resort WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

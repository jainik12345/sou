const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for home_sou_package images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/HomeImages/HomeSouPackage"
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

// Get all home sou packages
exports.getAllHomeSouPackages = (req, res) => {
  db.query(
    "SELECT * FROM home_sou_package WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert home sou package
exports.insertHomeSouPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { sou_package_id, accommodation, package: packageText, location } = req.body;
    const image = req.file?.filename || null;

    if (!sou_package_id || !image) {
      return res
        .status(400)
        .json({ error: "Package ID and Image are required" });
    }

    db.query(
      "INSERT INTO home_sou_package (sou_package_id, image, accommodation, package, location) VALUES (?, ?, ?, ?, ?)",
      [sou_package_id, image, accommodation, packageText, location],
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

// Update home sou package
exports.updateHomeSouPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { sou_package_id, accommodation, package: packageText, location, existingImage } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!sou_package_id || !image) {
      return res
        .status(400)
        .json({ error: "Package ID and Image are required" });
    }

    db.query(
      "UPDATE home_sou_package SET sou_package_id = ?, image = ?, accommodation = ?, package = ?, location = ? WHERE id = ? AND deleted_at = 0",
      [sou_package_id, image, accommodation, packageText, location, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deleteHomeSouPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE home_sou_package SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreHomeSouPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE home_sou_package SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getHomeSouPackagesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM home_sou_package WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedHomeSouPackagesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM home_sou_package WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get home sou package by ID
exports.getHomeSouPackageById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM home_sou_package WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
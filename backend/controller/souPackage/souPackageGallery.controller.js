const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for package gallery images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/SouPackage/SouPackageGalleryImages"
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

// Get all package galleries
exports.getAllPackageGalleries = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_gallery WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert package gallery
exports.insertPackageGallery = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { sou_package_id, title } = req.body;
    const image = req.file?.filename || null;

    if (!sou_package_id || !image) {
      return res
        .status(400)
        .json({ error: "Package ID and Image are required" });
    }

    db.query(
      "INSERT INTO sou_package_gallery (sou_package_id, title, image) VALUES (?, ?, ?)",
      [sou_package_id, title, image],
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

// Update package gallery
exports.updatePackageGallery = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { sou_package_id, title, existingImage } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!sou_package_id || !image) {
      return res
        .status(400)
        .json({ error: "Package ID and Image are required" });
    }

    db.query(
      "UPDATE sou_package_gallery SET sou_package_id = ?, title = ?, image = ? WHERE id = ? AND deleted_at = 0",
      [sou_package_id, title, image, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deletePackageGallery = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_gallery SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restorePackageGallery = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_gallery SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getPackageGalleriesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_gallery WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedPackageGalleriesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_gallery WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get gallery by ID
exports.getPackageGalleryById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_gallery WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

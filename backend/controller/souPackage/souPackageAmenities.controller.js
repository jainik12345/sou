const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for amenities images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/SouPackage/SouPackageAmenities"
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

// Get all amenities
exports.getAllAmenities = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_amenities WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert amenity
exports.insertAmenity = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { sou_package_id, title } = req.body;
    const image = req.file?.filename || null;

    if (!sou_package_id || !title || !image) {
      return res
        .status(400)
        .json({ error: "Package ID, Title and Image are required" });
    }

    db.query(
      "INSERT INTO sou_package_amenities (sou_package_id, title, image) VALUES (?, ?, ?)",
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

// Update amenity
exports.updateAmenity = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { sou_package_id, title, existingImage } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!sou_package_id || !title || !image) {
      return res
        .status(400)
        .json({ error: "Package ID, Title and Image are required" });
    }

    db.query(
      "UPDATE sou_package_amenities SET sou_package_id = ?, title = ?, image = ? WHERE id = ? AND deleted_at = 0",
      [sou_package_id, title, image, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deleteAmenity = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_amenities SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreAmenity = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_amenities SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getAmenitiesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_amenities WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedAmenitiesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_amenities WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get amenity by ID
exports.getAmenityById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_amenities WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
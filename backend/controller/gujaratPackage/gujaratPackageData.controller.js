const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for multiple images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/GujaratPackage/GujaratPackageDataImage"
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
}).array("images", 10);

// GET all active
exports.getGujaratPackageData = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package_data WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET by ID
exports.getGujaratPackageDataById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM gujarat_package_data WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST insert
exports.insertGujaratPackageData = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Handle file uploads
    let imageFiles = [];
    if (req.files) {
      imageFiles = req.files.map((file) => file.filename);
    }

    const { gujarat_package_id, heading, faqs, price } = req.body;

    db.query(
      "INSERT INTO gujarat_package_data (gujarat_package_id, heading, multiple_images, faqs, price) VALUES (?, ?, ?, ?, ?)",
      [
        gujarat_package_id || null,
        heading || null,
        JSON.stringify(imageFiles),
        faqs || null,
        price || null,
      ],
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

// PUT update
exports.updateGujaratPackageData = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { gujarat_package_id, heading, faqs, price, existingImages } =
      req.body;

    let imageFiles = [];
    if (req.files && req.files.length > 0) {
      imageFiles = req.files.map((file) => file.filename);
    } else if (existingImages) {
      // Accept either array or JSON string from frontend
      imageFiles = Array.isArray(existingImages)
        ? existingImages
        : JSON.parse(existingImages);
    }

    db.query(
      `UPDATE gujarat_package_data 
        SET gujarat_package_id = ?, 
            heading = ?, 
            multiple_images = ?, 
            faqs = ?, 
            price = ? 
        WHERE id = ? AND deleted_at = 0`,
      [
        gujarat_package_id || null,
        heading || null,
        JSON.stringify(imageFiles),
        faqs || null,
        price || null,
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
exports.deleteGujaratPackageData = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE gujarat_package_data SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// GET trashed
exports.getTrashedGujaratPackageData = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package_data WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH restore
exports.restoreGujaratPackageData = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE gujarat_package_data SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

exports.getPackageDataByPackageId = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM gujarat_package_data WHERE gujarat_package_id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

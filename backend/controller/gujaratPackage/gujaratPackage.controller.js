// const db = require("../../config/db");

// // GET: Only fetch non-deleted records
// module.exports.getGujaratPackages = (req, res) => {
//   db.query(
//     "SELECT * FROM gujarat_package WHERE deleted_at = 0",
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });

//       return res.status(200).json({
//         status: "success",
//         data: results,
//       });
//     }
//   );
// };

// // INSERT: Add new package
// module.exports.insertGujaratPackage = (req, res) => {
//   const { Nights, Days } = req.body;

//   if (Nights == null || Days == null) {
//     return res.status(400).json({
//       error: "Nights and Days are required",
//     });
//   }

//   const query = `INSERT INTO gujarat_package (Nights, Days) VALUES (?, ?)`;

//   db.query(query, [Nights, Days], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });

//     return res
//       .status(201)
//       .json({ status: "success", message: "Package inserted", data: results });
//   });
// };

// // UPDATE: Update package by ID
// module.exports.updateGujaratPackage = (req, res) => {
//   const { id } = req.params;
//   const { Nights, Days } = req.body;

//   if (Nights == null || Days == null) {
//     return res.status(400).json({
//       error: "Nights and Days are required",
//     });
//   }

//   const query = `UPDATE gujarat_package SET Nights = ?, Days = ? WHERE id = ?`;

//   db.query(query, [Nights, Days, id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });

//     return res
//       .status(200)
//       .json({ status: "success", message: "Package updated", data: results });
//   });
// };

// // DELETE: Soft delete by setting deleted_at = 1
// module.exports.deleteGujaratPackage = (req, res) => {
//   const { id } = req.params;

//   const query = `UPDATE gujarat_package SET deleted_at = 1 WHERE id = ?`;

//   db.query(query, [id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });

//     return res.status(200).json({
//       status: "success",
//       message: "Package deleted (soft)",
//       data: results,
//     });
//   });
// };

// // GET: Fetch only soft-deleted records
// module.exports.getTrashedGujaratPackages = (req, res) => {
//   db.query(
//     "SELECT * FROM gujarat_package WHERE deleted_at = 1",
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });

//       return res.status(200).json({
//         status: "success",
//         data: results,
//       });
//     }
//   );
// };

// // PATCH: Restore soft-deleted package
// module.exports.restoreGujaratPackage = (req, res) => {
//   const { id } = req.params;

//   const query = `UPDATE gujarat_package SET deleted_at = 0 WHERE id = ?`;

//   db.query(query, [id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });

//     return res.status(200).json({
//       status: "success",
//       message: "Package restored",
//       data: results,
//     });
//   });
// };

/** */

const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for Gujarat Package images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../Images/GujaratPackage/GujaratPackageImage");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, unique);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).array("images", 10);

// GET: Only fetch non-deleted records
exports.getGujaratPackages = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET by ID
exports.getGujaratPackageById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM gujarat_package WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST: Add new package (with images and places_name)
exports.insertGujaratPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { Nights, Days, places_name } = req.body;
    if (Nights == null || Days == null || !places_name) {
      return res
        .status(400)
        .json({ error: "Nights, Days, and places_name are required" });
    }
    if (!req.files || !req.files.length) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const imagePaths = req.files.map((file) => file.filename);

    db.query(
      "INSERT INTO gujarat_package (Nights, Days, image, places_name) VALUES (?, ?, ?, ?)",
      [Nights, Days, JSON.stringify(imagePaths), places_name],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          status: "success",
          message: "Package inserted",
          insertedId: result.insertId,
        });
      }
    );
  });
};

// PUT: Update package by ID (with images and places_name)
exports.updateGujaratPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    const { id } = req.params;
    const { Nights, Days, places_name, existingImages } = req.body;

    if (Nights == null || Days == null || !places_name) {
      return res
        .status(400)
        .json({ error: "Nights, Days, and places_name are required" });
    }

    let existing = [];
    try {
      existing = JSON.parse(existingImages || "[]");
    } catch {
      return res.status(400).json({ error: "Invalid existingImages format" });
    }

    const uploaded = req.files?.map((file) => file.filename) || [];
    const allImages = [...existing, ...uploaded];

    if (!allImages.length)
      return res.status(400).json({ error: "At least one image is required" });

    db.query(
      "UPDATE gujarat_package SET Nights = ?, Days = ?, image = ?, places_name = ? WHERE id = ? AND deleted_at = 0",
      [Nights, Days, JSON.stringify(allImages), places_name, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Package updated" });
      }
    );
  });
};

// DELETE: Soft delete by setting deleted_at = 1
exports.deleteGujaratPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE gujarat_package SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "Package soft deleted" });
    }
  );
};

// GET: Fetch only soft-deleted records
exports.getTrashedGujaratPackages = (req, res) => {
  db.query(
    "SELECT * FROM gujarat_package WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH: Restore soft-deleted package
exports.restoreGujaratPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE gujarat_package SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Package restored" });
    }
  );
};

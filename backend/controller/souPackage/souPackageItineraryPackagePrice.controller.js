// const db = require("../../config/db");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Multer config for itinerary package price images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = path.join(
//       __dirname,
//       "../../Images/SouPackage/SouPackageItineraryPackagePriceImages"
//     );
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({
//   storage,
//   limits: { fileSize: 20 * 1024 * 1024 },
// }).single("image");

// // Get all itinerary package prices
// exports.getAllItineraryPackagePrices = (req, res) => {
//   db.query(
//     "SELECT * FROM sou_package_itinerary_package_price WHERE deleted_at = 0",
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(200).json({ status: "success", data: results });
//     }
//   );
// };

// // Insert itinerary package price
// exports.insertItineraryPackagePrice = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) return res.status(500).json({ error: err.message });

//     const { sou_package_itinerary_id, package_start_price, other_price } =
//       req.body;
//     const image = req.file?.filename || null;

//     if (!sou_package_itinerary_id || !image) {
//       return res
//         .status(400)
//         .json({ error: "Itinerary ID and Image are required" });
//     }

//     db.query(
//       "INSERT INTO sou_package_itinerary_package_price (sou_package_itinerary_id, image, package_start_price, other_price) VALUES (?, ?, ?, ?)",
//       [
//         sou_package_itinerary_id,
//         image,
//         package_start_price || null,
//         other_price || null,
//       ],
//       (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({
//           status: "success",
//           message: "Inserted",
//           insertId: result.insertId,
//         });
//       }
//     );
//   });
// };

// // Update itinerary package price
// exports.updateItineraryPackagePrice = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) return res.status(500).json({ error: err.message });

//     const { id } = req.params;
//     const {
//       sou_package_itinerary_id,
//       package_start_price,
//       other_price,
//       existingImage,
//     } = req.body;
//     const image = req.file ? req.file.filename : existingImage || null;

//     if (!sou_package_itinerary_id || !image) {
//       return res
//         .status(400)
//         .json({ error: "Itinerary ID and Image are required" });
//     }

//     db.query(
//       "UPDATE sou_package_itinerary_package_price SET sou_package_itinerary_id = ?, image = ?, package_start_price = ?, other_price = ? WHERE id = ? AND deleted_at = 0",
//       [
//         sou_package_itinerary_id,
//         image,
//         package_start_price || null,
//         other_price || null,
//         id,
//       ],
//       (err) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(200).json({ status: "success", message: "Updated" });
//       }
//     );
//   });
// };

// // Soft delete
// exports.deleteItineraryPackagePrice = (req, res) => {
//   const { id } = req.params;
//   db.query(
//     "UPDATE sou_package_itinerary_package_price SET deleted_at = 1 WHERE id = ?",
//     [id],
//     (err) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(200).json({ status: "success", message: "Soft deleted" });
//     }
//   );
// };

// // Restore deleted
// exports.restoreItineraryPackagePrice = (req, res) => {
//   const { id } = req.params;
//   db.query(
//     "UPDATE sou_package_itinerary_package_price SET deleted_at = 0 WHERE id = ?",
//     [id],
//     (err) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(200).json({ status: "success", message: "Restored" });
//     }
//   );
// };

// // Get by Itinerary ID
// exports.getItineraryPackagePricesByItineraryId = (req, res) => {
//   const { itineraryId } = req.params;
//   db.query(
//     "SELECT * FROM sou_package_itinerary_package_price WHERE sou_package_itinerary_id = ? AND deleted_at = 0",
//     [itineraryId],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(200).json({ status: "success", data: results });
//     }
//   );
// };

// // Get trashed by Itinerary ID
// exports.getTrashedItineraryPackagePricesByItineraryId = (req, res) => {
//   const { itineraryId } = req.params;
//   db.query(
//     "SELECT * FROM sou_package_itinerary_package_price WHERE sou_package_itinerary_id = ? AND deleted_at = 1",
//     [itineraryId],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(200).json({ status: "success", data: results });
//     }
//   );
// };

// // Get itinerary package price by ID
// exports.getItineraryPackagePriceById = (req, res) => {
//   const { id } = req.params;
//   db.query(
//     "SELECT * FROM sou_package_itinerary_package_price WHERE id = ? AND deleted_at = 0",
//     [id],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(200).json({ status: "success", data: results });
//     }
//   );
// };

/* */

const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for itinerary package price images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/SouPackage/SouPackageItineraryPackagePriceImages"
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

// Get all itinerary package prices
exports.getAllItineraryPackagePrices = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_itinerary_package_price WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert itinerary package price
exports.insertItineraryPackagePrice = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const {
      sou_package_itinerary_id,
      package_start_price,
      other_price,
      from_date,
      to_date,
    } = req.body;
    const image = req.file?.filename || null;

    if (!sou_package_itinerary_id || !image) {
      return res
        .status(400)
        .json({ error: "Itinerary ID and Image are required" });
    }

    db.query(
      `INSERT INTO sou_package_itinerary_package_price 
      (sou_package_itinerary_id, image, package_start_price, other_price, from_date, to_date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        sou_package_itinerary_id,
        image,
        package_start_price || null,
        other_price || null,
        from_date || null,
        to_date || null,
      ],
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

// Update itinerary package price
exports.updateItineraryPackagePrice = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const {
      sou_package_itinerary_id,
      package_start_price,
      other_price,
      from_date,
      to_date,
      existingImage,
    } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!sou_package_itinerary_id || !image) {
      return res
        .status(400)
        .json({ error: "Itinerary ID and Image are required" });
    }

    db.query(
      `UPDATE sou_package_itinerary_package_price 
      SET sou_package_itinerary_id = ?, image = ?, package_start_price = ?, other_price = ?, from_date = ?, to_date = ?
      WHERE id = ? AND deleted_at = 0`,
      [
        sou_package_itinerary_id,
        image,
        package_start_price || null,
        other_price || null,
        from_date || null,
        to_date || null,
        id,
      ],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deleteItineraryPackagePrice = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_itinerary_package_price SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreItineraryPackagePrice = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_itinerary_package_price SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Itinerary ID
exports.getItineraryPackagePricesByItineraryId = (req, res) => {
  const { itineraryId } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_package_price WHERE sou_package_itinerary_id = ? AND deleted_at = 0",
    [itineraryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Itinerary ID
exports.getTrashedItineraryPackagePricesByItineraryId = (req, res) => {
  const { itineraryId } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_package_price WHERE sou_package_itinerary_id = ? AND deleted_at = 1",
    [itineraryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get itinerary package price by ID
exports.getItineraryPackagePriceById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_package_price WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

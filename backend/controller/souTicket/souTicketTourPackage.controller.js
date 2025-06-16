const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for package images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/SouTicket/SouTicketTourPackageImages"
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

// Get all tour packages (not deleted)
exports.getAllTourPackages = (req, res) => {
  db.query(
    "SELECT * FROM sou_ticket_tour_package WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert tour package
exports.insertTourPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const {
      sou_package_id,
      nights,
      days,
      adult_price,
      child_price,
      faqs,
      caution,
    } = req.body;
    const image = req.file?.filename || null;

    if (!sou_package_id || !nights || !days || !adult_price || !child_price) {
      return res.status(400).json({
        error:
          "Package ID, nights, days, adult price, and child price are required",
      });
    }

    db.query(
      "INSERT INTO sou_ticket_tour_package (sou_package_id, nights, days, image, adult_price, child_price, faqs, caution) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        sou_package_id,
        nights,
        days,
        image,
        adult_price,
        child_price,
        faqs,
        caution,
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

// Update tour package
exports.updateTourPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const {
      sou_package_id,
      nights,
      days,
      adult_price,
      child_price,
      faqs,
      caution,
      existingImage,
    } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!sou_package_id || !nights || !days || !adult_price || !child_price) {
      return res.status(400).json({
        error:
          "Package ID, nights, days, adult price, and child price are required",
      });
    }

    db.query(
      "UPDATE sou_ticket_tour_package SET sou_package_id=?, nights=?, days=?, image=?, adult_price=?, child_price=?, faqs=?, caution=? WHERE id=? AND deleted_at=0",
      [
        sou_package_id,
        nights,
        days,
        image,
        adult_price,
        child_price,
        faqs,
        caution,
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
exports.deleteTourPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_ticket_tour_package SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreTourPackage = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_ticket_tour_package SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by ID (not deleted)
exports.getTourPackageById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_ticket_tour_package WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed
exports.getTrashedTourPackages = (req, res) => {
  db.query(
    "SELECT * FROM sou_ticket_tour_package WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get by Package ID (not deleted)
exports.getTourPackagesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_ticket_tour_package WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedTourPackagesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_ticket_tour_package WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for ticket event images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/SouTicket/SouTicketInsideEventPriceImages"
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

// Get all ticket prices (not deleted)
exports.getAllTicketPrices = (req, res) => {
  db.query(
    "SELECT * FROM sou_ticket_inside_event_price WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert ticket price
exports.insertTicketPrice = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { title, adult_price, child_price, caution } = req.body;
    const image = req.file?.filename || null;

    if (!title || !adult_price || !child_price) {
      return res
        .status(400)
        .json({ error: "Title, adult price, and child price are required" });
    }

    db.query(
      "INSERT INTO sou_ticket_inside_event_price (image, title, adult_price, child_price, caution) VALUES (?, ?, ?, ?, ?)",
      [image, title, adult_price, child_price, caution],
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

// Update ticket price
exports.updateTicketPrice = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const { title, adult_price, child_price, caution, existingImage } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!title || !adult_price || !child_price) {
      return res
        .status(400)
        .json({ error: "Title, adult price, and child price are required" });
    }

    db.query(
      "UPDATE sou_ticket_inside_event_price SET image = ?, title = ?, adult_price = ?, child_price = ?, caution = ? WHERE id = ? AND deleted_at = 0",
      [image, title, adult_price, child_price, caution, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deleteTicketPrice = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_ticket_inside_event_price SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreTicketPrice = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_ticket_inside_event_price SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by ID (not deleted)
exports.getTicketPriceById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_ticket_inside_event_price WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get all trashed
exports.getTrashedTicketPrices = (req, res) => {
  db.query(
    "SELECT * FROM sou_ticket_inside_event_price WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
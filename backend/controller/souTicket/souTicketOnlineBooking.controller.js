const db = require("../../config/db");

// Get all bookings (not deleted)
exports.getAllBookings = (req, res) => {
  db.query(
    "SELECT * FROM sou_ticket_online_booking WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert booking
exports.insertBooking = (req, res) => {
  const { first_description, headiing, description, data, notes } = req.body;

  if (!first_description || !headiing || !description) {
    return res.status(400).json({
      error: "first_description, headiing, and description are required",
    });
  }

  db.query(
    "INSERT INTO sou_ticket_online_booking (first_description, headiing, description, data, notes) VALUES (?, ?, ?, ?, ?)",
    [first_description, headiing, description, data, notes],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Inserted",
        insertId: result.insertId,
      });
    }
  );
};

// Update booking
exports.updateBooking = (req, res) => {
  const { id } = req.params;
  const { first_description, headiing, description, data, notes } = req.body;

  if (!first_description || !headiing || !description) {
    return res.status(400).json({
      error: "first_description, headiing, and description are required",
    });
  }

  db.query(
    "UPDATE sou_ticket_online_booking SET first_description = ?, headiing = ?, description = ?, data = ?, notes = ? WHERE id = ? AND deleted_at = 0",
    [first_description, headiing, description, data, notes, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteBooking = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_ticket_online_booking SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreBooking = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_ticket_online_booking SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by ID
exports.getBookingById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_ticket_online_booking WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed
exports.getTrashedBookings = (req, res) => {
  db.query(
    "SELECT * FROM sou_ticket_online_booking WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

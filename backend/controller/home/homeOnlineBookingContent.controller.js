const db = require("../../config/db");

// GET: Only fetch non-deleted records
module.exports.getHomeOnlineBookingContents = (req, res) => {
  db.query(
    "SELECT * FROM home_online_booking_content WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// INSERT: Add new content
module.exports.insertHomeOnlineBookingContent = (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text is required",
    });
  }

  const query = `INSERT INTO home_online_booking_content (text) VALUES (?)`;

  db.query(query, [text], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(201)
      .json({ status: "success", message: "Content inserted", data: results });
  });
};

// UPDATE: Update content by ID
module.exports.updateHomeOnlineBookingContent = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text is required",
    });
  }

  const query = `UPDATE home_online_booking_content SET text = ? WHERE id = ?`;

  db.query(query, [text, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res
      .status(200)
      .json({ status: "success", message: "Content updated", data: results });
  });
};

// DELETE: Soft delete by setting deleted_at = 1
module.exports.deleteHomeOnlineBookingContent = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE home_online_booking_content SET deleted_at = 1 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Content deleted (soft)",
      data: results,
    });
  });
};

// GET: Fetch only soft-deleted records
module.exports.getTrashedHomeOnlineBookingContents = (req, res) => {
  db.query(
    "SELECT * FROM home_online_booking_content WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(200).json({
        status: "success",
        data: results,
      });
    }
  );
};

// PATCH: Restore soft-deleted content
module.exports.restoreHomeOnlineBookingContent = (req, res) => {
  const { id } = req.params;

  const query = `UPDATE home_online_booking_content SET deleted_at = 0 WHERE id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.status(200).json({
      status: "success",
      message: "Content restored",
      data: results,
    });
  });
};

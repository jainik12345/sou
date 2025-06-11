const db = require("../../config/db");

// Get all itinerary sections
exports.getAllItinerarySections = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_itinerary_section WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert itinerary section
exports.insertItinerarySection = (req, res) => {
  const { sou_package_itinerary_id, heading, evenst } = req.body;

  if (!sou_package_itinerary_id || !heading) {
    return res
      .status(400)
      .json({ error: "Itinerary ID and Heading are required" });
  }

  db.query(
    "INSERT INTO sou_package_itinerary_section (sou_package_itinerary_id, heading, evenst) VALUES (?, ?, ?)",
    [sou_package_itinerary_id, heading, evenst || null],
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

// Update itinerary section
exports.updateItinerarySection = (req, res) => {
  const { id } = req.params;
  const { sou_package_itinerary_id, heading, evenst } = req.body;

  if (!sou_package_itinerary_id || !heading) {
    return res
      .status(400)
      .json({ error: "Itinerary ID and Heading are required" });
  }

  db.query(
    "UPDATE sou_package_itinerary_section SET sou_package_itinerary_id = ?, heading = ?, evenst = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_itinerary_id, heading, evenst || null, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteItinerarySection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_itinerary_section SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreItinerarySection = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_itinerary_section SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Itinerary Name ID
exports.getItinerarySectionsByItineraryId = (req, res) => {
  const { itineraryId } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_section WHERE sou_package_itinerary_id = ? AND deleted_at = 0",
    [itineraryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Itinerary Name ID
exports.getTrashedItinerarySectionsByItineraryId = (req, res) => {
  const { itineraryId } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_section WHERE sou_package_itinerary_id = ? AND deleted_at = 1",
    [itineraryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get section by ID
exports.getItinerarySectionById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_section WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};
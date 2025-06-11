const db = require("../../config/db");

// Get all itinerary names
exports.getAllItineraryNames = (req, res) => {
  db.query(
    "SELECT * FROM sou_package_itinerary_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert itinerary name
exports.insertItineraryName = (req, res) => {
  const { sou_package_id, sou_package_itinerary_name } = req.body;

  if (!sou_package_id || !sou_package_itinerary_name) {
    return res
      .status(400)
      .json({ error: "Package ID and Itinerary Name are required" });
  }

  db.query(
    "INSERT INTO sou_package_itinerary_name (sou_package_id, sou_package_itinerary_name) VALUES (?, ?)",
    [sou_package_id, sou_package_itinerary_name],
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

// Update itinerary name
exports.updateItineraryName = (req, res) => {
  const { id } = req.params;
  const { sou_package_id, sou_package_itinerary_name } = req.body;

  if (!sou_package_id || !sou_package_itinerary_name) {
    return res
      .status(400)
      .json({ error: "Package ID and Itinerary Name are required" });
  }

  db.query(
    "UPDATE sou_package_itinerary_name SET sou_package_id = ?, sou_package_itinerary_name = ? WHERE id = ? AND deleted_at = 0",
    [sou_package_id, sou_package_itinerary_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Updated" });
    }
  );
};

// Soft delete
exports.deleteItineraryName = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_itinerary_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreItineraryName = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE sou_package_itinerary_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Package ID
exports.getItineraryNamesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_name WHERE sou_package_id = ? AND deleted_at = 0",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Package ID
exports.getTrashedItineraryNamesByPackageId = (req, res) => {
  const { packageId } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_name WHERE sou_package_id = ? AND deleted_at = 1",
    [packageId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get itinerary by ID
exports.getItineraryNameById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM sou_package_itinerary_name WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

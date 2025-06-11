const db = require("../../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer config for blog images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      __dirname,
      "../../Images/Blog/BlogDataDetailsImages"
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

// Get all blog data details
exports.getAllBlogDataDetails = (req, res) => {
  db.query(
    "SELECT * FROM blog_data_details WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Insert blog data detail
exports.insertBlogDataDetail = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const {
      blog_category_id,
      title,
      date,
      description,
      data: jsonData,
    } = req.body;
    const image = req.file?.filename || null;

    if (!blog_category_id || !image) {
      return res
        .status(400)
        .json({ error: "Blog Category ID and Image are required" });
    }

    db.query(
      "INSERT INTO blog_data_details (blog_category_id, title, date, description, data, image) VALUES (?, ?, ?, ?, ?, ?)",
      [blog_category_id, title, date, description, jsonData, image],
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

// Update blog data detail
exports.updateBlogDataDetail = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const { id } = req.params;
    const {
      blog_category_id,
      title,
      date,
      description,
      data: jsonData,
      existingImage,
    } = req.body;
    const image = req.file ? req.file.filename : existingImage || null;

    if (!blog_category_id || !image) {
      return res
        .status(400)
        .json({ error: "Blog Category ID and Image are required" });
    }

    db.query(
      "UPDATE blog_data_details SET blog_category_id = ?, title = ?, date = ?, description = ?, data = ?, image = ? WHERE id = ? AND deleted_at = 0",
      [blog_category_id, title, date, description, jsonData, image, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: "success", message: "Updated" });
      }
    );
  });
};

// Soft delete
exports.deleteBlogDataDetail = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE blog_data_details SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Soft deleted" });
    }
  );
};

// Restore deleted
exports.restoreBlogDataDetail = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE blog_data_details SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", message: "Restored" });
    }
  );
};

// Get by Blog Category ID
exports.getBlogDataDetailsByCategoryId = (req, res) => {
  const { categoryId } = req.params;
  db.query(
    "SELECT * FROM blog_data_details WHERE blog_category_id = ? AND deleted_at = 0",
    [categoryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get trashed by Blog Category ID
exports.getTrashedBlogDataDetailsByCategoryId = (req, res) => {
  const { categoryId } = req.params;
  db.query(
    "SELECT * FROM blog_data_details WHERE blog_category_id = ? AND deleted_at = 1",
    [categoryId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// Get blog data detail by ID
exports.getBlogDataDetailById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM blog_data_details WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

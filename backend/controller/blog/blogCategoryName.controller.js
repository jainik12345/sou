const db = require("../../config/db");

// GET: Fetch all non-deleted blog categories
exports.getBlogCategories = (req, res) => {
  db.query(
    "SELECT * FROM blog_category_name WHERE deleted_at = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// GET: Fetch blog category by ID
exports.getBlogCategoryById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM blog_category_name WHERE id = ? AND deleted_at = 0",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results.length) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ status: "success", data: results[0] });
    }
  );
};

// POST: Insert a new blog category
exports.insertBlogCategory = (req, res) => {
  const { blog_category_name } = req.body;

  if (!blog_category_name) {
    return res.status(400).json({ error: "blog_category_name is required" });
  }

  db.query(
    "INSERT INTO blog_category_name (blog_category_name) VALUES (?)",
    [blog_category_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        status: "success",
        message: "Blog category inserted",
        insertedId: result.insertId,
      });
    }
  );
};

// PUT: Update blog category by ID
exports.updateBlogCategory = (req, res) => {
  const { id } = req.params;
  const { blog_category_name } = req.body;

  if (!blog_category_name) {
    return res.status(400).json({ error: "blog_category_name is required" });
  }

  db.query(
    "UPDATE blog_category_name SET blog_category_name = ? WHERE id = ? AND deleted_at = 0",
    [blog_category_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "Blog category updated" });
    }
  );
};

// DELETE: Soft delete blog category
exports.deleteBlogCategory = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE blog_category_name SET deleted_at = 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "Blog category soft deleted" });
    }
  );
};

// GET: Fetch soft-deleted blog categories
exports.getTrashedBlogCategories = (req, res) => {
  db.query(
    "SELECT * FROM blog_category_name WHERE deleted_at = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ status: "success", data: results });
    }
  );
};

// PATCH: Restore soft-deleted blog category
exports.restoreBlogCategory = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE blog_category_name SET deleted_at = 0 WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ status: "success", message: "Blog category restored" });
    }
  );
};

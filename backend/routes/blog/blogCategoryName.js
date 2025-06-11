const express = require("express");
const router = express.Router();
const controller = require("../../controller/blog/blogCategoryName.controller");

router.get("/", controller.getBlogCategories);
router.get("/:id", controller.getBlogCategoryById);
router.post("/", controller.insertBlogCategory);
router.put("/:id", controller.updateBlogCategory);
router.delete("/:id", controller.deleteBlogCategory);
router.get("/trashed/list", controller.getTrashedBlogCategories);
router.patch("/restore/:id", controller.restoreBlogCategory);

module.exports = router;
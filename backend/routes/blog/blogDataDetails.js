const express = require("express");
const router = express.Router();
const controller = require("../../controller/blog/blogDataDetails.controller");

router.get("/", controller.getAllBlogDataDetails);
router.post("/", controller.insertBlogDataDetail);
router.put("/:id", controller.updateBlogDataDetail);
router.delete("/:id", controller.deleteBlogDataDetail);
router.patch("/restore/:id", controller.restoreBlogDataDetail);
router.get("/category/:categoryId", controller.getBlogDataDetailsByCategoryId);
router.get(
  "/trashed/category/:categoryId",
  controller.getTrashedBlogDataDetailsByCategoryId
);
router.get("/data/:id", controller.getBlogDataDetailById);

module.exports = router;

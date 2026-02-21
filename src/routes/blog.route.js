const express = require('express');

const {
    getAllBlogs,
    createBlogs,
    updateBlogs,
    getSingleBlog,
    deleteBlog
} = require("../controller/blog.controller");
const validate = require('../middleware/validate');
const { createBlogSchema } = require('../schema/blog.schema');

const router = express.Router();


router.get("/", getAllBlogs);

router.post("/", validate(createBlogSchema), createBlogs);

router.patch("/:id", updateBlogs);
router.get("/:id", getSingleBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
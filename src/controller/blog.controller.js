const Blog = require("../model/blog");

// GET all blogs
async function getAllBlogs(req, res) {
  try {
    let filter = {}
    const {search} = req.query

    if(search){
      filter = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { slug: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } }
    ]
      }
    }
    const blogs = await Blog.find(filter);
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

// CREATE blog
async function createBlogs(req, res) {

  console.log(req.body)
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

// UPDATE blog
async function updateBlogs(req, res) {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// GET single blog
async function getSingleBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

// DELETE blog
async function deleteBlog(req, res) {
    const id = req.params.id
  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  getAllBlogs,
  createBlogs,
  updateBlogs,
  getSingleBlog,
  deleteBlog
};

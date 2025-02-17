const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const requireAuth = require("../middleware/requireAuth");

// Get all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  return res.json(blogs);
});

// Create new blog
router.post("/", requireAuth, async (req, res) => {
  // Create new blog with request body
  const newBlog = new Blog({ ...req.body, user: req.user.id });

  // Save the new doc
  await newBlog.save();

  await User.findByIdAndUpdate(req.user.id, {
    $push: { blogIds: newBlog._id },
  });

  return res.status(201).json(newBlog.toJSON());
});

// Delete a blog by id
router.delete("/:id", requireAuth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("no blogs found with that id");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("only blog owner can delete this blog");
  }

  await Blog.findByIdAndDelete(req.params.id);

  return res.sendStatus(200);
});

// Update a blog by id
router.put("/:id", requireAuth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("no blogs found with that id");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("only blog owner can update this blog");
  }

  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.json(updated);
});

module.exports = router;

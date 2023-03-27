const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Ensimmäinen testiblogi",
    author: "Leevi Halme",
    url: "https://leevihal.me/first",
    likes: 0,
  },
  {
    title: "Toinen testiblogi",
    author: "Halme Leevi",
    url: "https://leevihal.me/second",
    likes: 0,
  },
  {
    title: "Kolmas testiblogi",
    author: "Leevi H",
    url: "https://leevihal.me/third",
    likes: 0,
  },
];

const newBlog = {
  title: "Neljäs testiblogi",
  author: "Leevi H",
  url: "https://leevihal.me/third",
  likes: 0,
};

const nonExistingId = async () => {
  const blog = new Blog(newBlog);
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, newBlog, nonExistingId, blogsInDb };

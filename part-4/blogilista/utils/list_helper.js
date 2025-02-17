const { groupBy } = require("lodash");

const dummy = blogs => {
  return 1;
};

// Return total amount of likes
const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0);

// Return blog with most likes
const favoriteBlog = blogs =>
  blogs.sort((a, b) => b.likes - a.likes)[0] || undefined;

// Return author with most blogs and their count
const mostBlogs = blogs => {
  // If there are no blogs
  if (blogs.length === 0) {
    return undefined;
  }

  const grouped = groupBy(blogs, "author");
  const author = Object.keys(grouped).sort(
    (a, b) => grouped[b].length - grouped[a].length
  )[0];
  const returnObj = {
    author,
    blogs: grouped[author].length,
  };

  return returnObj;
};

// Return author with most likes and their count
const mostLikes = blogs => {
  // If there are no blogs
  if (blogs.length === 0) {
    return undefined;
  }

  const sumReducer = (a, b) => a + b.likes;

  const grouped = groupBy(blogs, "author");
  const author = Object.keys(grouped).sort(
    (a, b) =>
      grouped[b].reduce(sumReducer, 0) - grouped[a].reduce(sumReducer, 0)
  )[0];
  const returnObj = {
    author,
    likes: grouped[author].reduce(sumReducer, 0),
  };

  return returnObj;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

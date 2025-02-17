import PropTypes from "prop-types";

import Togglable from "./Togglable";

const Blog = ({ blog, handleLike, canDelete, handleDelete }) => {
  const onLike = () => handleLike(blog);
  const onDelete = () =>
    window.confirm(`Do you wan't to remove "${blog.title}"?`)
      ? handleDelete(blog.id)
      : null;

  return (
    <div
      style={{
        padding: "1.5rem",
        border: "1px solid gray",
        borderRadius: "0.2rem",
        margin: "1rem 0",
      }}
    >
      <span>{blog.title}</span> <span>{blog.author}</span>
      <Togglable hiddenText="view" visibleText="hide">
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes} <button onClick={onLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {canDelete && <button onClick={onDelete}>delete</button>}
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;

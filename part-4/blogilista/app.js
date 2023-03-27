const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");

logger.info("connecting to", config.MONGO_URI);

mongoose.set("strictQuery", true);
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch(error => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

// add testing endpoint
// if running tests
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

// error handlers
app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;

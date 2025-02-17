const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get all users
router.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes");

  return res.json(users);
});

// Register and return user
router.post("/register", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return res.status(201).json(savedUser);
});

// Login and return token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401);
    throw new Error("invalid username or password");
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);

  return res
    .status(200)
    .send({ token, id: user._id, username: user.username, name: user.name });
});

module.exports = router;

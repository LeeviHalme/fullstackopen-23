const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

// varmista, että käyttäjä on autentikoitu ja
// aseta autentikoidun käyttäjän tiedot pyyntöön
module.exports = async (req, res, next) => {
  const token = getTokenFrom(req);

  if (!token) {
    res.status(401);
    return next(new Error("no jwt provided"));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken.id) {
    res.status(401);
    return next(new Error("invalid token"));
  }

  const user = await User.findById(decodedToken.id);
  req.user = user.toJSON();

  next();
};

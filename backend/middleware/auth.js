const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.id; // store user id in req.user
    next();
  } catch (error) {
    console.error("Failed to verify token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;

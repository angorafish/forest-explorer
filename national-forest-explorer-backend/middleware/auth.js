const jwt = require("jsonwebtoken");
// Middleware to authenticate JSON Web Tokens
const authenticateToken = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.headers["authorization"];
  // Extract the token from the header
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, return a 401 Unauthorized response
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // If token is invalid, return a 403 Forbidden response
    if (err) return res.status(403).json({ message: "Invalid token." });
    // Set the user infromation in the request object
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;

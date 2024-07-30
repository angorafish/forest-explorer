// Middleware to handle errors
module.exports = (err, req, res, next) => {
  // Log the error stack trace to the console
  console.error(err.stack);
  // Send a 500 Internal Server Error with a generic error message
  res.status(500).json({ error: "Something went wrong!" });
};

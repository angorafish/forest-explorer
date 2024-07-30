const morgan = require("morgan");
// Use morgan middleware for logging HTTP requests with "combined" format
module.exports = morgan("combined");

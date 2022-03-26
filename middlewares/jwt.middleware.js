const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

// we got rid of the old logic of verifying tokens

// better logic to verify the jwt token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = {
  authenticateToken,
};

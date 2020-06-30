const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  signToken: (user) => {
    //dont include password it the token
    if (!user) return null;
    const token = {
      userId: user.userId,
      email: user.email,
    };
    return jwt.sign(token, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  },
  
  auth: async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
      if (!token) res.status(400).json(false);
      const verified = await jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) res.status(400).json(false);
      res.status(200).json(true);
    } catch (error) {
      res.status(500).json({ message: "Not authorized" });
    }
    next();
  },
};

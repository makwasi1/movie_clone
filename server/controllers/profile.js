const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signToken } = require("../helpers/auth");

module.exports = {
  SignUp: async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(403).json({ mesaage: "Email already exists try other email" });
    }
    const newUser = new User(req.body);
    try {
      const user = await newUser.save();
      res
        .status(200)
        .json({ mesaage: "Successfully registered please login >>", user });
    } catch (error) {
      res
        .status(403)
        .json({ mesaage: "Failed to register. Plaese try again", error });
    }
  },
  Login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.findOne({ email: email });
      const result = await bcrypt.compareSync(password, user.password);

      if (result === true) {
        //generate the token        
        const token = signToken(result);
        res.status(200).json({
          message: "Login Successfully",
          Token: token,
         
        });
      } else {
        res.status(401).json({ message: "Login failed please try again" });
      }
    } catch (error) {
      res.status(403).json({ message: "Failed to login please try again" });
    }
  },
};

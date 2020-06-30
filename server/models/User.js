const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    set:(value) =>{
        return bcrypt.hashSync(value,10);
    },
  },
  role: {
    type: String,
    default: 0,
  },
  image: String,
});


const User = mongoose.model("users",userSchema)

module.exports = User


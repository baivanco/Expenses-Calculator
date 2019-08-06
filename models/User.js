const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  birth_date: {
    type: String,
    required: true
  },
  telephone: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);

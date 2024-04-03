const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true},
    age: { type: Number}
  }, {
    timestamps: true
  });

module.exports = mongoose.model('users', userSchema)
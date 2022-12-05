const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nickname: { type: String, require: true },
  age: { type: Number, require: true },
  city: { type: String, require: true } 
})

module.exports = mongoose.model('user', userSchema);
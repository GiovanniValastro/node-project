const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: new Date() }  
})

module.exports = mongoose.model('Post', postSchema);


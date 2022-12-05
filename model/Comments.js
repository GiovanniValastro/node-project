const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'user'},
  text: { type: String, require: true },
  postId: { type: String, require: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('comments', commentsSchema);

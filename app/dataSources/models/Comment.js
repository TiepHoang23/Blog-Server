const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    author: { ref: 'user', type: Schema.Types.ObjectId, require: true },
    blogId: { ref: 'blog', type: Schema.Types.ObjectId, require: true },
    message: { type: String },
    replies: [{ ref: 'comment', type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;

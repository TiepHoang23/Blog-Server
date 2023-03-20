const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    nlikes: { type: Number },
    author: { ref: 'user', type: Schema.Types.ObjectId, require: true },
    postTime: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
BlogSchema.index({ Title: 'text' });

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;

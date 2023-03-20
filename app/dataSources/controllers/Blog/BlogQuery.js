const { Blog, Comment } = require('../../models');
const { getSelectFieldFromInfo } = require('../../utils');

const mongoose = require('mongoose');
async function getBlogById(args, _context, info) {
  try {
    const select = getSelectFieldFromInfo(info).join(' ');
    const { blogId } = args;

    const blog = await Blog.findById(blogId, select).lean();

    const id = new mongoose.Types.ObjectId(blogId);
    const comments = await Comment.find({
      blogId: id,
    }).lean();
    return { ...blog, comment: comments };
  } catch (error) {
    return {
      isSuccess: false,
      message: error,
    };
  }
}
async function getListBlogs(args, _context, info) {
  const { limit, cursor } = args;
  if (!limit || limit <= 0) return null;
  const query = {};
  if (cursor) {
    query._id = { $gt: cursor };
  }
  const select = getSelectFieldFromInfo(info).join(' ');
  return Blog.find(query, select).limit(limit).lean();
}
async function searchBlogs(args, _context, info) {
  try {
    const { filters, limit, cursor } = args;

    if (!limit || limit <= 0) {
      return null;
    }

    const select = getSelectFieldFromInfo(info).join(' ');

    const query = {};

    if (!filters) {
      if (cursor) {
        query._id = { $gt: cursor };
      }
      return Blog.find(query, select).sort({ _id: 1 }).limit(limit).lean();
    }

    const { title, content } = filters;

    title ? (query.title = title) : (query.title = '');
    content ? (query.content = content) : (query.content = '');
    if (cursor) {
      query._id = { $gt: cursor };
    }
    return Blog.find(
      { content: { $regex: query.content }, title: { $regex: query.title } },
      select
    )
      .sort({ _id: 1 })
      .limit(limit)
      .lean();
  } catch (e) {
    return null;
  }
}

module.exports = {
  searchBlogs,
  getListBlogs,
  getBlogById,
};

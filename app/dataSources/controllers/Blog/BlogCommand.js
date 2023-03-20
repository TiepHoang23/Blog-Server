const { Blog } = require('../../models');
const _ = require('lodash');
const mongoose = require('mongoose');
async function createBlogByUser(args, { signature }) {
  try {
    const { userId, userRole } = signature;
    const blogProps = { ...args.BlogInput, author: userId };
    const NewBlog = await Blog.create(blogProps);
    return {
      isSuccess: true,
      message: 'Creating blog successfully',
      blog: NewBlog,
    };
  } catch (e) {
    return {
      isSuccess: false,
      message: e.message,
    };
  }
}

async function updateBlogByUser(args, { signature }) {
  try {
    const { userId, userRole } = signature;
    const { BlogId, BlogInput } = args;
    const id = new mongoose.Types.ObjectId(BlogId);
    const authorId = new mongoose.Types.ObjectId(BlogId);
    // console.log(authorId);

    const blogInstance = await Blog.findOne({
      _id: id,
      // author: authorId,
    });

    if (!blogInstance) {
      return {
        isSuccess: false,
        message: 'Cant find Blog',
      };
    }
    const newBlog = await Blog.findOneAndUpdate(
      { _id: BlogId },
      { ...BlogInput },
      { new: true }
    ).lean();

    return {
      isSuccess: true,
      message: 'update blog successfully',
      blog: newBlog,
    };
  } catch (e) {
    return {
      isSuccess: false,
      message: e.message,
    };
  }
}
async function deleteBlogByUser(args, { signature }) {
  try {
    const { userId, userRole } = signature;

    const { BlogId } = args;

    const blogInstance = await Blog.findOneAndRemove({
      _id: BlogId,
      author: userId,
    });
    if (_.isEmpty(blogInstance)) {
      return {
        isSuccess: false,
        message: 'This is blog of another person!',
        blog: blogInstance,
      };
    }
    return {
      isSuccess: true,
      message: 'delete blog successfully',
      blog: blogInstance,
    };
  } catch (e) {
    return {
      isSuccess: false,
      message: e.message,
    };
  }
}

module.exports = {
  createBlogByUser,
  deleteBlogByUser,
  updateBlogByUser,
};

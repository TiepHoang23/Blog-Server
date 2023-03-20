const { Comment } = require('../../models');
async function createCommentByUser(args, { signature }) {
  try {
    const { userId, userRole } = signature;
    const commentProps = { ...args, author: userId };
    const NewComment = await Comment.create(commentProps);
    return {
      isSuccess: true,
      message: 'Creating comment successfully',
      comment: NewComment,
    };
  } catch (e) {
    return {
      isSuccess: false,
      message: e.message,
    };
  }
}

module.exports = {
  createCommentByUser,
};

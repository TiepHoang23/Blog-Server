const UserControllers = require('./User');
const BlogControllers = require('./Blog');
const CommentControllers = require('./Comment');

module.exports = {
  ...UserControllers,
  ...BlogControllers,
  ...CommentControllers,
};

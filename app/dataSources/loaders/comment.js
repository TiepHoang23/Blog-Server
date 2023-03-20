const _ = require('lodash');
const { Comment } = require('../models');

async function batchCommentsById(keys) {
  // const keys =
  const keysObj = keys.map((key) => JSON.parse(key));
  const commentIds = keysObj.map((key) => key.comment);

  const selects = keysObj.map((key) => key.select);
  const select = _.union(...selects).join(' ');
  const comments = await Comment.find(
    { _id: { $in: commentIds } },
    select
  ).lean();

  return commentIds.map((comment) =>
    comments.find((user) => String(user._id) === comment)
  );
}

module.exports = {
  batchCommentsById,
};

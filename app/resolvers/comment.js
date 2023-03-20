const _ = require('lodash');
const { getSelectFieldFromInfo } = require('../dataSources/utils');

function getId(parents) {
  return parents._id;
}
async function getAuthor(parents, args, context, info) {
  try {
    if (!parents.author) {
      return null;
    }
    const { dataLoader } = context;
    const select = getSelectFieldFromInfo(info);
    const key = JSON.stringify({ author: String(parents.author), select });
    const users = await dataLoader.userById.load(key);
    return users;
  } catch (error) {
    logger.error('blog - getAuthor error', error);
    throw error;
  }
}

async function getReply(parents, args, context, info) {
  try {
    if (!parents.replies) {
      return null;
    }
    const { dataLoader } = context;
    const select = getSelectFieldFromInfo(info);
    const keys = _.map(parents.replies, (rep) =>
      JSON.stringify({ rep, select })
    );
    const users = await dataLoader.replyById.loadMany(keys);
    return users;
  } catch (error) {
    logger.error('blog - getreplies error', error);
    throw error;
  }
}
function getTime(parents) {
  return parents.createdAt.toLocaleDateString();
}
module.exports = {
  author: getAuthor,
  replies: getReply,
  createdAt: getTime,
};

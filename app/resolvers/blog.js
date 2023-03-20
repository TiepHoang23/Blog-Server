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

module.exports = {
  id: getId,
  author: getAuthor,
  // blog: getBlog,
};

const _ = require('lodash');
const { User } = require('../models');

async function batchUsersById(keys) {
  // const keys =
  const keysObj = keys.map((key) => JSON.parse(key));
  const userIds = keysObj.map((key) => key.author);

  const selects = keysObj.map((key) => key.select);
  const select = _.union(...selects).join(' ');
  const users = await User.find({ _id: { $in: userIds } }, select).lean();

  return userIds.map((author) =>
    users.find((user) => String(user._id) === author)
  );
}

module.exports = {
  batchUsersById,
};

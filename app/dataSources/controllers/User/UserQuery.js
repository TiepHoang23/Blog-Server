const { User } = require('../../models');
const { getSelectFieldFromInfo } = require('../../utils');

async function getUserById(args, context, info) {
  const select = getSelectFieldFromInfo(info, { id: '_id', name: 'firstName lastName' }).join(' ');
  const { userId } = context.signature;
  const user = await User.findById(userId, select).lean();
  return user;
}

module.exports = {
  getUserById,
};

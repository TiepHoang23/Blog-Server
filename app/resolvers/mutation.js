// Mutation for USER
async function signUp(__, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.signUp(args, context, info);
  return result;
}
async function login(__, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.login(args, context, info);
  return result;
}

async function logout(__, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.logout(args, context, info);
  return result;
}

async function createBlogByUser(__, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.createBlogByUser(args, context, info);

  return result;
}
async function updateBlogByUser(__, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.updateBlogByUser(args, context, info);

  return result;
}
async function deleteBlogByUser(__, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.deleteBlogByUser(args, context, info);

  return result;
}

async function createCommentByUser(__, args, context, info) {
  const { dataSources } = context;
  const result = await dataSources.createCommentByUser(args, context, info);

  return result;
}
module.exports = {
  signUp,
  login,
  logout,
  createBlogByUser,
  updateBlogByUser,
  deleteBlogByUser,
  createCommentByUser,
};

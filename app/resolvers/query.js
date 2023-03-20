function searchBlogs(__, args, context, info) {
  const { dataSources } = context;
  const result = dataSources.searchBlogs(args, context, info);
  return result;
}

function getListBlogs(__, args, context, info) {
  const { dataSources } = context;
  const result = dataSources.getListBlogs(args, context, info);
  return result;
}

function getBlogById(__, args, context, info) {
  const { dataSources } = context;
  const result = dataSources.getBlogById(args, context, info);
  return result;
}
module.exports = {
  searchBlogs: searchBlogs,
  listBlogs: getListBlogs,
  getBlogById: getBlogById,
};

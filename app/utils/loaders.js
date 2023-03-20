const DataLoader = require('dataloader');
const { loaders } = require('../dataSources');

function createDataLoader() {
  return {
    userById: new DataLoader((ids) => loaders.batchUsersById(ids)),
    replyById: new DataLoader((ids) => loaders.batchCommentsById(ids)),
  };
}

module.exports = createDataLoader;

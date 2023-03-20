const query = require('./BlogQuery');
const command = require('./BlogCommand');

module.exports = {
  ...query,
  ...command,
};

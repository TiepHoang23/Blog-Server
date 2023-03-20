const _ = require('lodash');

function getSelectFieldFromInfo(info, convertField = { id: '_id' }) {
  const { selections } = info.fieldNodes[0].selectionSet;
  const fields = _.map(selections, val => {
    let field = val.name.value;
    if (convertField && convertField[field]) {
      field = convertField[field];
    }
    return field;
  });
  return fields;
}

module.exports = {
  getSelectFieldFromInfo,
};

const Index = require('./src/data/index');
const Past = require('./src/data/past');

async function createDataObject(pageTitle) {
  if (pageTitle === 'index') {
    return Index.getData();
  }

  if (pageTitle === 'past') {
    return Past.getData();
  }

  return 'nothing here';
}

module.exports = createDataObject;

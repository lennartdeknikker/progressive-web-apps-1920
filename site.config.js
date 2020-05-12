const Index = require('./src/data/index')
const Past = require('./src/data/past')
const Details = require('./src/data/details')

async function createDataObject(pageTitle, flightData) {
  if (pageTitle === 'index') {
    return Index.getData()
  }

  if (pageTitle === 'past') {
    return Past.getData()
  }

  if (pageTitle === 'details' && flightData) {
    return Details.getData(flightData)    
  }
  
  return 'nothing here'
}

module.exports = createDataObject

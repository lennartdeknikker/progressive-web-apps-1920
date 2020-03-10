
import Controllers from './controllers.js'

const Routes = {

  '/upcoming': function () {
    Controllers.mainPage('next', 'upcoming')
  },
  '/past': function () {
    Controllers.mainPage('latest', 'past')
  },
  '/past/:flightnumber': function (flightnumber) {
    Controllers.detailPage('latest', 'past', flightnumber)
  },
  '/upcoming/:flightnumber': function (flightnumber) {
    Controllers.detailPage('next', 'upcoming', flightnumber)
  },

};

export default Routes;
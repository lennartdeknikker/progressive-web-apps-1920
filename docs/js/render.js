import Showcase from './components/showcase.js';
import Countdown from './components/countdown.js';
import Data from './data.js';
import List from './components/list.js';
import Detailview from './components/detailview.js';
import Loader from './components/loader.js';
import Utilities from './utilities.js';

const Render = {

  async banner() {
    await Data.banner().then(
      (bannerImage) => {
        const BackgroundProperty = '--banner-background'
        const value = `url('${bannerImage}')`
        Utilities.changeCSSProperty(BackgroundProperty, value)
      });
  },

  async showcase(type) {
    Loader.initOn('.showcase-image-titles-container');
    await Data.showcase(type).then(
      (data) => {
        Loader.removeFrom('.showcase-image-titles-container');
        Showcase.init(data, type);
        Countdown.init(data.launchDateRaw);
      });
  },

  async list(type) {
    Loader.initOn('.list-view');
    await Data.list(type).then(
      (data) => {
        Loader.removeFrom('.list-view');
        List.init(data, type);
      });
  },

  async detailView(flightNumber) {
    const detailView = document.querySelector('.detailview')
    const propertyList = document.querySelector('.property-list')

    if (detailView) {
      if (propertyList) propertyList.remove();
      Loader.initOn('.detailview');
    }

    await Data.detailView(flightNumber).then(
      (data) => {
        Loader.removeFrom('.detailview');
        Detailview.init(flightNumber, data);
      },
    );
  },

};

export default Render;

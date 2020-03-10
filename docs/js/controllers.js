import Utilities from './utilities.js';
import Render from './render.js'

const Controllers = {

  mainPage(showcaseType, listType) {
    Utilities.setActiveButton(`#button-${listType}-launches`);
    Utilities.removeAll('.dynamic-content-showcase');
    Utilities.removeAll('.launches-list');

    Render.showcase(showcaseType);
    Render.list(listType);
    Render.banner();
  },

  async detailPage(showcaseType, listType, flightnumber) {
    const showcaseLoaded = document.querySelector('.dynamic-content-showcase');
    const launchListLoaded = document.querySelector('.launches-list')
    const selectedElement = document.querySelector('.selected');

    Utilities.setActiveButton(`#button-${listType}-launches`);
    Render.banner();

    if (!showcaseLoaded) Render.showcase(showcaseType);
    if (!launchListLoaded) await Render.list(listType)
    if (selectedElement) selectedElement.classList.remove('selected');

    document.querySelector(`.flight-${flightnumber}`).classList.add('selected');
    Render.detailView(flightnumber);
  },

}

export default Controllers;
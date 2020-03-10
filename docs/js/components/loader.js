import Utilities from '../utilities.js';

const Loader = {

  initOn(target) {
    const targetElement = document.querySelector(target);
    const loaderImage = Utilities.createNewElement('img', 'loader-image');
    loaderImage.src = './img/loader.png';
    targetElement.appendChild(loaderImage);
  },
  removeFrom(element) {
    const targetElement = document.querySelector(element);
    if (targetElement) {
      const loaderImage = targetElement.querySelector('.loader-image')
      if (loaderImage) loaderImage.remove();
    }
  },

};

export default Loader;

import Router from './router.js';

const App = {

  init() {
    if (!window.location.href.includes('#')) window.location = '/#/upcoming';
    Router.init();
  },

};

App.init();

const express = require('express');
const Data = require('../helpers/data');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const bannerLink = await Data.banner();
  const showcaseData = await Data.showcase('next');
  const listData = await Data.list('upcoming');

  res.render('index', {
    title: 'Upcoming launches',
    activeButton: 'upcoming',
    bannerLink,
    showcaseData,
    listData,
    type: {
      showcase: 'next',
      list: 'upcoming',
    },
  });
});

module.exports = router;

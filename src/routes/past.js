const express = require('express');
const Data = require('../data');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const bannerLink = await Data.banner();
  const showcaseData = await Data.showcase('latest');
  const listData = await Data.list('past');
  console.log(listData);

  res.render('index', {
    title: 'Past launches',
    activeButton: 'past',
    bannerLink,
    showcaseData,
    listData,
    type: {
      showcase: 'latest',
      list: 'past',
    },
  });
});

module.exports = router;

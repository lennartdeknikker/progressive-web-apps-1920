const express = require('express');
const Data = require('../helpers/data');

const router = express.Router();

/* GET home page. */
router.get('/:period/:flight', async (req, res) => {
  const detailsData = await Data.detailView(req.params.flight);
  console.log(detailsData);
  res.render('details', {
    title: `details flight ${req.params.flight}`,
    activeButton: 'none',
    detailsData,
  });
});

module.exports = router;

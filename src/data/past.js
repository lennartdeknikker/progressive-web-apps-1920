const Data = require('../helpers/data');

const Past = {
  async getData() {
    const data = {
      site: {
        title: 'SpaceX | Launch Manifest',
        pageData: {
          title: 'Past launches',
          activeButton: 'past',
          type: {
            showcase: 'Latest',
            list: 'Past',
          },
        },
      },
    };

    const showcaseData = await Data.showcase('latest');
    const listData = await Data.list('past');
    const bannerData = await Data.banner();

    data.site.pageData.showcaseData = showcaseData;
    data.site.pageData.listData = listData;
    data.site.pageData.bannerLink = bannerData;

    return data;
  },
};

module.exports = Past;

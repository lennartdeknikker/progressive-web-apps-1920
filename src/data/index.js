const Data = require('../helpers/data');

const Index = {
  async getData() {
    const data = {
      site: {
        title: 'SpaceX | Launch Manifest',
        pageData: {
          title: 'Upcoming launches',
          activeButton: 'upcoming',
          type: {
            showcase: 'next',
            list: 'upcoming',
          },
        },
      },
    };

    const showcaseData = await Data.showcase('next');
    const listData = await Data.list('upcoming');
    const bannerData = await Data.banner();

    data.site.pageData.showcaseData = showcaseData;
    data.site.pageData.listData = listData;
    data.site.pageData.bannerLink = bannerData;

    return data;
  },
};

module.exports = Index;


const data = {
  title: 'Past launches',
  activeButton: 'past',
  bannerLink: 'https://live.staticflickr.com/65535/49636202572_8831c5a917_o.jpg',
  type: {
    showcase: 'latest',
    list: 'past',
  },
  showcaseData: {
    imageUrl: 'https://images2.imgbox.com/53/22/dh0XSLXO_o.png',
    missionTitle: 'CRS-20',
    flightNumber: 91,
    rocketTitle: 'Falcon 9',
    launchSite: 'CCAFS SLC 40',
    launchDate: '07/03/2020 05:50',
    launchDateRaw: '2020-03-07T04:50:31.000Z',
    details: `SpaceX's 20th and final Crew Resupply Mission under the original NASA CRS contract, this mission brings essential supplies to the International Space Station using SpaceX\'s reusable Dragon spacecraft. It is the last scheduled flight of a Dragon 1 capsule. (CRS-21 and up under the new Commercial
        Resupply Services 2 contract will use Dragon 2.) The external payload for this mission is the Bartolomeo ISS external payload hosting platform. Falcon
        9 and Dragon will launch from SLC-40, Cape Canaveral Air Force Station and the booster will land at LZ-1. The mission will be complete with return and
        recovery of the Dragon capsule and down cargo.`,
    videoLink: 'https://youtu.be/1MkcWK2PnsU',
  },
  listData: [{
    links:
        {
          photos: [],
          patch: 'https://images2.imgbox.com/53/22/dh0XSLXO_o.png',
          video: 'https://youtu.be/1MkcWK2PnsU',
        },
    data:
      {
        missionTitle: 'CRS-20',
        flightNumber: 91,
        rocketTitle: 'Falcon 9',
        launchSite: 'CCAFS SLC 40',
        launchDate: '07/03/2020 05:50',
      },
  },
  {
    links:
          {
            photos: [],
            patch: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png',
            video: 'https://youtu.be/8xeX62mLcf8',
          },
    data:
          {
            missionTitle: 'Starlink 4',
            flightNumber: 90,
            rocketTitle: 'Falcon 9',
            launchSite: 'CCAFS SLC 40',
            launchDate: '17/02/2020 16:05',
          },
  }],
};

module.exports = data;

const Api = require('./api');
const Utilities = require('./utilities');

const Data = {

  async banner() {
    const data = await Api.get('latest');
    const randomImageIndex = Math.floor(Math.random() * data.links.flickr_images.length);
    return data.links.flickr_images[randomImageIndex];
  },

  async showcase(type) {
    const data = await Api.get(type);
    return ({
      imageUrl: data.links.mission_patch_small,
      missionTitle: data.mission_name,
      flightNumber: data.flight_number,
      rocketTitle: data.rocket.rocket_name,
      launchSite: data.launch_site.site_name,
      launchDate: Utilities.normalizeDate(data.launch_date_unix),
      launchDateRaw: new Date(data.launch_date_unix * 1000),
      details: data.details,
      videoLink: data.links.video_link,
    });
  },

  async list(selector) {
    const data = await Api.get(selector);
    const parsedData = data.map(
      (element) => ({
        links: {
          photos: element.links.flickr_images,
          patch: element.links.mission_patch_small,
          video: element.links.video_link,
        },
        data: {
          missionTitle: element.mission_name,
          flightNumber: element.flight_number,
          rocketTitle: element.rocket.rocket_name,
          launchSite: element.launch_site.site_name,
          launchDate: Utilities.normalizeDate(element.launch_date_unix),
        },
      }),
    );

    parsedData.sort((a, b) => b.data.flightNumber - a.data.flightNumber);
    return parsedData;
  },

  async detailView(selector) {
    return Api.get(selector);
  },

};

module.exports = Data;

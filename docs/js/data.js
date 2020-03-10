import Api from './api.js';
import Utilities from './utilities.js';

const Data = {

  async banner() {
    const data = await Api.get('latest');
    console.log(data)
    const randomImageIndex = Math.floor(Math.random() * data.links.flickr_images.length)
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
          Patch: element.links.mission_patch_small,
          video: element.links.video_link,
        },
        data: {
          mission_title: element.mission_name,
          flight_number: element.flight_number,
          rocket_title: element.rocket.rocket_name,
          launch_site: element.launch_site.site_name,
          launch_date: Utilities.normalizeDate(element.launch_date_unix),
        },
      }));

    parsedData.sort((a, b) => (b.data.flight_number - a.data.flight_number));
    return parsedData;
  },

  async detailView(selector) {
    return Api.get(selector);
  },

};

export default Data;

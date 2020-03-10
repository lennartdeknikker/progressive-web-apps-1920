import Utilities from '../utilities.js';

const Showcase = {

  async init(data, type) {
    this.changeTitle(type);
    if (data.imageUrl) this.addPatchImage(data.imageUrl);
    if (data.details) this.addDetails(data.details);
    if (data.videoLink) this.addVideoLink(data.videoLink);
    if (data.launchDate) this.addLaunchDate(data.launchDate);
    if (data) this.addShortInfo(data);
  },

  changeTitle(type) {
    const newTitle = `${Utilities.capitalize(type)} Launch`;
    document.querySelector('.showcase-title').innerText = newTitle;
  },

  addPatchImage(imageUrl) {
    const newImage = Utilities.createNewElement(
      'img',
      'dynamic-content-showcase'
    );
    newImage.src = imageUrl;
    Utilities.appendElement('.showcase-image-container', newImage);
  },

  addShortInfo(data) {
    const info =
      [{
        name: 'Mission',
        value: `Nr. ${data.flightNumber}, ${data.missionTitle}`,
      },
      {
        name: 'Rocket',
        value: data.rocketTitle,
      },
      {
        name: 'Launch Site',
        value: data.launchSite,
      }]

    for (let i = 0; i < info.length; i += 1) {
      const propertyName = info[i].name.toUpperCase();
      const propertyText = info[i].value;
      const newSpan = Utilities.createNewElement(
        'span',
        'info-type',
        propertyName
      );
      const newLi = Utilities.createNewElement(
        'li',
        'dynamic-content-showcase',
        propertyText,
        newSpan
      );
      Utilities.appendElement('.showcase-titles-container', newLi);
    }
  },

  addDetails(text) {
    const newDetails = Utilities.createNewElement(
      'p',
      'dynamic-content-showcase',
      text
    );
    Utilities.appendElement('.showcase-details-container', newDetails);
  },

  addVideoLink(video) {
    const newIcon = Utilities.createNewElement(
      'i',
      'fab fa-youtube'
    );
    const newVideoLink = Utilities.createNewElement(
      'a',
      'video-link dynamic-content-showcase',
      ' Click here to watch the video',
      newIcon
    );
    newVideoLink.href = video;
    Utilities.appendElement('.showcase-details-container', newVideoLink);
  },

  addLaunchDate(date) {
    const launchDate = {
      name: 'Launch date',
      value: date,
    };
    const newLaunchDateHead = Utilities.createNewElement(
      'span',
      'info-type',
      launchDate.name.toUpperCase()
    );
    const newLaunchDate = Utilities.createNewElement(
      'p',
      'showcase-launchdate-date dynamic-content-showcase',
      launchDate.value, newLaunchDateHead
    );
    Utilities.appendElement('.showcase-launchdate-date', newLaunchDate);
  },

};

export default Showcase;

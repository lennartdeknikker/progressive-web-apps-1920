const Api = {
  async fetch(data) {
    const endpoint = 'https://api.spacexdata.com/v3/';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    // Error handling as learned from https://css-tricks.com/using-fetch/
    function handleJSONResponse(response) {
      return response.json().then(
        (json) => {
          if (response.ok) return json;
          return Promise.reject(new Error({
            ...json,
            status: response.status,
            statusText: response.statusText,
          }));
        },
      );
    }

    function handleTextResponse(response) {
      return response.text().then(
        (text) => {
          if (response.ok) return text;
          return Promise.reject(new Error({
            status: response.status,
            statusText: response.statusText,
            err: text,
          }));
        },
      );
    }

    function handleResponse(response) {
      const contentType = response.headers.get('content-type');
      if (contentType.includes('application/json')) return handleJSONResponse(response);
      if (contentType.includes('text/html')) return handleTextResponse(response);
      throw new Error(`Sorry, content-type ${contentType} is not supported.`);
    }

    return fetch(`${endpoint + data}`, requestOptions)
      .then(handleResponse)
      .catch((error) => console.log(error));
  },

  async get(address) {
    const localData = sessionStorage.getItem(address);
    if (!localData) {
      const newData = await Api.fetch(`launches/${address}`);
      sessionStorage.setItem(address, JSON.stringify(newData));
    }
    return JSON.parse(sessionStorage.getItem(address));
  },

};

const Countdown = {
  timer: 0,
  async init() {
    const launchDate = await Countdown.getDate();
    clearInterval(this.timer);
    this.startCountdown(launchDate);
  },
  async getDate() {
    const data = await Api.get('next');
    return new Date(data.launch_date_unix * 1000);
  },
  startCountdown(compareDate) {
    function timeBetweenDates(toDate) {
      const dateEntered = toDate;
      const now = new Date();
      const difference = dateEntered.getTime() - now.getTime();

      if (difference <= 0) {
        document.querySelector('.launch-days').innerText = '';
        document.querySelector('.launch-hours').innerText = '';
        document.querySelector('.launch-minutes').innerText = '';
        document.querySelector('.launch-seconds').innerText = '';

        clearInterval(Countdown.timer);
      } else {
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        document.querySelector('.launch-days').innerText = `${days} days, `;
        document.querySelector('.launch-hours').innerText = `${hours} hours, `;
        document.querySelector('.launch-minutes').innerText = `${minutes} minutes, `;
        document.querySelector('.launch-seconds').innerText = `${seconds} seconds `;
      }
    }

    timeBetweenDates(compareDate);
    this.timer = setInterval(() => {
      timeBetweenDates(compareDate);
    }, 1000);
  },
};

Countdown.init();

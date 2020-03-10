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
        });
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
        });
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
    const localData = sessionStorage.getItem(address)
    if (!localData) {
      const newData = await Api.fetch(`launches/${address}`);
      sessionStorage.setItem(address, JSON.stringify(newData));
    }
    return JSON.parse(sessionStorage.getItem(address));
  },

};

export default Api;

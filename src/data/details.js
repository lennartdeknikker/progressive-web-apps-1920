const Details = {
  async getData(flightData) {
    const data = {
      site: {
        title: 'SpaceX | Launch Manifest',
        pageData: {
          title: 'Details',
          detailsData: flightData,
        },
      },
    }
    return data
  },
}

module.exports = Details


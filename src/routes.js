const Routes = {
  upcoming(req, res) {
    res.render('index', {
      title: 'Upcoming Launches',
      activeButton: 'upcoming launches'
    })
  },
}

export default Routes
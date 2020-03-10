const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || "8000"

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))

app.get(['/', '/upcoming'], (req, res) => {
  res.render('index', {
    title: 'Upcoming Launches',
    activeButton: 'upcoming launches'
  })
})

app.get('/past', (req, res) => {
  res.render('index', {
    title: 'Past Launches',
    activeButton: 'past launches'
  })
})

app.get('/past/:id', (req, res) => {
  res.render('index', {
    title: 'Past Launches',
    activeButton: 'past launches',
    detail: req.params.id
  })
})

app.get('/upcoming/:id', (req, res) => {
  res.render('index', {
    title: 'Past Launches',
    activeButton: 'past launches',
    detail: req.params.id
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
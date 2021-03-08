const jsonServer = require('json-server')
const app = jsonServer.create()
const express = require('express')
const path = require('path')
const middlewares = jsonServer.defaults()
const router = jsonServer.router('taxi.json')
const port = process.env.PORT || 5000

app.use('/taxi', middlewares, router)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('bitmaster/build'))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'bitmaster', 'build', 'index.html'))
  })
}
app.listen(port)

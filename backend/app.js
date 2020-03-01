const express = require('express')
const path = require('path')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()
const router = require('./router')

app.use(helmet())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/WWWProgrammingCW');

// send app to router
require('./router.js')(app);

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`)
})

module.exports = app;
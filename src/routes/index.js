const express = require('express')
const app = express()
const pessoasRoutes = require('./pessoasRoutes.js')

app.use('/', pessoasRoutes)

module.exports = app
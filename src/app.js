const express = require('express')
const router = require('./routes/pessoasRoutes.js')
const db = require('./database/connection.js')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')

db.on('error', () => {
    throw new Error('Não foi possível se conectar ao banco.')
})
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso.')
})

app.set('view engine', 'ejs')

app.use(express.json())
   .use(express.urlencoded({extended: true}))
   .use(router)
   .use(express.static(__dirname + '/public'))
   .use(bodyParser.urlencoded({extended: true}))

module.exports = app
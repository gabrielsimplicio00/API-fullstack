require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, {useUnifiedTipology: true})

const db = mongoose.connection

module.exports = db
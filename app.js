const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const router = require('./routes/vocabRoute')

app.use(express.json())
app.use(cors())
const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

const configs = { useUnifiedTopology: true, useNewUrlParser: true }

mongoose.connect(MONGO_URL, configs)
const database = mongoose.connection

database.once('open', () => {
	console.log('Database Connected')
	app.use('/vocab', router)
})

database.on('error', console.error.bind(console, 'Error'))

app.listen(port, () =>
	console.log(`server listening on http://192.168.43.150:${port}`)
)

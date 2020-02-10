const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')
const errorHandler = require('./helpers/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use('/', router)

app.use(errorHandler.client)
app.use(errorHandler.server)

app.listen(PORT, () => {
  console.log(`Running port is ${PORT}`)
})
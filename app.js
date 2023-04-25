const { response, request } = require('express')
var express = require('express')
var kafka = require('kafka-node')
const app = express()
const { sendEvents } = require('../kafka/producer')
app.use(express.json())

app.post('/send/events', sendEvents)
app.listen(3000, () => {
  console.log("listening on port 3000")
})
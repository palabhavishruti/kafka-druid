var request = require('request');
var express = require('express')
var app = express();
var port = 3102
app.use(express.json())

var druidUrl = 'http://localhost:8888/druid/indexer/v1/supervisor';
var sqlqueryUrl = 'http://localhost:8888/druid/v2/sql'
var nativequeryUrl = 'http://localhost:8888/druid/v2/'

app.post('/create', (req, res) => {
  try {
    var ingestionSpec = req.body
    request.post({
      url: druidUrl,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(ingestionSpec)
    }, function (error, response) {
      try {
        if (response.statusCode !== 200) {
          res.status(400).json({ "errorMessage": "its not a proper request body" })
        } else {
          res.status(200).send(response)
        }
      }
      catch {
        res.send(error)
      }
    }
    )
  }
  catch (error) {
    res.status(500).json({"errorMessage": "unable to handle the request" })
  }
})


app.post('/nativequery', (req, res) => {
  try {
    var nquery = req.body
    request.post({
      url: nativequeryUrl,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(nquery)
      
    }, function (error, response,body) {
      try {
        if (response.statusCode !== 200) {
          res.status(400).json({ "errorMessage": "its not a proper request body" })
        } else {
          const parsedBody = JSON.parse(body);
    
          res.status(200).send(parsedBody)
        }
      }
      catch {
        res.send(error)
      }
    }
    )
  }
  catch (error) {
    res.status(500).json({ "errorMessage": "unable to handle the request" })
  }
})

app.post('/sqlquery', (req, res) => {
  try {
    var query = req.body
    request.post({
      url: sqlqueryUrl,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(query)
      
    }, function (error, response,body) {
      try {
        if (response.statusCode !== 200) {
          res.status(400).json({ "errorMessage": "its not a proper request body" })
        } else {
          const parsedBody = JSON.parse(body);
    
          res.status(200).send(parsedBody)
        }
      }
      catch {
        res.send(error)
      }
    }
    )
  }
  catch (error) {
    res.status(500).json({ "errorMessage": "unable to handle the request" })
  }
})


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

module.exports = app
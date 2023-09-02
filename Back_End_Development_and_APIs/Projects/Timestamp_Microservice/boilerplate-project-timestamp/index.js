// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({unix: date.getTime(),
            utc:date.toUTCString(),
            /*params: "Now"*/});
});

app.get("/api/:date?", function (req, res) {
  let date = new Date(req.params.date);
  if (date.toUTCString() === "Invalid Date") {
    date = new Date(+req.params.date);
  };
  if (date.toUTCString() === "Invalid Date") {
    res.json({error: "Invalid Date",
              /*params: req.params.date*/});
    return
  };
  res.json({unix: date.getTime(),
            utc: date.toUTCString(),
            /*params: req.params.date*/});
});


// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const dns = require('dns');
const urlparser = require('url');

console.log(process.env.MY_URI)
const client = new MongoClient(process.env.MY_URI);
const db = client.db('db_short_url');
const collection = db.collection('collection_short_url');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  const dnslookup = dns.lookup(urlparser.parse(url).hostname,
    async (error, data) => {
      if (!data){
        res.json({error: "Invalid URL"});
      }else{
        const urlCount = await collection.countDocuments({});
        const urlDoc = {
          url,
          short_url: urlCount
        }
        
        const result = await collection.insertOne(urlDoc);
        console.log(result);
        res.json({original_url: url, short_url: urlCount});

      }
    });
});

app.get('/api/shorturl/:short_url', async (req, res) => {
  const shorturl = req.params.short_url;
  const urlDoc = await collection.findOne({short_url: +shorturl});
  res.redirect(urlDoc.url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

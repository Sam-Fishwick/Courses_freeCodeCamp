require('dotenv').config();
let express = require('express');
let app = express();

app.listen(3000);

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use('/public', express.static(__dirname+'/public'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (request, response) => {
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        response.json({"message":"HELLO JSON"});
    }else{
        response.json({"message":"Hello json"});
    };
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time" : req.time});
});

module.exports = app;

require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.listen(3000);

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use(bodyParser.urlencoded({extended: false}));

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
    res.json({"time": req.time});
});

app.get('/:word/echo', (req, res) => {
    res.json({"echo": req.params.word});
});

app.route('/name').get((req, res) => {
    if(typeof req.query.first != "undefined" 
        && typeof req.query.last != "undefined"){
        let string = req.query.first+" "+req.query.last;
        res.json({"name": string});
    }else{
        res.send("Give name in format 'URL/name?first=FIRST&last=LAST'");
    };
}).post((req, res) => {
    let string = req.body.first+" "+req.body.last;
    res.json({"name": string});
});

module.exports = app;
